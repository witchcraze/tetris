Closes #41

This PR introduces ESLint to enforce code quality and consistency across the project.

- package.json:
  - Added ESLint and related TypeScript/Prettier dependencies.
  - Added `lint` and `lint:fix` scripts.
- .eslintrc.js:
  - Created ESLint configuration with TypeScript and Prettier integration.
- .eslintignore:
  - Configured ESLint to ignore `node_modules` and `dist` directories.
- tsconfig.json:
  - Added `lib` option to `compilerOptions` for ESLint to correctly parse browser globals.