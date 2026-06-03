import { useEffect, useRef } from 'react';
import './ClosingSection.css';
import niecePic from '../../assets/images/mj.jpg';

function ClosingSection({ onReachEnd }) {
  const sectionRef = useRef(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Change 0.8 to 0.3 to ensure it triggers on long mobile screens
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !triggeredRef.current) {
            triggeredRef.current = true;
            onReachEnd?.();
          }
        });
      },
      { threshold: 0.3 } // Lower threshold for mobile compatibility
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onReachEnd]);

  return (
    <section className="closing-section" id="closing" ref={sectionRef}>
      <div className="letter-container">

        {/* The Polaroid Photo */}
        <div className="polaroid-frame">
          <img src={niecePic} alt="MJ Birthday" className="polaroid-img" />
          <p className="polaroid-caption">Best Day Ever! 🎂</p>
        </div>

        {/* The Hand-written Letter */}
        <div className="letter-paper">
          <div className="letter-stamp">❤️</div>
          <div className="letter-content">
            <h2 className="handwritten">To our dearest MJ,</h2>
            <p>
              As your 9th birthday party comes to an end, remember that this is
              just the beginning of your most magical year yet. We are so proud
              of the smart, kind, and funny girl you've become.
            </p>
            <p>
              Go out there, Ate Girl, and make some beautiful memories.
              The world is your playground!
            </p>

            <div className="letter-signature">
              <p>With all our love,</p>
              <h3 className="signature-name">Your Family ✨</h3>
            </div>
          </div>
        </div>

        <div className="final-confetti-btn-container">
          <p className="footer-small">Created with ❤️ for the world's best 9-year old</p>
        </div>
      </div>
    </section>
  );
}

export default ClosingSection;