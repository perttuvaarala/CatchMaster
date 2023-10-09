import styled from "styled-components";

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	text-align: center;
	padding: 2rem;
`;

const StyledSpan = styled.span`
	margin-right: 0.625rem;
`;

const StyledAuthorImage = styled.img`
	width: 20px;
	height: 20px;
`;

function About() {
	return (
		<StyledBox>
			<h1>About</h1>
			<p>
				Welcome to Catchmaster, your ultimate fishing companion! We
				understand that fishing isn't just a hobby; it's a passion, a
				way of life.
			</p>
			<p>
				Our app is designed to unite anglers from all walks of life,
				creating a vibrant community where you can share your fishing
				triumphs with fellow enthusiasts. Whether you've reeled in a
				trophy-sized bass, a colorful trout, or a feisty marlin,
				Catchmaster is your platform to showcase your prized catches.
				With a photo and a few words to capture the moment, you can
				connect with like-minded individuals, learn new techniques, and
				celebrate the thrill of the catch together.
			</p>
			<p>
				Join us at Catchmaster, just log in easily with your Google
				account and start sharing your fishing adventures today!
			</p>
			<p>Our group is composed of the following members:</p>
			<ul>
				<div>
					<StyledSpan>Adnan Avni</StyledSpan>
					<a href="https://www.instagram.com/adnanavni">
						<StyledAuthorImage
							src="https://img.icons8.com/ios/50/instagram-new--v1.png"
							alt="instagram"
						/>
					</a>
					<a href="https://github.com/adnanavni">
						<StyledAuthorImage
							src="https://img.icons8.com/material-outlined/24/github.png"
							alt="github"
						/>
					</a>
				</div>

				<div>
					<StyledSpan>Perttu Vaarala</StyledSpan>
					<a href="https://www.instagram.com/perttuvaarala/">
						<StyledAuthorImage
							src="https://img.icons8.com/ios/50/instagram-new--v1.png"
							alt="instagram"
						/>
					</a>
					<a href="https://github.com/perttuvaarala">
						<StyledAuthorImage
							src="https://img.icons8.com/material-outlined/24/github.png"
							alt="github"
						/>
					</a>
				</div>

				<div>
					<StyledSpan>Henri Vuento</StyledSpan>
					<a href="https://www.instagram.com/henqqz/">
						<StyledAuthorImage
							src="https://img.icons8.com/ios/50/instagram-new--v1.png"
							alt="instagram"
						/>
					</a>
					<a href="https://github.com/moikonna">
						<StyledAuthorImage
							src="https://img.icons8.com/material-outlined/24/github.png"
							alt="github"
						/>
					</a>
				</div>

				<div>
					<StyledSpan>Roope Kylli</StyledSpan>
					<a href="https://www.instagram.com/roopek_">
						<StyledAuthorImage
							src="https://img.icons8.com/ios/50/instagram-new--v1.png"
							alt="instagram"
						/>
					</a>
					<a href="https://github.com/roopeky">
						<StyledAuthorImage
							src="https://img.icons8.com/material-outlined/24/github.png"
							alt="github"
						/>
					</a>
				</div>
			</ul>
			<p>
				Catchmaster was made in Web Development 2 course at Metropolia
				University of Applied Sciences by Group 2
			</p>
		</StyledBox>
	);
}

export default About;
