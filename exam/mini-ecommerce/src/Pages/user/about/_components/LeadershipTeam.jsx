import React from "react";

export default function LeadershipTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Hải Đăng",
      role: "Chief Executive Officer",
      roleShort: "FOUNDER",
      desc: "12 năm kinh nghiệm quản trị chuỗi bán lẻ văn hóa phẩm và bản quyền manga.",
      emoji: "👨‍💼",
      bgClass: "bg-yellow-100",
      tagClass: "bg-red-600",
      roleColor: "text-red-600",
      imgBg: "bg-slate-800"
    },
    {
      id: 2,
      name: "Trần Minh Quang",
      role: "Head of Publishing & Licences",
      roleShort: "HEAD",
      desc: "Phụ trách làm việc với các đối tác NXB Kodansha, Shueisha và Kim Đồng.",
      emoji: "🧑‍💻",
      bgClass: "bg-blue-100",
      tagClass: "bg-blue-600",
      roleColor: "text-blue-600",
      imgBg: "bg-slate-700"
    },
    {
      id: 3,
      name: "Lê Tuấn Hưng",
      role: "Art & Creative Director",
      roleShort: "DIRECTOR",
      desc: "Giám tuyển thiết kế quà tặng độc quyền, poster và ấn phẩm phụ trợ độc giả.",
      emoji: "🤵",
      bgClass: "bg-emerald-100",
      tagClass: "bg-green-600",
      roleColor: "text-green-700",
      imgBg: "bg-slate-800"
    },
    {
      id: 4,
      name: "Vũ Hoàng Nam",
      role: "Chief Logistics Officer",
      roleShort: "OPERATIONS",
      desc: "Chỉ huy mạng lưới 720+ hub giao vận đảm bảo manga không bao giờ gãy góc.",
      emoji: "👨‍💼",
      bgClass: "bg-orange-100",
      tagClass: "bg-orange-500",
      roleColor: "text-orange-600",
      imgBg: "bg-slate-700"
    },
    {
      id: 5,
      name: "Phạm Quốc Anh",
      role: "Chief Manga Reviewer",
      roleShort: "EDITOR",
      desc: "Biên tập viên kỳ cựu phụ trách review và định hướng các tuyển tập Shonen/Seinen.",
      emoji: "👨‍🎨",
      bgClass: "bg-purple-100",
      tagClass: "bg-purple-600",
      roleColor: "text-purple-600",
      imgBg: "bg-slate-800"
    }
  ];

  return (
    <section className="space-y-6 font-bubble" id="leadership">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-block bg-red-600 text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-comic-sm font-comic tracking-wider">
            LEADERSHIP & CREATIVE HEROES
          </div>
          <h2 className="font-comic text-3xl md:text-4xl text-black mt-1 font-black">
            ĐỘI NGŨ SÁNG LẬP & BIÊN TẬP VIÊN ★
          </h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="w-8 h-8 border-2 border-black bg-white hover:bg-yellow-300 font-black text-sm shadow-comic-sm transition">←</button>
          <button className="w-8 h-8 border-2 border-black bg-comic-yellow hover:bg-yellow-400 font-black text-sm shadow-comic-sm transition">→</button>
        </div>
      </div>

      {/* 5 Team Cards in Comic Hero Profile Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {teamMembers.map(member => (
          <article key={member.id} className="bg-white border-2 border-black p-3 shadow-comic hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
            <div className={`relative border-2 border-black ${member.bgClass} p-2 text-center mb-3`}>
              <div className={`w-full aspect-[4/5] ${member.imgBg} border-2 border-black flex items-center justify-center text-5xl text-white font-bold`}>
                {member.emoji}
              </div>
              <div className={`absolute top-3 right-3 ${member.tagClass} text-white font-black text-[9px] px-1.5 py-0.5 border-2 border-black font-comic tracking-wider`}>
                {member.roleShort}
              </div>
            </div>
            <div>
              <h3 className="font-black text-sm text-black uppercase font-comic tracking-wider">{member.name}</h3>
              <p className={`text-[11px] font-extrabold ${member.roleColor}`}>{member.role}</p>
              <p className="text-[10px] text-gray-600 font-bold mt-1">{member.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
