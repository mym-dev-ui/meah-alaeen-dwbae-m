import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"

const faqs = [
  { q: "من أين تأتي مياه العين؟", a: "تأتي مياه العين من مصادر طبيعية محمية، تمر بعملية تنقية متعددة المراحل لضمان أعلى جودة." },
  { q: "ما الفرق بين مياه العين زيرو والعادية؟", a: "مياه العين زيرو تحتوي على نسبة صوديوم أقل من 0.001%، وهي مثالية للأشخاص الذين يراقبون مدخولهم من الصوديوم." },
  { q: "ما هي مياه العين بلاس؟", a: "مياه العين بلاس مدعمة بالزنك والمغنيسيوم وفيتامين D لدعم صحتك اليومية." },
  { q: "كيف يمكنني طلب الكميات الكبيرة؟", a: "للطلبات الكبيرة والشركات، يرجى التواصل معنا مباشرة عبر البريد الإلكتروني أو الواتساب." },
]

export default function FaqPage() {
  return (
    <main>
      <Navbar />
      <div className="relative h-64 bg-gradient-to-r from-[#0d4a1f] to-[#1a7a3c] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-green-300 tracking-widest text-sm mb-2">الأسئلة الشائعة</p>
          <h1 className="text-4xl font-black">FAQ</h1>
        </div>
      </div>
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl text-right">
              <h3 className="font-bold text-gray-800 text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
