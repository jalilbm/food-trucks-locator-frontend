import { useRef, useEffect, useState } from "react";
import ToggleTime from "../../components/ToggleTime";
import moment from "moment-timezone";
import Map from "../../components/Map";
import DestinationsTable from "../../components/DestinationsTable";
import { TruckData } from "../../types";
import { message } from "antd";

const Home: React.FC = () => {
	let checkboxRef = useRef<HTMLInputElement>(null);
	let selectedFetchLocation = useRef<string>("");
	const [messageApi, contextHolder] = message.useMessage();
	const [currentTime, setCurrentTime] = useState("");
	const [userLocation, setUserLocation] = useState<{
		lat: number | null;
		lon: number | null;
	}>({
		lat: null,
		lon: null,
	});
	const timezone = moment.tz.guess(); // This guesses the user's timezone
	const [manualLat, setManualLat] = useState("");
	const [manualLon, setManualLon] = useState("");
	const [nearTrucks, setNearTrucks] = useState<TruckData[]>([]);

	useEffect(() => {
		// Update the current time every second
		const timer = setInterval(() => {
			setCurrentTime(new Date().toISOString().slice(0, 16));
		}, 1000);

		// Clean up the interval on unmount
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		// Check if geolocation is available
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error getting location: ", error);
				}
			);
		} else {
			messageApi.open({
				type: "error",
				content: "Geolocation is not supported by this browser.",
			});
		}
	}, []);

	const fetchTrucksFromAPI = async () => {
		let url = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/food-trucks/`;

		if (selectedFetchLocation.current === "fetch-near-me") {
			// fetches based on locations near to you
			url += `?latitude=${userLocation.lat}&longitude=${userLocation.lon}`;
		} else {
			// fetches based on locations near to manual entered location
			url += `?latitude=${manualLat}&longitude=${manualLon}`;
		}

		if (checkboxRef.current!.checked) {
			url += `&time=${currentTime}&timezone=${timezone}`;
		}

		try {
			const response = await fetch(url);

			if (response.status === 200) {
				const data = await response.json();
				messageApi.open({
					type: "success",
					content: "Updated near trucks",
				});
				setNearTrucks(
					data.map((truck: any) => ({
						lat: truck.truck_details.latitude,
						lon: truck.truck_details.longitude,
						applicant: truck.truck_details.applicant,
						address: truck.truck_details.address,
						foodItems: truck.truck_details.food_items,
						distance: truck.distance,
						duration: truck.duration,
						openNow: checkboxRef.current!.checked,
					}))
				);
			} else {
				const errorData = await response.json();
				setNearTrucks([]);
				messageApi.open({
					type: "error",
					content: errorData.message,
				});
			}
		} catch (error) {
			if (error instanceof Error) {
				setNearTrucks([]);
				messageApi.open({
					type: "error",
					content: error.message,
				});
			} else {
				setNearTrucks([]);
				messageApi.open({
					type: "error",
					content: "An unknown error occurred.",
				});
			}
		}
	};

	useEffect(() => {
		// Function to handle checkbox state changes
		const handleCheckboxChange = () => {
			if (
				(userLocation.lon !== null && userLocation.lat !== null) ||
				(manualLat !== null && manualLon !== null)
			) {
				fetchTrucksFromAPI();
			}
		};

		// Event listener if the ref and the current element exist
		const checkbox = checkboxRef.current;
		if (checkbox) {
			checkbox.addEventListener("change", handleCheckboxChange);
		}

		// Clean-up function to remove the event listener
		return () => {
			if (checkbox) {
				checkbox.removeEventListener("change", handleCheckboxChange);
			}
		};
	}, [checkboxRef, userLocation, manualLat, manualLon]);

	const handleFloatInput = (
		value: string,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => {
		const floatRegex = /^-?[0-9]*\.?[0-9]*$/;
		if (value === "" || floatRegex.test(value)) {
			setValue(value);
		}
	};

	const handleFetch = (value: string) => {
		selectedFetchLocation.current = value;
		fetchTrucksFromAPI();
	};

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			{contextHolder}
			<div className="flex md:flex-row flex-col md:gap-5 gap-3 justify-center md:items-start px-3">
				<div className="md:flex block">
					<p>Current location: </p>
					<p className="text-green-700">
						{userLocation.lat || "NULL"}, {userLocation.lon || "NULL"}
					</p>
				</div>
				<div className="md:m-0 mx-auto">
					<ToggleTime ref={checkboxRef} />
				</div>
			</div>
			<div className="flex border-2 rounded-xl">
				<input
					type="text"
					inputMode="decimal"
					pattern="[0-9]*\.?[0-9]*"
					title="Latitude"
					className="max-w-[160px] border-0 h-10 px-5  rounded-lg text-sm focus:outline-none"
					placeholder="Manual Latitude"
					value={manualLat}
					onChange={(e) => handleFloatInput(e.target.value, setManualLat)}
				/>
				<input
					type="text"
					inputMode="decimal"
					pattern="[0-9]*\.?[0-9]*"
					title="Longitude"
					className="max-w-[160px] border-0 h-10 px-5  rounded-lg text-sm focus:outline-none"
					placeholder="Manual Longitude"
					value={manualLon}
					onChange={(e) => handleFloatInput(e.target.value, setManualLon)}
				/>
			</div>
			<div className="flex gap-3 px-3">
				<button
					name="fetch-near-me"
					className="w-[140px] bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
					disabled={userLocation.lat === null || userLocation.lon === null}
					onClick={() => handleFetch("fetch-near-me")}
				>
					Near me
				</button>

				<button
					name="fetch-location"
					className="w-[140px] bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
					disabled={manualLat === "" || manualLon === ""}
					onClick={() => handleFetch("fetch-location")}
				>
					Near location
				</button>
			</div>

			{nearTrucks.length > 0 && (
				<div className="w-full max-w-[900px] mt-12">
					<DestinationsTable trucksData={nearTrucks} />
				</div>
			)}

			<div className="w-full px-3 max-w-[900px] mb-10">
				<Map
					currentLocation={
						selectedFetchLocation.current === "fetch-near-me"
							? {
									lat: Number(userLocation!.lat),
									lng: Number(userLocation!.lon),
							  }
							: { lat: Number(manualLat!), lng: Number(manualLon!) }
					}
					destinations={nearTrucks}
				/>
			</div>
		</div>
	);
};

export default Home;
