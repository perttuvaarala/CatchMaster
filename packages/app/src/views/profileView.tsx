import styled from "styled-components";
import Profile from "../components/Profile/";
import EditProfile from "../components/EditProfile";
import LureBox from "../components/LureBox";
import { useCurrentUser } from "../hooks/useCurrentUser";

const StyleProfile = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5rem;
	background-color: #48412f;
	align-items: baseline;
	padding: 2rem;
`;

const StyledProfileBlock = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 45%;
`;

function ProfileView() {
	const currentUser = useCurrentUser();
	return (
		<StyleProfile>
			<StyledProfileBlock>
				<Profile />
				<EditProfile />
			</StyledProfileBlock>
			<StyledProfileBlock>
				{currentUser?.id && <LureBox userID={currentUser.id} />}
			</StyledProfileBlock>
		</StyleProfile>
	);
}

export default ProfileView;
