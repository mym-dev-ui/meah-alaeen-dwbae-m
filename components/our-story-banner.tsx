import Link from "next/link"
import Image from "next/image"

export function OurStoryBanner() {
  return (
    <section className="py-12 lg:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Rewards Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <div className="relative h-48 md:h-64 lg:h-72 w-full">
            <Image
              src="/images/banner-rewards-ar.jpg"
              alt="مكافآت مياه العين"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent flex items-center justify-end p-8 md:p-12">
              <div className="text-white text-right">
                <h2 className="text-2xl md:text-3xl font-black mb-2">برنامج المكافآت</h2>
                <p className="text-white/80 text-sm mb-4 max-w-xs">اكسب نقاط مع كل عملية شراء واستبدلها بمكافآت حصرية</p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-[#1a7a3c] font-bold px-5 py-2 rounded-full text-sm hover:bg-green-50 transition-colors"
                >
                  اشترك الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Two banners side by side: Dispenser + Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dispenser */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative h-48 lg:h-56 w-full bg-[#e8f5ff]">
              <Image
                src="/images/dispenser-arabic.png"
                alt="موزع مياه العين"
                fill
                className="object-contain"
                sizes="50vw"
              />
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <h3 className="text-gray-800 font-black text-lg mb-1">الموزع والملحقات</h3>
                  <Link href="/collections/dispenser" className="text-[#1a7a3c] font-semibold text-sm flex items-center gap-1">
                    تسوق الآن <span>‹</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d4a1f] to-[#1a7a3c] p-8 flex flex-col justify-between">
            <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-white/10" />
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full border border-white/10" />
            <div className="relative">
              <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-2">اعرف قصتنا</p>
              <h3 className="text-white font-black text-2xl mb-2">أكثر من مجرد مياه</h3>
              <p className="text-white/70 text-sm mb-5 max-w-xs">
                تركيبتنا المعدنية المتوازنة تنعش جسمك وتغذيه لتعيش حياة صحية وهادفة.
              </p>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 bg-white text-[#1a7a3c] font-bold px-5 py-2 rounded-full text-sm hover:bg-green-50 transition-all shadow-md"
              >
                اعرف أكثر <span>‹</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
