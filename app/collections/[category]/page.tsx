"use client"
import { use } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

const categoryData: Record<string, {
  title: string; titleAr: string; color: string; bg: string
  products: { id: string; name: string; price: number; badge: string | null; image: string }[]
}> = {
  "drinking-water": {
    title: "Bottled Water", titleAr: "مياه الشرب",
    color: "from-[#caf0f8] to-[#48cae4]", bg: "bg-[#d0ecf7]",
    products: [
      { id: "dw-500ml",  name: "مياه العين 500 مل × 12",  price: 12.00, badge: "الأكثر مبيعاً", image: "/images/product-500ml.jpg" },
      { id: "dw-1.5L",  name: "مياه العين 1.5 لتر × 6",  price: 9.50,  badge: null,            image: "/images/product-1.5L.jpg" },
      { id: "dw-330ml", name: "مياه العين 330 مل × 24",   price: 14.00, badge: "وفر",           image: "/images/product-330ml.jpg" },
      { id: "dw-4gal",  name: "مياه العين 4 جالون",       price: 8.50,  badge: "عبوة كبيرة",    image: "/images/product-4gallon.jpg" },
    ],
  },
  "functional-water": {
    title: "Functional Water", titleAr: "المياه الوظيفية",
    color: "from-[#ffd6ff] to-[#c77dff]", bg: "bg-[#f3e8ff]",
    products: [
      { id: "fw-zero-500",   name: "مياه العين زيرو 500 مل × 12", price: 13.50, badge: "صوديوم منخفض", image: "/images/product-zero-500ml.jpg" },
      { id: "fw-zero-1.5",   name: "مياه العين زيرو 1.5 لتر × 6", price: 11.00, badge: null,            image: "/images/product-zero-1.5L.jpg" },
      { id: "fw-plus",       name: "مياه العين بلاس 500 مل × 6",  price: 18.00, badge: "مدعمة بالزنك",  image: "/images/product-plus-500ml.jpg" },
      { id: "fw-bambini",    name: "مياه العين بامبيني 1.5 لتر × 6", price: 15.00, badge: "للأطفال",    image: "/images/product-bambini.jpg" },
    ],
  },
  "premium-range": {
    title: "Premium Range", titleAr: "المجموعة المميزة",
    color: "from-[#d4edda] to-[#80c997]", bg: "bg-[#d4eedd]",
    products: [
      { id: "pr-glass-750",       name: "مياه العين غازية زجاج 750 مل × 6",   price: 45.00, badge: "غازية", image: "/images/product-sparkling-glass.jpg" },
      { id: "pr-plant",           name: "مياه العين نباتية 480 مل × 12",       price: 22.00, badge: "نباتي", image: "/images/product-plant.png" },
      { id: "pr-can-lime",        name: "مياه غازية - علبة ليمون × 6",         price: 18.00, badge: "جديد",  image: "/images/sparkling-can-lime.jpg" },
      { id: "pr-can-strawberry",  name: "مياه غازية - علبة فراولة × 6",        price: 18.00, badge: "جديد",  image: "/images/sparkling-can-strawberry.jpg" },
    ],
  },
  "special-offers": {
    title: "Special Offers", titleAr: "عروض خاصة",
    color: "from-[#fff3cd] to-[#ffc107]", bg: "bg-[#fff9e6]",
    products: [
      { id: "so-20plus5",  name: "مياه العين 20 + 5 زجاجات مجانية", price: 45.00, badge: "وفر 20%",    image: "/images/offer-buy20.jpg" },
      { id: "so-50plus20", name: "مياه العين 50 + 20 زجاجة مجانية", price: 95.00, badge: "توفير كبير", image: "/images/offer-buy50.jpg" },
    ],
  },
  "dispenser": {
    title: "Dispenser & Accessories", titleAr: "الموزع والملحقات",
    color: "from-[#e2eafc] to-[#abc4ff]", bg: "bg-[#e8eeff]",
    products: [
      { id: "dis-manual",   name: "موزع مياه العين - ضغط يدوي",  price: 35.00,  badge: null,    image: "/images/dispenser-arabic.png" },
      { id: "dis-electric", name: "مضخة كهربائية فيليبس",         price: 120.00, badge: "جديد",  image: "/images/electric-pump-arabic.png" },
    ],
  },
}

export default function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const data = categoryData[category] ?? {
    title: "Collections", titleAr: "المجموعات",
    color: "from-blue-400 to-blue-600", bg: "bg-blue-50", products: [],
  }
  const { addItem } = useCart()

  return (
    <main>
      <Navbar />
      {/* Hero */}
      <div className={`relative h-56 bg-gradient-to-r ${data.color} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-800">{data.titleAr}</h1>
          <p className="text-gray-600 mt-1 font-medium">{data.title}</p>
        </div>
      </div>

      {/* Products */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              {/* Image */}
              <div className={`relative h-48 ${data.bg}`}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {p.badge && (
                  <span className="absolute top-3 right-3 bg-[#1a7a3c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-800 mb-2 leading-snug">{p.name}</h3>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-[#1a7a3c] text-sm">{p.price.toFixed(2)} د.إ</span>
                </div>
                <button
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                  className="w-full bg-[#1a7a3c] hover:bg-[#0d5a28] active:scale-95 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart size={14} />
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
