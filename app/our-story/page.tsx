import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function OurStoryPage() {
  return (
    <main>
      <Navbar />
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-r from-[#0d4a1f] to-[#1a7a3c] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-green-300 tracking-widest text-sm mb-2">قصتنا</p>
          <h1 className="text-4xl font-black">OUR STORY</h1>
        </div>
      </div>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="prose prose-lg mx-auto text-right">
          <h2 className="text-3xl font-black text-[#1a7a3c] mb-6">أكثر من مجرد مياه</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            مياه العين تقدم مياه شرب نقية وصحية من المصادر الطبيعية. تركيبتنا المعدنية المتوازنة تنعش جسمك وتغذيه لتعيش حياة صحية وهادفة.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            يرطب الماء الجسم ويساعد على تجديد العناصر الغذائية المفقودة. تعمل التركيبة المعدنية المتوازنة لمياه العين على إنعاشك وتغذيتك، لذا تعيش حياة صحية وهادفة. بالإضافة إلى الفوائد الصحية العديدة، يمنح هذا التوازن الصحيح من المعادن الأساسية مياه العين طعماً ناعماً وسلساً.
          </p>
          <div className="grid grid-cols-3 gap-6 my-12">
            {[
              { num: "+30", label: "عاماً من الخبرة" },
              { num: "100%", label: "طبيعي ونقي" },
              { num: "+5", label: "منتجات مختلفة" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-[#e8f5ed] rounded-2xl">
                <div className="text-3xl font-black text-[#1a7a3c]">{stat.num}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
