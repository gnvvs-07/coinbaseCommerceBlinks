import { ShoppingCart, Zap, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Connect Your coinbaseEcommerce Store",
      description:
        "Seamlessly integrate your coinbase Ecommerce Dashboard products by connecting your store.",
    },
    {
      icon: Zap,
      title: "Create Instant Blinks for each product",
      description:
        "Generate unique Solana Blinks for each product. These smart payment links are ready to use immediately, no coding required, after payment both receive email with order details.",
    },
    {
      icon: CreditCard,
      title: "Pay with Solana",
      description:
        "Merchant set in their local currency for a product in coinbaseDashboard, auto converts to USD and pay on Solana with USDC and both receives an email confirmation",
    },
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-white text-center mb-16">
          Simplify Your coinbase-commerce Payments in 3 Easy Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-700 rounded-full p-6 mb-6 shadow-lg">
                <step.icon className="h-12 w-12 text-blue-600 dark:text-blue-200" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 text-center">
                {step.title}
              </h3>
              <p className="text-center text-blue-600 dark:text-blue-300 leading-relaxed">
                {step.description}
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-200 font-bold text-lg">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
