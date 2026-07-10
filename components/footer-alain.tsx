import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/al-ain-logo.webp"
                alt="Al Ain Water"
                width={70}
                height={70}
                style={{ width: "70px", height: "auto" }}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              مياه شرب نقية وصحية من المصادر الطبيعية. تركيبتنا المعدنية المتوازنة تنعش جسمك وتغذيه.
            </p>
            {/* App badges */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-lg">🍎</span>
                  <div>
                    <div className="text-[8px] text-gray-400 leading-none">Download on the</div>
                    <div className="text-[11px] font-bold leading-none">App Store</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-lg">▶</span>
                  <div>
                    <div className="text-[8px] text-gray-400 leading-none">Get it on</div>
                    <div className="text-[11px] font-bold leading-none">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4">منتجاتنا</h4>
            <ul className="space-y-2.5">
              {[
                { label: "جميع المنتجات", href: "/products" },
                { label: "مياه الشرب", href: "/collections/drinking-water" },
                { label: "المياه الوظيفية", href: "/collections/functional-water" },
                { label: "المجموعة المميزة", href: "/collections/premium-range" },
                { label: "عروض خاصة", href: "/collections/special-offers" },
                { label: "الموزع والملحقات", href: "/collections/dispenser" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold text-white mb-4">معلومات</h4>
            <ul className="space-y-2.5">
              {[
                { label: "قصتنا", href: "/our-story" },
                { label: "FAQ", href: "/faq" },
                { label: "تواصل معنا", href: "/contact" },
                { label: "سياسة الخصوصية", href: "#" },
                { label: "الشروط والأحكام", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3 mb-5">
              <a href="https://wa.me/" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                <span className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center text-white flex-shrink-0">💬</span>
                واتساب
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">📧</span>
                info@alainwater.com
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">📞</span>
                +971 XX XXX XXXX
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-2">
              {["📸", "🐦", "📘", "▶"].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-[#1a7a3c] rounded-full flex items-center justify-center transition-colors text-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Al Ain Water. كل الحقوق محفوظة. مدعوم من شوبيفاي</p>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-xs">نقبل:</span>
            <Image
              src="https://cdn.shopify.com/s/files/1/0675/2046/3089/files/Payment-methood.svg?v=1739344144"
              alt="Payment methods"
              width={160}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
