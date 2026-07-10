"use client"
import { useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, count, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearCart()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2 size={52} className="text-[#1a7a3c]" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">تم استلام طلبك!</h1>
          <p className="text-gray-500 max-w-sm mb-8">
            شكراً على طلبك. سنتواصل معك قريباً لتأكيد التفاصيل وتحديد موعد التوصيل.
          </p>
          <Link
            href="/"
            className="bg-[#1a7a3c] text-white font-bold px-8 py-3 rounded-full hover:bg-[#0d5a28] transition-colors"
          >
            العودة للرئيسية
          </Link>
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
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  defaultChecked
                  className="accent-[#1a7a3c] w-4 h-4"
                />
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
                    maxLength={19}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">تاريخ الانتهاء *</label>
                    <input
                      required
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV *</label>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      placeholder="XXX"
                      maxLength={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-lg mb-5 text-gray-800">كود الخصم</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أدخل كود الخصم"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c] transition-colors"
                />
                <button
                  type="button"
                  className="bg-[#1a7a3c] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#0d5a28] transition-colors text-sm"
                >
                  تطبيق
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a7a3c] hover:bg-[#0d5a28] text-white font-black py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-green-200"
            >
              تأكيد الطلب — {total.toFixed(2)} د.إ
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
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
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
