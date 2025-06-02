import Link from "next/link";
import ClientNavBar from "./dark";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/profile", label: "Store" },
  { href: "/products", label: "Products" },
];

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" passHref>
            <span className="text-2xl sm:text-4xl font-bold text-white">
              CoinbaseBlinks
            </span>
          </Link>
          <div className="flex flex-grow justify-center">
            <div className="flex items-center space-x-2 sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white text-xl hover:text-gray-200"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:block">
            <ClientNavBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
