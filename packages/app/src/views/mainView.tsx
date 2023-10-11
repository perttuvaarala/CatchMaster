import styled from "styled-components";
import Posts from "../components/Posts";

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 1rem;
`;

function MainView() {
	return (
		<StyledMain>
			<Posts />
		</StyledMain>
	);
}

export default MainView;
