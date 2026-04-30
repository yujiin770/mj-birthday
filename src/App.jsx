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
import SurpriseSection from './components/Surprise/SurpriseSection';

import './App.css';
import surpriseVideo from './assets/videos/surprise.mp4';

function App() {
  const appRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
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
        <ClosingSection />
      </main>
      <SurpriseSection videoSrc={surpriseVideo} />
    </div>
  );
}

export default App;