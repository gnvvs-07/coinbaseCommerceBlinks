import { CreditCard, ShoppingCart, Shield } from "lucide-react";
import { Button } from "@/components/common/button";

export default function Blinks() {
  const features = [
    {
      icon: CreditCard,
      title: "Instant Solana Payments",
      text: "Process transactions directly on your platform without redirects.",
    },
    {
      icon: ShoppingCart,
      title: "Seamless Integration Blinks with CoinbaseEcommerce",
      text: "Smooth checkout experience.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br  via-pink-100 to-yellow-50 dark:from-white  dark:via-pink-200 dark:to-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-pink-700 mb-4 drop-shadow-md">
            Revolutionize Your E-commerce with Solana Blinks
          </h2>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto">
            Blinks are blockchain-powered payment links that enable instant,
            interactive transactions through shareable URLs. Boost your sales directly embedded in your coinbaseEcommerce store on twitter
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-8 transition-transform duration-300 hover:scale-105 border border-pink-100 dark:bg-orange-950 dark:border-pink-800"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-100 dark:from-orange-800 dark:via-pink-900 dark:to-yellow-800 rounded-full mb-6 mx-auto shadow">
                <feature.icon className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center dark:text-orange-200">
                {feature.title}
              </h3>
              <p className="text-orange-700 text-center dark:text-yellow-100">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
