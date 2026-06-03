import './PromiseSection.css';

function PromiseSection() {
  return (
    <section className="promise-section">
      {/* Dynamic Background Elements */}
      <div className="dream-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="promise-container">
        <div className="promise-layout">
          
          {/* Visual Side: Floating Magic Island */}
          <div className="promise-visual">
            <div className="floating-island">
              <span className="island-item crown">👑</span>
              <span className="island-item heart">💖</span>
              <span className="island-item star-big">⭐</span>
              <span className="island-item star-small">✨</span>
              <div className="island-base"></div>
            </div>
            {/* Sparkles that orbit the island */}
            <div className="sparkle-orbit">
              <div className="orbiting-sparkle">✨</div>
              <div className="orbiting-sparkle">🌸</div>
              <div className="orbiting-sparkle">🌈</div>
            </div>
          </div>

          {/* Text Side: The Dream Cloud */}
          <div className="promise-text-card">
            <div className="card-header">
              <span className="magic-line"></span>
              <span className="badge-text">PINKY PROMISE</span>
              <span className="magic-line"></span>
            </div>
            
            <h2 className="promise-title">
              You're <span className="highlight">Extraordinary</span>, <br/>
              Ate Girl!
            </h2>
            
            <div className="promise-content">
              <p>
                No matter how many birthdays pass, our promise to you remains 
                the same: to always believe in your dreams, to hold your hand 
                through every adventure, and to love you more than all the 
                stars in the galaxy. 
              </p>
            </div>

            <div className="promise-footer">
              <span className="footer-emoji">🦋</span>
              <span className="footer-emoji">🦄</span>
              <span className="footer-emoji">🍭</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromiseSection;