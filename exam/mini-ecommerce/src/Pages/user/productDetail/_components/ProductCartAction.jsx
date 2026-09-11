import React, { useState } from "react";
import Button from "../../../../Components/user/Button/Button";
import { useCartStore } from "../../../../Stores/cartStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProductCartAction({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Đã thêm ${quantity} cuốn ${product.name} vào giỏ hàng! 💥`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="lg:col-span-3 bg-stone-50 rounded-xl comic-border shadow-comic p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2 mb-3">
          <span className="text-xs font-extrabold uppercase text-stone-600 font-bubble">Tình Trạng:</span>
          <span className={`text-xs font-black px-2.5 py-0.5 rounded comic-border-sm font-bubble ${product.stock > 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}>
            ● {product.stock > 0 ? "CÒN HÀNG" : "HẾT HÀNG"}
          </span>
        </div>
        
        <div className="text-xs text-stone-700 space-y-2 mb-6 font-semibold font-bubble">
          <p className="flex items-center gap-2"><span className="text-lg">🚀</span> Giao hỏa tốc 2 giờ nội thành</p>
          <p className="flex items-center gap-2"><span className="text-lg">🛡️</span> Cam kết 100% Manga bản quyền NXB</p>
          <p className="flex items-center gap-2"><span className="text-lg">🔄</span> Đổi trả 1-1 trong 7 ngày nếu lỗi in ấn</p>
          <p className="flex items-center gap-2"><span className="text-lg">📦</span> Đóng hộp chống sốc 3 lớp chuyên dụng</p>
        </div>
        
        <div className="mb-6">
          <label className="text-xs font-black uppercase block mb-2 text-stone-800 font-bubble">Số Lượng:</label>
          <div className="flex items-center w-full comic-border rounded-lg bg-white overflow-hidden h-12">
            <button 
              onClick={handleDecrease}
              disabled={quantity <= 1 || product.stock <= 0}
              className="px-4 h-full font-black text-xl hover:bg-comic-yellow transition disabled:opacity-50"
            >
              -
            </button>
            <input 
              className="w-full h-full text-center font-black text-lg border-none p-1 focus:ring-0 text-stone-900 bg-white" 
              type="text" 
              value={quantity} 
              readOnly 
            />
            <button 
              onClick={handleIncrease}
              disabled={quantity >= product.stock || product.stock <= 0}
              className="px-4 h-full font-black text-xl hover:bg-comic-yellow transition disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full !rounded-xl"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            🛒 THÊM VÀO GIỎ HÀNG ⚡
          </Button>
          <Button 
            variant="danger" 
            size="lg" 
            className="w-full !rounded-xl"
            disabled={product.stock <= 0}
            onClick={handleBuyNow}
          >
            ⚡ MUA NGAY HỎA TỐC
          </Button>
        </div>
      </div>
      
      <div className="pt-4 border-t-2 border-stone-200 mt-6 text-center font-bubble">
        <span className="text-[10px] font-black text-stone-500 block uppercase mb-2">Phương thức thanh toán an toàn</span>
        <div className="flex justify-center items-center gap-2 text-xs font-black">
          <span className="bg-white comic-border-sm px-2 py-0.5 rounded shadow-sm">COD</span>
          <span className="bg-white comic-border-sm px-2 py-0.5 rounded shadow-sm">MOMO</span>
          <span className="bg-white comic-border-sm px-2 py-0.5 rounded shadow-sm">VNPAY</span>
          <span className="bg-white comic-border-sm px-2 py-0.5 rounded shadow-sm">VISA</span>
        </div>
      </div>
    </div>
  );
}
