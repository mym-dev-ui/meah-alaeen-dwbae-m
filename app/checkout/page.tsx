"use client"
import { useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, count } = useCart()
  const router = useRouter()
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  const [waiting, setWaiting] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  // Poll for admin approval
  useEffect(() => {
    if (!waiting) return
    const interval = setInterval(() => {
      try {
        const order = JSON.parse(localStorage.getItem("alain_order") || "{}")
        if (order.status === "approved") {
          clearInterval(interval)
          router.push("/checkout/code")
        }
      } catch {}
    }, 1500)
    return () => clearInterval(interval)
  }, [waiting, router])

  function handleCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16)
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim())
  }

  function handleExpiry(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4)
    if (digits.length > 2) {
      setExpiry(digits.slice(0, 2) + " / " + digits.slice(2))
    } else {
      setExpiry(digits)
    }
  }

  function handleCvv(e: React.ChangeEvent<HTMLInputElement>) {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const order = {
      id: Date.now().toString(),
      status: "pending",
      cardNumber,
      expiry,
      cvv,
      total,
      promoCode: null,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("alain_order", JSON.stringify(order))
    setWaiting(true)
  }

  if (waiting) {
    return (
      <main>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center mb-6">
            <Loader2 size={48} className="text-amber-500 animate-spin" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">جارٍ التحقق من الدفع</h1>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            يرجى الانتظار بينما نتحقق من معلومات بطاقتك…
          </p>
          <div className="mt-6 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (count === 0) {
    return (
      <main>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-4">
          <p className="text-2xl font-black text-gray-700">السلة فارغة</p>
          <Link href="/products" className="bg-[#1a7a3c] text-white font-bold px-8 py-3 rounded-full hover:bg-[#0d5a28] transition-colors">
            تسوق الآن
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-lg mb-5 text-gray-800">معلومات التوصيل</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">الاسم الأول *</label>
                  <input
                    required
                    type="text"
                    placeholder="محمد"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">الاسم الأخير *</label>
                  <input
                    required
                    type="text"
                    placeholder="الأحمد"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الجوال *</label>
                <input
                  required
                  type="tel"
                  placeholder="+971 50 XXX XXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                  dir="ltr"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">المدينة / الإمارة *</label>
                <select
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors bg-white"
                >
                  <option value="">اختر الإمارة</option>
                  <option>أبوظبي</option>
                  <option>دبي</option>
                  <option>الشارقة</option>
                  <option>عجمان</option>
                  <option>أم القيوين</option>
                  <option>رأس الخيمة</option>
                  <option>الفجيرة</option>
                  <option>العين</option>
                </select>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-lg mb-5 text-gray-800">طريقة الدفع</h2>
              <label className="flex items-center gap-3 p-4 rounded-xl border border-[#1a7a3c] bg-green-50 cursor-pointer">
                <input type="radio" name="payment" value="card" defaultChecked className="accent-[#1a7a3c] w-4 h-4" />
                <span className="text-xl">💳</span>
                <span className="font-semibold text-sm text-gray-700">بطاقة ائتمانية / مدى</span>
              </label>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم البطاقة *</label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={handleCardNumber}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors tracking-widest"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">تاريخ الانتهاء *</label>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={handleExpiry}
                      minLength={7}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV *</label>
                    <input
                      required
                      type="password"
                      inputMode="numeric"
                      placeholder="•••"
                      value={cvv}
                      onChange={handleCvv}
                      minLength={3}
                      maxLength={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a7a3c] hover:bg-[#0d5a28] text-white font-black py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-green-200"
            >
              متابعة
            </button>
          </form>

          {/* Right: Order summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-lg mb-5 text-gray-800">ملخص الطلب</h2>

              <ul className="space-y-4 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="64px" />
                      <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#1a7a3c] text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.price.toFixed(2)} د.إ / وحدة</p>
                    </div>
                    <span className="font-black text-gray-900 text-sm whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} د.إ
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toFixed(2)} د.إ</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>الشحن</span>
                  <span className={shipping === 0 ? "text-[#1a7a3c] font-semibold" : ""}>
                    {shipping === 0 ? "مجاني" : `${shipping.toFixed(2)} د.إ`}
                  </span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                    أضف {(100 - subtotal).toFixed(2)} د.إ للحصول على شحن مجاني
                  </p>
                )}
                <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-gray-100">
                  <span>الإجمالي</span>
                  <span className="text-[#1a7a3c]">{total.toFixed(2)} د.إ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
