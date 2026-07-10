import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

const categories = [
  { label: "مياه الشرب", englishLabel: "Bottled Water", href: "/collections/drinking-water", image: "/images/cat-bottled.webp", bg: "bg-[#d0ecf7]" },
  { label: "المياه الوظيفية", englishLabel: "Functional Water", href: "/collections/functional-water", image: "/images/cat-functional.png", bg: "bg-[#f3e8ff]" },
  { label: "المجموعة المميزة", englishLabel: "Premium Range", href: "/collections/premium-range", image: "/images/cat-premium.webp", bg: "bg-[#d4eedd]" },
  { label: "عروض خاصة", englishLabel: "Special Offers", href: "/collections/special-offers", image: "/images/cat-special.png", bg: "bg-[#fff9e6]" },
  { label: "الموزع والملحقات", englishLabel: "Dispenser & Accessories", href: "/collections/dispenser", image: "/images/cat-dispenser.png", bg: "bg-[#e8eeff]" },
]

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#0077b6] to-[#0096c7] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-48 h-48 rounded-full border border-white" style={{ top: `${(i * 37) % 100 - 10}%`, left: `${(i * 53) % 110 - 10}%` }} />
          ))}
        </div>
        <div className="relative text-center text-white px-4">
          <p className="text-green-200 font-semibold tracking-widest text-sm uppercase mb-2">منتجاتنا</p>
          <h1 className="text-4xl md:text-5xl font-black">OUR PRODUCTS</h1>
          <p className="mt-3 text-white/80 max-w-lg mx-auto text-sm">
            الماء يرطب الجسم ويساعد على تجديد العناصر الغذائية المفقودة. تعمل التركيبة المعدنية المتوازنة لمياه العين على إنعاشك وتغذيتك.
          </p>
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">تسوق حسب الأقسام</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group flex flex-col items-center text-center">
                <div className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full ${cat.bg} overflow-hidden shadow-md mb-3 group-hover:shadow-xl transition-shadow`}>
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="144px"
                  />
                </div>
                <h3 className="font-bold text-sm text-gray-800 group-hover:text-[#1a7a3c] mb-1 transition-colors">{cat.label}</h3>
                <p className="text-xs text-gray-400 mb-2">{cat.englishLabel}</p>
                <div className="flex items-center gap-1 text-[#1a7a3c] text-xs font-semibold group-hover:gap-2 transition-all">استعرض <ChevronLeft size={12} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
