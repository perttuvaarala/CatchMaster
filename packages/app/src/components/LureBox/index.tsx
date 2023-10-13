import styled from "styled-components";
import { useUserLureBoxQuery } from "./graphql/LureBox.generated";
import { Link } from "react-router-dom";
import image from "../../assets/trashcan.png";
import {
	CurrentUserDocument,
	useModifyCurrentUserMutation,
} from "../../hooks/useCurrentUser/graphql/CurrentUser.generated";

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

const StyledLink = styled(Link)`
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
const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const StyledBaitInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const StyledDeleteButton = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
	background-color: #d9d9d9;
	border-radius: 0.25rem;
	&:hover {
		background-color: white;
	}
`;

function LureBox({ userID }: { userID: string }) {
	const [modifyUser] = useModifyCurrentUserMutation();
	const { data, loading, error } = useUserLureBoxQuery({
		variables: {
			id: userID,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (!data) return <p>Not found</p>;

	const handleDelete = (id: string) => {
		const updatedBaits = data.getUserByID.baits
			.filter((bait: { id: string }) => bait.id !== id)
			.map((bait: { id: string }) => bait.id);

		modifyUser({
			variables: {
				baitIDs: updatedBaits,
			},
			onCompleted: () => {
				alert("Bait deleted");
			},
			onError: () => {
				alert("Error");
			},
			refetchQueries: [CurrentUserDocument],
		});
	};

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
				<StyledLink to={"/newbait"}>Add bait</StyledLink>
			</div>
			{data.getUserByID.baits.map((bait) => (
				<StyledBait key={bait.id}>
					<StyledDiv>
						<StyledBaitInfo>
							<h4 style={{ margin: "0.25rem", marginLeft: "0" }}>
								{bait.name}
							</h4>
							<span>{bait.brand}</span>
							<span>{bait.color}</span>
							<span>{bait.weight}g</span>
						</StyledBaitInfo>
						<StyledDeleteButton
							src={image}
							alt="delete"
							onClick={() => handleDelete(bait.id)}
						></StyledDeleteButton>
					</StyledDiv>
				</StyledBait>
			))}
		</BaitsWrapper>
	);
}

export default LureBox;
