import styled from "styled-components";
import { useUserLureBoxQuery } from "./graphql/LureBox.generated";
import { Link } from "react-router-dom";

const BaitsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const StyledBait = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.75rem;
	border: 2px solid hsl(43 21% 10% / 1);
	border-radius: 0.5rem;
	background-color: rgba(0, 0, 0, 0.075);
`;

const StyledButton = styled(Link)`
	background-color: transparent;
	padding: 0.75rem 0.25rem;
	border: 1px solid hsl(92 73% 60% / 1);
	color: hsl(92 73% 60% / 1);
	border-radius: 0.5rem;
	cursor: pointer;
	font-weight: 800;
	text-transform: uppercase;
	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
	text-align: center;
`;

function LureBox({ userID }: { userID: string }) {
	const { data, loading, error } = useUserLureBoxQuery({
		variables: {
			id: userID,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (!data) return <p>Not found</p>;
	return (
		<BaitsWrapper>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h3>Lure box</h3>
				<StyledButton to={"/newbait"}>Add bait</StyledButton>
			</div>
			{data.getUserByID.baits.map((bait) => (
				<StyledBait>
					<h4>{bait.name}</h4>
					<span>{bait.brand}</span>
					<span>{bait.color}</span>
					<span>{bait.weight}g</span>
				</StyledBait>
			))}
		</BaitsWrapper>
	);
}

export default LureBox;
