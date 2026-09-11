import React from "react";

export default function PaymentSettings({ payments, handleTogglePayment }) {
  const activeCount = Object.values(payments || {}).filter(Boolean).length;
  const totalCount = Object.keys(payments || {}).length;

  return (
    <div className="xl:col-span-5 flex flex-col bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] font-bubble">
      {/* Header panel */}
      <div className="bg-red-500 text-white px-6 py-3 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-money-check-dollar text-xl"></i>
          <h2 className="font-comic text-xl font-bold uppercase tracking-tight text-white">
            CỔNG THANH TOÁN TỰ ĐỘNG
          </h2>
        </div>
        <span className="bg-white text-black border border-black px-3 py-1 font-comic uppercase text-[12px] font-bold shadow-[2px_2px_0px_#000]">
          {activeCount}/{totalCount} ĐANG SẴN SÀNG
        </span>
      </div>

      {/* Danh sách cổng tích hợp */}
      <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
        <div className="flex flex-col gap-3">
          {/* Item 1: VNPay QR */}
          <PaymentItem
            id="vnpay"
            title="VNPAY QR & SmartBanking"
            desc="Phí giao dịch: 1.1% + 500₫ | API v2.8"
            icon="fa-qrcode"
            iconColor="text-red-600"
            active={payments?.vnpay}
            onToggle={() => handleTogglePayment("vnpay")}
          />

          {/* Item 2: MoMo */}
          <PaymentItem
            id="momo"
            title="Ví MoMo Doanh Nghiệp"
            desc="Phí thanh toán: 1.2% | IPN Tức thì"
            icon="fa-m"
            iconColor="text-white"
            iconBg="bg-[#ba002a]"
            active={payments?.momo}
            onToggle={() => handleTogglePayment("momo")}
          />

          {/* Item 3: ZaloPay */}
          <PaymentItem
            id="zalo"
            title="ZaloPay & VietQR Pro"
            desc="Tự động đối soát đơn hàng 24/7"
            icon="fa-retweet"
            iconColor="text-black"
            iconBg="bg-green-200"
            active={payments?.zalo}
            onToggle={() => handleTogglePayment("zalo")}
          />

          {/* Item 4: COD */}
          <PaymentItem
            id="cod"
            title="COD (Nhận Hàng Trả Tiền)"
            desc="Khóa COD với tài khoản có tỷ lệ boom đơn > 15%"
            badge="< 5.000.000₫"
            badgeColor="bg-comic-yellow text-black"
            icon="fa-money-bill-wave"
            iconColor="text-blue-600"
            active={payments?.cod}
            onToggle={() => handleTogglePayment("cod")}
          />

          {/* Item 5: Stripe */}
          <PaymentItem
            id="stripe"
            title="VISA / Master / JCB (Stripe)"
            desc="Phí quốc tế: 2.9% + 0.30$ | Dành cho Otaku hải ngoại"
            icon="fa-credit-card"
            iconColor="text-gray-800"
            active={payments?.stripe}
            onToggle={() => handleTogglePayment("stripe")}
          />
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black border-[2px] border-black py-3 font-comic text-[16px] font-bold uppercase shadow-[2px_2px_0px_#000]">
          <i className="fa-solid fa-circle-plus text-[18px]"></i>
          <span>Kết Nối Cổng Thanh Toán Mới</span>
        </button>
      </div>
    </div>
  );
}

function PaymentItem({
  title,
  desc,
  icon,
  iconColor,
  iconBg = "bg-white",
  active,
  onToggle,
  badge = "ACTIVE",
  badgeColor = "bg-[#22c55e] text-white",
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-yellow-50 border-[2px] border-black shadow-[2px_2px_0px_#000]">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 border-[2px] border-black ${iconBg} flex items-center justify-center font-bold text-black shadow-[1px_1px_0px_#000]`}
        >
          <i className={`fa-solid ${icon} ${iconColor} text-xl`}></i>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-comic text-[14px] font-bold text-black uppercase">
              {title}
            </span>
            <span
              className={`${
                active
                  ? badgeColor
                  : "bg-gray-100est text-gray-600"
              } border border-black font-comic uppercase text-[9px] px-1 font-bold`}
            >
              {active ? badge : "TẠM TẮT"}
            </span>
          </div>
          <span className="font-bubble font-bold text-[12px] text-gray-600">
            {desc}
          </span>
        </div>
      </div>
      {/* Comic Toggle Button */}
      <button
        onClick={onToggle}
        className={`w-12 h-6 border-[2px] border-black rounded-full p-1 flex items-center cursor-pointer shadow-[2px_2px_0px_#000] transition-colors ${
          active ? "bg-comic-yellow" : "bg-gray-100"
        }`}
        type="button"
      >
        <span
          className={`w-4 h-4 bg-on-background rounded-full transform transition-transform ${
            active ? "translate-x-6" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
}
