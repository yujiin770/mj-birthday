import { useEffect, useRef } from 'react';
import './FinaleSection.css';

function FinaleSection() {
  const balloonContainerRef = useRef(null);

  useEffect(() => {
    // Create floating balloons dynamically
    const container = balloonContainerRef.current;
    if (!container) return;

    const colors = ['#FF6B9D', '#FFB347', '#6C5CE7', '#00CEC9', '#FFEAA7', '#FF8C42', '#DDA0DD'];
    const balloonCount = 24;

    for (let i = 0; i < balloonCount; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'finale-balloon';
      
      const size = Math.random() * 50 + 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const leftPos = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 8 + 6;
      const sway = Math.random() * 30 - 15;
      
      balloon.style.cssText = `
        left: ${leftPos}%;
        width: ${size}px;
        height: ${size * 1.2}px;
        background: ${color};
        animation: floatBalloon ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        transform: translateX(${sway}px);
      `;
      
      // Add balloon string
      const string = document.createElement('div');
      string.className = 'balloon-string';
      string.style.cssText = `
        position: absolute;
        bottom: -12px;
        left: 50%;
        width: 2px;
        height: 25px;
        background: rgba(100, 70, 40, 0.6);
        transform: translateX(-50%);
      `;
      balloon.appendChild(string);
      
      // Add shine effect
      const shine = document.createElement('div');
      shine.className = 'balloon-shine';
      shine.style.cssText = `
        position: absolute;
        top: 15%;
        left: 20%;
        width: 25%;
        height: 25%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%);
        border-radius: 50%;
      `;
      balloon.appendChild(shine);
      
      container.appendChild(balloon);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section className="finale-section">
      <div className="finale-balloon-background" ref={balloonContainerRef} />
      
      <div className="finale-content">
        <div className="confetti-burst" />
        
        <div className="finale-badge">
          <span className="finale-star">⭐</span>
          <span className="finale-star">✨</span>
          <span className="finale-star">🌟</span>
        </div>
        
        <h1 className="finale-birthday-text">
          <span className="line-1">HAPPY</span>
          <span className="line-2">BIRTHDAY</span>
          <span className="line-3">MJ!</span>
        </h1>
        
        <div className="finale-divider">
          <div className="divider-line" />
          <span className="divider-heart">💖</span>
          <div className="divider-line" />
        </div>
        
        <p className="finale-message">
          You made the world a brighter place on this day 9 years ago!<br />
          Keep shining, keep dreaming, and never stop smiling! 🎈🎂
        </p>
        
        <div className="finale-emoji-rain">
          <span>🎉</span>
          <span>🎈</span>
          <span>🎂</span>
          <span>🎁</span>
          <span>✨</span>
          <span>💕</span>
        </div>
      </div>
    </section>
  );
}

export default FinaleSection;