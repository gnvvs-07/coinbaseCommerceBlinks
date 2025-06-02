import { Button } from "@/components/common/button";
import { ArrowRight, Zap, Lock, Coins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-indigo-400 via-blue-300 to-white dark:from-indigo-900 dark:via-blue-900 dark:to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left mb-14 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-indigo-900 dark:text-white leading-tight">
              Simplify Payments with{" "}
              <span className="text-purple-600 dark:text-purple-300 drop-shadow-md">
                Solana Blinks
              </span>
            </h1>
            <p className="mt-4 text-xl text-indigo-800 dark:text-blue-200 sm:mt-6 sm:text-2xl lg:text-xl xl:text-2xl font-medium">
              Instant, Secure, Solana Payments for your Coinbase Commerce Store
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-lg shadow-lg">
                <Link href="/profile">
                  <Button
                    size="lg"
                    className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold hover:from-purple-700 hover:to-indigo-600 shadow-md"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <Link href="https://www.solanablinks.me">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 border-purple-500 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-50 dark:hover:bg-blue-900"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-purple-100 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-wrap justify-between items-center">
          <p className="text-purple-700 dark:text-purple-200 text-base font-semibold mb-4 sm:mb-0">
            Get started with Solana Blinks today
          </p>
          <div className="flex space-x-7">
            <Image
              src="/coinbase.png"
              alt="coinbase logo"
              width={100}
              height={40}
              className="h-9 rounded-md shadow"
            />
            <Image
              src="/solana.png"
              alt="solana logo"
              width={100}
              height={45}
              className="h-9 rounded-md shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
// ... existing code ...