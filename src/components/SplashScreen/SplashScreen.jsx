import { useEffect, useState } from 'react';
import './SplashScreen.css';
import count3 from '/sounds/3.mp3';
import count2 from '/sounds/2.mp3';
import count1 from '/sounds/1.mp3';
import goSound from '/sounds/go.mp3';

function SplashScreen({ onComplete }) {
  const [countdownValue, setCountdownValue] = useState(3);

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
        setTimeout(onComplete, 1000); // wait 1 s after GO!
      }
    }, 3000); // each number lasts 3 s

    return () => clearInterval(countdownInterval);
  }, [onComplete]);

  return (
    <div className="splash-screen animate-in">
      <div className="splash-content">
        {countdownValue > 0 ? (
          <>
            <div className="countdown-number fade-scale">{countdownValue}</div>
            <p className="countdown-text">Get ready...</p>
          </>
        ) : (
          <>
            <div className="countdown-number go fade-scale">GO!</div>
            <p className="countdown-text">Here we go!</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
