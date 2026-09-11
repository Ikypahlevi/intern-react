import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./_schema/authSchema";
import { useAuth } from "./_hooks/useAuth";
import Input from "../../Components/user/Input/Input";
import Button from "../../Components/user/Button/Button";

export default function Login() {
  const { handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <div className="w-full max-w-4xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-10 lg:p-12 relative overflow-hidden rounded-2xl">
      {/* Huy hiệu Level */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-comic-yellow border-4 border-black rounded-full hidden sm:flex items-center justify-center font-comic font-bold text-center text-xs rotate-12 shadow-[3px_3px_0px_#000]">
        <span>HQ SECURE<br />LEVEL 5 🛡️</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Minh họa POW! Identity Check */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center bg-[#FFF9E6] border-4 border-black rounded-xl p-6 relative">
          <div className="absolute -top-4 left-4 bg-comic-red text-white font-comic text-xs uppercase px-3 py-1 border-2 border-black tracking-wider font-extrabold shadow-[2px_2px_0px_#000]">
            ⚡ MANGA HERO IDENTITY CHECK!
          </div>
          <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center mt-2">
            <svg className="w-full h-full" fill="none" viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg">
              <path d="M120 70H280V250H120Z" fill="#FEF08A" stroke="#000000" strokeWidth="4"></path>
              <line stroke="#000000" strokeWidth="2.5" x1="130" x2="270" y1="85" y2="85"></line>
              <rect fill="#38BDF8" height="85" rx="8" stroke="#000000" strokeWidth="3.5" width="130" x="65" y="155"></rect>
              <rect fill="#0284C7" height="18" stroke="#000000" strokeWidth="2.5" width="130" x="65" y="175"></rect>
              <rect fill="#FFE500" height="10" rx="2" stroke="#000000" strokeWidth="2" width="40" x="80" y="210"></rect>
              <circle cx="165" cy="215" fill="#EF4444" r="8" stroke="#000000" strokeWidth="2"></circle>
              <circle cx="177" cy="215" fill="#F59E0B" r="8" stroke="#000000" strokeWidth="2"></circle>
              <path d="M195 95C195 95 220 85 235 102C235 145 205 168 195 174C185 168 155 145 155 102C170 85 195 95 195 95Z" fill="#FFFFFF" stroke="#000000" strokeWidth="4"></path>
              <path d="M182 128L192 138L208 120" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"></path>
              <rect fill="#FFE500" height="28" rx="5" stroke="#000000" strokeWidth="3" width="34" x="130" y="45"></rect>
              <path d="M138 45V37C138 31 143 27 147 27C151 27 156 31 156 37V45" stroke="#000000" strokeLinecap="round" strokeWidth="4"></path>
              <circle cx="147" cy="59" fill="#000000" r="3"></circle>
              <rect fill="#EF4444" height="30" rx="6" stroke="#000000" strokeWidth="3" width="50" x="240" y="75"></rect>
              <text fill="white" fontFamily="Impact, Bangers, sans-serif" fontSize="14" fontWeight="bold" x="250" y="96">POW!</text>
              <circle cx="120" cy="112" fill="#000000" r="10"></circle>
              <circle cx="120" cy="116" fill="#FDE047" r="7"></circle>
              <path d="M110 128C110 122 130 122 130 128L134 152H106L110 128Z" fill="#EF4444" stroke="#000000" strokeWidth="2.5"></path>
              <path d="M110 152L128 152L134 182L126 182L122 165L116 182H106L110 152Z" fill="#1E293B" stroke="#000000" strokeWidth="2.5"></path>
              <circle cx="275" cy="132" fill="#000000" r="10"></circle>
              <circle cx="275" cy="136" fill="#FDE047" r="7"></circle>
              <rect fill="#3B82F6" height="32" rx="4" stroke="#000000" strokeWidth="2.5" width="20" x="265" y="146"></rect>
              <path d="M267 178L267 225H273L273 178" stroke="#000000" strokeWidth="3.5"></path>
              <path d="M278 178L278 225H284L284 178" stroke="#000000" strokeWidth="3.5"></path>
              <rect fill="#111827" height="12" rx="2" stroke="#FFFFFF" strokeWidth="1" width="7" x="254" y="150"></rect>
              <line stroke="#000000" strokeLinecap="round" strokeWidth="4" x1="50" x2="350" y1="232" y2="232"></line>
            </svg>
          </div>
          <div className="mt-3 bg-white border-2 border-black rounded-lg p-2.5 w-full text-center shadow-[3px_3px_0px_#000]">
            <p className="font-comic text-xs font-bold text-black tracking-wide">
              🛡️ BẢO MẬT 2 LỚP - TÍCH ĐIỂM MANGA COIN CHO MỖI ĐƠN HÀNG!
            </p>
          </div>
        </div>

        {/* Form Đăng Nhập */}
        <div className="lg:col-span-6 w-full max-w-sm mx-auto">
          <div className="mb-6 text-left">
            <div className="inline-block bg-comic-yellow border-2 border-black px-3 py-0.5 rounded text-xs font-comic font-black tracking-wider uppercase mb-1 shadow-[2px_2px_0px_#000]">
              ⚡ WELCOME BACK, HERO!
            </div>
            <h1 className="text-4xl font-comic text-black tracking-wider leading-none mt-1 uppercase">ĐĂNG NHẬP HIỆP SĨ</h1>
            <p className="text-[13px] font-bold text-gray-700 mt-1 uppercase tracking-wider font-bubble">
              KẾT NỐI VÀO TRẠM CHỈ HUY MANGA HQ CỦA BẠN!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input 
              label="⚡ ĐỊA CHỈ EMAIL / TÊN ĐĂNG NHẬP"
              id="email"
              type="email"
              placeholder="hero@swoocomic.vn"
              {...register("email")}
              error={errors.email?.message}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[13px] font-bold text-black uppercase tracking-wider font-bubble" htmlFor="password">
                  🔒 MẬT KHẨU BẢO VỆ
                </label>
                <Link to="#" className="text-xs font-bold text-comic-red hover:text-black underline uppercase tracking-wider font-bubble">
                  Quên mật khẩu?
                </Link>
              </div>
              <input 
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full text-sm px-4 py-2.5 bg-yellow-50 rounded-none border-2 border-black font-bold focus:outline-none focus:bg-white focus:ring-0 shadow-[3px_3px_0px_#000] placeholder-gray-400 tracking-widest transition ${
                  errors.password ? "border-comic-red focus:border-comic-red" : "focus:border-black"
                }`}
                {...register("password")}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-black hover:text-comic-red transition"
                title="Hiện mật khẩu"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} text-base`}></i>
              </button>
              {errors.password && <span className="text-comic-red font-bubble font-bold text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <div className="flex items-center gap-2.5 pt-2 pb-1">
              <input className="w-4 h-4 border-2 border-black rounded accent-black cursor-pointer" id="remember" type="checkbox" defaultChecked />
              <label className="text-[13px] font-bold text-black cursor-pointer uppercase tracking-wide select-none font-bubble" htmlFor="remember">
                Ghi nhớ đăng nhập trên thiết bị này
              </label>
            </div>

            <div className="pt-2 pb-2">
              <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-3">
                ⚡ ĐĂNG NHẬP NGAY (LOGIN HERO)
              </Button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t-2 border-black"></div>
              <span className="flex-shrink mx-3 text-xs font-comic font-black text-black bg-comic-yellow border-2 border-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                HOẶC TIẾP TỤC VỚI
              </span>
              <div className="flex-grow border-t-2 border-black"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white font-bubble font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-100 text-black cursor-pointer transition hover:translate-x-0.5 hover:translate-y-0.5">
                <span className="font-black text-comic-red">G</span> <span>Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 text-white font-bubble font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-blue-700 cursor-pointer transition hover:translate-x-0.5 hover:translate-y-0.5">
                <i className="fa-brands fa-facebook-f text-sm"></i> <span>Facebook</span>
              </button>
            </div>

            <div className="pt-3 text-center">
              <div className="inline-block bg-yellow-100 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
                <p className="text-xs font-bold uppercase tracking-wide text-black font-bubble">
                  CHƯA CÓ TÀI KHOẢN? 
                  <Link to="/auth/register" className="text-comic-red underline font-comic text-sm ml-1 hover:text-black tracking-wide">
                    ĐĂNG KÝ HIỆP SĨ MỚI ⚡
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
