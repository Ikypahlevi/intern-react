import React from "react";

export default function ValueMission() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-bubble">
      {/* Left: Friendly Courier / Comic Mascot Illustration Panel */}
      <div className="lg:col-span-6 bg-green-600 border-4 border-black p-6 shadow-comic flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-black text-white pointer-events-none font-comic">
          SWOO
        </div>
        <div className="relative z-10 space-y-3">
          <span className="bg-black text-comic-yellow text-xs font-black px-3 py-1 border-2 border-black shadow-comic-sm uppercase font-comic tracking-wider">
            CHUYÊN NGHIỆP TỪNG KIỆN HÀNG
          </span>
          <h2 className="font-comic text-3xl sm:text-4xl text-white tracking-wide font-black">
            ĐỘI NGŨ GIAO HÀNG TẬN TÂM - GIỮ GÌN TỪNG BÌA TRUYỆN!
          </h2>
          <p className="text-white text-sm font-semibold leading-relaxed">
            Mỗi bưu tá của Swoo Manga đều được huấn luyện bài bản quy chuẩn nâng niu manga: không uốn cong gáy, không để cấn góc, chống thấm nước tuyệt đối với màng co nhiệt chuyên dụng.
          </p>
        </div>
        
        {/* Visual Representation of Courier Box */}
        <div className="mt-6 bg-white border-2 border-black p-4 shadow-comic flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 bg-yellow-300 border-2 border-black flex items-center justify-center text-3xl flex-shrink-0">
            🦸‍♂️
          </div>
          <div>
            <div className="font-black text-sm uppercase font-comic tracking-wider text-black">SWOO! EXPRESS COURIER TEAM</div>
            <div className="text-xs text-gray-700 font-bold">Cam kết hoàn tiền 100% nếu truyện bị cấn móp góc trong quá trình di chuyển.</div>
          </div>
        </div>
      </div>

      {/* Right: Value Proposition Statement & Mission Text */}
      <div className="lg:col-span-6 bg-white border-4 border-black p-6 md:p-8 shadow-comic flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="font-comic text-xl text-red-600 font-black tracking-wider">SỨ MỆNH & TÔN CHỈ HOẠT ĐỘNG</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-900 leading-snug font-comic tracking-wide">
            ĐƯA THẾ GIỚI MANGA CHÍNH HÃNG VỀ GẦN HƠN VỚI ĐỘC GIẢ VIỆT NAM
          </h3>
          <p className="text-sm font-bold text-gray-700 leading-relaxed">
            Khởi nguồn từ một nhóm bạn trẻ đam mê truyện tranh Nhật Bản từ thập niên 2000, SWOO! MANGA HEROES được thành lập với mong ước xóa bỏ tình trạng truyện lậu kém chất lượng, mang lại cho bạn đọc những ấn bản đỉnh cao với đầy đủ quà tặng: bookmark kim loại, postcard limited và poster khổ lớn.
          </p>
          <p className="text-sm font-bold text-gray-700 leading-relaxed">
            Chúng tôi cộng tác trực tiếp với các NXB lớn hàng đầu như Shueisha, Kodansha, Kadokawa cùng các NXB danh tiếng trong nước như NXB Kim Đồng, NXB Trẻ để đảm bảo mọi tác phẩm đều hợp pháp và trọn vẹn bản quyền.
          </p>
        </div>
        <div className="pt-6">
          <a className="inline-block bg-green-600 hover:bg-green-700 text-white font-black text-sm px-6 py-3 border-2 border-black shadow-comic uppercase tracking-wider font-comic transition" href="#">
            KHÁM PHÁ THÊM VỀ CHÚNG TÔI ⚡
          </a>
        </div>
      </div>
    </section>
  );
}
