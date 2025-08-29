import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';

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
      <RegistrationFormSection />
      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};