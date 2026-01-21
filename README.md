# Solmaré Stays

A modern real estate and booking platform for luxury stays, designed to provide an exceptional user experience for finding and booking premium properties.

## Tech Stack

This project is built with a modern frontend stack focused on performance and developer experience:

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Maps**: [Leaflet](https://leafletjs.com/) via `react-leaflet`
-   **Routing**: [React Router](https://reactrouter.com/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd solmarestays
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:8080` (or the port shown in your terminal).

## Project Structure

The project follows a standard Vite + React structure:

-   `src/pages`: Main application views (e.g., `Index.tsx`, `Collection.tsx`, `PropertyDetail.tsx`).
-   `src/components`: Reusable UI components.
    -   `ui`: Base components from shadcn/ui.
    -   `booking`: Booking-related components.
-   `src/hooks`: Custom React hooks.
-   `src/lib`: Utility functions and configurations.

## Features

-   **Property Collection**: Browse a curated list of luxury stays.
-   **Interactive Maps**: View property locations on an interactive map.
-   **Property Details**: Detailed views with images, descriptions, and amenities.
-   **Booking System**: Integrated booking widgets and calendar availability.
-   **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
