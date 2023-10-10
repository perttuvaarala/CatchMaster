import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import "../Link.css";
import logo from "../assets/catchmaster-logo.png";
import Login from "../components/Login";

const StyledRoot = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	min-height: 100vh;
`;
const StyledNav = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	height: 5.5rem;
	align-items: center;
	width: 100%;
	background-color: #d8fbb8;
`;

const StyledFooter = styled.div`
	height: 2rem;
	background-color: #192113;
	color: white;
	text-align: center;
	padding: 0.5rem;
	margin-top: auto;
`;

const StyledContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

const StyledContent = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	max-width: 800px;
	border-radius: 1rem;
	border: 0.25rem solid black;
`;

function Root() {
	return (
		<StyledRoot>
			<link
				href="https://fonts.googleapis.com/css?family=Advent Pro"
				rel="stylesheet"
			></link>

			<StyledNav>
				<NavLink className="nav-link" to={"/"}>
					<div className="wrap">
						<div className="logo">
							<img
								src={logo}
								alt="CatchMaster logo"
								width="80%"
								height="100%"
							></img>
						</div>
						<div className="head">CatchMaster</div>
					</div>
				</NavLink>
				<div className="nav">
					<NavLink className="nav-link" to={"/"}>
						<u>Home</u>
					</NavLink>
					<NavLink className="nav-link" to={"/map"}>
						<u>Map</u>
					</NavLink>
					<NavLink className="nav-link" to={"/weather"}>
						<u>Weather</u>
					</NavLink>
					<NavLink className="nav-link" to={"/profile"}>
						<u>Profile</u>
					</NavLink>
					<Login />
				</div>
			</StyledNav>

			<StyledContentWrapper>
				<StyledContent>
					<Outlet />
				</StyledContent>
			</StyledContentWrapper>

			<StyledFooter>© 2023 Group 2, Inc.</StyledFooter>
		</StyledRoot>
	);
}

export default Root;
