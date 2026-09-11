import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./_schema/authSchema";
import { useAuth } from "./_hooks/useAuth";
import Input from "../../Components/user/Input/Input";
import Button from "../../Components/user/Button/Button";

export default function Register() {
  const { handleRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <div className="w-full max-w-5xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center relative overflow-hidden">
      {/* Huy hiệu Level */}
      <div className="absolute -top-3 -right-3 w-28 h-28 bg-comic-yellow border-4 border-black rounded-full flex flex-col items-center justify-center text-center shadow-[3px_3px_0px_#000] transform rotate-12 z-20 pointer-events-none">
        <span className="text-[9px] font-black text-black uppercase tracking-wider font-bubble">HQ SECURITY</span>
        <span className="text-base font-comic text-comic-red leading-none">LEVEL 1</span>
        <span className="text-[8px] font-black text-black uppercase font-bubble">RECRUIT</span>
      </div>

      {/* Minh họa Manga Hero */}
      <div className="flex items-center justify-center flex-col relative">
        <div className="absolute -top-3 left-4 bg-comic-yellow text-black border-2 border-black px-3.5 py-1 font-comic text-sm uppercase tracking-wider shadow-[3px_3px_0px_#000] transform -rotate-3 z-10">
          ⚡ MANGA HERO RECRUITMENT!
        </div>
        <div className="w-full max-w-md bg-yellow-50 border-4 border-black shadow-[4px_4px_0px_#000] p-4 relative pt-8">
          <svg className="w-full h-auto" fill="none" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#FFFFFF" height="240" rx="0" stroke="#000000" strokeDasharray="8 6" strokeWidth="4" width="180" x="140" y="70"></rect>
            <path d="M230 35 L260 50 C260 90 245 120 230 135 C215 120 200 90 200 50 L230 35 Z" fill="#EF4444" stroke="#000000" strokeWidth="3.5"></path>
            <rect fill="#FDE047" height="14" stroke="#000" strokeWidth="2" width="16" x="222" y="70"></rect>
            <path d="M225 70 V64 A5 5 0 0 1 235 64 V70" fill="none" stroke="#000000" strokeLinecap="round" strokeWidth="3"></path>
            <path d="M275 85 L280 87 L278 91 L283 93 L283 99 L278 101 L280 105 L275 107 L273 103 L268 103 L266 107 L261 105 L263 101 L258 99 L258 93 L263 91 L261 87 L266 85 L268 89 L273 89 Z" fill="#38BDF8" stroke="#000" strokeWidth="2"></path>
            <circle cx="270.5" cy="96" fill="#FFFFFF" r="3.5" stroke="#000" strokeWidth="1.5"></circle>
            <g transform="translate(290, 150)">
              <path d="M25 5 L45 15 C45 35 35 50 25 60 C15 50 5 35 5 15 L25 5 Z" fill="#A7F3D0" stroke="#000000" strokeWidth="3"></path>
              <path d="M17 28 L23 35 L33 22" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5"></path>
            </g>
            <circle cx="120" cy="140" fill="#FBBF24" r="20" stroke="#000" strokeWidth="3"></circle>
            <text fill="black" fontFamily="Impact, Bangers, sans-serif" fontSize="22" fontWeight="900" textAnchor="middle" x="120" y="147">⚡</text>
            <rect fill="#FFFFFF" height="28" stroke="#000" strokeWidth="2.5" width="40" x="318" y="126"></rect>
            <polygon fill="#FFFFFF" points="328,154 334,154 326,162" stroke="#000" strokeWidth="2.5"></polygon>
            <text fill="#EF4444" fontFamily="sans-serif" fontSize="11" fontWeight="900" x="323" y="144">JOIN!</text>
            <g transform="translate(100, 245)">
              <rect fill="#38BDF8" height="75" stroke="#000" strokeWidth="3.5" width="130"></rect>
              <rect fill="#000000" height="15" width="130" y="15"></rect>
              <rect fill="#FDE047" height="16" stroke="#000" strokeWidth="2" width="22" x="12" y="42"></rect>
              <rect fill="#FFFFFF" height="4" width="70" x="12" y="63"></rect>
            </g>
            <path d="M152 215 C152 205 160 200 170 200 C180 200 186 205 186 215 L188 235 L150 235 Z" fill="#F59E0B" stroke="#000" strokeWidth="3"></path>
            <circle cx="168" cy="185" fill="#FCD34D" r="10" stroke="#000" strokeWidth="2.5"></circle>
            <path d="M160 183 C160 175 176 175 178 181 C174 180 168 180 164 185 Z" fill="#000000"></path>
            <path d="M150 235 L165 235 L168 275 L156 275 Z" fill="#000000"></path>
            <rect fill="#EF4444" height="15" stroke="#000" strokeWidth="2" width="8" x="175" y="207"></rect>
            <rect fill="#64748B" height="20" stroke="#000" strokeWidth="2.5" width="18" x="235" y="285"></rect>
            <circle cx="340" cy="195" fill="#FCD34D" r="10" stroke="#000" strokeWidth="2.5"></circle>
            <path d="M332 193 C332 185 348 185 350 191 C346 190 340 190 336 195 Z" fill="#000000"></path>
            <path d="M328 211 C328 207 334 205 341 205 C348 205 354 207 354 211 L352 250 L328 250 Z" fill="#14B8A6" stroke="#000" strokeWidth="3"></path>
            <rect fill="#000000" height="50" width="9" x="330" y="250"></rect>
            <rect fill="#000000" height="50" width="9" x="342" y="250"></rect>
            <ellipse cx="334" cy="300" fill="#EF4444" rx="7" ry="3" stroke="#000" strokeWidth="2"></ellipse>
            <ellipse cx="346" cy="300" fill="#EF4444" rx="7" ry="3" stroke="#000" strokeWidth="2"></ellipse>
            <path d="M336 220 L330 230 L334 231" stroke="#000000" strokeLinecap="round" strokeWidth="3"></path>
            <rect fill="#FDE047" height="13" stroke="#000" strokeWidth="2" width="6" x="328" y="220"></rect>
            <line stroke="#000000" strokeWidth="3" x1="80" x2="400" y1="301" y2="301"></line>
          </svg>
          <div className="mt-3 bg-white border-2 border-black p-2.5 text-center text-xs font-black uppercase shadow-[3px_3px_0px_#000] font-bubble">
            🛡️ BẢO MẬT 2 LỚP - TẶNG NGAY 100 MANGA COIN KHI GIA NHẬP!
          </div>
        </div>
      </div>

      {/* Form Đăng ký */}
      <div className="w-full max-w-md mx-auto">
        <div className="mb-5">
          <div className="inline-block bg-comic-yellow text-black border-2 border-black text-xs font-comic px-3 py-0.5 uppercase tracking-wider mb-1.5 transform -rotate-1 shadow-[2px_2px_0px_#000]">
            ⚡ JOIN THE GUILD, HERO!
          </div>
          <h2 className="text-3xl lg:text-4xl font-comic text-black tracking-tight leading-none uppercase">ĐĂNG KÝ HIỆP SĨ</h2>
          <p className="text-sm font-bold tracking-wide text-gray-600 mt-1 uppercase font-bubble">GIA NHẬP BIỆT ĐỘI MANGA HERO & NHẬN ƯU ĐÃI ĐỘC QUYỀN!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <Input 
            label="HỌ VÀ TÊN HIỆP SĨ / BIỆT DANH"
            id="name"
            placeholder="ví dụ: Son Goku / Luffy Mũ Rơm"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input 
            label="EMAIL HOẶC TÊN ĐĂNG NHẬP"
            id="email"
            type="email"
            placeholder="hero@mangaheroes.vn"
            {...register("email")}
            error={errors.email?.message}
          />

          <div className="relative">
            <Input 
              label="MẬT KHẨU BẢO VỆ"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 ${errors.password ? "top-8" : "top-[38px]"} text-black hover:text-comic-red transition`}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} text-base`}></i>
            </button>
          </div>

          <div className="relative">
            <Input 
              label="XÁC NHẬN MẬT KHẨU"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-3 ${errors.confirmPassword ? "top-8" : "top-[38px]"} text-black hover:text-comic-red transition`}
            >
              <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} text-base`}></i>
            </button>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              ⚡ ĐĂNG KÝ NGAY (JOIN MANGA HERO)
            </Button>
          </div>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t-2 border-black"></div>
            <span className="flex-shrink mx-3 text-[11px] font-black uppercase text-black bg-[#FFFCEB] px-2 tracking-wide font-bubble">HOẶC TIẾP TỤC VỚI</span>
            <div className="flex-grow border-t-2 border-black"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button type="button" className="py-2.5 px-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-bubble font-bold text-xs uppercase tracking-wide shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 transition">
              <span className="font-black text-comic-red">G</span>
              <span>Google</span>
            </button>
            <button type="button" className="py-2.5 px-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-bubble font-bold text-xs uppercase tracking-wide shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 transition">
              <i className="fa-brands fa-facebook-f text-blue-600 text-sm"></i>
              <span>Facebook</span>
            </button>
          </div>

          <div className="pt-2 text-center">
            <div className="inline-block bg-comic-yellow border-2 border-black px-4 py-1.5 shadow-[2px_2px_0px_#000]">
              <p className="text-xs text-black uppercase font-black tracking-wider font-bubble">
                ĐÃ CÓ TÀI KHOẢN? 
                <Link to="/auth/login" className="text-comic-red font-black hover:underline ml-1 underline decoration-2">ĐĂNG NHẬP HIỆP SĨ NGAY ⚡</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
