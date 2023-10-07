import styled from "styled-components";
import { useCurrentUser } from "../hooks/useCurrentUser";

const StyleProfile = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	align-items: center;
	padding: 2rem;
	height: 40rem;
`;

const Username = styled.h1`
	color: #fff;
	font-size: 2rem;
	margin-bottom: 1rem;
	text-decoration: underline;
`;

const Text = styled.p`
	color: #fff;
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
`;

function ProfileView() {
	const currentUser = useCurrentUser();
	console.log(currentUser);
	if (!currentUser) {
		return "bro et oo kirjautunu sisää tms";
	}
	return (
		<StyleProfile>
			<Username>{currentUser.username}</Username>
			<Text>Age: *TÄHÄN TULEE IKÄ*</Text>
			<Text>
				Preferred fishing style: *TÄHÄN TULEE LEMPIKALASTUSTYYLI*
			</Text>
		</StyleProfile>
	);
}

export default ProfileView;
