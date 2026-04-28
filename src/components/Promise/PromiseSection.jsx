import './PromiseSection.css';

function PromiseSection() {
  return (
    <section className="promise-section">
      <div className="promise-crown">👑</div>
      <div className="floating-stars">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            ⭐
          </span>
        ))}
      </div>
      
      <div className="promise-content">
        <div className="promise-inner">
          <span className="promise-label">🌟 A Very Special Promise 🌟</span>
          <h2>You are a STAR, and you'll always shine bright!</h2>
          <p>
            No matter how tall you grow or how far you go, you will always have
            someone who believes in you, cheers for you, and loves you more than
            words can say.
          </p>
          <div className="promise-heart" />
        </div>
      </div>
    </section>
  );
}

export default PromiseSection;
