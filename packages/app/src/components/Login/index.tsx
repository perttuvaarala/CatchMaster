import { FC } from "react";
import styled from "styled-components";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const StyledLoginContainer = styled.div``;

const StyledUsername = styled.span`
	color: black;
`;

const StyledLoginButton = styled.button`
	color: white;
	background-color: transparent;
	border: 2px solid black;
	border-radius: 5px;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	background: #192112;
`;

const StyledLogoutButton = styled.button`
	color: white;
	background-color: transparent;
	border: 2px solid black;
	border-radius: 5px;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	background: #192112;
	margin-left: 0.5rem;
`;

const Login: FC = () => {
	const currentUser = useCurrentUser();

	const login = () => {
		window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
	};

	const logout = () => {
		window.open(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, "_self");
	};

	return (
		<StyledLoginContainer>
			{currentUser && (
				<div>
					<StyledUsername>
						Logged in as {currentUser.username}
					</StyledUsername>
					<StyledLogoutButton onClick={() => logout()}>
						Logout
					</StyledLogoutButton>
				</div>
			)}
			{!currentUser && (
				<StyledLoginButton onClick={() => login()}>
					Login with Google
				</StyledLoginButton>
			)}
		</StyledLoginContainer>
	);
};

export default Login;
