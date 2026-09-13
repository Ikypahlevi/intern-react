import React from "react";
import { Link } from "react-router-dom";
import HeroAbout from "./_components/HeroAbout";
import MetricsBar from "./_components/MetricsBar";
import ValueMission from "./_components/ValueMission";
import CoreValues from "./_components/CoreValues";
import HistoryTimeline from "./_components/HistoryTimeline";
import LeadershipTeam from "./_components/LeadershipTeam";
import PartnerNewsletter from "./_components/PartnerNewsletter";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";

export default function About() {
  return (
    <>
            <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'VỀ CHÚNG TÔI', icon: '🚀' }
        ]} 
      />

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

