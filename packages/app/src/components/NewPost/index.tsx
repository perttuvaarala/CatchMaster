import { ChangeEvent, FormEvent, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
	AllPostsDocument,
	useCreatePostMutation,
} from "../Posts/grapqhl/AllPosts.generated";
import {
	useGetAllBaitsQuery,
	useUserLureBoxQuery,
} from "../LureBox/graphql/LureBox.generated";
import { useGetAllFishQuery } from "./graphql/Fish.generated";
import { StyledForm, StyledInput, StyledSelect } from "../EditProfile";
import { StyledButton } from "../../views/newBait";
import axios from "axios";
import weatherCodes from "../Weather/weatherCodes.json";
import { router } from "../../router";

const NewPost: React.FC = () => {
	const [length, setLength] = useState(0);
	const [weight, setWeight] = useState(0);
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");

	let weather: string = "";

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
	const defbait = baitData.getAllBaits[0].id;
	const deffish = fishData.getAllFish[0].id;
	const [baitID, setBaitID] = useState(defbait);
	const [fishID, setFishID] = useState(deffish);
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
		const position = await getCurrentLocation();
		const { latitude, longitude } = position.coords;

		const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weathercode`;
		await axios
			.get(apiUrl)
			.then((response) => {
				weather =
					weatherCodes[
						("" +
							response.data.current.weathercode +
							"") as keyof typeof weatherCodes
					];
			})
			.catch((error) => {
				throw new Error(
					"Error fetching weather data: " + error?.message,
				);
			});
			
			

		try {
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
					weatherCondition: weather || "",
				},
				onError: (e) => {
					console.error(e);
					alert("Error creating post!");
				},
				onCompleted: (r) => {
					console.info(r);
					alert("Post created successfully!");
					router.navigate("/");
				},
				refetchQueries: [AllPostsDocument],
			});
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
			<label htmlFor="length">Length in cm:*</label>
			<StyledInput
				type="number"
				id="length"
				value={length}
				onChange={handleLengthChange}
			/>
			<label htmlFor="weight">Weight in kg:*</label>
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
				maxLength={280}
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
