import styled from "styled-components";
import { AllPostsQuery, useAllPostsQuery } from "../grapqhl/AllPosts.generated";
import { FC } from "react";
import Image from "./Image";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import "../Link.css";

const StyledPost = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	width: 100%;
	padding: 1rem;
	border-radius: 1rem;
	border: 0.25rem solid black;
`;

const StyledBackground = styled.div`
	display: flex;
	flex-direction: column-reverse;
	gap: 1.5rem;
`;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: #48412f;
	padding: 0.25rem;
`;
const StyledPostPart = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: 1rem;
	background-color: hsl(43 21% 11% / 1);
	text-align: center;
	gap: 0.125rem;
`;

const StyledContent = styled.div`
	background-color: #d9d9d9;
	color: black;
	margin: 0.5rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 1rem;
	border-radius: 1rem;
	text-align: center;
`;

interface PostProps {
	post: AllPostsQuery["getAllPosts"][0];
}

const formatCoordinates = (
	latitude: number,
	longitude: number,
	decimalPlaces: number,
): string => {
	const latDirection = latitude >= 0 ? "N" : "S";
	const lonDirection = longitude >= 0 ? "E" : "W";

	const formattedLat = Math.abs(latitude).toFixed(decimalPlaces);
	const formattedLon = Math.abs(longitude).toFixed(decimalPlaces);

	return `${formattedLat}° ${latDirection}, ${formattedLon}° ${lonDirection}`;
};

const Post: FC<PostProps> = ({ post }) => {
	const timestamp: Date = new Date(post.timestamp);
	const formattedTimestamp = `${timestamp.getHours()}.${timestamp.getMinutes()}`;
	const formattedDate = `${timestamp.getDate()}.${
		timestamp.getMonth() + 1
	}.${timestamp.getFullYear()}`;

	const coords = formatCoordinates(post.lat, post.lon, 1);

	return (
		<StyledPost>
			<h3>{post.user.username}</h3>
			<StyledDiv>
				<div>
					<span>{formattedTimestamp}</span>
					<br />
					<span>{formattedDate}</span>
				</div>
				<div style={{ textAlign: "center" }}>
					<span>{coords}</span>
					<br />
					<span>{post.weatherCondition}</span>
				</div>
			</StyledDiv>
			<StyledContent>
				<p>{post.content}</p>
			</StyledContent>

			<StyledDiv>
				<StyledPostPart>
					<h4>
						<u>Fish</u>
					</h4>
					<StyledPostPart>
						<span>{post.fish.name}</span>
						<span>{post.weight}kg</span>
						<span>{post.lenght}cm</span>
					</StyledPostPart>
				</StyledPostPart>
				<Image src={post.imagelink as string} />
				<StyledPostPart>
					<h4>
						<u>Bait</u>
					</h4>
					<StyledPostPart>
						<span>{post.bait.name}</span>
						<span>{post.bait.brand}</span>
						<span>{post.bait.color}</span>
						<span>{post.bait.weight.toFixed(1)}g</span>
					</StyledPostPart>
				</StyledPostPart>
			</StyledDiv>
		</StyledPost>
	);
};

export default function Posts() {
	const user = useCurrentUser();
	const { loading, error, data } = useAllPostsQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (!data) return <p>Not found</p>;

	return (
		<StyledBackground>
			{data.getAllPosts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			{user && (
				<button className="plusbutton">
					<NavLink className="plusLink" to={"/NewPost"}>
						<u className="plusLink">+</u>
					</NavLink>
				</button>
			)}
		</StyledBackground>
	);
}
