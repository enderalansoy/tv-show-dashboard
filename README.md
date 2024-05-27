# TV Show Dashboard

## Overview

This project is a TV Show Dashboard built with Vue.js, Vite, TypeScript and the TVMaze API. It allows users to search for TV shows, view detailed information about each show, and browse shows by genre. The application also includes a global toast notification system for user feedback.

## Architectural Decisions

### Framework and Libraries

- **Vue.js**: Chosen for its reactive and component-based architecture, which makes it easy to manage complex UIs. Also has great support for Typescript, and was the recommended framework for this project.
- **Vite**: Used as the build tool for its fast development server and optimized build process. Vite's native support for TypeScript and modern  standards makes it an ideal choice for a Vue.js project.
- **TypeScript**: Integrated for static typing, which helps catch errors early in the development process and improves code readability and maintainability.
- **Vue Router**: Utilized for managing navigation and routing within the application, providing a seamless user experience.
- **Axios**: Used for making HTTP requests to the TV show API. It is simple to use and integrates well with TypeScript.
- **DOMPurify**: Employed to sanitize HTML content and prevent XSS attacks, ensuring the application's security.
- **FontAwesome**: Integrated for using scalable vector icons, which improve the visual appeal of the application.
- **Vitest**: Chosen for unit testing due to its simplicity and seamless integration with Vite and Vue.js.
- **Playwright**: Chosen for end to end testing due to its ease of use and features.

### Component Structure

The project follows a modular component structure. Key components include:

- **BaseButton**: A reusable button component.
- **TextField**: A reusable input field with debounce functionality to prevent excessive API calls.
- **Spinner**: A loading spinner component to indicate loading states.
- **ShowList**: Displays a list of TV shows, either by genre or search results.
- **ShowCard**: A card component for individual TV shows, displaying the show's image and rating.
- **DetailHeader**: Header component for the detail view, including a back button and the show's title.
- **DetailItem**: Displays individual details of a TV show, such as genre, rating, premiered date, and language.
- **DetailSummary**: Displays the HTML summary of the TV show, sanitized to prevent XSS attacks.
- **EpisodeList**: Displays list of episodes, ordered by date.
- **EpisodeItem**: Displays details of the epidsode, including a toggleable summary section.
- **ToastContainer**: A global toast notification system for user feedback.

### Views

Above components and higher order components are used to display the two main views:

- **Home**: The dashboard homepage which shows lists of shows based on their genres.
- **Details**: A details page for each show that shows more information about the specifed show.

### Routes

- **Home**: `/`
- **Show Details**: `/show/:id`



### State Management

State management is handled using the Vue Composition API. Reactive references (`ref`) are used to manage component state, and the `watch` function is used to reactively handle search input changes.

## Project Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or later recommended). Verion used in this project is v22.2.0.
- **npm**: Node.js includes npm, which is used to manage dependencies. Version used in this project is v10.8.0.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd tv-show-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the application

1. **Development server**:

   Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173.

2. **Building for production**:

   Build the application for production:

   ```bash
   npm run build
   ```

   The built files will be in the `dist` directory.

3. **Preview production build locally**:

   You can run a preview of the production build on your local:

   ```bash
   npm run preview
   ```

### Testing

1. **Run unit tests**:

    You can run the unit tests using vitest:

    ```bash
    npm run test:unit
    ```

2. **Run end-to-end tests**:

    You can run the end-to-end tests using Playwright:
    
    ```bash
    npm run test:e2e
    ```

### Linting

  **Lint the code using ESLint**:

  ```bash
  npm run lint
  ```

### Formatting

  **Format the code using Prettier**:

  ```bash
  npm run format
  ```
