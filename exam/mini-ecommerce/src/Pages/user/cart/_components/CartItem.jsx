import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../../../Utils/format";

export default function CartItem({ 
  item, 
  isSelected, 
  onToggleSelect, 
  onIncrease, 
  onDecrease, 
  onRemove,
  onUpdateQuantity
}) {
  const [inputValue, setInputValue] = useState(item.quantity);

  useEffect(() => {
    setInputValue(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(val);
  };

  const handleInputBlur = () => {
    let newQty = parseInt(inputValue, 10);
    if (isNaN(newQty) || newQty < 1) newQty = 1;
    if (item.stock && newQty > item.stock) newQty = item.stock;
    setInputValue(newQty);
    if (onUpdateQuantity) onUpdateQuantity(item.id, newQty);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 comic-border shadow-comic rounded-xl transition-all duration-200 bg-white relative hover:-translate-y-0.5 gap-4">
      <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="w-5 h-5 mt-3 sm:mt-0 rounded border-2 border-black text-comic-red focus:ring-0 cursor-pointer"
        />
        <div className="relative w-24 h-24 bg-yellow-50 rounded-lg flex items-center justify-center p-2 shrink-0 comic-border">
          {item.status && (
            <span className="absolute -top-2.5 -left-2.5 bg-comic-red text-white text-[10px] font-black px-2 py-0.5 rounded-md font-comic comic-border shadow-comic-sm rotate-[-6deg]">
              {item.status.split(' ')[0]}
            </span>
          )}
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <i className="fa-solid fa-book-open text-3xl text-comic-red mb-1"></i>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black text-black uppercase bg-comic-yellow px-2 py-0.5 rounded comic-border-sm font-bubble">
              {item.publisher || "NXB CHÍNH HÃNG"}
            </span>
            <span className="text-[10px] font-black text-white uppercase bg-black px-1.5 py-0.5 rounded comic-border-sm font-bubble">
              {item.category || "MANGA"}
            </span>
          </div>
          <h3 className="text-sm font-black text-stone-900 leading-snug hover:text-comic-red cursor-pointer font-bubble">
            {item.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <div className="text-lg font-black text-comic-red font-comic">{formatCurrency(item.price)}</div>
            {item.quantity > 1 && (
              <div className="text-[11px] text-stone-500 font-bold font-bubble">
                (x{item.quantity} = {formatCurrency(item.price * item.quantity)})
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[10px] text-green-700 bg-green-100 comic-border-sm px-1.5 py-0.5 rounded font-bold font-bubble">
              <i className="fa-solid fa-check-circle text-[10px] text-green-600 mr-1"></i> 
              Còn hàng sẵn
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
        <div className="flex items-center comic-border-sm rounded-lg h-8 text-sm text-black bg-comic-yellow shadow-comic-sm font-black">
          <button 
            onClick={() => onDecrease(item.id, item.quantity)}
            disabled={item.quantity <= 1}
            className="w-8 h-full flex items-center justify-center hover:bg-yellow-400 rounded-l font-black text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-10 h-full text-center bg-white border-y-0 border-x-2 border-black text-xs font-black font-comic outline-none focus:ring-0"
          />
          <button 
            onClick={() => onIncrease(item.id, item.quantity)}
            disabled={item.stock && item.quantity >= item.stock}
            className="w-8 h-full flex items-center justify-center hover:bg-yellow-400 rounded-r font-black text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-black text-black font-comic hidden sm:inline-block">
            {formatCurrency(item.price * item.quantity)}
          </span>
          <button 
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 rounded-lg bg-red-100 hover:bg-comic-red hover:text-white comic-border-sm shadow-comic-sm text-comic-red flex items-center justify-center text-sm font-black transition-all"
            title="Xóa khỏi giỏ hàng"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
