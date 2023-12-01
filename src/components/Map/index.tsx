import React, { useEffect, useRef, useCallback } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { MapProps } from "../../types";

const containerStyle = {
	width: "100%",
	height: "600px",
};

const Map: React.FC<MapProps> = ({ currentLocation, destinations }) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API!,
	});

	const mapRef = useRef<google.maps.Map>();

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		mapRef.current = map;
	}, []);

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
		<div>Loading...</div>
	);
};

export default React.memo(Map);
