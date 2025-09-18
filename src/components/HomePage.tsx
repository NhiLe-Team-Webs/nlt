import { useState } from "react";
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';
import { StorySection } from './sections/StorySection';
import { CommunityLeadersSection } from './sections/CommunityLeadersSection';
import { Button } from "./ui/button";

interface HomePageProps {
  onNavigate: (target: string, href?: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HeroSection />

      <AboutSection />
      <CoreValuesSection />
      <MemberJourneySection />
      <StorySection />
      <CommunityLeadersSection />

      {/* Các nút gọi form */}
      <div className="text-center py-12 space-y-6">
        <Button className="bg-green-600 text-white" onClick={() => setOpen(true)}>
          Tham gia ngay
        </Button>
        <Button className="bg-blue-600 text-white" onClick={() => setOpen(true)}>
          Trở thành thành viên
        </Button>
        <Button className="bg-purple-600 text-white" onClick={() => setOpen(true)}>
          Tham gia vào NhiLe Team ngay
        </Button>
      </div>

      {/* Form chung, quản lý bằng open/setOpen */}
      <RegistrationFormSection open={open} setOpen={setOpen} />

      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};
