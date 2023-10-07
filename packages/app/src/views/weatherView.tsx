import styled from "styled-components";
import Weather from "../components/Weather";

const StyleWeather = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	text-align: center;
	padding: 2rem;
	height: 40rem;
`;

function WeatherView() {
	return (
		<StyleWeather>
			<Weather />
		</StyleWeather>
	);
}

export default WeatherView;
