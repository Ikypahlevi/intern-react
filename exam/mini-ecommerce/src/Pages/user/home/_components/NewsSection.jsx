import React from "react";
import { Link } from "react-router-dom";

const MOCK_NEWS = [
  {
    id: 1,
    title: "Sự kiện Manga Fes 2026: Swoo! Manga giảm giá cực mạnh toàn bộ kho truyện!",
    snippet: "Lễ hội văn hóa Manga lớn nhất năm đã đến. Nhập mã SWOOFES để được giảm ngay 30% cho các tựa truyện Shonen hot nhất.",
    date: "12 Tháng 9, 2026",
    tag: "SỰ KIỆN",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Phát hành bản giới hạn: One Piece Tập Đặc Biệt kỉ niệm 25 năm",
    snippet: "Bản boxset độc quyền đi kèm chữ ký (in) của tác giả Eiichiro Oda và hàng loạt goods cực xịn xò. Đặt trước ngay hôm nay!",
    date: "10 Tháng 9, 2026",
    tag: "TIN PHÁT HÀNH",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Góc Wibu: Vì sao việc bọc màng co lại quan trọng đối với dân sưu tầm?",
    snippet: "Độ ẩm ở Việt Nam rất cao, nếu không bọc màng co hoặc túi zip, giấy truyện rất dễ bị ố vàng. Khám phá bí quyết bảo quản truyện luôn như mới.",
    date: "05 Tháng 9, 2026",
    tag: "KINH NGHIỆM",
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=600&auto=format&fit=crop&q=80"
  }
];

export default function NewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 mb-12">
      <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-comic-red border-2 border-black text-white px-3 py-1 text-2xl rotate-[-5deg] shadow-comic-sm">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black font-comic text-stone-900 uppercase tracking-tight">
              GÓC TIN TỨC SWOO!
            </h2>
            <p className="font-bubble text-sm font-bold text-stone-600">Những bản tin nóng hổi nhất từ Tòa Soạn Manga</p>
          </div>
        </div>
        <Link to="/" className="hidden sm:inline-block font-comic text-sm bg-white border-2 border-black px-4 py-2 shadow-comic hover:bg-comic-yellow transition-colors">
          XEM TẤT CẢ TIN TỨC <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_NEWS.map((news) => (
          <div key={news.id} className="bg-white comic-border shadow-comic hover:shadow-comic-lg hover:-translate-y-2 transition-all flex flex-col group">
            {/* Thumbnail */}
            <div className="relative h-48 border-b-[3px] border-black overflow-hidden">
              <img 
                loading="lazy" 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-comic-yellow text-black font-comic text-[10px] font-black px-2 py-0.5 border-2 border-black shadow-comic-sm">
                {news.tag}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-regular fa-clock text-stone-400 text-xs"></i>
                <span className="text-[10px] font-bold font-bubble text-stone-500">{news.date}</span>
              </div>
              <h3 className="font-comic font-black text-base text-stone-900 mb-2 line-clamp-2 group-hover:text-comic-red transition-colors">
                {news.title}
              </h3>
              <p className="font-bubble text-xs text-stone-600 font-bold line-clamp-3 mb-4">
                {news.snippet}
              </p>
              
              <div className="mt-auto">
                <Link to="/" className="text-xs font-comic font-black text-black border-b-2 border-black pb-0.5 hover:text-comic-red hover:border-comic-red transition-colors inline-flex items-center gap-1">
                  ĐỌC TIẾP <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile view all button */}
      <div className="mt-6 text-center sm:hidden">
        <Link to="/" className="inline-block font-comic text-sm bg-white border-2 border-black px-4 py-2 shadow-comic hover:bg-comic-yellow transition-colors">
          XEM TẤT CẢ TIN TỨC <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </section>
  );
}
