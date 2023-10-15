import { useState, useEffect } from "react";
import axios from "axios";
import weatherCodes from "./weatherCodes.json";
import styled from "styled-components";

const StyledWeather = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #48412f;
	color: #fff;
`;

function Weather() {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				},
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
				.then((response) => {
					setWeatherData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					setError("Error fetching weather data: " + error?.message);
					setLoading(false);
				});
		}
	}, [latitude, longitude]);

	const timestamp: Date = new Date(Date.now());
	const hourNow = `${timestamp.getHours() - 1}`;

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<StyledWeather>
					{weatherData ? (
						<>
							<h1 style={{ margin: "0.5rem" }}>
								{weatherData.current_weather.temperature} °C
							</h1>
							<h2 style={{ margin: "0.5rem" }}>
								{
									weatherCodes[
										("" +
											weatherData.current_weather
												.weathercode +
											"") as keyof typeof weatherCodes
									]
								}
							</h2>
							<span>
								Wind: {weatherData.current_weather.windspeed}{" "}
								m/s
							</span>
							<span>
								Expected rain:{" "}
								{weatherData.daily.precipitation_sum[0]} mm
							</span>{" "}
							<span>
								Humidity:{" "}
								{
									weatherData.hourly.relativehumidity_2m[
										hourNow
									]
								}{" "}
								%
							</span>
							<span>
								UV index: {weatherData.hourly.uv_index[hourNow]}
							</span>
							<span>
								Visibility:{" "}
								{weatherData.hourly.visibility[hourNow] / 1000}{" "}
								km
							</span>
							<br />
							<span>
								Sunrise:{" "}
								{weatherData.daily.sunrise[0].slice(-5)}
							</span>{" "}
							<span>
								Sunset: {weatherData.daily.sunset[0].slice(-5)}
							</span>
						</>
					) : (
						<p>No weather data available.</p>
					)}
				</StyledWeather>
			)}
		</div>
	);
}

export default Weather;
