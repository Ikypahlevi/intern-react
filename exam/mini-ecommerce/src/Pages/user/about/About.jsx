import React from "react";
import { Link } from "react-router-dom";
import HeroAbout from "./_components/HeroAbout";
import MetricsBar from "./_components/MetricsBar";
import ValueMission from "./_components/ValueMission";
import CoreValues from "./_components/CoreValues";
import HistoryTimeline from "./_components/HistoryTimeline";
import LeadershipTeam from "./_components/LeadershipTeam";
import PartnerNewsletter from "./_components/PartnerNewsletter";

export default function About() {
  return (
    <>
      {/* Breadcrumb matching IMAGE_4 top hierarchy */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-xs font-bold font-bubble">
        <Link className="hover:text-comic-red transition text-gray-500" to="/">Trang chủ</Link> 
        <span className="text-gray-500 mx-1">/</span> 
        <span className="text-black uppercase">Hành Trình & Về Chúng Tôi</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-16 space-y-12">
        <HeroAbout />
        <MetricsBar />
        <ValueMission />
        <CoreValues />
        <HistoryTimeline />
        <LeadershipTeam />
        <PartnerNewsletter />
      </main>
    </>
  );
}
