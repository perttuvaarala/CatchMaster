import styled from "styled-components";
import Map from "../components/Map/index";

const StyledMap = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	padding: 2rem;
	flex: 0;
	border-radius: 1rem;
	border: 0.25rem solid black;
`;

function MapView() {
	return (
		<StyledMap>
			<Map />
		</StyledMap>
	);
}

export default MapView;
