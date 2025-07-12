# Development Environment Setup for Tetris Game

This document provides detailed instructions on how to set up your development environment for the Tetris Game project.

## 1. Prerequisites

Before you begin, ensure you have the following software installed on your system:

*   **Node.js:** Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm:** Node.js Package Manager, which comes bundled with Node.js.
*   **Git:** For version control. You can download it from [git-scm.com](https://git-scm.com/).

## 2. Installation Procedure

Follow these steps to get the project up and running on your local machine:

### 2.1. Clone the Repository

First, clone the Tetris Game repository from GitHub:

```bash
git clone https://github.com/witchcraze/tetris.git
cd tetris
```

### 2.2. Install Dependencies

Navigate into the project directory and install the necessary Node.js dependencies using npm:

```bash
npm install
```

This command will read the `package.json` file and install all required packages listed under `dependencies` and `devDependencies`.

## 3. Environment Variable Settings

Currently, this project does not require any specific environment variables to be set for local development. All configurations are handled within the source code or build process.

## 4. Starting the Application

To start the development server and view the game in your browser, run the following command:

```bash
npm start
```

This will:

*   Compile the TypeScript code.
*   Bundle the assets using Webpack.
*   Start a local development server (usually at `http://localhost:8080/`).

Open your web browser and navigate to the address provided by the development server to see the game running.

## 5. Docker Development Environment Setup

For a consistent and isolated development environment, you can use Docker. Ensure you have Docker installed on your system.

### 5.1. Build and Run with Docker Compose

Navigate to the project root directory and run the following command:

```bash
npm run docker:start
```

This command will:

*   Build the Docker image (if not already built).
*   Start the Docker container.
*   Map port 8080 from the container to your host machine.

Once the container is running, open your web browser and navigate to `http://localhost:8080/` to see the game.

### 5.2. Stopping the Docker Environment

To stop the Docker containers, press `Ctrl+C` in the terminal where `npm run docker:start` is running. To remove the containers and networks, run:

```bash
docker-compose down
```

## 6. Building for Production

To create a production-ready build of the game, use the following command:

```bash
npm run build
```

This command will:

*   Compile and bundle the project into the `dist/` directory.
*   Optimize the code for performance and size.

The `dist/` directory will contain all the necessary files to deploy your game.

## 6. Running Tests

To run the automated tests for the project, use:

```bash
npm test
```

This will execute all tests defined using Jest.

## 7. Troubleshooting

### Common Issues and Solutions:

*   **`npm install` fails due to network issues:** Check your internet connection or proxy settings.
*   **`npm start` or `npm run build` fails with compilation errors:** Ensure all dependencies are installed (`npm install`) and that there are no TypeScript compilation errors (check your editor's error messages).
*   **Game not loading in browser:** Verify that the development server is running and that you are accessing the correct URL (e.g., `http://localhost:8080/`). Check your browser's developer console for any errors.

If you encounter any issues not covered here, please refer to our [Developer FAQ](docs/FAQ.md) or open an [Issue](https://github.com/witchcraze/tetris/issues) on GitHub.
