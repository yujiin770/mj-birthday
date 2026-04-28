import { useEffect, useState } from 'react';
import './SplashScreen.css';
import count3 from '/sounds/3.mp3';
import count2 from '/sounds/2.mp3';
import count1 from '/sounds/1.mp3';
import goSound from '/sounds/go.mp3';

function SplashScreen({ onComplete }) {
  const [countdownValue, setCountdownValue] = useState(3);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    let current = 3;
    const sounds = {
      3: new Audio(count3),
      2: new Audio(count2),
      1: new Audio(count1),
      0: new Audio(goSound),
    };

    const playSound = (value) => {
      const sound = sounds[value];
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    };

    playSound(current);

    const countdownInterval = setInterval(() => {
      current -= 1;
      setCountdownValue(current);
      playSound(current);

      if (current <= 0) {
        clearInterval(countdownInterval);
        
        // Wait 1.5 seconds for "GO!" to show, then open curtains
        setTimeout(() => {
          setIsOpening(true);
          
          // Wait 1 second for the curtain animation to finish before proceeding
          setTimeout(onComplete, 1000); 
        }, 1500); 
      }
    }, 3000); // each number lasts 3s

    return () => clearInterval(countdownInterval);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${isOpening ? 'curtain-opening' : ''}`}>
      {/* Split background curtains */}
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      
      <div className={`splash-content ${isOpening ? 'fade-out' : ''}`}>
        <div 
          key={countdownValue} 
          className={`countdown-number drape-animation ${countdownValue === 0 ? 'go' : ''}`}
        >
          {countdownValue > 0 ? countdownValue : 'GO!'}
        </div>
        <p 
          key={`text-${countdownValue}`} 
          className="countdown-text drape-text-animation"
        >
          {countdownValue > 0 ? 'Get ready...' : 'Here we go!'}
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;