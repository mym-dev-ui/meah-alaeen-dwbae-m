"use client"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: "p-500ml-12",
    name: "مياه العين 500 مل × 12",
    nameEn: "Al Ain Water 500ml × 12",
    price: 12.00,
    originalPrice: 15.00,
    badge: "الأكثر مبيعاً",
    badgeColor: "bg-[#1a7a3c]",
    rating: 4.8,
    reviews: 124,
    image: "/images/product-500ml.jpg",
    href: "/products",
  },
  {
    id: "p-zero-500ml-12",
    name: "مياه العين زيرو 500 مل × 12",
    nameEn: "Al Ain Zero 500ml × 12",
    price: 13.50,
    originalPrice: null,
    badge: "صوديوم منخفض",
    badgeColor: "bg-blue-500",
    rating: 4.9,
    reviews: 89,
    image: "/images/product-zero-500ml.jpg",
    href: "/products",
  },
  {
    id: "p-plus-500ml-6",
    name: "مياه العين بلاس 500 مل × 6",
    nameEn: "Al Ain Plus 500ml × 6",
    price: 18.00,
    originalPrice: 22.00,
    badge: "مدعمة بالزنك",
    badgeColor: "bg-pink-500",
    rating: 4.7,
    reviews: 56,
    image: "/images/product-plus-500ml.jpg",
    href: "/products",
  },
  {
    id: "p-4gallon",
    name: "مياه العين 4 جالون (15 لتر)",
    nameEn: "Al Ain 4 Gallon (15L)",
    price: 8.50,
    originalPrice: 10.00,
    badge: "عبوة كبيرة",
    badgeColor: "bg-amber-500",
    rating: 4.6,
    reviews: 203,
    image: "/images/product-4gallon.jpg",
    href: "/products",
  },
  {
    id: "p-1.5L-6",
    name: "مياه العين 1.5 لتر × 6",
    nameEn: "Al Ain 1.5L × 6",
    price: 9.50,
    originalPrice: null,
    badge: null,
    badgeColor: "",
    rating: 4.7,
    reviews: 167,
    image: "/images/product-1.5L.jpg",
    href: "/products",
  },
  {
    id: "p-sparkling-glass",
    name: "مياه العين غازية زجاج 750 مل × 6",
    nameEn: "Al Ain Sparkling Glass 750ml × 6",
    price: 45.00,
    originalPrice: 52.00,
    badge: "مميز",
    badgeColor: "bg-purple-500",
    rating: 4.9,
    reviews: 38,
    image: "/images/product-sparkling-glass.jpg",
    href: "/collections/premium-range",
  },
  {
    id: "p-bambini-1.5L",
    name: "مياه العين بامبيني 1.5 لتر × 6",
    nameEn: "Al Ain Bambini 1.5L × 6",
    price: 15.00,
    originalPrice: null,
    badge: "للأطفال",
    badgeColor: "bg-rose-500",
    rating: 4.8,
    reviews: 72,
    image: "/images/product-bambini.jpg",
    href: "/collections/functional-water",
  },
  {
    id: "p-plant-480ml",
    name: "مياه العين نباتية 480 مل × 12",
    nameEn: "Al Ain Plant Based 480ml × 12",
    price: 22.00,
    originalPrice: 26.00,
    badge: "نباتي",
    badgeColor: "bg-green-600",
    rating: 4.6,
    reviews: 29,
    image: "/images/product-plant.png",
    href: "/products",
  },
]

export function BestsellersSection() {
  const { addItem } = useCart()

  return (
    <section className="py-12 lg:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#1a7a3c] font-semibold text-xs uppercase tracking-widest mb-2">اختيارات العملاء</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">الأكثر مبيعاً</h2>
          </div>
          <Link href="/products" className="text-[#1a7a3c] font-semibold text-sm hover:underline flex items-center gap-1">
            عرض الكل <span>‹</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Image */}
              <Link href={product.href}>
                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 h-44">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.badge && (
                    <span className={`absolute top-2.5 right-2.5 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-3 lg:p-4">
                <h3 className="font-bold text-sm text-gray-800 leading-tight mb-0.5 line-clamp-2">{product.name}</h3>
                <p className="text-gray-400 text-[11px] mb-2">{product.nameEn}</p>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 mr-1">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-black text-[#1a7a3c] text-sm">{product.price.toFixed(2)} د.إ</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-xs line-through">{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className="w-full bg-[#1a7a3c] hover:bg-[#0d5a28] active:scale-95 text-white font-semibold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShoppingCart size={13} />
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
