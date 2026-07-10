"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, ShoppingCart, ChevronDown, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  {
    label: "منتجاتنا",
    href: "/products",
    dropdown: [
      { label: "جميع المنتجات", href: "/products" },
      { label: "مياه الشرب", href: "/collections/drinking-water" },
      { label: "المياه الوظيفية", href: "/collections/functional-water" },
      { label: "المجموعة المميزة", href: "/collections/premium-range" },
      { label: "عروض خاصة", href: "/collections/special-offers" },
      { label: "الموزع والملحقات", href: "/collections/dispenser" },
    ],
  },
  { label: "قصتنا", href: "/our-story" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "FAQ", href: "/faq" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { count, openCart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/al-ain-logo.webp"
              alt="Al Ain Water"
              width={70}
              height={70}
              style={{ width: "70px", height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1a7a3c] transition-colors rounded-md hover:bg-green-50"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a7a3c] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#1a7a3c] border border-gray-200 rounded-full px-3 py-1.5 transition-colors">
              <span>العربية</span>
              <ChevronDown size={12} />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#1a7a3c] transition-colors rounded-full hover:bg-green-50">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#1a7a3c] transition-colors rounded-full hover:bg-green-50">
              <User size={20} />
            </button>
            {/* Cart button — opens drawer */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-[#1a7a3c] transition-colors rounded-full hover:bg-green-50"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-[#1a7a3c] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-once">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1a7a3c] hover:bg-green-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pr-4 space-y-1">
                    {link.dropdown.slice(1).map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-500 hover:text-[#1a7a3c] hover:bg-green-50 rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile cart */}
            <button
              onClick={() => { setMobileOpen(false); openCart() }}
              className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1a7a3c] hover:bg-green-50 rounded-lg"
            >
              <ShoppingCart size={18} />
              السلة {count > 0 && <span className="bg-[#1a7a3c] text-white text-xs px-1.5 py-0.5 rounded-full">{count}</span>}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
