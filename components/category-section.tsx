import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

const categories = [
  {
    id: 1,
    label: "مياه الشرب",
    englishLabel: "Bottled Water",
    href: "/collections/drinking-water",
    image: "/images/cat-bottled.webp",
    bg: "bg-[#d0ecf7]",
  },
  {
    id: 2,
    label: "المياه الوظيفية",
    englishLabel: "Functional Water",
    href: "/collections/functional-water",
    image: "/images/cat-functional.png",
    bg: "bg-[#e8e4f5]",
  },
  {
    id: 3,
    label: "المجموعة المميزة",
    englishLabel: "Premium Range",
    href: "/collections/premium-range",
    image: "/images/cat-premium.webp",
    bg: "bg-[#d4eedd]",
  },
  {
    id: 4,
    label: "عروض خاصة",
    englishLabel: "Special Offers",
    href: "/collections/special-offers",
    image: "/images/cat-special.png",
    bg: "bg-[#d0ecf7]",
  },
]

export function CategorySection() {
  return (
    <section className="py-12 lg:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#1a7a3c] font-semibold text-xs uppercase tracking-widest mb-2">تسوق حسب الأقسام</p>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">منتجاتنا</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto text-sm">
            اكتشف مجموعتنا المتنوعة من المنتجات التي تناسب كل التفضيلات والمناسبات
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="group flex flex-col items-center text-center">
              {/* Circle */}
              <div className={`relative w-36 h-36 lg:w-44 lg:h-44 rounded-full ${cat.bg} overflow-hidden shadow-md mb-4 group-hover:shadow-xl transition-shadow`}>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="176px"
                />
              </div>
              <h3 className="text-sm lg:text-base font-bold text-gray-800 group-hover:text-[#1a7a3c] transition-colors mb-0.5">
                {cat.label}
              </h3>
              <span className="text-xs text-gray-400 mb-2">{cat.englishLabel}</span>
              <div className="flex items-center gap-1 text-[#1a7a3c] font-semibold text-xs group-hover:gap-2 transition-all">
                <span>استعرض</span>
                <ChevronLeft size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
