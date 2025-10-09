import { useState } from 'react';
import { CommunityLeader } from '../../hooks/useCommunityLeaders';

interface LeaderCardProps {
  leader: CommunityLeader;
  index: number;
  isVisible: boolean;
}

export const LeaderCard = ({ leader, index, isVisible }: LeaderCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Fallback avatar - you can replace this with a default avatar image
  const fallbackAvatar = '/placeholder.svg'; // Using the placeholder.svg from public folder
  
  // Fix the image path - if it starts with /assets/, convert it to relative path
  const getImageSrc = () => {
    if (!leader.avatar_url || imageError) {
      return fallbackAvatar;
    }
    
    // If the URL starts with /assets/, it means it's from database and points to src/asset
    // We need to convert it to use the src/asset path
    if (leader.avatar_url.startsWith('/assets/')) {
      // Remove /assets/ and try to import from src/asset
      const fileName = leader.avatar_url.replace('/assets/', '');
      try {
        // For Vite, we need to use dynamic import or move files to public folder
        // For now, let's try the src/asset path
        return new URL(`../../asset/${fileName}`, import.meta.url).href;
      } catch (error) {
        console.error('Error loading image:', error);
        return fallbackAvatar;
      }
    }
    
    return leader.avatar_url;
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={`group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img 
        className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl object-cover" 
        src={getImageSrc()}
        alt={`Chân dung ${leader.name}`}
        onError={handleImageError}
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
        <p className="text-slate-500 font-medium">{leader.title}</p>
        <p className="text-slate-600 text-sm mt-2 h-24 line-clamp-4">{leader.description}</p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* You can add social media links here if they exist in the database */}
          <div className="text-[#0A66C2] hover:text-blue-800 transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};