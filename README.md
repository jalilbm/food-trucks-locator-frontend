## 🚀 Project Overview

Welcome to the Food Truck Locator App, a creative solution designed for RAKT's "Out-of-the-Box" Engineering Challenge. This application is built using ReactJS with TypeScript, demonstrating my skills in modern web development. The app is designed to help users in San Francisco find nearby food trucks, providing an easy and fun way to explore local street food gems.

### Key Features:

- **Google Maps Integration**: Utilizes the Google Maps API for displaying locations.
- **Geolocation Support**: If permitted, the app can automatically fetch the user's current location.
- **Responsive Design**: Crafted with a mobile-first approach, ensuring a seamless experience across various devices.
- **Single Page Application**: No routing implemented, as all features are accessible within a single, user-friendly page.
- **Open Trucks Filter**: Option to display only currently open food trucks, with the caveat that this might limit or yield no results based on the UTC time conversion.
- **Manual Location Entry**: Users can manually enter latitude and longitude to find trucks near a specific location.
- **Interactive Map and Table Display**: Shows the chosen location and nearby trucks on a map, and detailed information in a table format.

### Technical Highlights:

- **Frontend Framework**: ReactJS with TypeScript for robust and scalable application structure.
- **Styling**: Combination of Tailwind CSS and Ant Design (antd) to demonstrate versatility in UI frameworks and design implementation.
- **No Backend Routing**: Opted for a frontend-centric approach, suitable for the simplicity and scope of the application.

### User Experience:

- **Location-Based Functionality**:
  - **Auto-Locate**: The app can auto-detect user location for nearby truck suggestions.
  - **Manual Input**: Latitude and longitude can be manually input for custom location searches.
- **Responsive and Informative Table**: Displays essential food truck information like name, address, food items, distance, and duration from the user's location.
- **Dynamic Map Visualization**: Showcases user-selected or auto-detected location and nearby trucks on an interactive map.

### Additional Features:

- **Walking Distance Calculation**: For an authentic local experience, the app calculates walking distance and duration from the user's location to the food trucks.
- **Error Handling for Non-Walkable Distances**: In scenarios where the user is too far from San Francisco, an appropriate error message is displayed.

## 🛠 Setup and Installation

To get the Food Truck Locator App up and running, follow these simple steps:

1.  **Clone the Repository**: Clone the project to your local machine

```bash
git clone https://github.com/jalilbm/food-trucks-locator-frontend.git
```

then

```bash
cd food-trucks-locator-frontend
```

2.  **Install Dependencies**: Run `npm install` to install the required dependencies.
3.  **Environment Variables**: The `.env` file is included for simplicity. The Google Maps API key will be provided separately via email.
4.  **Start the Application**: Execute `npm start` to run the app in development mode.

## 💌 Submission Notes

This project represents a combination of required functionalities and additional features that I incorporated to enhance the user experience and demonstrate my skills. While I adhered closely to the project requirements, I also took creative liberties to explore and implement features that add value to the application.

Thank you for considering my submission for RAKT's Engineering Challenge. I look forward to any feedback and the opportunity to discuss my work further.
