# Code Review Guidelines for Tetris Game

This document outlines the guidelines for conducting and participating in code reviews for the Tetris Game project. The goal of code reviews is to improve code quality, share knowledge, and ensure consistency across the codebase.

## 1. Purpose of Code Reviews

Code reviews serve several important purposes:

*   **Improve Code Quality:** Identify bugs, potential issues, and areas for improvement.
*   **Knowledge Sharing:** Disseminate knowledge about the codebase and best practices among team members.
*   **Maintain Consistency:** Ensure adherence to coding standards, design principles, and architectural patterns.
*   **Mentorship:** Provide opportunities for less experienced developers to learn from more experienced ones.
*   **Security:** Identify potential security vulnerabilities.

## 2. Code Review Process

1.  **Developer Creates Pull Request (PR):** After completing a feature or bug fix, the developer creates a Pull Request targeting the `main` branch.
2.  **Automated Checks:** CI/CD pipelines (if configured) will run automated checks (linting, tests, etc.). Ensure these pass before requesting a review.
3.  **Request Review:** The developer requests reviews from one or more designated reviewers.
4.  **Reviewer Feedback:** Reviewers examine the code and provide constructive feedback through PR comments.
5.  **Developer Addresses Feedback:** The developer addresses the feedback, makes necessary changes, and pushes new commits to the PR branch.
6.  **Approval and Merge:** Once all feedback is addressed and reviewers approve, the PR can be merged into `main`.

## 3. What to Look For During a Review

Reviewers should consider the following aspects:

*   **Correctness:** Does the code work as intended? Does it address the Issue it's supposed to fix or implement the feature correctly?
*   **Readability and Maintainability:** Is the code easy to understand? Is it well-structured, and are variable/function names clear? Are there appropriate comments for complex logic?
*   **Adherence to Standards:** Does the code follow the project's [Coding Standards](docs/02_CODING_STANDARDS.md) and [Testing Guidelines](docs/03_TESTING_GUIDELINES.md)?
*   **Efficiency and Performance:** Are there any obvious performance bottlenecks or inefficient algorithms?
*   **Security:** Are there any potential security vulnerabilities introduced or overlooked?
*   **Error Handling:** Is error handling robust and appropriate?
*   **Test Coverage:** Are new tests added for new features or bug fixes? Do existing tests cover the changes adequately?
*   **Edge Cases:** Are edge cases considered and handled correctly?
*   **Unintended Side Effects:** Does the change introduce any unintended side effects on other parts of the system?
*   **Documentation:** Is relevant documentation (e.g., `README.md`, `docs/`) updated to reflect the changes?

## 4. Providing Constructive Feedback

*   **Be Specific:** Refer to specific lines of code when making comments.
*   **Be Objective:** Focus on the code, not the person.
*   **Be Constructive:** Suggest solutions or alternatives, rather than just pointing out problems.
*   **Be Kind and Respectful:** Maintain a positive and supportive tone.
*   **Explain Your Reasoning:** Briefly explain *why* you are suggesting a change.

## 5. Addressing Review Feedback

*   **Understand the Feedback:** Ensure you fully understand the reviewer's comments. Ask for clarification if needed.
*   **Respond to All Comments:** Even if you disagree, acknowledge each comment. Explain your reasoning if you decide not to implement a suggestion.
*   **Make Changes:** Implement the agreed-upon changes.
*   **Push New Commits:** Push your updated code to the PR branch. The PR will automatically update.

## 6. Reviewer Assignment

To ensure effective and fair code reviews, we will follow these guidelines for assigning reviewers:

*   **Code Ownership:** The primary reviewer should be someone familiar with the changed codebase or module. This ensures expertise in the area being modified.
*   **Rotation for Knowledge Sharing:** To promote knowledge sharing and cross-functional understanding, a secondary reviewer can be assigned on a rotating basis, especially for larger changes or new features.
*   **Team Lead/Architect Review:** For critical changes, architectural decisions, or major new features, the team lead or a designated architect should be included in the review.
*   **Automated Assignment (Future):** We aim to implement automated reviewer assignment based on code ownership or a round-robin system in the future, using tools like GitHub's CODEOWNERS file or review assignment bots.
*   **Self-Assignment:** Developers can self-assign reviewers if they have a specific person in mind who has relevant expertise or has worked on related features.

**How to Request Reviews:**
When creating a Pull Request, use the "Reviewers" section in GitHub to explicitly request reviews from the appropriate individuals or teams.

## 7. Automation Tools

We use the following automation tools to assist with code quality:

*   **ESLint:** For static code analysis and identifying stylistic issues and potential errors.
*   **Prettier:** For automated code formatting.
*   **Jest:** For running unit and integration tests.

Ensure these tools are configured and integrated into your development workflow. Refer to the [Developer Tools Guide](docs/05_TOOLS.md) for more information.
