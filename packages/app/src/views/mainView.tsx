import styled from "styled-components";
import Posts from "../components/Posts";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: #48412f;
`;

function MainView() {
	return (
		<StyledMain>
			<Posts />
		</StyledMain>
	);
}

export default MainView;
