import './Card.css';

const PlacesCard = ({ data }) => {
  return (
    <article className="card places-card">
      <div className="card-header">
        <div>
          <p className="card-label">Nearby Picks</p>
          <h3>Places to Visit</h3>
        </div>
      </div>
      <ul className="places-list">
        {data.map((place, index) => (
          <li key={place.name}>
            <span className="place-index">{index + 1}</span>
            <div>
              <div className="place-title-row">
                <h4>{place.name}</h4>
                <span>{place.tag}</span>
              </div>
              <p>{place.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PlacesCard;
