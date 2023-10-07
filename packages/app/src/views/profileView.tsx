import styled from "styled-components";
import Profile from "../components/Profile/";
import EditProfile from "../components/EditProfile";

const StyleProfile = styled.div`
	display: flex;
	flex-direction: column;

	background-color: #48412f;
	align-items: baseline;
	padding: 2rem;
	height: 40rem;
`;

function ProfileView() {
	return (
		<StyleProfile>
			<Profile />
			<EditProfile />
		</StyleProfile>
	);
}

export default ProfileView;
