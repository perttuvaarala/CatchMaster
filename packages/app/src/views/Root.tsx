import styled from "styled-components";
import { Outlet, NavLink, Link } from "react-router-dom";
import "../Link.css";
import logo from "../assets/catchmaster-logo.png";
import Login from "../components/Login";
import { useState } from "react";

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
	@media (max-width: 767px) {
		display: none;
	}
`;
const MobileNav = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	height: 5.5rem;
	align-items: center;
	width: 100%;
	background-color: #d8fbb8;
	@media (min-width: 768px) {
		display: none;
	}
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
`;

const year = new Date().getFullYear();

function Root() {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleToggleMenu = () => {
		setMenuOpen(!menuOpen);
	};
	const close = () => {
		setMenuOpen(false);
	};
	return (
		<StyledRoot>
			<StyledNav>
				<div className="wrap">
					<Link className="logo" to={"/"}>
						<img
							src={logo}
							alt="CatchMaster logo"
							width="80%"
							height="100%"
						></img>
					</Link>
					<Link className="head" to={"/"}>
						CatchMaster
					</Link>
				</div>
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
					<NavLink className="nav-link" to={"/about"}>
						<u>About</u>
					</NavLink>
					<Login />
				</div>
			</StyledNav>
			<MobileNav>
				<div className="wrap">
					<Link className="logo" to={"/"}>
						<img
							src={logo}
							alt="CatchMaster logo"
							width="80%"
							height="100%"
						></img>
					</Link>
					<Link className="head" to={"/"}>
						CatchMaster
					</Link>
				</div>

				<div className="nav">
					<div className="hamburger-menu">
						<div
							className="hamburger-icon"
							onClick={handleToggleMenu}
						>
							&#9776;
						</div>
						{menuOpen && (
							<div className="menu-links">
								<p className="close" onClick={close}>
									X
								</p>
								<Link to="/" onClick={close}>
									Home
								</Link>
								<Link to="/map" onClick={close}>
									Map
								</Link>
								<Link to="/weather" onClick={close}>
									Weather
								</Link>
								<Link to="/profile" onClick={close}>
									Profile
								</Link>
								<Link to="/about" onClick={close}>
									About
								</Link>
								<Login />
							</div>
						)}
					</div>
				</div>
			</MobileNav>

			<StyledContentWrapper>
				<StyledContent>
					<Outlet />
				</StyledContent>
			</StyledContentWrapper>

			<StyledFooter>© {year} Group 2, Inc.</StyledFooter>
		</StyledRoot>
	);
}

export default Root;
