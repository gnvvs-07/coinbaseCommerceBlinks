"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/common/tooltip";
import { WalletConnect } from "./WalletConnect";
import { ChevronDown, ChevronUp, Eye, EyeOff, HelpCircle, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileFormData, WalletInfo } from "@/lib/profile";
import { validateEmail, validateUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Session } from "next-auth";

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    apiKey: "",
  });

  const { data: session, status } = useSession() as { data: (Session & { user: { apiKey?: string } }) | null, status: string };

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prev) => ({
        ...prev,
        apiKey: session?.user?.apiKey || ""
      }));
    }
  }, [status, session]);

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showToken, setShowToken] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const { connected } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        apiKey: formData.apiKey,
      });
      if (!res!.ok) {
        toast.error(res?.error || "Error updating the data");
        setIsSubmitting(false);
        return;
      }
      if (!connected) {
        toast.error("Please connect your wallet to receive payments");
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error("Error updating the data");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          name="apiKey"
          type="text"
          value={formData.apiKey}
          onChange={handleInputChange}
          placeholder="Enter your API Key"
        />
      </div>

      <div>
        <Label htmlFor="wallet">Connect your wallet to receive payments</Label>
        <WalletConnect
          onConnect={(info) => setWalletInfo(info)}
          onDisconnect={() => setWalletInfo(null)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
