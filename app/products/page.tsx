"use client";
import { BlinkDialog } from "@/components/UI/Product/BlinkDialog";
import { ProductCard } from "@/components/UI/Product/ProductCard";
import { extractTextFromHTML } from "@/lib/extracthtml";
import { Product } from "@/lib/products";
import { useWallet } from "@solana/wallet-adapter-react";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Session } from "next-auth";
import { extractImageUrl, removeImageUrlFromDescription } from "@/lib/utils";

export default function Page() {

  const { data: session, status } = useSession() as { data: (Session & { user: { apiKey?: string } }) | null, status: string };

  const apiKey = session?.user?.apiKey
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  console.log(apiKey);
  console.log("apiKey in products page ", apiKey);


  // useEffect(() => {
  //   fetch(`/api/products`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`/api/products?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [apiKey]);
  const handleGenerateBlink = async (product: Product) => {
    setSelectedProduct(product);
    setIsGenerating(true);
    setGeneratedLink("");
    const res = await axios.post(
      `/api/productId`,
      JSON.stringify({ apiKey, checkout_id: product.id }),
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("res in products page ", res.data);
    const {support_email, USDC} = res.data;
    console.log("res in products page ", support_email, USDC);
    const metadata = {
      title: product.name,
      image:extractImageUrl(product.description),
      description: removeImageUrlFromDescription(product.description),
      price: USDC,
      walletAddress: publicKey?.toBase58(),
      product_id: product.id,
      support_email: support_email,
    };

    if (!connected) {
      toast.error("Please connect your wallet first to receive the payments");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);

    } 
    else if(!USDC || !support_email){
      toast.error("Please check your USDC and EMAIL  again");
    }
    else {
      const res = await axios.post(`/blink/create`, JSON.stringify(metadata));
      const url = `https://coinbasecommerceblinks.shop/blink?id=${res.data}`;
      setTimeout(() => {
        setIsGenerating(false);
        setGeneratedLink(
          `https://dial.to/?action=solana-action:${encodeURIComponent(
            url
          )}&cluster=mainnet`
        );
      }, 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied!");
  };
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/profile");
    },
  });
  return (
    <div className={`min-h-screen`}>
      <div className="bg-blue-50 dark:bg-gray-800 transition-colors duration-300">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-200">
            Your Store Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={extractImageUrl(product.description)!}
                product={product}
                description={removeImageUrlFromDescription(product.description)}
                onGenerateBlink={(product) => handleGenerateBlink(product)}
              />
            ))}
          </div>
        </main>
        <BlinkDialog
          product={selectedProduct}
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          isGenerating={isGenerating}
          generatedLink={generatedLink}
          onCopyLink={handleCopyLink}
        />

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}
