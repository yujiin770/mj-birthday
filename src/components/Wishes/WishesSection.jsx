import { wishCards } from '../../data/content';
import './WishesSection.css';

function WishesSection() {
  return (
    <section className="wishes-section" id="wishes">
      <div className="container">
        <div className="wishes-header">
          <span className="section-tag">✨ Three Birthday Wishes ✨</span>
          <h2 className="wishes-title">Made Just For You</h2>
        </div>
        
        <div className="wishes-showcase">
          {wishCards.map((wish, idx) => (
            <div
              className={`premium-wish-card ${idx % 2 === 0 ? 'align-left' : 'align-right'}`}
              key={idx}
              style={{ '--card-color': wish.color }}
            >
              <div className="wish-glow-bg" />
              <div className="wish-content-wrapper">
                <span className="huge-bg-number">0{idx + 1}</span>
                <div className="wish-text-content">
                  <h3>{wish.title}</h3>
                  <p>{wish.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WishesSection;