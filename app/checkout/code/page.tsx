"use client"
import { useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { ref, update, onValue } from "firebase/database"
import { db } from "@/lib/firebase"

export default function CheckoutCodePage() {
  const { subtotal, count, clearCart } = useCart()
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  const [submitted, setSubmitted] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoStatus, setPromoStatus] = useState<"idle" | "rejected">("idle")
  const orderIdRef = useRef<string>("")

  useEffect(() => {
    orderIdRef.current = localStorage.getItem("alain_current_order_id") || ""
  }, [])

  async function applyPromo() {
    if (!promoCode.trim()) return
    const id = orderIdRef.current
    if (id) {
      await update(ref(db, `orders/${id}`), { promoCode: promoCode.trim() })
    }
    setPromoStatus("rejected")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearCart()
    localStorage.removeItem("alain_current_order_id")
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
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-gray-900 mb-2 text-center">كود الخصم</h1>
        <p className="text-gray-400 text-sm text-center mb-8">أدخل كود الخصم إن وجد لتطبيقه على طلبك</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">

            {/* Promo input */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أدخل كود الخصم"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value)
                    setPromoStatus("idle")
                  }}
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                    promoStatus === "rejected"
                      ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                      : "border-gray-200 focus:border-[#1a7a3c] focus:ring-1 focus:ring-[#1a7a3c]"
                  }`}
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="bg-[#1a7a3c] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#0d5a28] transition-colors text-sm"
                >
                  تطبيق
                </button>
              </div>

              {promoStatus === "rejected" && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <XCircle size={16} />
                  <span>الكود غير صحيح أو منتهي الصلاحية</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{subtotal.toFixed(2)} د.إ</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span className={shipping === 0 ? "text-[#1a7a3c] font-semibold" : ""}>
                  {shipping === 0 ? "مجاني" : `${shipping.toFixed(2)} د.إ`}
                </span>
              </div>
              <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-gray-100">
                <span>الإجمالي</span>
                <span className="text-[#1a7a3c]">{total.toFixed(2)} د.إ</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a7a3c] hover:bg-[#0d5a28] text-white font-black py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-green-200"
          >
            تأكيد الطلب — {total.toFixed(2)} د.إ
          </button>

          <Link
            href="/checkout"
            className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← العودة للدفع
          </Link>
        </form>
      </div>
      <Footer />
    </main>
  )
}
