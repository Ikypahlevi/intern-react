import React from "react";

export default function PartnerNewsletter() {
  const partners = [
    "SHUEISHA", "KODANSHA", "KADOKAWA", "SQUARE ENIX", 
    "VIZ MEDIA", "NXB KIM ĐỒNG", "NXB TRẺ"
  ];

  return (
    <>
      {/* Partner CTA Banner */}
      <section className="bg-green-600 border-4 border-black p-4 sm:p-6 shadow-comic-lg text-white flex flex-col md:flex-row items-center justify-between gap-4 font-bubble">
        <div className="flex items-center gap-3 text-left">
          <span className="text-3xl bg-black p-2 border-2 border-black">🤝</span>
          <div>
            <h3 className="font-comic text-2xl sm:text-3xl uppercase tracking-wide font-black">
              TRỞ THÀNH ĐỐI TÁC PHÂN PHỐI CÙNG SWOO! MANGA
            </h3>
            <p className="text-xs sm:text-sm font-bold text-green-100">
              Chiết khấu đại lý hấp dẫn lên đến 35%, bảo trợ truyền thông và hỗ trợ ấn phẩm trưng bày.
            </p>
          </div>
        </div>
        <a 
          className="bg-comic-yellow hover:bg-yellow-400 text-black font-black text-xs uppercase px-6 py-3 border-2 border-black shadow-comic flex-shrink-0 tracking-wider font-comic transition" 
          href="#"
        >
          ĐĂNG KÝ HỢP TÁC NGAY →
        </a>
      </section>

      {/* Partner Publishers Marquee */}
      <section className="border-2 border-black bg-white p-3 shadow-comic font-bubble overflow-hidden whitespace-nowrap">
        <div className="flex items-center justify-around gap-4 text-xs font-black uppercase text-gray-700 animate-[marquee_20s_linear_infinite] sm:animate-none sm:flex-wrap">
          <span className="bg-comic-yellow px-2 py-1 border-2 border-black text-black">★ ĐỐI TÁC NXB:</span>
          {partners.map((partner, idx) => (
            <span key={idx} className="hover:text-red-600 cursor-pointer transition">★ {partner}</span>
          ))}
        </div>
      </section>

      {/* Newsletter Subscribe */}
      <section className="bg-comic-yellow border-4 border-black p-6 sm:p-8 shadow-comic-lg font-bubble">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 uppercase border-2 border-black font-comic tracking-wider">ƯU ĐÃI ĐỘC QUYỀN</span>
            <h3 className="font-comic text-3xl sm:text-4xl uppercase text-black font-black">ĐĂNG KÝ NHẬN BẢN TIN MANGA MỚI!</h3>
            <p className="text-xs font-bold text-gray-800">
              Nhận ngay <span className="bg-red-500 text-white px-1 border border-black">MÃ GIẢM GIÁ 10%</span> cho đơn hàng đầu tiên & thông báo lịch phát hành sớm nhất!
            </p>
          </div>
          <div className="lg:col-span-6">
            <form 
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đăng ký nhận bản tin thành công! ⚡");
              }}
            >
              <input 
                className="w-full border-2 border-black font-bold text-xs p-3 focus:ring-0 focus:bg-yellow-50 bg-white outline-none" 
                placeholder="Nhập email của bạn tại đây..." 
                type="email" 
                required
              />
              <button 
                className="bg-black hover:bg-gray-800 text-comic-yellow font-comic text-xl px-6 py-2.5 border-2 border-black shadow-comic whitespace-nowrap transition" 
                type="submit"
              >
                ĐĂNG KÝ! ⚡
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
