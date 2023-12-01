export interface TruckData {
	lat: number;
	lon: number;
	applicant: string;
	address: string;
	foodItems: string;
	distance: string;
	duration: string;
	openNow?: boolean;
}

export interface Coordinate {
	lat: number;
	lng: number;
}

export interface MapProps {
	currentLocation: Coordinate;
	destinations: TruckData[];
}

export interface DestinationsTableProps {
	trucksData: TruckData[];
}
