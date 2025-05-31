import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-10 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">SolanaBlinks</h3>
          <p className="text-gray-600 max-w-xs">
            Empowering coinbase merchants with blockchain technology blink
          </p>
        </div>
        <div className="flex flex-col items-end md:items-end">
          <ul className="flex space-x-6 mb-2">
            {[
              { name: "Privacy Policy", link: "/#" },
              { name: "Terms of Service", link: "/#" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="hover:text-gray-900 transition-colors text-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-xs text-gray-500 text-right">
            © 2025 SolanaBlinks. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
