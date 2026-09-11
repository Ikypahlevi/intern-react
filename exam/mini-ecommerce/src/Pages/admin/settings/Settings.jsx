import React, { useState, useEffect, useRef } from "react";
import SettingsHeader from "./_components/SettingsHeader";
import SettingsTabs from "./_components/SettingsTabs";
import GeneralSettings from "./_components/GeneralSettings";
import PaymentSettings from "./_components/PaymentSettings";
import ShippingSettings from "./_components/ShippingSettings";
import SecuritySettings from "./_components/SecuritySettings";
import SettingsActionBar from "./_components/SettingsActionBar";
import { useGetSettings, useUpdateSettings } from "../../../Services/queries/useSettings";

export default function Settings() {
  const { data: dbSettings, isLoading } = useGetSettings();
  const updateSettingsMutation = useUpdateSettings();

  const [activeTab, setActiveTab] = useState("general");
  const [draftSettings, setDraftSettings] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const generalRef = useRef(null);
  const paymentRef = useRef(null);
  const shippingRef = useRef(null);
  const securityRef = useRef(null);

  const blockRefs = {
    general: generalRef,
    payment: paymentRef,
    shipping: shippingRef,
    security: securityRef,
  };

  useEffect(() => {
    if (dbSettings && !draftSettings) {
      setDraftSettings(dbSettings);
    }
  }, [dbSettings, draftSettings]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (blockRefs[tabId]?.current) {
      blockRefs[tabId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const handleChangeGeneral = (e) => {
    const { name, value } = e.target;
    setDraftSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
    markDirty();
  };

  const handleTogglePayment = (gatewayId) => {
    setDraftSettings((prev) => ({
      ...prev,
      payments: {
        ...prev.payments,
        [gatewayId]: !prev.payments[gatewayId],
      },
    }));
    markDirty();
  };

  const handleChangeShipping = (e) => {
    const { name, value } = e.target;
    setDraftSettings((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: Number(value),
      },
    }));
    markDirty();
  };

  const handleToggleShipping = (fieldId, value) => {
    setDraftSettings((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [fieldId]: value,
      },
    }));
    markDirty();
  };

  const handleToggleSecurity = (fieldId) => {
    setDraftSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [fieldId]: !prev.security[fieldId],
      },
    }));
    markDirty();
  };

  const handleSave = async () => {
    try {
      await updateSettingsMutation.mutateAsync(draftSettings);
      setIsDirty(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setDraftSettings(dbSettings);
    setIsDirty(false);
  };

  if (isLoading || !draftSettings) {
    return (
      <div className="font-comic text-2xl animate-pulse p-10">
        ĐANG TẢI CẤU HÌNH...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-12 gap-8 max-w-[1400px] mx-auto font-bubble">
      <SettingsHeader />

      {/* TABS */}
      <SettingsTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
        <div className="xl:col-span-7" ref={generalRef}>
          <GeneralSettings
            settings={draftSettings}
            handleChange={handleChangeGeneral}
          />
        </div>
        <div className="xl:col-span-5" ref={paymentRef}>
          <PaymentSettings
            payments={draftSettings.payments}
            handleTogglePayment={handleTogglePayment}
          />
        </div>
        <div className="xl:col-span-7" ref={shippingRef}>
          <ShippingSettings
            shipping={draftSettings.shipping}
            handleChangeShipping={handleChangeShipping}
            handleToggleShipping={handleToggleShipping}
          />
        </div>
        <div className="xl:col-span-5" ref={securityRef}>
          <SecuritySettings
            security={draftSettings.security}
            handleToggleSecurity={handleToggleSecurity}
          />
        </div>
      </div>

      <SettingsActionBar
        isDirty={isDirty}
        isSaving={updateSettingsMutation.isLoading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
