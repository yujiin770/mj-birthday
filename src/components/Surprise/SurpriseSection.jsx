import { useState, useRef, useEffect } from 'react';
import './SurpriseSection.css';

function SurpriseSection({ videoSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleOpenVideo = () => {
      setIsOpen(true);
    };

    window.addEventListener('openSurpriseVideo', handleOpenVideo);
    
    return () => {
      window.removeEventListener('openSurpriseVideo', handleOpenVideo);
    };
  }, []);

  const closeVideo = () => {
    setIsOpen(false);
    setShowUnmuteHint(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const unmuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      setShowUnmuteHint(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeVideo();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.muted = true; // Start muted for autoplay
        videoRef.current.play().catch(e => {
          console.log('Auto-play prevented:', e);
        });
        
        // Show unmute hint after 1 second
        setTimeout(() => {
          if (isOpen && videoRef.current && videoRef.current.muted) {
            setShowUnmuteHint(true);
          }
        }, 1000);
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={`surprise-overlay ${isOpen ? 'active' : ''}`}>
      <div className="close-surprise-btn" onClick={closeVideo}>✕</div>
      <div className="surprise-video-wrapper">
        <video 
          ref={videoRef}
          className="surprise-video-element"
          controls
          autoPlay
          playsInline
          muted
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {showUnmuteHint && (
          <button className="unmute-btn" onClick={unmuteVideo}>
            🔊
          </button>
        )}
      </div>
    </div>
  );
}

export default SurpriseSection;