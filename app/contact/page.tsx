import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="relative h-64 bg-gradient-to-r from-[#0d4a1f] to-[#1a7a3c] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-green-300 tracking-widest text-sm mb-2">تواصل معنا</p>
          <h1 className="text-4xl font-black">CONTACT US</h1>
        </div>
      </div>
      <section className="py-16 px-4 max-w-2xl mx-auto text-right">
        <h2 className="text-2xl font-black mb-8 text-gray-800">نسعد بتواصلك معنا</h2>
        <div className="space-y-6">
          {[
            { icon: "📧", label: "البريد الإلكتروني", value: "info@alainwater.com" },
            { icon: "📞", label: "الهاتف", value: "+971 XX XXX XXXX" },
            { icon: "💬", label: "واتساب", value: "تحدث معنا الآن" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <div className="font-bold text-gray-800">{c.label}</div>
                <div className="text-gray-500 text-sm">{c.value}</div>
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
