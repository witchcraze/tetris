# Contributing to Tetris

We welcome contributions to the Tetris project! Here are some guidelines to help you get started.

## How to Contribute

1.  **Fork the repository:** Start by forking the Tetris repository to your GitHub account.
2.  **Clone your fork:** Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/YOUR_USERNAME/tetris.git
    cd tetris
    ```
3.  **Create a new branch:** Create a new branch for your feature or bug fix. Use a descriptive name.
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/your-bug-fix
    ```
4.  **Make your changes:** Implement your feature or fix the bug. Ensure your code adheres to the project's coding standards.
5.  **Test your changes:** Run the existing tests and add new tests for your changes if applicable.
    ```bash
    npm test
    ```
6.  **Commit your changes:** Write clear and concise commit messages.
    ```bash
    git commit -m "feat: Add new feature"
    # or
    git commit -m "fix: Fix bug in X"
    ```
7.  **Push to your fork:** Push your changes to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```
8.  **Create a Pull Request:** Open a Pull Request from your branch to the `main` branch of the original Tetris repository. Fill out the Pull Request template with all the necessary details.

## Code Style

We use ESLint and Prettier for code formatting and linting. Please ensure your code passes linting checks before submitting a Pull Request.

```bash
npm run lint
```

## Reporting Bugs

If you find a bug, please open an issue using the "Bug Report" template. Provide as much detail as possible, including steps to reproduce the bug, expected behavior, and your environment.

## Suggesting Features

If you have an idea for a new feature, please open an issue using the "Feature Request" template. Describe your idea clearly and explain why you think it would be a valuable addition to the project.

## Code of Conduct

We adhere to a Code of Conduct to ensure a welcoming and inclusive environment for all contributors. Please review it before contributing.

Thank you for contributing to Tetris!