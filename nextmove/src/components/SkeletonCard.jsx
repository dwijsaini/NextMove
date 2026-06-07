import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-grid">
      {/* Weather Card Skeleton */}
      <article className="skeleton-card skeleton-weather">
        <div className="skeleton-header">
          <div className="skeleton-text-group">
            <div className="skeleton-bar skeleton-label"></div>
            <div className="skeleton-bar skeleton-title-large"></div>
          </div>
          <div className="skeleton-square skeleton-icon-placeholder"></div>
        </div>
        <div className="skeleton-temp-row">
          <div className="skeleton-bar skeleton-temp-value"></div>
          <div className="skeleton-bar skeleton-subtitle"></div>
        </div>
        <div className="skeleton-stats-row">
          <div className="skeleton-bar skeleton-stat-box"></div>
          <div className="skeleton-bar skeleton-stat-box"></div>
        </div>
      </article>

      {/* Places Card Skeleton */}
      <article className="skeleton-card skeleton-places">
        <div className="skeleton-image-placeholder"></div>
        <div className="skeleton-header">
          <div className="skeleton-text-group">
            <div className="skeleton-bar skeleton-label"></div>
            <div className="skeleton-bar skeleton-title-medium"></div>
          </div>
        </div>
        <div className="skeleton-bar skeleton-summary-line"></div>
        <div className="skeleton-bar skeleton-summary-line"></div>
        <div className="skeleton-bar skeleton-summary-line short"></div>
        
        <div className="skeleton-attractions-section">
          <div className="skeleton-bar skeleton-subtitle"></div>
          <div className="skeleton-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-list-item">
                <div className="skeleton-square skeleton-number"></div>
                <div className="skeleton-list-text">
                  <div className="skeleton-bar skeleton-list-title"></div>
                  <div className="skeleton-bar skeleton-list-desc"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default SkeletonCard;
