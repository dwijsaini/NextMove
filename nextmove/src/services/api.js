const API_KEY = 'bfcc87ea045eddc1f3b54aa75245ae37';
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
  };
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

  return {
    summary: {
      title: summaryData.title || firstPage?.title || cityQuery,
      extract: summaryText,
    },
    image: summaryData.thumbnail?.source || '',
    attractions: (searchData.query?.search ?? []).slice(0, 4).map((item) => ({
      title: item.title,
      snippet: stripHtml(item.snippet),
    })),
  };
}

export function getBestTime(city) {
  return bestTime[city.toLowerCase()] || 'Spring and Autumn are generally ideal.';
}
