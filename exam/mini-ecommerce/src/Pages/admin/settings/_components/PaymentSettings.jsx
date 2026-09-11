import React from "react";

export default function PaymentSettings({ payments, handleTogglePayment }) {
  const activeCount = Object.values(payments || {}).filter(Boolean).length;
  const totalCount = Object.keys(payments || {}).length;

  return (
    <div className="xl:col-span-5 flex flex-col bg-surface-container-lowest border-[3px] border-on-background shadow-[4px_4px_0px_#1c1b1b] font-bubble">
      {/* Header panel */}
      <div className="bg-secondary-container text-on-secondary px-space-md py-space-xs border-b-[3px] border-on-background flex items-center justify-between">
        <div className="flex items-center gap-space-2xs">
          <i className="fa-solid fa-money-check-dollar text-xl"></i>
          <h2 className="font-headline-md text-xl font-bold uppercase tracking-tight text-on-secondary">
            CỔNG THANH TOÁN TỰ ĐỘNG
          </h2>
        </div>
        <span className="bg-surface-container-lowest text-on-background border border-on-background px-space-xs py-space-3xs font-label-caps text-[12px] font-bold shadow-[2px_2px_0px_#1c1b1b]">
          {activeCount}/{totalCount} ĐANG SẴN SÀNG
        </span>
      </div>

      {/* Danh sách cổng tích hợp */}
      <div className="p-space-md flex flex-col gap-space-sm flex-1 justify-between">
        <div className="flex flex-col gap-space-xs">
          {/* Item 1: VNPay QR */}
          <PaymentItem
            id="vnpay"
            title="VNPAY QR & SmartBanking"
            desc="Phí giao dịch: 1.1% + 500₫ | API v2.8"
            icon="fa-qrcode"
            iconColor="text-secondary"
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
            iconColor="text-on-tertiary-container"
            iconBg="bg-tertiary-container"
            active={payments?.zalo}
            onToggle={() => handleTogglePayment("zalo")}
          />

          {/* Item 4: COD */}
          <PaymentItem
            id="cod"
            title="COD (Nhận Hàng Trả Tiền)"
            desc="Khóa COD với tài khoản có tỷ lệ boom đơn > 15%"
            badge="< 5.000.000₫"
            badgeColor="bg-primary-container text-on-background"
            icon="fa-money-bill-wave"
            iconColor="text-primary"
            active={payments?.cod}
            onToggle={() => handleTogglePayment("cod")}
          />

          {/* Item 5: Stripe */}
          <PaymentItem
            id="stripe"
            title="VISA / Master / JCB (Stripe)"
            desc="Phí quốc tế: 2.9% + 0.30$ | Dành cho Otaku hải ngoại"
            icon="fa-credit-card"
            iconColor="text-on-surface"
            active={payments?.stripe}
            onToggle={() => handleTogglePayment("stripe")}
          />
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-space-2xs bg-surface-container-lowest hover:bg-surface-container-high text-on-background border-[2px] border-on-background py-space-xs font-headline-sm text-[16px] font-bold uppercase shadow-[2px_2px_0px_#1c1b1b]">
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
  iconBg = "bg-surface-container-lowest",
  active,
  onToggle,
  badge = "ACTIVE",
  badgeColor = "bg-[#22c55e] text-white",
}) {
  return (
    <div className="flex items-center justify-between p-space-sm bg-surface-container-low border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b]">
      <div className="flex items-center gap-space-sm">
        <div
          className={`w-10 h-10 border-[2px] border-on-background ${iconBg} flex items-center justify-center font-bold text-on-background shadow-[1px_1px_0px_#1c1b1b]`}
        >
          <i className={`fa-solid ${icon} ${iconColor} text-xl`}></i>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-space-2xs">
            <span className="font-headline-sm text-[14px] font-bold text-on-background uppercase">
              {title}
            </span>
            <span
              className={`${
                active
                  ? badgeColor
                  : "bg-surface-container-highest text-on-surface-variant"
              } border border-on-background font-label-caps text-[9px] px-space-3xs font-bold`}
            >
              {active ? badge : "TẠM TẮT"}
            </span>
          </div>
          <span className="font-body-sm text-[12px] text-on-surface-variant">
            {desc}
          </span>
        </div>
      </div>
      {/* Comic Toggle Button */}
      <button
        onClick={onToggle}
        className={`w-12 h-6 border-[2px] border-on-background rounded-full p-space-3xs flex items-center cursor-pointer shadow-[2px_2px_0px_#1c1b1b] transition-colors ${
          active ? "bg-primary-container" : "bg-surface-container-high"
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
