import styled from "styled-components";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

const StyledProfile = styled.div`
	background-color: #48412f;
`;

const calculateAge = (d: string | null | undefined) => {
	if (!d) return "-";
	const birthDate = new Date(d);
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();

	if (
		currentDate <
		new Date(
			currentDate.getFullYear(),
			birthDate.getMonth(),
			birthDate.getDate(),
		)
	) {
		return age - 1;
	}

	return age;
};

function Profile() {
	const currentUser = useCurrentUser();

	return (
		<StyledProfile>
			{!currentUser && (
				<>
					<Text>Login using Google account!</Text>
				</>
			)}
			{currentUser && (
				<>
					<Username>{currentUser.username}</Username>
					<Text>Age: {calculateAge(currentUser.birthdate)}</Text>
					<Text>
						Favourite fishing style:{" "}
						{currentUser.favouriteFishingStyle}
					</Text>
				</>
			)}
		</StyledProfile>
	);
}
export default Profile;
