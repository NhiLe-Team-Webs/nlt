import { useState } from "react";
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';
import { StorySection } from './sections/StorySection';
import { CommunityLeadersSection } from './sections/CommunityLeadersSection';
import { Button } from "./ui/button";

interface HomePageProps {
  onNavigate: (target: string, href?: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {

  return (
    <div>
      <HeroSection />

      <AboutSection />
      <CoreValuesSection />
      <MemberJourneySection />


      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};
