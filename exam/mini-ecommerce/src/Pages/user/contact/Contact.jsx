import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "./_components/ContactForm";
import ContactInfo from "./_components/ContactInfo";
import ContactMap from "./_components/ContactMap";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";

export default function Contact() {
  return (
    <>
            <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'HỖ TRỢ & HỎI ĐÁP', link: '/contact' },
          { label: 'LIÊN HỆ TỔNG BỘ', icon: '⚡' }
        ]} 
      />

      <main className="max-w-7xl mx-auto px-4 pb-16 space-y-6 flex-grow w-full">
        {/* Section 1: Contact Form & Info */}
        <section className="bg-white border-[3.5px] border-black shadow-comic-lg rounded-2xl p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between border-b-4 border-black pb-4 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-500 text-white border-[2.5px] border-black shadow-comic-sm text-[11px] font-black px-2 py-0.5 rounded font-comic uppercase tracking-wider">
                  TRANSMIT SIGNAL ⚡
                </span>
                <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase font-comic">
                  TRẠM CHỈ HUY & HỖ TRỢ ĐỘC GIẢ MANGA
                </h1>
              </div>
              <p className="text-xs text-gray-700 font-bold mt-1.5 font-bubble">
                Gửi tín hiệu thắc mắc về lịch phát hành, đặt trước ấn bản giới hạn hoặc hợp tác xuất bản!
              </p>
            </div>
            <div className="bg-comic-yellow border-[2.5px] border-black shadow-comic-sm rounded-lg p-2 text-center font-bubble">
              <span className="block text-[10px] font-black uppercase tracking-wider">TỔNG ĐÀI ĐỘC GIẢ</span>
              <span className="block text-xs font-black text-red-600 font-comic uppercase tracking-wider mt-0.5">⚡ TRỰC CHIẾN 24/7</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <ContactForm />
            <ContactInfo />
          </div>
        </section>

        {/* Section 2: Map */}
        <ContactMap />
      </main>
    </>
  );
}

