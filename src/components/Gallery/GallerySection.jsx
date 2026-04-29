import { galleryItems } from '../../data/content';
import './GallerySection.css';

function GalleryCard({ item }) {
  return (
    <div className="animated-3d-card">
      {/* 1. The Background Wrapper (This tilts backwards on hover) */}
      <div className="card-wrapper">
        <img src={item.frontImg} alt="Cover" className="cover-image" loading="lazy" />
        <div className="card-overlay" />
      </div>
      
      {/* 2. The Title (This lifts slightly off the card) */}
      <div className="card-title-wrapper">
        <h4>{item.title}</h4>
      </div>

      {/* 3. The Pop-Out Image (This flies completely out of the frame!) */}
      {/* For the best effect, make sure backImg is a transparent PNG cutout! */}
      <img src={item.backImg} alt="Pop out" className="character-image" loading="lazy" />
    </div>
  );
}

function GallerySection() {
  // Split 9 items into 3 rows
  const row1 = galleryItems.slice(0, 3);
  const row2 = galleryItems.slice(3, 6);
  const row3 = galleryItems.slice(6, 9);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">📸 Picture Perfect 📸</span>
          <h2>Secret Photo Gallery</h2>
          <p className="section-subtitle">Hover or tap any picture to see the magic pop out!</p>
        </div>
      </div>

      <div className="carousel-container">
        {/* ROW 1: Moves Left */}
        <div className="carousel-row row-left">
          <div className="carousel-track track-left">
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <GalleryCard key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="carousel-row row-right">
          <div className="carousel-track track-right">
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <GalleryCard key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 3: Moves Left */}
        <div className="carousel-row row-left">
          <div className="carousel-track track-left">
            {[...row3, ...row3, ...row3].map((item, idx) => (
              <GalleryCard key={`r3-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;