import styled from "styled-components";

const StyledNewBait = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	padding: 2rem;
	flex: 0;
`;

function MapView() {
	return (
		<StyledNewBait>
			<h1>New bait</h1>
		</StyledNewBait>
	);
}

export default MapView;
