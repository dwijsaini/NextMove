import { useEffect, useRef } from 'react';
import './MapCard.css';

const MapCard = ({ coord, cityName, attractions }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!coord || !mapContainerRef.current || !window.L) return;

    // Remove existing map instance if any to prevent initialization error
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const { lat, lon } = coord;

    // Create Map
    const map = window.L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([lat, lon], 12);

    mapInstanceRef.current = map;

    // Add Tile Layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    // City Center Pin Icon
    const cityIcon = window.L.divIcon({
      className: 'custom-city-marker',
      html: '<div class="city-pin"></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Drop City Center Marker
    window.L.marker([lat, lon], { icon: cityIcon })
      .addTo(map)
      .bindPopup(`<b>${cityName}</b><br/>City Center`);

    // Fetch and Drop Attraction Markers
    const dropAttractionMarkers = async () => {
      if (!attractions || attractions.length === 0) return;

      const titles = attractions.map((a) => a.title);
      const encodedTitles = encodeURIComponent(titles.join('|'));
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates&titles=${encodedTitles}&format=json&origin=*`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Query failed');
        const data = await response.json();
        const pages = data.query?.pages || {};

        const bounds = [[lat, lon]]; // For auto-zooming / fitting bounds

        attractions.forEach((attraction, idx) => {
          // Find matching coordinates page
          const page = Object.values(pages).find(
            (p) => p.title.toLowerCase() === attraction.title.toLowerCase()
          );

          let attractionLat = lat;
          let attractionLon = lon;

          if (page && page.coordinates && page.coordinates[0]) {
            attractionLat = page.coordinates[0].lat;
            attractionLon = page.coordinates[0].lon;
          } else {
            // Smart spiral coordinates offset fallback
            const angle = (idx * Math.PI) / 2; // 0, 90, 180, 270 degrees
            attractionLat += Math.sin(angle) * 0.015;
            attractionLon += Math.cos(angle) * 0.015;
          }

          bounds.push([attractionLat, attractionLon]);

          const attractionIcon = window.L.divIcon({
            className: 'custom-attraction-marker',
            html: `<div class="attraction-pin">${idx + 1}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          window.L.marker([attractionLat, attractionLon], { icon: attractionIcon })
            .addTo(map)
            .bindPopup(`<b>${attraction.title}</b><br/><p style="margin:4px 0 0;font-size:0.8rem;color:#6b7280;">${attraction.snippet.slice(0, 100)}...</p>`);
        });

        // Fit bounds to show all pins
        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      } catch (err) {
        console.error('Failed to resolve attraction coordinates:', err);
      }
    };

    dropAttractionMarkers();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coord, cityName, attractions]);

  return (
    <article className="card map-card">
      <div className="card-header">
        <div>
          <p className="card-label">Interactive Map</p>
          <h3>Location Explorer</h3>
        </div>
      </div>
      <div className="map-view-container">
        <div ref={mapContainerRef} className="leaflet-map-element" id="map-element" />
      </div>
    </article>
  );
};

export default MapCard;
