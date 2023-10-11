import styled from "styled-components";
import NewPost from "../components/NewPost";

const StyledMain = styled.div`
	background-color: #48412f;
	border-radius: 1rem;
	border: 0.25rem solid black;
`;

//remove this comment

function NewPostView() {
	return (
		<StyledMain>
			<NewPost />
		</StyledMain>
	);
}

export default NewPostView;
