import styled from "styled-components";
import {
	useUserLureBoxQuery,
	useGetAllBaitsQuery,
	useCreateNewBaitMutation,
	GetAllBaitsDocument,
} from "../components/LureBox/graphql/LureBox.generated";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import {
	StyledInput,
	StyledInputButton,
} from "../components/EditProfile/index";
import {
	CurrentUserDocument,
	useModifyCurrentUserMutation,
} from "../hooks/useCurrentUser/graphql/CurrentUser.generated";
import { router } from "../router";

const StyledNewBait = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #48412f;
	padding: 2rem;
	flex: 0;
	border-radius: 1rem;
	border: 0.25rem solid black;
`;

const StyledNewBaitForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const StyledSelect = styled.select`
	background-color: rgb(36 46 27);
	border: 1px solid rgb(6, 15, 13);
	border-radius: 0.5rem;
	height: 3rem;
	color: rgb(214, 232, 211);
	padding: 0px 1rem;
	font-size: 1rem;
	cursor: pointer;
`;

export const StyledButton = styled.button`
	background-color: transparent;
	padding: 0.75rem 0.25rem;
	margin: 0.75rem 0;
	border: 1px solid hsl(92 73% 60% / 1);
	color: hsl(92 73% 60% / 1);
	border-radius: 0.5rem;
	cursor: pointer;
	font-weight: 800;
	text-transform: uppercase;
	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
`;

const NewBaitForm = () => {
	const currentUser = useCurrentUser();
	const userID = currentUser?.id;
	

	const [newBaitName, setNewBaitName] = useState("");
	const [newBaitBrand, setNewBaitBrand] = useState("");
	const [newBaitColor, setNewBaitColor] = useState("");
	const [newBaitWeight, setNewBaitWeight] = useState(0);
	const [baitID, setBaitID] = useState("");
	const [createNewBait] = useCreateNewBaitMutation();
	const [addToBox] = useModifyCurrentUserMutation();

	const { data, loading, error } = useUserLureBoxQuery({
		skip: !userID,
		variables: {
			id: userID!,
		},
	});

	const {
		data: baitData,
		loading: baitLoading,
		error: baitError,
	} = useGetAllBaitsQuery();
	useEffect(() => {
        if (baitData) {
            const defbait = baitData.getAllBaits[0].id;
            setBaitID(defbait);
        }
    }, [baitData]);
	if (loading || baitLoading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (baitError) return `Error! ${baitError.message}`;
	if (!data || !baitData) return <p>Not found</p>;
	
	
	const handleNewBait = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createNewBait({
			variables: {
				name: newBaitName,
				brand: newBaitBrand,
				color: newBaitColor,
				weight: newBaitWeight,
			},
			onError: (e) => {
				console.error(e);
				alert("Error creating new bait");
			},
			onCompleted: (r) => {
				console.info(r);
				alert("New bait created successfully!");
			},
			refetchQueries: [GetAllBaitsDocument],
		});
	};

	const handleAddToBox = () => {
		addToBox({
			variables: {
				baitIDs: [
					...new Set([
						...data.getUserByID.baits.map((b) => b.id),
						baitID,
					]),
				],
			},
			onError: (e) => {
				console.error(e);
				alert("Error adding to lure box");
			},
			onCompleted: (r) => {
				console.info(r);
				alert("Added to your lure box!");
				router.navigate("/profile");
			},
			refetchQueries: [CurrentUserDocument],
		});
	};

	return (
		<>
			{" "}
			<StyledSelect
				onChange={(e) =>
					setBaitID(
						e.target.selectedIndex === baitData.getAllBaits.length
							? "newBait"
							: baitData.getAllBaits[e.target.selectedIndex].id,
					)
				}
			>
				{baitData.getAllBaits
					.concat({
						id: "newBait",
						name: "Create new bait",
						brand: "",
						color: "",
						weight: -1,
					})
					.map((bait) => (
						<option value={bait.name} key={bait.id}>
							{bait.name}
						</option>
					))}
			</StyledSelect>
			{baitID !== "newBait" && (
				<StyledButton onClick={handleAddToBox}>
					Add to your lure box
				</StyledButton>
			)}
			{baitID === "newBait" && (
				<StyledNewBaitForm onSubmit={handleNewBait}>
					<h2>Make a new bait:</h2>
					<label>Name</label>
					<StyledInput
						type="string"
						value={newBaitName}
						onChange={(e) => setNewBaitName(e.target.value)}
					></StyledInput>
					<label>Brand</label>
					<StyledInput
						type="string"
						value={newBaitBrand}
						onChange={(e) => setNewBaitBrand(e.target.value)}
					></StyledInput>
					<label>Color</label>
					<StyledInput
						type="string"
						value={newBaitColor}
						onChange={(e) => setNewBaitColor(e.target.value)}
					></StyledInput>
					<label>Weight</label>
					<StyledInput
						type="number"
						value={newBaitWeight}
						onChange={(e) =>
							setNewBaitWeight(parseInt(e.target.value))
						}
					></StyledInput>
					<StyledInputButton
						value={"Add new lure to global catalogue"}
						type="submit"
					></StyledInputButton>
				</StyledNewBaitForm>
			)}
		</>
	);
};

function NewBait() {
	return (
		<StyledNewBait>
			<NewBaitForm></NewBaitForm>
		</StyledNewBait>
	);
}

export default NewBait;
