import { useState } from 'react';
import './Carousel.css';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  return (
    <div 
      className="carousel-container" 
      onKeyDown={handleKeyDown} 
      tabIndex="0" 
      aria-label="Image gallery of the city and sights"
    >
      <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={slide.url} alt={slide.title} className="carousel-img" />
            <div className="carousel-caption">
              <span className="caption-text">{slide.title}</span>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="carousel-btn prev-btn" 
            aria-label="Previous image"
          >
            &#10094;
          </button>
          <button 
            onClick={nextSlide} 
            className="carousel-btn next-btn" 
            aria-label="Next image"
          >
            &#10095;
          </button>

          <div className="carousel-indicators">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
