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


      {/* Form chung, quản lý bằng open/setOpen */}
      <RegistrationFormSection open={open} setOpen={setOpen} />

      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};
