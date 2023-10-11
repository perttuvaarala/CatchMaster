import { ChangeEvent, FormEvent, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
	CreatePostDocument,
	useCreatePostMutation,
} from "../../grapqhl/AllPosts.generated";
import {
	useGetAllBaitsQuery,
	useUserLureBoxQuery,
} from "../LureBox/graphql/LureBox.generated";
import { useGetAllFishQuery } from "./graphql/Fish.generated";
import { StyledForm, StyledInput, StyledSelect } from "../EditProfile";
import { StyledButton } from "../../views/newBait";

const NewPost: React.FC = () => {
	const [length, setLength] = useState(0);
	const [weight, setWeight] = useState(0);
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	const [baitID, setBaitID] = useState("651c1094231992254e2d4c3e");
	const [fishID, setFishID] = useState("6526680a31a5f08221d5c342");

	const currentUser = useCurrentUser();
	const [CreatePost] = useCreatePostMutation();
	const userID = currentUser?.id;
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
	const {
		data: fishData,
		loading: fishLoading,
		error: fishError,
	} = useGetAllFishQuery();

	if (loading || baitLoading || fishLoading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (baitError) return `Error! ${baitError.message}`;
	if (fishError) return `Error! ${fishError.message}`;
	if (!data || !baitData || !fishData) return <p>Not found</p>;

	const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setLength(value);
	};

	const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setWeight(value);
	};
	const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const position = await getCurrentLocation();
			const { latitude, longitude } = position.coords;
			CreatePost({
				variables: {
					lon: longitude || 0,
					lat: latitude || 0,
					lenght: length || 0,
					weight: weight || 0,
					content: content || "",
					imagelink: image || "",
					baitID: baitID || "",
					userID: currentUser?.id || "",
					fishID: fishID || "",
				},
				onError: (e) => {
					console.error(e);
					console.log(fishID);
				},
				onCompleted: (r) => {
					console.info(r);
					console.log(fishID);
				},
				refetchQueries: [CreatePostDocument],
			});
			console.log(currentUser?.username);
			console.log("Length:", length);
			console.log("Weight:", weight);
			console.log("Content:", content);
			console.log("fishID:", fishID);
			console.log("Image:", image);
			console.log("Latitude:", latitude);
			console.log("Longitude:", longitude);
			console.log(baitID);
		} catch (e) {
			console.error("Error getting location:", e);
		}
	};

	const getCurrentLocation = (): Promise<GeolocationPosition> =>
		new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(
					new Error("Geolocation is not supported by your browser."),
				);
			} else {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			}
		});

	return (
		<StyledForm onSubmit={handleSubmit}>
			<label htmlFor="length">Length:*</label>
			<StyledInput
				type="number"
				id="length"
				value={length}
				onChange={handleLengthChange}
			/>
			<label htmlFor="weight">Weight:*</label>
			<StyledInput
				type="number"
				id="weight"
				value={weight}
				onChange={handleWeightChange}
			/>
			<label htmlFor="Content">Description:*</label>
			<StyledInput
				type="text"
				id="Content"
				value={content}
				onChange={handleContentChange}
			/>

			<label htmlFor="image">Image link:</label>
			<StyledInput
				type="text"
				id="image"
				value={image}
				onChange={handleImageChange}
			/>
			<label htmlFor="bait">Bait*</label>
			<StyledSelect
				onChange={(e) =>
					setBaitID(baitData.getAllBaits[e.target.selectedIndex].id)
				}
			>
				{baitData.getAllBaits.map((bait) => (
					<option value={bait.name} key={bait.id}>
						{bait.name}
					</option>
				))}
			</StyledSelect>
			<label htmlFor="fish">Fish:*</label>
			<StyledSelect
				onChange={(e) =>
					setFishID(fishData.getAllFish[e.target.selectedIndex].id)
				}
			>
				{fishData.getAllFish.map((fish) => (
					<option value={fish.name} key={fish.id}>
						{fish.name}
					</option>
				))}
			</StyledSelect>
			<StyledButton type="submit">Submit</StyledButton>
		</StyledForm>
	);
};

export default NewPost;
