import { useEffect, useRef } from 'react';
import './ClosingSection.css';

function ClosingSection({ onReachEnd }) {
  const sectionRef = useRef(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !triggeredRef.current) {
            triggeredRef.current = true;
            onReachEnd?.();
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onReachEnd]);

  return (
    <section className="closing-section" id="closing" ref={sectionRef}>
      <div className="container">
        <div className="closing-card">
          <div className="closing-header" />
          <div className="closing-content">
            <span className="closing-tag">🎉 🎂 🎈</span>
            <h2>Have the BEST Birthday Ever!</h2>
            <p>
              You're 9 years old now - that's a whole new chapter of fun, learning,
              and amazing adventures! Enjoy every single moment of your special day,
              Ate Girl!!!.
            </p>
            <div className="closing-signature">
              <div className="signature-dots" />
              <p>We love you to the moon and back! 💕</p>
              <div className="signature-dots" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClosingSection;