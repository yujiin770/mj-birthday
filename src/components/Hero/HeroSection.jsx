import './HeroSection.css';
import niecePic from '../../assets/images/niece.jpg'; 

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-bg-orb" />

      <div className="balloon-wrapper bw-1">
        <div className="float-1 floating-balloon" />
      </div>
      <div className="balloon-wrapper bw-2">
        <div className="float-2 floating-balloon" />
      </div>
      <div className="balloon-wrapper bw-3">
        <div className="float-3 floating-balloon" />
      </div>
      
      <div className="morph-candle">
        <div className="candle-body" />
        <div className="flame-wrapper">
          <div className="candle-flame" />
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            
            <div className="hero-portrait-container">
              <div className="portrait-frame">
                <div className="portrait-inner">
                  {/* 👇 2. Replaced the placeholder with the actual image tag 👇 */}
                  <img src={niecePic} alt="Birthday Girl" className="portrait-img" />
                </div>
              </div>
              <div className="frame-sparkle fs-1">✨</div>
              <div className="frame-sparkle fs-2">⭐</div>
              <div className="frame-sparkle fs-3">✨</div>
            </div>

            <h1 className="hero-title">
              <div className="word-wrapper">
                <span className="gradient-1">Happy</span>
              </div>
              <div className="word-wrapper">
                <span className="gradient-2">9th</span>
              </div>
              <div className="word-wrapper">
                <span className="gradient-3">Birthday</span>
              </div>
            </h1>
            <p className="hero-subtitle">
              To the most <span className="highlight-text">AMAZING</span> 9-year-old<br/>
              in the whole wide world!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;