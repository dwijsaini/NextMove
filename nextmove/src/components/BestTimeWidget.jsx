import { getBestTime } from '../services/api';
import './BestTimeWidget.css';

const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getActiveMonths = (text) => {
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const active = new Array(12).fill(false);
  
  const lowerText = text.toLowerCase();
  
  // Try to find "Month1 to Month2"
  const match = lowerText.match(/([a-z]+)\s+to\s+([a-z]+)/);
  if (match) {
    const startIdx = months.indexOf(match[1]);
    const endIdx = months.indexOf(match[2]);
    if (startIdx !== -1 && endIdx !== -1) {
      let i = startIdx;
      while (true) {
        active[i] = true;
        if (i === endIdx) break;
        i = (i + 1) % 12;
      }
      return active;
    }
  }

  // Handle season text
  let found = false;
  if (lowerText.includes('spring')) {
    active[2] = active[3] = active[4] = true; // Mar, Apr, May
    found = true;
  }
  if (lowerText.includes('autumn') || lowerText.includes('fall')) {
    active[8] = active[9] = active[10] = true; // Sep, Oct, Nov
    found = true;
  }
  if (lowerText.includes('summer')) {
    active[5] = active[6] = active[7] = true; // Jun, Jul, Aug
    found = true;
  }
  if (lowerText.includes('winter')) {
    active[11] = active[0] = active[1] = true; // Dec, Jan, Feb
    found = true;
  }
  
  if (!found) {
    // Default fallback: highlight standard pleasant transition months
    active[3] = active[4] = active[9] = active[10] = true; // Apr, May, Oct, Nov
  }
  return active;
};

const BestTimeWidget = ({ city }) => {
  if (!city) return null;

  const text = getBestTime(city);
  const activeMonths = getActiveMonths(text);

  return (
    <div className="best-time-widget">
      <div className="widget-header">
        <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <div>
          <h4>Best Time to Visit</h4>
          <p className="best-time-summary">{text}</p>
        </div>
      </div>
      
      <div className="months-timeline" role="img" aria-label={`Timeline showing best months to visit: ${text}`}>
        {monthsShort.map((month, idx) => (
          <div 
            key={month} 
            className={`month-pill ${activeMonths[idx] ? 'active' : ''}`}
            title={`${month}: ${activeMonths[idx] ? 'Recommended' : 'Not peak season'}`}
          >
            <span className="month-name">{month}</span>
            <span className="month-dot"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestTimeWidget;
