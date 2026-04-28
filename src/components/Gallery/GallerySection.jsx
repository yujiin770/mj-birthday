import { galleryItems } from '../../data/content';
import './GallerySection.css';

function GallerySection() {
  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">🎁 Fun Surprises 🎁</span>
          <h2>Interactive Placeholders</h2>
          <p className="section-subtitle">Tap or hover to see the magic!</p>
        </div>
        
        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div className="gallery-card" key={idx}>
              <div className="gallery-placeholder">
                <div className="placeholder-overlay" />
                <div className="placeholder-content">
                  <div className="placeholder-icon" />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="placeholder-prompt">{item.prompt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
