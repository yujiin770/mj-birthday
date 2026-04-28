import { wishCards } from '../../data/content';
import './WishesSection.css';

function WishesSection() {
  return (
    <section className="wishes-section" id="wishes">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">✨ Three Birthday Wishes ✨</span>
          <h2>Made Just For You</h2>
          <div className="section-line" />
        </div>
        
        <div className="wishes-grid">
          {wishCards.map((wish, idx) => (
            <div
              className="wish-card"
              key={idx}
              style={{ borderTopColor: wish.color }}
            >
              <div className="wish-number">{idx + 1}</div>
              <h3>{wish.title}</h3>
              <p>{wish.text}</p>
              <div className="wish-decoration" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WishesSection;
