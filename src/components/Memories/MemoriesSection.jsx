import { memoryQuotes } from '../../data/content';
import './MemoriesSection.css';

function MemoriesSection() {
  return (
    <section className="memories-section">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">💖 You're Amazing Because 💖</span>
          <h2>Little Reminders</h2>
        </div>
        
        <div className="memories-grid">
          {memoryQuotes.map((quote, idx) => (
            <div className="memory-pill" key={idx}>
              <div className="pill-dot" />
              <p>{quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MemoriesSection;
