import { useRef, useState, useCallback } from 'react';
import { useGsapAnimations } from './hooks/useGsapAnimations';

import SplashScreen from './components/SplashScreen/SplashScreen';
import Confetti from './components/Confetti/Confetti';
import HeroSection from './components/Hero/HeroSection';
import WishesSection from './components/Wishes/WishesSection';
import GallerySection from './components/Gallery/GallerySection';
import MemoriesSection from './components/Memories/MemoriesSection';
import PromiseSection from './components/Promise/PromiseSection';
import ClosingSection from './components/Closing/ClosingSection';
import FinaleSection from './components/FinaleSection/FinaleSection'; // Add this
import SurpriseSection from './components/Surprise/SurpriseSection';
import BirthdayPopup from './components/BirthdayPopup/BirthdayPopup';

import './App.css';
import surpriseVideo from './assets/videos/surprise.mp4';

function App() {
  const appRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleClosingReachEnd = useCallback(() => {
    setShowBirthdayPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowBirthdayPopup(false);
  }, []);

  useGsapAnimations(appRef, !showSplash);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app" ref={appRef}>
      <Confetti count={30} />
      <main>
        <HeroSection />
        <WishesSection />
        <GallerySection />
        <MemoriesSection />
        <PromiseSection />
        <ClosingSection onReachEnd={handleClosingReachEnd} />
        <FinaleSection /> {/* Add this right here */}
      </main>
      <SurpriseSection videoSrc={surpriseVideo} />
      <BirthdayPopup isOpen={showBirthdayPopup} onClose={handleClosePopup} />
    </div>
  );
}

export default App;