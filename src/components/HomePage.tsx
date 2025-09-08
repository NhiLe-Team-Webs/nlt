import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';
import { StorySection } from './sections/StorySection';
interface HomePageProps {
  onNavigate: (target: string, href?: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CoreValuesSection />
      <MemberJourneySection />
      <StorySection />
      <RegistrationFormSection open={isFormOpen} setOpen={setIsFormOpen} />
      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};