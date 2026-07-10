"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

const slides = [
  {
    id: 1,
    bg: "from-[#0d4a1f] via-[#1a7a3c] to-[#0d5a28]",
    label: "جديد",
    labelColor: "bg-blue-500",
    title: "SPARKLING",
    title2: "WATER",
    sub: "NOW AVAILABLE IN",
    highlight: "CANS",
    desc: "احتفل بكل لحظة مع مياه العين الغازية المنعشة",
    cta: "اكتشف الآن",
    ctaHref: "/collections/drinking-water",
    image: "/images/sparkling-can-plain.jpg",
    imageAlt: "مياه العين الغازية - علبة",
    imagePos: "object-contain",
  },
  {
    id: 2,
    bg: "from-[#023e8a] via-[#0077b6] to-[#0096c7]",
    label: "الأكثر مبيعاً",
    labelColor: "bg-green-500",
    title: "مياه العين",
    title2: "",
    sub: "مياه شرب معبأة",
    highlight: "500 مل × 12",
    desc: "مياه شرب طبيعية صافية، مثالية للاستخدام اليومي",
    cta: "تسوق الآن",
    ctaHref: "/collections/drinking-water",
    image: "/images/product-500ml.jpg",
    imageAlt: "مياه العين 500 مل",
    imagePos: "object-contain",
  },
  {
    id: 3,
    bg: "from-[#1a237e] via-[#283593] to-[#3949ab]",
    label: "مميز",
    labelColor: "bg-pink-500",
    title: "مياه العين",
    title2: "بلاس",
    sub: "مدعمة بـ",
    highlight: "الزنك وفيتامين D",
    desc: "مياه شرب معززة بالمغذيات لدعم صحتك اليومية",
    cta: "اعرف أكثر",
    ctaHref: "/collections/functional-water",
    image: "/images/product-plus-500ml.jpg",
    imageAlt: "مياه العين بلاس",
    imagePos: "object-contain",
  },
  {
    id: 4,
    bg: "from-[#0d3320] via-[#155a2e] to-[#1a7a3c]",
    label: "عرض",
    labelColor: "bg-amber-500",
    title: "اشتري 20",
    title2: "",
    sub: "واحصل على",
    highlight: "5 مجاناً",
    desc: "عرض لا يفوتك على مياه العين - وفر أكثر مع العائلة",
    cta: "اغتنم العرض",
    ctaHref: "/collections/special-offers",
    image: "/images/offer-buy20.jpg",
    imageAlt: "عرض مياه العين",
    imagePos: "object-cover",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((index: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 300)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden h-[340px] md:h-[420px] lg:h-[480px]">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-all duration-700`} />

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              top: `${-60 + i * 20}%`,
              right: `${-10 + i * 5}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative max-w-7xl mx-auto px-6 h-full flex items-center gap-6 lg:gap-12"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        {/* Text — right side (RTL) */}
        <div className="flex-1 text-white">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${slide.labelColor}`}>
            {slide.label}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-none mb-1 uppercase tracking-tight">
            {slide.title}
          </h1>
          {slide.title2 && (
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-none mb-2 uppercase tracking-tight">
              {slide.title2}
            </h1>
          )}
          <p className="text-base md:text-lg font-light opacity-90 mb-0.5">{slide.sub}</p>
          <p className="text-2xl md:text-3xl font-black text-yellow-300 mb-4 uppercase">{slide.highlight}</p>
          <p className="text-sm md:text-base opacity-75 mb-6 max-w-xs">{slide.desc}</p>
          <Link
            href={slide.ctaHref}
            className="inline-flex items-center gap-2 bg-white text-[#1a7a3c] font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl text-sm"
          >
            {slide.cta}
            <span className="text-base">‹</span>
          </Link>
        </div>

        {/* Image — left side (RTL) */}
        <div className="flex-shrink-0 w-48 h-56 md:w-64 md:h-72 lg:w-80 lg:h-80 relative">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className={`${slide.imagePos} drop-shadow-2xl`}
            priority={slide.id === 1}
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg transition-all backdrop-blur-sm"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg transition-all backdrop-blur-sm"
      >
        ›
      </button>
    </section>
  )
}
