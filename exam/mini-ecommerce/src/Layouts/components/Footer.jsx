import React from "react";

export default function Footer() {
  return (
    <footer className="bg-comic-yellow comic-border-thick border-x-0 border-b-0 text-stone-900 pt-12 pb-6 mt-10 shadow-comic-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Comic Row */}
        <div className="bg-white comic-border-thick rounded-2xl p-6 shadow-comic-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
          <div className="lg:col-span-6">
            <span className="bg-comic-red text-white font-comic text-xs px-2 py-0.5 rounded comic-border-sm shadow-comic-sm uppercase inline-block -rotate-1 mb-1">
              POW! ƯU ĐÃI ĐẶC QUYỀN
            </span>
            <h4 className="font-comic text-3xl text-stone-900">ĐĂNG KÝ NHẬN BẢN TIN MANGA MỚI!</h4>
            <p className="font-bubble font-bold text-xs sm:text-sm text-stone-600 mt-1">
              Nhận ngay <span className="bg-comic-yellow px-1 comic-border-sm rounded">MÃ GIẢM GIÁ 10%</span> cho đơn hàng đầu tiên & thông báo lịch phát hành sớm nhất!
            </p>
          </div>
          <div className="lg:col-span-6">
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg lg:ml-auto">
              <input className="flex-1 px-4 py-2 font-bubble font-bold text-xs rounded-xl comic-border bg-stone-50 focus:bg-white text-stone-900 focus:outline-none shadow-comic-sm" placeholder="Nhập email của bạn tại đây..." type="email" />
              <button className="bg-comic-ink hover:bg-comic-red text-comic-yellow hover:text-white px-6 py-2 rounded-xl comic-border font-comic text-base tracking-wider shadow-comic comic-btn-hover transition" type="button">
                ĐĂNG KÝ! ⚡
              </button>
            </form>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-6 font-bubble">
          {/* Col 1: Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-comic-ink comic-border flex items-center justify-center text-comic-yellow text-lg shadow-comic">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <span className="font-comic text-3xl tracking-wide text-stone-900">SWOO<span className="text-comic-red">!</span> MANGA</span>
            </div>
            <p className="font-bold text-stone-700 leading-relaxed mb-4 text-xs max-w-sm">
              Swoo Manga là thiên đường truyện tranh bản quyền chính hãng tại Việt Nam. Nơi tụ hội của hàng ngàn đầu manga và artbook cao cấp từ các nhà xuất bản hàng đầu Nhật Bản.
            </p>
            <div className="text-stone-900 text-xs space-y-1 font-bold">
              <p><span className="font-comic text-sm">TRỤ SỞ CHÍNH:</span> 88 Phố Manga, Quận 1, TP. Hồ Chí Minh</p>
              <p><span className="font-comic text-sm">HOTLINE HỖ TRỢ:</span> support@swoomanga.vn</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-comic text-xl text-stone-900 uppercase tracking-wider mb-3">DANH MỤC MANGA</h5>
            <ul className="space-y-2 text-xs font-bold text-stone-800">
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Manga Shonen</a></li>
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Manga Seinen</a></li>
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Isekai & Fantasy</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h5 className="font-comic text-xl text-stone-900 uppercase tracking-wider mb-3">CHĂM SÓC KHÁCH HÀNG</h5>
            <ul className="space-y-2 text-xs font-bold text-stone-800">
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Trung Tâm Hỗ Trợ</a></li>
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Chính Sách Đổi Trả</a></li>
              <li><a className="hover:text-comic-red hover:underline transition" href="#">Vận Chuyển Hỏa Tốc</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-bold text-xs text-stone-900">
          <p className="font-bubble">© 2024 SWOO MANGA! Pop-Art Comic Edition. Thiên đường manga bản quyền.</p>
          <div className="flex items-center gap-3 text-2xl text-stone-900">
            <i className="fa-brands fa-cc-visa hover:text-comic-blue transition-colors"></i>
            <i className="fa-brands fa-cc-mastercard hover:text-comic-red transition-colors"></i>
            <i className="fa-brands fa-cc-paypal hover:text-blue-600 transition-colors"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
