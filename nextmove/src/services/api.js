const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'bfcc87ea045eddc1f3b54aa75245ae37';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_BASE_URL = 'https://openweathermap.org/img/wn';
const WIKIPEDIA_REST_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

const bestTime = {
  paris: 'April to June',
  tokyo: 'March to May',
  delhi: 'October to March',
  london: 'March to May',
  'new york': 'April to June',
  rome: 'April to June',
  dubai: 'November to March',
  singapore: 'February to April',
  bangkok: 'November to February',
  sydney: 'September to November',
  barcelona: 'May to June',
  istanbul: 'April to June',
};

const getFirstTwoSentences = (text = '') => {
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);

  if (!sentences.length) {
    return text;
  }

  return sentences.slice(0, 2).join(' ').trim();
};

const stripHtml = (value = '') =>
  value
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();

export async function fetchWeather(city) {
  const cityQuery = city.trim();

  if (!cityQuery) {
    throw new Error('City not found');
  }

  const response = await fetch(
    `${WEATHER_BASE_URL}?q=${encodeURIComponent(cityQuery)}&appid=${API_KEY}&units=metric`,
  );

  if (response.status === 404) {
    throw new Error('City not found');
  }

  if (!response.ok) {
    throw new Error('Unable to fetch weather');
  }

  const data = await response.json();
  const weather = data.weather?.[0];

  return {
    city: data.name,
    country: data.sys?.country,
    temp: data.main?.temp,
    feels_like: data.main?.feels_like,
    humidity: data.main?.humidity,
    description: weather?.description,
    icon: weather?.icon ? `${ICON_BASE_URL}/${weather.icon}@2x.png` : '',
    coord: data.coord, // For Map rendering in Phase 4
    timezone: data.timezone, // For Clock rendering in Phase 3
  };
}

export async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Unable to fetch weather by coordinates');
  }
  const data = await response.json();
  const weather = data.weather?.[0];
  return {
    city: data.name,
    country: data.sys?.country,
    temp: data.main?.temp,
    feels_like: data.main?.feels_like,
    humidity: data.main?.humidity,
    description: weather?.description,
    icon: weather?.icon ? `${ICON_BASE_URL}/${weather.icon}@2x.png` : '',
    coord: data.coord,
    timezone: data.timezone,
  };
}

export async function fetchForecast(city) {
  const cityQuery = city.trim();
  if (!cityQuery) throw new Error('City not found');

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityQuery)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch forecast');
  }

  const data = await response.json();
  
  // Group 3-hour forecasts by day
  const dailyMap = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    const isNoon = item.dt_txt.includes('12:00:00');
    
    // We prefer noon weather for the daily card, or default to the first entry seen
    if (!dailyMap[date] || isNoon) {
      dailyMap[date] = item;
    }
  });

  return Object.values(dailyMap).slice(0, 5).map((item) => {
    const dateObj = new Date(item.dt * 1000);
    return {
      dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      dateStr: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp: item.main.temp,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      description: item.weather?.[0]?.description || '',
      icon: item.weather?.[0]?.icon ? `${ICON_BASE_URL}/${item.weather[0].icon}@2x.png` : '',
    };
  });
}

export async function fetchCitySuggestions(query) {
  const searchQuery = query.trim();
  if (!searchQuery || searchQuery.length < 2) return [];

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) return [];

  const data = await response.json();
  return data.map((item) => ({
    name: item.name,
    country: item.country,
    state: item.state || '',
    lat: item.lat,
    lon: item.lon,
  }));
}

export async function fetchPlaces(city) {
  const cityQuery = city.trim();

  if (!cityQuery) {
    throw new Error('City not found');
  }

  const encodedCity = encodeURIComponent(cityQuery);
  const summaryUrl = `${WIKIPEDIA_REST_URL}/${encodedCity}`;
  const extractUrl = `${WIKIPEDIA_API_URL}?action=query&titles=${encodedCity}&prop=extracts&exintro&format=json&origin=*`;
  const searchUrl = `${WIKIPEDIA_API_URL}?action=query&list=search&srsearch=${encodedCity}+tourist+attractions&format=json&origin=*`;

  const [summaryResponse, extractResponse, searchResponse] = await Promise.all([
    fetch(summaryUrl),
    fetch(extractUrl),
    fetch(searchUrl),
  ]);

  if (summaryResponse.status === 404) {
    throw new Error('City not found');
  }

  if (!summaryResponse.ok || !extractResponse.ok || !searchResponse.ok) {
    throw new Error('Unable to fetch places');
  }

  const [summaryData, extractData, searchData] = await Promise.all([
    summaryResponse.json(),
    extractResponse.json(),
    searchResponse.json(),
  ]);

  const pages = extractData.query?.pages ?? {};
  const firstPage = Object.values(pages)[0];
  const fallbackExtract = stripHtml(firstPage?.extract);
  const summaryText = getFirstTwoSentences(summaryData.extract || fallbackExtract);

  const rawAttractions = searchData.query?.search ?? [];
  const topAttractions = rawAttractions.slice(0, 4);

  // Batch query attraction images
  let attractionImages = {};
  if (topAttractions.length > 0) {
    const titlesJoined = topAttractions.map((item) => item.title).join('|');
    const imagesUrl = `${WIKIPEDIA_API_URL}?action=query&titles=${encodeURIComponent(titlesJoined)}&prop=pageimages&piprop=thumbnail&pithumbsize=600&format=json&origin=*`;
    
    try {
      const imgRes = await fetch(imagesUrl);
      if (imgRes.ok) {
        const imgData = await imgRes.json();
        const pagesMap = imgData.query?.pages || {};
        Object.values(pagesMap).forEach((page) => {
          if (page.thumbnail && page.thumbnail.source) {
            attractionImages[page.title] = page.thumbnail.source;
          }
        });
      }
    } catch (imgErr) {
      console.error('Error fetching attraction thumbnails:', imgErr);
    }
  }

  const attractions = topAttractions.map((item) => ({
    title: item.title,
    snippet: stripHtml(item.snippet),
    image: attractionImages[item.title] || '',
  }));

  return {
    summary: {
      title: summaryData.title || firstPage?.title || cityQuery,
      extract: summaryText,
    },
    image: summaryData.thumbnail?.source || '',
    attractions,
  };
}

export function getBestTime(city) {
  return bestTime[city.toLowerCase()] || 'Spring and Autumn are generally ideal.';
}
