import React from "react";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../Services/queries/useCategories";

export default function Footer() {
  const { data: categories = [] } = useGetCategories();
  return (
    <>
      {/* BEGIN: Newsletter Section */}
      <section
        className="bg-comic-yellow border-t-4 border-b-4 border-black py-8 mt-12"
        data-purpose="newsletter-bar"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="bg-comic-red text-white text-xs font-black px-2 py-0.5 rounded comic-border-2 uppercase tracking-wide">
              Ưu Đãi Đặc Quyền
            </span>
            <h3 className="font-comic text-3xl text-black mt-1 leading-tight">
              ĐĂNG KÝ NHẬN BẢN TIN MANGA MỚI!
            </h3>
            <p className="text-xs font-bold text-gray-800">
              Nhận ngay{" "}
              <span className="bg-black text-comic-yellow px-1.5 py-0.5 rounded font-black">
                MÃ GIẢM GIÁ 10%
              </span>{" "}
              cho đơn hàng đầu tiên & thông báo lịch phát hành sớm nhất!
            </p>
          </div>
          <form
            className="flex w-full md:w-[400px] lg:w-[550px] max-w-full comic-border rounded-lg overflow-hidden shadow-comic bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full border-0 px-4 py-3 text-xs font-bold focus:ring-0 outline-none"
              placeholder="Nhập email của bạn tại đây..."
              type="email"
            />
            <button
              className="bg-black text-white hover:bg-gray-800 font-comic text-base px-6 py-3 tracking-wider flex-shrink-0 flex items-center gap-1 transition-colors"
              type="submit"
            >
              ĐĂNG KÝ! ⚡
            </button>
          </form>
        </div>
      </section>
      {/* END: Newsletter Section */}

      {/* BEGIN: MainFooter */}
      <footer
        className="bg-comic-yellow text-black pt-12 pb-6 border-black"
        data-purpose="site-footer"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b-2 border-black">
            {/* Col 1: About & Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-comic-yellow font-comic text-3xl px-2.5 py-0.5 comic-border rounded">
                  SWOO!
                </div>
                <span className="font-comic text-2xl tracking-wider">
                  MANGA HEROES
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed text-gray-900 max-w-sm font-bubble">
                Swoo Manga là thiên đường truyện tranh bản quyền chính hãng tại
                Việt Nam. Nơi tụ hội của hàng ngàn đầu manga Shonen, Seinen,
                Shojo, Isekai, Light Novel và Artbook cao cấp từ các nhà xuất
                bản hàng đầu Nhật Bản.
              </p>
              <div className="text-xs font-bold space-y-1 font-bubble">
                <p>
                  <span className="font-black">TRỤ SỞ CHÍNH:</span> 88 Phố
                  Manga, Quận 1, TP. Hồ Chí Minh
                </p>
                <p>
                  <span className="font-black">HOTLINE HỖ TRỢ:</span>{" "}
                  <span className="bg-black text-comic-yellow px-1 py-0.5 rounded font-black">
                    1900-888-MANGA
                  </span>
                </p>
                <p>
                  <span className="font-black">EMAIL:</span>{" "}
                  support@swoomanga.vn
                </p>
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-2 text-lg">
                <a
                  className="w-10 h-10 comic-border bg-white rounded flex items-center justify-center comic-shadow-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  href="#"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  className="w-10 h-10 comic-border bg-white rounded flex items-center justify-center comic-shadow-sm hover:bg-pink-100 hover:text-pink-600 transition-colors"
                  href="#"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  className="w-10 h-10 comic-border bg-white rounded flex items-center justify-center comic-shadow-sm hover:bg-red-100 hover:text-red-600 transition-colors"
                  href="#"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  className="w-10 h-10 comic-border bg-white rounded flex items-center justify-center comic-shadow-sm hover:bg-stone-200 transition-colors"
                  href="#"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

                        {/* Col 2: Categories */}
            <div>
              <h4 className="font-comic text-lg uppercase mb-3 border-b-2 border-black pb-1 inline-block">
                DANH MỤC MANGA
              </h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-800 font-bubble">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        className="hover:underline hover:text-comic-red transition-colors"
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Đang tải...</li>
                )}
              </ul>
            </div>

                        {/* Col 3: Customer Care */}
            <div>
              <h4 className="font-comic text-lg uppercase mb-3 border-b-2 border-black pb-1 inline-block">
                CHĂM SÓC KHÁCH HÀNG
              </h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-800 font-bubble">
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Trung Tâm Hỗ Trợ</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Tra Cứu Vận Chuyển</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Chính Sách Đổi Trả</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Vận Chuyển Hỏa Tốc</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Hội Viên Manga Club</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/contact">Liên Hệ & Góp Ý</Link></li>
              </ul>
            </div>

                        {/* Col 4: About Us */}
            <div>
              <h4 className="font-comic text-lg uppercase mb-3 border-b-2 border-black pb-1 inline-block">
                VỀ SWOO MANGA
              </h4>
              <ul className="space-y-1.5 text-xs font-bold text-gray-800 font-bubble">
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/about">Về Chúng Tôi</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/about">Cam Kết Bản Quyền</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/about">Cơ Hội Nghề Nghiệp</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/about">Điều Khoản Dịch Vụ</Link></li>
                <li><Link className="hover:underline hover:text-comic-red transition-colors" to="/about">Chính Sách Bảo Mật</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright & Payment partner badges */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold gap-4">
            <p className="font-bubble">
              © 2024 SWOO! MANGA - Pop-Art Comic Edition. Thiên đường manga bản
              quyền. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-2xl">
              <i className="fa-brands fa-cc-visa text-blue-700 bg-white comic-border-sm rounded px-1 comic-shadow-sm"></i>
              <i className="fa-brands fa-cc-mastercard text-red-600 bg-white comic-border-sm rounded px-1 comic-shadow-sm"></i>
              <i className="fa-brands fa-cc-paypal text-blue-500 bg-white comic-border-sm rounded px-1 comic-shadow-sm"></i>
              {/* <span className="comic-border-sm bg-white px-2 py-0.5 rounded font-black text-xs comic-shadow-sm text-pink-600">MoMo</span>
              <span className="comic-border-sm bg-white px-2 py-0.5 rounded font-black text-xs comic-shadow-sm text-blue-600">VNPAY</span>
              <span className="comic-border-sm bg-white px-2 py-0.5 rounded font-black text-xs comic-shadow-sm">COD</span> */}
            </div>
          </div>
        </div>
      </footer>
      {/* END: MainFooter */}
    </>
  );
}


