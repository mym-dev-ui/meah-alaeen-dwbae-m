"use client"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export function CartDrawer() {
  const { items, isOpen, count, subtotal, removeItem, updateQty, closeCart } = useCart()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer — slides from LEFT (RTL layout) */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-gray-900">سلة التسوق</span>
            {count > 0 && (
              <span className="w-6 h-6 rounded-full bg-[#1a7a3c] text-white text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingBag size={36} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">السلة فارغة</p>
              <p className="text-sm text-gray-300">أضف منتجات لتبدأ التسوق</p>
              <button
                onClick={closeCart}
                className="mt-2 bg-[#1a7a3c] text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#0d5a28] transition-colors"
              >
                تسوق الآن
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <p className="font-bold text-sm text-gray-800 leading-snug line-clamp-2">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                        title="حذف المنتج"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[#1a7a3c] font-black text-sm mb-2">
                      {(item.price * item.quantity).toFixed(2)} د.إ
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#1a7a3c] hover:text-[#1a7a3c] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#1a7a3c] hover:text-[#1a7a3c] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — always shown when items > 0 */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-500 text-sm">المجموع الفرعي</span>
              <span className="font-black text-gray-900">{subtotal.toFixed(2)} د.إ</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-xs">الشحن يحسب عند الدفع</span>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#1a7a3c] hover:bg-[#0d5a28] text-white font-black text-center py-4 rounded-2xl transition-colors text-base shadow-lg shadow-green-200"
            >
              متابعة الدفع ← {subtotal.toFixed(2)} د.إ
            </Link>

            <button
              onClick={closeCart}
              className="mt-2 w-full text-center text-gray-400 text-sm hover:text-gray-600 transition-colors py-1"
            >
              مواصلة التسوق
            </button>
          </div>
        )}
      </div>
    </>
  )
}
