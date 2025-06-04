import { Button } from "@/components/common/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white/30 via-white/20 to-white/10 dark:from-[#1a0f28]/60 dark:via-[#0f1c3f]/50 dark:to-[#0a0f1f]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left mb-14 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-indigo-900 dark:text-white leading-tight">
              Simplify Payments with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 drop-shadow-md">
                Solana Blinks
              </span>
            </h1>
            <p className="mt-4 text-xl text-indigo-800 dark:text-blue-200 sm:mt-6 sm:text-2xl lg:text-xl xl:text-2xl font-medium">
              Instant, Secure, Solana Payments for your Coinbase Commerce Store
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <div className="rounded-xl shadow-md">
                <Link href="/profile">
                  <Button
                    size="lg"
                    className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-pink-600 to-violet-500 text-white font-bold hover:from-pink-700 hover:to-violet-600"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="https://www.solanablinks.me">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 border-pink-500 text-pink-700 dark:text-pink-300 hover:bg-white/10 backdrop-blur-sm"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/30 dark:bg-[#10192e]/50 border-t border-white/20 dark:border-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap justify-between items-center">
          <p className="text-pink-700 dark:text-pink-200 text-base font-semibold mb-4 sm:mb-0">
            Get started with Solana Blinks today
          </p>
          <div className="flex space-x-6">
            <Image
              src="/coinbase.png"
              alt="coinbase logo"
              width={100}
              height={40}
              className="h-9 rounded-md shadow-md"
            />
            <Image
              src="/solana.png"
              alt="solana logo"
              width={100}
              height={45}
              className="h-9 rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
