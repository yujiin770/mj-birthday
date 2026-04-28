import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="float-1 floating-balloon" />
      <div className="float-2 floating-balloon" />
      <div className="float-3 floating-balloon" />
      
      <div className="morph-candle">
        <div className="candle-body" />
        <div className="candle-flame" />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Happy</span>
            <span>9th</span>
            <span>Birthday</span>
          </h1>
          <p className="hero-subtitle">
            To the most AMAZING 9-year-old in the whole wide world!
          </p>
          <div className="hero-buttons">
            <a href="#wishes" className="btn-primary">🎈 Start the Fun 🎈</a>
            <a href="#closing" className="btn-secondary">💝 A Special Message 💝</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
