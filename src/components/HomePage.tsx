import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';

export const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CoreValuesSection />
      <MemberJourneySection />
      {/* Form đăng ký sẽ hiển thị dưới dạng Dialog/Modal */}
      <RegistrationFormSection open={isFormOpen} setOpen={setIsFormOpen} />
      <ExploreCommunitiesSection onNavigate={() => setIsFormOpen(true)} />
    </div>
  );
};