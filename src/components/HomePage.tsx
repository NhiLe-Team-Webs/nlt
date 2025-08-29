import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';
import { StorySection } from './sections/StorySection';
import { CommunityLeadersSection } from './sections/CommunityLeadersSection';
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
      <StorySection />
      <CommunityLeadersSection />
      <RegistrationFormSection />
      <ExploreCommunitiesSection onNavigate={onNavigate} />
    </div>
  );
};