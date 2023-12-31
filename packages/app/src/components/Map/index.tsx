import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useAllPostsQuery } from "../Posts/grapqhl/AllPosts.generated";
import logo from "../../assets/marker-icon-2x-red.png";
import blue from "../../assets/marker-icon-2x-blue.png";
import styled from "styled-components";
import "./index.css";

const StyledMarkerPopup = styled.div`
	background-color: #48412f;
	color: white;
	padding: 0.25rem;
	text-align: center;
	margin: 0;
`;

function Map() {
	const [position, setPosition] = useState<LatLngExpression | null>(null);
	const [wait, setLoading] = useState<boolean>(true);

	const redMarker = L.icon({
		iconUrl: logo,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
	});
	const blueMarker = L.icon({
		iconUrl: blue,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(location) => {
				const { latitude, longitude } = location.coords;
				setPosition([latitude, longitude]);
			},
			(error) => {
				console.error(error.message);
			},
		);
	}, []);

	useEffect(() => {
		if (position === null) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [position]);

	const { loading, error, data } = useAllPostsQuery();
	if (loading) return <p>Loading...</p>;
	if (error) return `Error! ${error.message}`;
	if (!data) return <p>Not found</p>;

	return (
		<div>
			{wait ? (
				<p>Loading...</p>
			) : position ? (
				<MapContainer
					center={position}
					zoom={13}
					scrollWheelZoom={true}
					style={{
						height: "30rem",
						width: "100%",
						margin: "2rem",
						maxWidth: "90%",
						borderRadius: "1rem",
					}}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position} icon={redMarker}>
						<Popup className=".leaflet-popup-content-wrapper">
							<StyledMarkerPopup>You are here</StyledMarkerPopup>
						</Popup>
					</Marker>
					{data.getAllPosts.map((post) => (
						<Marker icon={blueMarker} key={post.id} position={[post.lat, post.lon]}>
							<Popup className=".leaflet-popup-content-wrapper">
								<StyledMarkerPopup>
									<span>
										<b>Fish:</b>
									</span>
									<br />
									<span>{post.fish.name}</span>
									<br />
									<span>{post.weight}kg</span>
									<br />
									<span>{post.lenght}cm</span>
									<br />
									<br />
									<span>
										<b>Bait:</b>{" "}
									</span>
									<br />
									<span>{post.bait.name}</span>
									<br />
									<span>{post.bait.weight.toFixed(1)}g</span>
									<br />
									<span>Color: {post.bait.color}</span>
								</StyledMarkerPopup>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			) : (
				<p>Unable to obtain location data.</p>
			)}
		</div>
	);
}

export default Map;
