import styled from "styled-components";
import { AllPostsQuery, useAllPostsQuery } from "../grapqhl/AllPosts.generated";
import { FC } from "react";
import Image from "./Image";
import "../Link.css";
import { NavLink } from "react-router-dom";

const StyledPost = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	width: 60%;
	height: auto;
	max-height: 40rem;
	margin: 1rem;
	padding: 1rem;
	border-radius: 1rem;
`;

const StyledBackground = styled.div`
	display: flex;
	flex-direction: column-reverse;
	background-color: #48412f;
`;

interface PostProps {
	post: AllPostsQuery["getAllPosts"][0];
}

const Post: FC<PostProps> = ({ post }) => {
	const timestamp: Date = new Date(post.timestamp);
	const formattedTimestamp = `${timestamp.getHours()}.${timestamp.getMinutes()}`;
	const formattedDate = `${timestamp.getDate()}.${
		timestamp.getMonth() + 1
	}.${timestamp.getFullYear()}`;
	return (
		<StyledPost>
			<h3>{post.user.username}</h3>
			<p>Time: {formattedTimestamp}</p>
			<p>Date: {formattedDate}</p>
			<p>
				Lon: {post.lon} lat: {post.lat}
			</p>
			<div
				style={{
					backgroundColor: "white",
					color: "black",
					margin: "1rem",
					padding: "1rem",
					borderRadius: "1rem",
				}}
			>
				<p>{post.content}</p>
			</div>
			<Image src={post.imagelink} />
		</StyledPost>
	);
};

export default function Posts() {
	const { loading, error, data } = useAllPostsQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (!data) return <p>Not found</p>;

	return (
		<StyledBackground>
			{data.getAllPosts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			<button className="plusbutton">
				<NavLink className="plusLink" to={"/NewPost"}>
					<u className="plusLink">+</u>
				</NavLink>
			</button>
		</StyledBackground>
	);
}
