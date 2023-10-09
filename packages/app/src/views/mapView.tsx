import styled from "styled-components";
import Map from "../components/Map";

const StyledMap = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	padding: 2rem;
	flex: 0;
`;

function MapView() {
	return (
		<StyledMap>
			<Map />
		</StyledMap>
	);
}

export default MapView;
