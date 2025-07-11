# Detailed Contribution Guidelines for Tetris Game

This document provides detailed guidelines for contributing to the Tetris Game project. It expands upon the basic information in `CONTRIBUTING.md` and aims to ensure a smooth and consistent development process.

## 1. Getting Started

Before you start contributing, please ensure you have read and understood the following:

*   **[Project Overview](docs/00_PROJECT_OVERVIEW.md):** Understand the project's purpose, goals, and scope.
*   **[Development Environment Setup](docs/04_SETUP.md):** Set up your local development environment.
*   **[Developer Tools](docs/05_TOOLS.md):** Familiarize yourself with recommended tools and configurations.

## 2. Workflow

We follow a **GitHub Flow** branching strategy. All development work should originate from a GitHub Issue.

### 2.1. Issue-Driven Development

1.  **Find or Create an Issue:** All work must be tied to an existing GitHub Issue. If no relevant issue exists, please create one using the appropriate template (Bug Report or Feature Request).
2.  **Assign Yourself (Optional):** If you plan to work on an issue, you can assign yourself to it to indicate that it's being actively worked on.
3.  **Create a New Branch:** Create a new branch from the `main` branch for your changes. The branch name should follow the convention: `{issue_number}-{kebab-case-issue-title}`.
    *   Example: `123-implement-new-feature`

### 2.2. Making Changes

1.  **Implement and Test:** Write your code, ensuring it adheres to our [Coding Standards](docs/02_CODING_STANDARDS.md) and is well-tested according to our [Testing Guidelines](docs/03_TESTING_GUIDELINES.md).
2.  **Run Linters and Formatters:** Before committing, ensure your code passes linting and formatting checks.
    ```bash
    npm run lint
    npm run format
    ```
3.  **Write Clear Commit Messages:** Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for your commit messages. This helps in generating changelogs and understanding the history.
    *   **Format:** `<type>(<scope>): <description>`
    *   **Example:** `feat(game): Add new scoring system`
    *   **Types:** `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting, no code change), `refactor` (code refactoring), `test` (adding tests), `chore` (build process or auxiliary tools changes).

### 2.3. Submitting a Pull Request (PR)

1.  **Push Your Branch:** Push your local branch to your forked repository.
2.  **Create a Pull Request:** Open a Pull Request from your branch to the `main` branch of the original repository.
3.  **Fill out the PR Template:** Provide a clear title and description, linking to the relevant Issue (e.g., `Closes #123`).
4.  **Request Review:** Request reviews from appropriate team members. Refer to our [Code Review Guidelines](docs/06_CODE_REVIEW_GUIDELINES.md).
5.  **Address Feedback:** Respond to and address all review comments. Make necessary changes and push new commits to your PR branch.

## 3. Code Style and Quality

*   **[Coding Standards](docs/02_CODING_STANDARDS.md):** Adhere to our defined coding standards for consistency.
*   **[Testing Guidelines](docs/03_TESTING_GUIDELINES.md):** Ensure your changes are adequately tested.
*   **[Code Review Guidelines](docs/06_CODE_REVIEW_GUIDELINES.md):** Understand how code reviews are conducted and what is expected.

## 4. Reporting Issues

*   **Bugs:** Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md).
*   **Feature Requests:** Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 5. Security

If you discover a security vulnerability, please report it responsibly. Refer to our [SECURITY.md](SECURITY.md) for details on how to report security issues.

## 6. Code of Conduct

We are committed to fostering an open and welcoming environment. Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).
