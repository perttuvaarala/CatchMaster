import styled from "styled-components";

const StyleWeather = styled.div`
  display: flex;
  flex-direction: column;
  background-color:#48412F;
  align-items: center;
  padding: 2rem;
  height: 40rem;
`;

function WeatherView() {
	return (
	<StyleWeather>
		Weather
	</StyleWeather>
	);
}

export default WeatherView;
