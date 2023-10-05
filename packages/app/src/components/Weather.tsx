import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';


type WeatherApiResponse = AxiosResponse<{

  temperature_2m: number;
  relativehumidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weathercode: string;
  visibility: number;
  uv_index: number;

}>;


type WeatherApiError = AxiosError<any>;


function Weather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError("Error getting geolocation: " + error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not available in this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,visibility,uv_index&daily=sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&windspeed_unit=ms&timezone=auto&forecast_days=1`;
        axios
        .get(apiUrl)
        .then((response: WeatherApiResponse) => {
          setWeatherData(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error: WeatherApiError) => {
          setError("Error fetching weather data: " + error.message);
          setLoading(false);
        });
      
    }
  }, [latitude, longitude]);


  const timestamp : Date = new Date(Date.now());
  const hourNow = `${timestamp.getHours()-1}`;
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1>Current Weather</h1>
          {weatherData ? (
            <>
              <p>Temperature: {weatherData.current_weather.temperature} °C</p>
              <p>Humidity: {weatherData.hourly.relativehumidity_2m[hourNow]} %</p>
              <p>Wind: {weatherData.current_weather.windspeed} m/s</p>
              <p>Visibility: {weatherData.hourly.visibility[hourNow]/1000} km</p>
              <p>Sunrise: {weatherData.daily.sunrise[0].slice(-5)}</p>
              <p>Sunset: {weatherData.daily.sunset[0].slice(-5)}</p>
              <p>Expected rain: {weatherData.daily.precipitation_sum[0]} mm</p>
            </>
          ) : (
            <p>No weather data available.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Weather;
