import styled from "styled-components";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
	CurrentUserDocument,
	useModifyCurrentUserMutation,
} from "../../hooks/useCurrentUser/graphql/CurrentUser.generated";
import { useEffect, useState } from "react";

const KNOWN_FISHING_STYLES = [
	"Fly Fishing",
	"Ice Fishing",
	"Bass Fishing",
	"Saltwater Fishing",
	"Freshwater Fishing",
	"Surf Fishing",
	"Trolling",
	"Kayak Fishing",
	"Spearfishing",
	"Carp Fishing",
	"Trout Fishing",
	"Catfish Fishing",
	"Bank Fishing",
	"Deep-Sea Fishing",
	"Bowfishing",
	"Noodling (hand fishing)",
	"Tenkara Fishing",
	"Crappie Fishing",
	"Pike Fishing",
	"Lure Fishing",
	"Phishing",
];

const StyledEditProfile = styled.div``;

export const StyledInputButton = styled.input`
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

export const StyledInput = styled.input`
	background-color: rgb(36 46 27);
	border: 1px solid rgb(6, 15, 13);
	border-radius: 0.5rem;
	height: 3rem;
	color: rgb(214, 232, 211);
	padding: 0px 1rem;
	font-size: 1rem;
`;

export const StyledSelect = styled.select`
	background-color: rgb(36 46 27);
	border: 1px solid rgb(6, 15, 13);
	border-radius: 0.5rem;
	height: 3rem;
	color: rgb(214, 232, 211);
	padding: 0px 1rem;
	font-size: 1rem;
	cursor: pointer;
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.75rem;
	border: 2px solid hsl(43 21% 10% / 1);
	border-radius: 0.5rem;
	background-color: rgba(0, 0, 0, 0.075);
	${StyledInputButton} {
		margin-top: 0.75rem;
	}
`;

const parseDumbDate = (d: string | null | undefined) => {
	if (!d) return "";
	const date = new Date(d);
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

function EditProfile() {
	const currentUser = useCurrentUser();
	const [modifyUser] = useModifyCurrentUserMutation();

	const [username, setUserName] = useState(currentUser?.username || "");
	const [birthdate, setBirthdate] = useState(
		parseDumbDate(currentUser?.birthdate),
	);
	const [favoriteFishingStyle, setFavoriteFishingStyle] = useState(
		currentUser?.favouriteFishingStyle || "",
	);
	const [baitsIds, setBaitIds] = useState<string[]>(
		currentUser?.baits?.map((b) => b.id) || [],
	);

	useEffect(() => {
		setUserName(currentUser?.username || "");
		setBirthdate(parseDumbDate(currentUser?.birthdate));
		setFavoriteFishingStyle(currentUser?.favouriteFishingStyle || "");
		setBaitIds(currentUser?.baits?.map((b) => b.id) || []);
	}, [currentUser]);

	if (!currentUser) return null;

	const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		modifyUser({
			variables: {
				username: username || null,
				birthdate: birthdate ? new Date(birthdate).toISOString() : null,
				favouriteFishingStyle: favoriteFishingStyle || null,
				baitIDs: baitsIds,
			},
			onError: (e) => {
				console.error(e);
				alert("Error updating user!");
			},
			onCompleted: (r) => {
				console.info(r);
				alert("User updated successfully!");
			},
			refetchQueries: [CurrentUserDocument],
		});
	};

	return (
		<StyledEditProfile>
			<h3>Edit Your information:</h3>
			<StyledForm onSubmit={handleEditUser}>
				<label>Username</label>
				<StyledInput
					type="string"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
				></StyledInput>
				<label>Birthdate</label>
				<StyledInput
					type="date"
					value={birthdate}
					onChange={(e) => setBirthdate(e.target.value)}
					max={new Date().toISOString().split("T")[0]}
				></StyledInput>
				<label>Favourite fishing style</label>
				<StyledSelect
					onChange={(e) =>
						setFavoriteFishingStyle(
							KNOWN_FISHING_STYLES[e.target.selectedIndex],
						)
					}
				>
					{KNOWN_FISHING_STYLES.map((style, i) => (
						<option
							value={style}
							key={i}
							selected={
								favoriteFishingStyle === KNOWN_FISHING_STYLES[i]
							}
						>
							{style}
						</option>
					))}
				</StyledSelect>
				<StyledInputButton
					type="submit"
					value={"save changes"}
				></StyledInputButton>
			</StyledForm>
		</StyledEditProfile>
	);
}

export default EditProfile;
