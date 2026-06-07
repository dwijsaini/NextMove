import Carousel from './Carousel';
import './Card.css';

const PlacesCard = ({ placesData, data }) => {
  const places = placesData ?? data;

  if (!places) {
    return null;
  }

  const slides = [];
  if (places.image) {
    slides.push({ url: places.image, title: places.summary.title });
  }
  places.attractions.forEach((att) => {
    if (att.image) {
      slides.push({ url: att.image, title: att.title });
    }
  });

  return (
    <article className="card places-card">
      {slides.length > 0 ? (
        <div style={{ marginBottom: '20px' }}>
          <Carousel key={places.summary.title} slides={slides} />
        </div>
      ) : null}
      <div className="card-header">
        <div>
          <p className="card-label">City Guide</p>
          <h3>{places.summary.title}</h3>
        </div>
      </div>
      <p className="places-summary">{places.summary.extract}</p>

      <div className="attractions-section">
        <h4>Top attractions</h4>
        <ul className="places-list">
          {places.attractions.map((place, index) => (
            <li key={place.title}>
              <span className="place-index">{index + 1}</span>
              <div>
                <div className="place-title-row">
                  <h4>{place.title}</h4>
                </div>
                <p>{place.snippet}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PlacesCard;
