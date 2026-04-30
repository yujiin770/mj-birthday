import { useState, useEffect } from 'react';
import './MemoriesSection.css';

function MemoriesSection() {
  const [phase, setPhase] = useState('idle'); // 'idle', 'counting', 'blown'
  const [count, setCount] = useState(3);

  const handleMakeWish = () => {
    if (phase !== 'idle') return;
    setPhase('counting');
    setCount(3);
  };

  useEffect(() => {
    if (phase === 'counting') {
      if (count > 0) {
        const timer = setTimeout(() => setCount(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('blown');
      }
    }
  }, [phase, count]);

  return (
    <section className="memories-section" id="wish">
      <div className="container">
        <div className="section-header center cake-header">
          <span className="section-tag">🎂 Time to Celebrate 🎂</span>
          <h2>Make a Birthday Wish!</h2>
          <p className="section-subtitle">
            Close your eyes, think of your biggest dream, and get ready...
          </p>
        </div>
        
        <div className="cake-interactive-area">
          
          <div className="cake-wrapper">
            {/* ✨ GORGEOUS MASSIVE 3-TIER VECTOR CAKE ✨ */}
            <svg viewBox="0 0 500 500" className="real-cake-svg" xmlns="http://www.w3.org/2000/svg">
              
              {/* Shadow & Plate */}
              <g className="svg-plate">
                <ellipse cx="250" cy="450" rx="200" ry="25" fill="rgba(0,0,0,0.15)" />
                <ellipse cx="250" cy="420" rx="220" ry="45" fill="#f5f6fa" stroke="#dcdde1" strokeWidth="4"/>
                <path d="M 40 420 A 220 45 0 0 0 460 420 L 440 440 A 200 45 0 0 1 60 440 Z" fill="#dcdde1" />
              </g>

              {/* Bottom Tier (Orange) */}
              <g className="svg-bottom-tier">
                <path d="M 100 300 A 150 40 0 0 0 400 300 L 400 400 A 150 40 0 0 1 100 400 Z" fill="#FFB347" />
                <ellipse cx="250" cy="300" rx="150" ry="40" fill="#FFA020" />
                <path d="M 100 300 C 100 260, 400 260, 400 300 C 400 320, 380 350, 360 310 C 340 340, 310 305, 290 340 C 260 370, 230 320, 210 360 C 180 330, 150 355, 130 315 C 110 330, 100 310, 100 300 Z" fill="#FFF5E6" />
                {/* Sprinkles */}
                <rect x="140" y="350" width="15" height="7" rx="3.5" fill="#FF6B9D" transform="rotate(15, 140, 350)" />
                <rect x="220" y="380" width="15" height="7" rx="3.5" fill="#6C5CE7" transform="rotate(-25, 220, 380)" />
                <rect x="330" y="340" width="15" height="7" rx="3.5" fill="#00CEC9" transform="rotate(45, 330, 340)" />
                <rect x="350" y="375" width="15" height="7" rx="3.5" fill="#FF6B9D" transform="rotate(-15, 350, 375)" />
              </g>

              {/* Middle Tier (Purple) */}
              <g className="svg-middle-tier">
                <path d="M 135 200 A 115 30 0 0 0 365 200 L 365 300 A 115 30 0 0 1 135 300 Z" fill="#6C5CE7" />
                <ellipse cx="250" cy="200" rx="115" ry="30" fill="#5A4BCF" />
                <path d="M 135 200 C 135 175, 365 175, 365 200 C 365 215, 345 240, 325 210 C 305 240, 275 205, 255 230 C 225 250, 195 210, 175 235 C 155 245, 135 215, 135 200 Z" fill="#FFF5E6" />
                {/* Sprinkles */}
                <rect x="180" y="260" width="15" height="7" rx="3.5" fill="#FFB347" transform="rotate(-30, 180, 260)" />
                <rect x="290" y="240" width="15" height="7" rx="3.5" fill="#FF6B9D" transform="rotate(20, 290, 240)" />
                <rect x="320" y="270" width="15" height="7" rx="3.5" fill="#00CEC9" transform="rotate(-10, 320, 270)" />
              </g>

              {/* Top Tier (Pink) */}
              <g className="svg-top-tier">
                <path d="M 170 110 A 80 20 0 0 0 330 110 L 330 200 A 80 20 0 0 1 170 200 Z" fill="#FF6B9D" />
                <ellipse cx="250" cy="110" rx="80" ry="20" fill="#FF4785" />
                <path d="M 170 110 C 170 95, 330 95, 330 110 C 330 125, 315 140, 295 120 C 275 150, 250 115, 230 135 C 210 125, 190 145, 170 110 Z" fill="#FFF5E6" />
                {/* Sprinkles */}
                <rect x="200" y="160" width="15" height="7" rx="3.5" fill="#FFEAA7" transform="rotate(40, 200, 160)" />
                <rect x="270" y="145" width="15" height="7" rx="3.5" fill="#6C5CE7" transform="rotate(-35, 270, 145)" />
              </g>

              {/* Candle */}
              <g className="svg-candle">
                <rect x="242" y="35" width="16" height="75" rx="3" fill="#FFEAA7" />
                <path d="M 242 50 L 258 60 L 258 70 L 242 60 Z" fill="#FFB347" />
                <path d="M 242 80 L 258 90 L 258 100 L 242 90 Z" fill="#FFB347" />
                {/* Wick */}
                <path d="M 250 35 L 250 20" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>
            
            {/* 🔥 Responsive HTML Flame & Smoke 🔥 */}
            <div className={`candle-flame ${phase === 'blown' ? 'blown-out' : ''}`} />
            
            {phase === 'blown' && (
              <div className="smoke-container">
                <div className="smoke s1"></div>
                <div className="smoke s2"></div>
                <div className="smoke s3"></div>
              </div>
            )}

            {/* Giant Countdown Overlay */}
            {phase === 'counting' && (
              <div className="countdown-overlay">
                <span key={count} className="countdown-pop">{count}</span>
              </div>
            )}
          </div>

          {/* MASSIVE INTERACTIVE CONTROLS */}
          <div className="cake-controls">
            {phase === 'idle' && (
              <button className="btn-primary wish-btn" onClick={handleMakeWish}>
                ✨ Blow the Candle ✨
              </button>
            )}
            {phase === 'counting' && (
              <h3 className="counting-text">Blowing in {count}...</h3>
            )}
            {phase === 'blown' && (
              <div className="success-message">
                <h3>Yay! 🎈</h3>
                <p>Your wish is flying to the stars!</p>
                {/* 👇 THIS IS THE BUTTON - CHANGED TO "Watch this!!" 👇 */}
                <button 
                  className="btn-secondary mt-3" 
                  onClick={() => {
                    setPhase('idle');
                    // Trigger the video modal
                    const videoEvent = new CustomEvent('openSurpriseVideo');
                    window.dispatchEvent(videoEvent);
                  }}
                >
                  🎬 Watch this!! 🎬
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default MemoriesSection;