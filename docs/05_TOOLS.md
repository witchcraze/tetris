# Developer Tools for Tetris Game

This document outlines recommended tools and configurations to enhance your development experience when contributing to the Tetris Game project.

## 1. Code Editor

We recommend using **Visual Studio Code (VS Code)** as your primary code editor due to its extensive features and strong support for TypeScript and web development.

### Recommended VS Code Extensions:

*   **ESLint:** Integrates ESLint into VS Code, providing real-time feedback on code quality and style issues.
*   **Prettier - Code formatter:** Automatically formats your code to ensure consistent style across the project.
*   **TypeScript TSLint Plugin (Deprecated, use ESLint for TypeScript):** If you are still using TSLint, this provides integration. However, we recommend migrating to ESLint for TypeScript.
*   **Debugger for Chrome/Edge:** Debug your client-side JavaScript code directly from VS Code.

## 2. Linting and Formatting

We use **ESLint** for linting and **Prettier** for code formatting. These tools help maintain code quality and consistency.

### Running Linting and Formatting:

*   **Linting:**
    ```bash
    npm run lint
    ```
*   **Formatting:**
    ```bash
    npm run format
    ```

### VS Code Integration:

Ensure you have the ESLint and Prettier extensions installed. You can configure VS Code to format on save:

1.  Go to `File > Preferences > Settings` (or `Code > Preferences > Settings` on macOS).
2.  Search for `Format On Save` and enable it.
3.  Search for `Default Formatter` and set it to `esbenp.prettier-vscode`.

## 3. Debugging

### Client-Side Debugging (Browser):

For debugging the game in the browser, you can use the built-in developer tools of your browser (e.g., Chrome DevTools, Firefox Developer Tools). Alternatively, you can use the "Debugger for Chrome/Edge" VS Code extension to debug directly from your editor.

### Node.js Debugging (for build scripts/tests):

For debugging Node.js processes (e.g., Webpack build scripts, Jest tests), you can use VS Code's built-in Node.js debugger. Add a `launch.json` configuration to your `.vscode` folder.

## 4. Performance Profiling

For identifying performance bottlenecks in the game, use the performance profiling tools available in your browser's developer tools (e.g., Chrome DevTools Performance tab).

## 5. Version Control

We use **Git** for version control. Familiarize yourself with basic Git commands and our [Contribution Guidelines](CONTRIBUTING.md).

## 6. Package Manager

We use **npm** as our package manager. Ensure you have Node.js and npm installed.

## 7. Other Useful Tools

*   **GitHub CLI (gh):** For interacting with GitHub directly from your terminal. Useful for managing issues, pull requests, and more.
    ```bash
    sudo apt install gh # On Debian/Ubuntu
    brew install gh # On macOS
    ```

## Keeping Tools Updated

Regularly update your development tools and dependencies to benefit from the latest features, bug fixes, and security patches.

```bash
npm update
```
