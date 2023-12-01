import React, { useEffect, useRef, useCallback } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { MapProps } from "../../types";

// Styles for the container of the Google Map
const containerStyle = {
	width: "100%",
	height: "600px",
};

const Map: React.FC<MapProps> = ({ currentLocation, destinations }) => {
	// Loading the Google Maps script with the API key
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API!,
	});

	// Reference to hold the Google Maps instance
	const mapRef = useRef<google.maps.Map>();

	// Callback function to execute once the map is loaded
	const onLoad = useCallback(function callback(map: google.maps.Map) {
		mapRef.current = map;
	}, []);

	// Effect to update the map bounds based on the currentLocation and destinations
	useEffect(() => {
		if (mapRef.current) {
			const bounds = new window.google.maps.LatLngBounds();
			bounds.extend(currentLocation);
			destinations.forEach((destination) => {
				bounds.extend({ lat: destination.lat, lng: destination.lon });
			});
			mapRef.current.fitBounds(bounds);
		}
	}, [currentLocation, destinations]);

	// Render the map if the Google Maps script is loaded
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			onLoad={onLoad}
			center={currentLocation}
		>
			<MarkerF position={currentLocation} label="You" />
			{destinations.map((destination, index) => (
				<MarkerF
					key={index}
					position={{ lat: destination.lat, lng: destination.lon }}
					label={destination.applicant}
				/>
			))}
		</GoogleMap>
	) : (
		<div>Loading...</div> // Display loading message while map is being loaded
	);
};

export default React.memo(Map);
