import styled from "styled-components";
import NewPost from "../components/NewPost";

const StyledMain = styled.div`
	background-color: #48412f;
`;

function NewPostView() {
	return (
		<StyledMain>
			<NewPost />
		</StyledMain>
	);
}

export default NewPostView;
