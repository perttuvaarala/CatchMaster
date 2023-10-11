import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useAllPostsQuery } from "../grapqhl/AllPosts.generated";
import logo from "../assets/marker-icon-2x-red.png";

function Map() {
	const [position, setPosition] = useState<LatLngExpression | null>(null);
	const [wait, setLoading] = useState<boolean>(true);

	const redMarker = L.icon({
		iconUrl: logo,
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
						<Popup>You are here</Popup>
					</Marker>
					{data.getAllPosts.map((post) => (
						<Marker key={post.id} position={[post.lat, post.lon]}>
							<Popup>
								<div style={{ textAlign: "center" }}>
									<p>
										<b>{post.fish.name}</b>
									</p>
									<p>{post.weight}kg</p>
									<p>{post.lenght}cm</p>
								</div>
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
