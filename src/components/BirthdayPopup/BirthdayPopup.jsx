import { useEffect, useState, useRef } from 'react';
import './BirthdayPopup.css';

// Import your Happy Birthday MP3
// Make sure to place your MP3 file in src/assets/audio/happy-birthday.mp3
import happyBirthdayMusic from '../../assets/audio/happy-birthday.mp3';

function BirthdayPopup({ isOpen, onClose }) {
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const balloonContainerRef = useRef(null);
  const audioRef = useRef(null);
  const fullText = "HAPPY BIRTHDAY MJ!";

  // Handle music playback
  useEffect(() => {
    if (!isOpen) return;

    // Create audio element
    const audio = new Audio(happyBirthdayMusic);
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    // Try to play (may be blocked by browser autoplay policies)
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log('Autoplay prevented. User interaction needed.');
        // Show unmute hint
        setIsMuted(true);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isOpen]);

  // Typing effect - smoother with random speed variation
  useEffect(() => {
    if (!isOpen) {
      setDisplayText('');
      setTypingComplete(false);
      return;
    }

    let index = 0;
    setDisplayText('');
    setTypingComplete(false);

    const typeNextChar = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        // Random delay between 80-180ms for natural typing feel
        const delay = Math.random() * 100 + 80;
        setTimeout(typeNextChar, delay);
      } else {
        setTypingComplete(true);
      }
    };

    typeNextChar();

    return () => {
      // cleanup
    };
  }, [isOpen, fullText]);

  // Create balloons AND image cards
  useEffect(() => {
    if (!isOpen || !balloonContainerRef.current) return;

    const container = balloonContainerRef.current;
    const colors = ['#FF6B9D', '#FFB347', '#6C5CE7', '#00CEC9', '#FFEAA7', '#FF8C42', '#FF4785', '#FF9A9E'];
    const balloonCount = 35;
    const imageCardCount = 12;

    // Clear existing
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create balloons
    for (let i = 0; i < balloonCount; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon-popup';
      
      const size = Math.random() * 60 + 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const leftPos = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 8 + 7;
      const sway = Math.random() * 50 - 25;
      
      balloon.style.cssText = `
        left: ${leftPos}%;
        width: ${size}px;
        height: ${size * 1.2}px;
        background: radial-gradient(circle at 30% 30%, ${color}, ${color}cc);
        animation: floatBalloonUp ${duration}s ease-in forwards;
        animation-delay: ${delay}s;
        transform: translateX(${sway}px);
      `;
      
      // Add balloon string
      const string = document.createElement('div');
      string.style.cssText = `
        position: absolute;
        bottom: -12px;
        left: 50%;
        width: 2px;
        height: 25px;
        background: rgba(100, 70, 40, 0.5);
        transform: translateX(-50%);
      `;
      balloon.appendChild(string);
      
      // Add shine
      const shine = document.createElement('div');
      shine.style.cssText = `
        position: absolute;
        top: 15%;
        left: 20%;
        width: 25%;
        height: 25%;
        background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 80%);
        border-radius: 50%;
      `;
      balloon.appendChild(shine);
      
      container.appendChild(balloon);
    }

    // Create floating image cards (placeholder images)
    const imagePlaceholders = [
      '🎂', '🎈', '🎁', '🎉', '🎀', '⭐', '🌟', '✨', '💖', '🎊', '🦄', '🌈',
      '🐶', '🐱', '🐼', '🐨', '🦋', '🌸', '🍰', '🧁', '🍬', '🍭', '🎨', '📸'
    ];

    for (let i = 0; i < imageCardCount; i++) {
      const card = document.createElement('div');
      card.className = 'floating-image-card';
      
      const size = Math.random() * 70 + 50;
      const leftPos = Math.random() * 90 + 5;
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 8;
      const rotation = Math.random() * 360;
      const emoji = imagePlaceholders[Math.floor(Math.random() * imagePlaceholders.length)];
      
      card.style.cssText = `
        left: ${leftPos}%;
        width: ${size}px;
        height: ${size}px;
        animation: floatCardUp ${duration}s ease-in forwards;
        animation-delay: ${delay}s;
        transform: rotate(${rotation}deg);
      `;
      
      card.innerHTML = `
        <div class="image-card-inner">
          <div class="card-emoji">${emoji}</div>
          <div class="card-label">✨ Magic ✨</div>
        </div>
      `;
      
      container.appendChild(card);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isOpen]);

  // Handle unmute/play music on user interaction
  const handleUnmute = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsMuted(false);
      } catch (error) {
        console.log('Still cannot play audio:', error);
      }
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="birthday-fullscreen-overlay">
      {/* Music Control Button */}
      {isMuted && (
        <button className="music-control-btn" onClick={handleUnmute}>
          🔇 Click to Unmute Music 🎵
        </button>
      )}
      
      {/* Balloons & Image Cards Container */}
      <div className="floating-container" ref={balloonContainerRef} />
      
      {/* Confetti Canvas */}
      <ConfettiCanvas isActive={isOpen} />
      
      {/* Main Content */}
      <div className="overlay-content">
        <div className="typing-container">
          <h1 className="typing-title">
            {displayText.split('').map((char, index) => (
              <span 
                key={index} 
                className="typing-char"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            {!typingComplete && <span className="cursor">|</span>}
          </h1>
        </div>
        
        {typingComplete && (
          <div className="celebration-message">
            <div className="floating-emojis">
              <span>🎉</span>
              <span>🎈</span>
              <span>🎂</span>
              <span>🎁</span>
              <span>💕</span>
            </div>
            <p>You're officially 9 years old! 🎂</p>
            <p className="sub-message">May your day be filled with magic and joy!</p>
            <button className="close-overlay-btn" onClick={handleClose}>
              Continue The Celebration ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Confetti Canvas Component
function ConfettiCanvas({ isActive }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create confetti particles
    const colors = ['#FF6B9D', '#FFB347', '#6C5CE7', '#00CEC9', '#FFEAA7', '#FF4785', '#FF9A9E', '#FFFFFF'];
    const particles = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    particlesRef.current = particles;

    let animationId;

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        
        // Reset particle when it goes off screen
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        
        if (p.shape === 'rect') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="confetti-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}

export default BirthdayPopup;