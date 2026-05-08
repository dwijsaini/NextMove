import './Card.css';

const PlacesCard = ({ placesData, data }) => {
  const places = placesData ?? data;

  if (!places) {
    return null;
  }

  return (
    <article className="card places-card">
      {places.image ? (
        <img className="places-image" src={places.image} alt={places.summary.title} />
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
