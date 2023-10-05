import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

const Map = () => {
    const [position, setPosition] = useState<LatLngExpression | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                const { latitude, longitude } = location.coords;
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error(error.message);
            }
        );

    }, []);

    
    useEffect(() => {
        if (position === null) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [position]);

    return (
        <div>
            {loading ? (
                
                <p>Loading...</p>
            ) : position ? ( 
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "30rem", width: "60rem", margin: "2rem" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                
                <p>Unable to obtain location data.</p>
            )}
        </div>
    )
}

export default Map;