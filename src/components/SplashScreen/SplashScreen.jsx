import { useEffect, useState } from 'react';
import './SplashScreen.css';

function SplashScreen({ onComplete }) {
  const [countdownValue, setCountdownValue] = useState(3);

  useEffect(() => {
    let current = 3;
    const countdownInterval = setInterval(() => {
      current -= 1;
      setCountdownValue(current);
      
      if (current <= 0) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        {countdownValue > 0 ? (
          <>
            <div className="countdown-number">{countdownValue}</div>
            <p className="countdown-text">Get ready...</p>
          </>
        ) : (
          <>
            <div className="countdown-number go">GO!</div>
            <p className="countdown-text">Here we go!</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
