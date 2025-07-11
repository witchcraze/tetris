# GEMINI.md: Instruction Manual for AI-Driven Development

This document provides instructions for the AI assistant (Gemini) to perform development tasks in this project. To ensure consistency, quality, and efficiency, please adhere strictly to the following guidelines.

## 1. Guiding Principles for this Document (GEMINI.md)

### 1.1. Purpose
This document is the "starting point for thought and action" for the AI to autonomously advance development. All instructions for the AI are consolidated here, functioning as the project's constitution.

### 1.2. Structure and Writing Rules
To prevent this document from becoming bloated and to maintain readability and maintainability, it is written according to the following rules.

*   **Clear Separation of Strategy and Workflow:**
    *   **Strategy Section (Chapter 3):** Describes only the **policy** of **"What"** the project aims for and **"Why."** This section covers long-term, universal guidelines.
    *   **Workflow Section (Chapter 4):** Describes only the **"How"**—the **concrete, reproducible procedures**—to realize the strategy. This section covers commands and conventions that the AI will directly execute and reference.
*   **Externalization of Details:**
    *   Detailed setup procedures for specific technologies, design philosophies, and lengthy conventions are created as separate Markdown files under the `docs/` directory.
    *   This document only contains references (links) to those external files, keeping this document focused on "instructions" that define the AI's behavior.
*   **Introduction of YAML Configuration Blocks:**
    *   **Purpose:** To describe strict "settings" that directly control the AI's behavior (e.g., label definitions, naming conventions), YAML code blocks are introduced within the Markdown.
    *   **Role Division:** The natural language Markdown is responsible for the "Why" (strategy and philosophy), while YAML is responsible for the "How" (concrete settings), separating their roles.
    *   **Scope of Application:** YAML is actively used for settings that are better for the AI to interpret and execute mechanically (e.g., label definitions, naming conventions).

### 1.3. Update Process
Changes to this document require the following process to maintain quality and prevent unintended modifications.
1.  Propose changes in a GitHub Issue.
2.  After the proposal is approved, the AI creates a Pull Request to update this document.
3.  The change is finalized when the Pull Request is reviewed and merged.

### 1.4. Style Guide
To maintain the readability of this document, the following writing style is followed.

*   **Use of Lists:**
    *   **Purpose:** Used to describe information with order or hierarchy, such as procedures, checklists, and parallel choices.
    *   **Example:** Steps in the development process, perspectives for self-review.

*   **Use of Tables:**
    *   **Purpose:** Used to compare and contrast multiple items with common attributes. Ideal for clearly showing the correspondence of information.
    *   **Example:** A list of labels and their roles, command options and their descriptions.

*   **Writing Style:** To clarify that these are instructions for the AI, use a direct or imperative style rather than a polite (desu/masu) style.

---

## 2. Fundamental Principles for AI Collaboration

*   **Principle of Communication Language:** The primary language for all documentation (`GEMINI.md`, `docs/`) is English, to ensure maximum performance and global collaboration. However, communication with the user (e.g., comments on Issues and Pull Requests) should be conducted in the language the user uses. The AI must adapt its response language to match the user's language in conversational contexts.
*   **Issue-Driven Development:** All development and modification work must originate from a GitHub Issue. If a user's instruction is not based on an Issue, the AI will not start the work and will first request or propose the creation of a corresponding Issue.
*   **Goal-Oriented Action:** Understand not just the superficial instructions in an Issue, but the user's ultimate goal behind them, and act proactively to achieve that goal.
*   **Absolute Adherence to and Self-Verification of Rules:** `GEMINI.md` is the sole constitution governing the AI's thoughts and actions, and its rules are absolute. Before any action—file modification, command execution, Issue/PR operations, etc.—the AI is obligated to self-verify that the action is in complete agreement with the `GEMINI.md` workflow. If there is any contradiction or uncertainty, it must never execute the action and must first seek confirmation from the user.
*   **Ensuring Transparency:** All operations performed by the AI, such as file changes and command executions, must be clearly recorded and reported.
*   **Step-by-Step Execution:** Large changes should be broken down into small steps, and the user's confirmation should be sought at critical decision points.

## 3. Project Strategy
*(This section describes only the "policy" that the project aims for)*

*   **Development Strategy:**
    *   **Thorough Issue-Driven Development (IDD):** All development tasks start from a GitHub Issue. By clearly agreeing on the purpose, specifications, and plan in the Issue before starting implementation, we prevent rework and ensure transparency.
    *   **Thorough Test-Driven Development (TDD):** When adding new features or refactoring, it is **mandatory** to start by creating or updating test cases under all circumstances.
        *   **If tests do not exist:** If tests for the feature to be changed do not yet exist, create new tests first.
        *   **If tests already exist:** Review the existing tests and make the necessary modifications (adding test cases, changing assertions, etc.) to cover the current changes.
    *   By thoroughly implementing this "test-first" approach, we prevent unintended side effects (regressions) and treat code quality and maintainability as top priorities.
    *   **Proactive Requirement Definition and Issue Decomposition:** If a user's request is ambiguous, large-scale, or open to multiple interpretations, the AI will clarify the requirements through dialogue before starting implementation. The agreed-upon content will be recorded in documents or Issues, and development will proceed after decomposing it into a group of appropriately sized Issues. This prevents misunderstandings and accurately sets the direction of development.
*   **Documentation Strategy:**
    *   **Purpose:** Documentation is not just a deliverable, but aims to function as a "thinking aid" for all stakeholders, including our future selves, by systematizing project knowledge. It prevents knowledge from being siloed, lowers the learning curve for new participants, and facilitates smooth decision-making.
    *   **Principle: Documentation as Code (DaC):** Like code, documentation should be version-controlled, go through a review process, and be continuously updated. Changes to code and documentation are always treated as a single unit.
*   **GitHub Operational Strategy:**
    *   **Basic Strategy: Adoption of GitHub Flow:** The basic strategy is "GitHub Flow," where the `main` branch is always kept in a deployable state, and all feature additions and fixes are done in feature branches.
    *   **Reason for Adoption:** This strategy has simple operational rules, reduces the context the AI needs to consume to perform tasks, and makes it easy to grasp the state even if a session is interrupted. It avoids the complexity of managing multiple persistent branches (e.g., `develop`) and prioritizes the AI's ability to maintain consistency and operate stably.
    *   **Branching Strategy:**
        * `main` branch: The most stable branch, deployed to the production environment. Direct commits are prohibited; it is updated only by merging Pull Requests.
        * Feature branches: Branches corresponding to each Issue. They are created from the `main` branch, and a Pull Request to the `main` branch is created after the work is completed.
    *   **Branch Lifecycle:**
        * **Creation:** Created from the `main` branch when starting to implement an Issue.
        * **Naming Convention:** Follows the `{issue_number}-{kebab-case-issue-title}` format defined in `4.2. Issue-Driven Development Process`.
        * **Deletion:** Deleted promptly after the Pull Request is merged into the `main` branch.

## 4. Development Workflow
*(This section describes only the "concrete, reproducible procedures" for executing the strategy. The AI will strictly follow this workflow to autonomously carry out development)*

### 4.1. Basic Principle: Single-Tasking
The AI does not handle multiple Issues simultaneously. It must complete (merge) one Issue before starting the next. This prevents branch conflicts and work confusion.

### 4.2. Issue-Driven Development Process
The following is the series of processes from when an Issue is created until it is closed. The AI and the user will collaborate according to this process.

#### **Principle: Use of Temporary Files for GitHub Interactions**
When performing operations that send multi-line text on GitHub, such as creating Issues or comments, or creating Pull Requests or review comments, always write the body text to a temporary file and use the `--body-file` option to avoid unexpected errors in command-line arguments (especially with quotation handling in `gemini cli`).

#### **Principle: Recording Approval**
If user approval is given in the CLI prompt, the AI will post a comment stating "User approval confirmed on the CLI" to the corresponding GitHub Issue or Pull Request to leave a record of the approval.

#### **Issue Granularity**
Issues are created in concrete, clear task units that can be completed in a single Pull Request, based on the following principles.

*   **Single Responsibility Principle:** One Issue focuses on one concern (feature addition, bug fix, refactoring, etc.). Do not mix multiple purposes in one Issue.
*   **Clear Completion Criteria:** The Issue should describe the specific conditions under which the task is considered complete.
*   **Appropriate Scope:**
    *   **Decomposition of Large Issues:** Large-scale feature development that is expected to take more than a day or spans multiple components should be broken down into smaller, multiple Issues. The AI will propose the decomposition of large Issues based on the `Proactive Requirement Definition and Issue Decomposition` strategy.
    *   **Consolidation of Small Issues:** If multiple Issues are closely related and it is more efficient to handle them together, consider consolidating them into a single Issue.

#### **Step 1: Issue Reception and Assignment**
1.  **Trigger:** A user or the AI creates a new Issue.
2.  **AI's Response:**
    *   The AI detects the newly created Issue and sets itself as the assignee for that Issue.
    *   It analyzes the content of the Issue and applies the most appropriate **status label** and **type label** from those defined in `4.4. Label Management`.
        *   **Status Label:** `status: planning`
        *   **Type Label:** Select one from `type: feature`, `type: bug`, etc.

#### **Step 2: Implementation Planning and Agreement**
1.  **Trigger:** The `status: planning` label is applied to the Issue.
2.  **AI's Response:**
    *   **Reconfirm Context:** Before starting to create a plan, first reload the latest description of the Issue, related Pull Requests, related comments, and all relevant documents, including `GEMINI.md` and those under `docs/`, to always grasp the latest context.
    *   Thoroughly read the Issue content, related comments, and linked documents to fully understand not only the superficial request but also the underlying **purpose** and **fundamental problem to be solved**.
    *   If the purpose is unclear or open to multiple interpretations, ask the user questions to clarify the intent.
    *   If multiple implementation approaches are possible, concisely present the pros and cons of each and prompt the user to choose the best option.
    *   Based on the above analysis, and in light of the **documentation strategy defined in Chapter 3**, identify the documents and code that need to be updated along with the implementation or specification changes.
    *   Break down the necessary tasks (code changes, document updates, etc.) and create a concrete implementation plan that lists all files to be changed.
    *   After commenting on the Issue with the implementation plan in the following format, tell the user, "Please review the plan on the GitHub Issue and comment with 'Approve', or convey your approval on this CLI. **After approval, please instruct me to proceed to the next step.**" and wait for a response.
        ```markdown
        ### Implementation Proposal

        To resolve this Issue, I will proceed with the implementation according to the following plan.

        **Files to be changed:**
        - `path/to/file1.ext`
        - `path/to/file2.ext`

        #### 1. **Contribution to Project Goals**
        - (In this section, briefly explain how the proposed changes contribute to the overall goals of the project)

        #### 2. **Overview of Changes**
        - (In this section, briefly explain the overall picture and purpose of the changes)

        #### 3. **Specific Work Content for Each File**
        - `path/to/file1.ext`: (Describe the specific changes for this file)
        - `path/to/file2.ext`: (Describe the specific changes for this file)

        ---
        If you approve, please reply to this comment with "Approve".
        ```
3.  **User's Response:**
    *   Review the plan, and if there are no problems, reply with "Approve" to the relevant comment on the GitHub Issue or convey approval on the CLI, and then instruct the AI to proceed with the work.

#### **Step 3: Implementation and Pull Request Creation**
1.  **Trigger:** The AI, having received instructions from the user to proceed, confirms the user's approval on the GitHub Issue or in the CLI prompt. If approval cannot be confirmed, it will ask the user for approval again.
2.  **AI's Response:**
    *   Remove the `status: planning` label from the Issue and apply the `status: implementing` label.
    *   Create a new branch from the `main` branch with the naming convention `{issue_number}-{kebab-case-issue-title}`.
        *   Example: `12-update-development-workflow`
    *   Perform code changes, file creation/editing, test additions, etc., according to the implementation plan.
        *   **[IMPORTANT] Principle of Prohibiting Unplanned File Changes:** The AI will, in principle, not change any files other than those agreed upon in the implementation plan. If, in the course of implementation, it determines that an unplanned file change is necessary, it will suspend the work, report the reason and the content of the change to the user, and seek approval.
    *   Once the work is complete, commit the changes. The commit message will follow the [Conventional Commits](https://www.conventionalcommits.org/) convention.
    *   Create a Pull Request targeting the `main` branch.
    *   The body of the PR must include a link to the relevant Issue (e.g., `Closes #12`).

#### **Step 4: Self-Review, Self-Correction, and Review Request**
1.  **Trigger:** A Pull Request is created.
2.  **AI's Response:**
    *   Remove the `status: implementing` label from the Issue and apply the `status: review` label.
    *   **Check Diffs:** The AI runs the `gh pr diff` command to confirm that its changes are as intended.
    *   **Conduct Self-Review:** Conduct a self-review from the following perspectives:
        1.  **Are the diffs as intended?** Compare the results of `gh pr diff` with the implementation plan.
        2.  **Does the implementation meet the requirements of the Issue?**
        3.  **Does it comply with the `GEMINI.md` conventions (testing, naming rules, etc.)?**
        4.  **Is the code sufficiently readable and maintainable?**
        5.  **Are there any potential side effects from the changes?**
        6.  **Are there any unplanned file changes?**
        7.  **Is the documentation update appropriate?** In light of the **Documentation Strategy** and the definitions in `5.1`, is the documentation update appropriate?
    *   **Self-Correction:**
        *   If a problem is detected during the self-review, the AI will first attempt to correct it itself. It will modify the code locally, amend the commit with `git commit --amend`, and then update the remote branch with `git push --force`.
        *   After correction, it will restart the process from the beginning of this step (checking diffs).
        *   Only if self-correction is difficult will the AI mention the user and consult on the specific problem and solution in a PR comment.
    *   **Request Review:** If no self-correction is needed, or after it is completed, comment on the PR with the results of the self-review in the following format, then tell the user, "Please review on the GitHub PR and comment with 'Approve for merge', or convey your approval on this CLI. **After approval, please instruct me to execute the merge.**" and wait for a response.
        ```markdown
        ### Self-Review Report

        I have conducted a self-review from the following perspectives and confirmed that there are no issues.

        - **[✓] Are the diffs as intended?:** I have compared the results of `gh pr diff` with the implementation plan and confirmed that no unintended changes are included.
        - **[✓] Does the implementation meet the requirements of the Issue?:** I have confirmed that all the requirements specified in the Issue are met.
        - **[✓] Does it comply with the `GEMINI.md` conventions?:** It complies with the conventions defined in `GEMINI.md`, such as testing, naming rules, and coding style.
        - **[✓] Is the code sufficiently readable and maintainable?:** I have added comments to complex logic and named variables and functions so that their responsibilities are clear.
        - **[✓] Are there any potential side effects from the changes?:** I have considered the impact of the changes on other parts and confirmed that there are no unintended side effects.
        - **[✓] Are there any unplanned file changes?:** I have confirmed that only the files agreed upon in the implementation plan have been changed.
        - **[✓] Is the documentation update appropriate?:** I have confirmed that the relevant documents (`README.md`, `docs/*`, etc.) have also been appropriately updated along with the code changes.

        ---
        Please review and approve the merge.
        ```
3.  **User's Response:**
    *   Review the content of the PR and the AI's self-review, and if there are no problems, reply with "Approve for merge" to the relevant comment on the GitHub PR or convey approval on the CLI, and then instruct the AI to merge.

#### **Step 5: Merge and Cleanup**
1.  **Trigger:** The AI, having received instructions from the user to merge, confirms that the user's "Approve for merge" comment exists on the GitHub PR.
2.  **AI's Response:**
    *   Merge the Pull Request.
    *   Delete the working branch.
    *   Confirm that the related Issue was automatically closed. (Automated by `Closes #12` in the PR)
    *   Remove the `status: review` label from the closed Issue and apply the `status: done` label.

### 4.3. Testing Workflow
*   **Purpose of Testing:** To guarantee the quality of the code generated by the AI and to ensure safety against refactoring and feature additions.
*   **Types of Tests:**
    *   **Unit Tests:** Verify that individual functions and modules work as expected.
    *   **Integration Tests:** Verify that when multiple modules are combined, they interact correctly.
    *   **Performance Tests:** If necessary, implement tests to measure system performance requirements (response time, throughput, etc.).
*   **Test Coverage:** Aim for high test coverage for major functions and logic, but the coverage value itself is not the goal. What is important is that the core parts of the business logic are sufficiently tested.
*   **Test Execution:**
    *   **Local Execution:** After changing the code, the AI runs the relevant tests and confirms that all tests pass before creating a Pull Request.
    *   **CI Execution (Recommended):** It is recommended to have a system where all tests are automatically run whenever a Pull Request is created or updated. If a CI environment is available, the AI will actively try to set it up and use it.

### 4.4. Label Management
The AI uses the labels defined in the following YAML to clarify the status and type of Issues and Pull Requests. If a label does not exist when the AI tries to apply it, it will automatically create the label according to this definition before applying it.

```yaml
labels:
  status:
    - name: "status: planning"
      color: "FBCA04"
      description: "State where the AI is formulating an implementation plan"
    - name: "status: implementing"
      color: "1D76DB"
      description: "State where the AI is in the process of implementation"
    - name: "status: review"
      color: "8E44AD"
      description: "State where the Pull Request is awaiting review"
    - name: "status: done"
      color: "0E8A16"
      description: "State where the Issue has been addressed and merged"
  type:
    - name: "type: bug"
      color: "D73A4A"
      description: "A bug in existing functionality"
    - name: "type: feature"
      color: "0E8A16"
      description: "Addition of a new feature"
    - name: "type: documentation"
      color: "0075CA"
      description: "Creation or update of documentation"
    - name: "type: refactor"
      color: "A2EEEF"
      description: "Code improvement that does not change external behavior"
    - name: "type: chore"
      color: "FFFFFF"
      description: "Tasks other than the above, such as changes to the build process or auxiliary tools"
```

## 5. Documentation Strategy and Workflow
This defines the workflow for the AI to accurately understand the project's specifications and design philosophy and to maintain consistency between development and documentation.

### 5.1. Document Structure and Content
Information about the project is managed in `README.md` and the files under the `docs/` directory. Before starting development, the AI must read and understand these documents. The purpose and content to be described in each document are as follows.

| File Name | Purpose and Main Items to Describe | Update Timing |
| :--- | :--- | :--- |
| `README.md` | Provides the information that new participants and external viewers will see first, as the **face of the project**.<br><ul><li>**Project Name and Overview:** Briefly explain what the project is and what it solves.</li><li>**Main Features:** List the main features and technical highlights.</li><li>**Technologies Used:** List the main languages, frameworks, and libraries used.</li><li>**Installation and Setup:** Describe the minimum steps to run the project locally (linking to `docs/04_SETUP.md` is recommended).</li><li>**Basic Usage:** Describe simple usage examples and commands for the main features.</li><li>**License:** State the project's license (link to the `LICENSE` file).</li><li>**How to Contribute:** Show the basic guidelines for contributing, such as how to create Issues and Pull Requests.</li></ul> | When there are major changes to the project's basic information, technology stack, or setup method. |
| `docs/00_PROJECT_OVERVIEW.md` | Defines the **overall picture of the project** and forms a common understanding among stakeholders.<br><ul><li>**Background and Problem:** Explain the background of the project and the specific problems it is trying to solve.</li><li>**Purpose and Goals:** Define the state the project aims for and the specific goals to be achieved (e.g., SMART principles).</li><li>**Target Users:** Clarify who the project is for.</li><li>**Scope:** Define the boundaries of what the project "will do" and "will not do."</li><li>**List of Main Features:** List the main features provided by the project and briefly explain each.</li></ul> | When there are changes to the core specifications, such as the project's purpose, scope, or main features. |
| `docs/01_ARCHITECTURE.md` | Defines the **system's structure and design philosophy** and records the rationale for technical decisions.<br><ul><li>**Architecture Overview:** Show the relationships between components using a system-wide diagram (e.g., C4 model).</li><li>**Design Principles:** Explain the adopted design philosophy (e.g., Clean Architecture, Microservices) and the reasons for its selection.</li><li>**Details of Main Components:** Describe in detail the responsibilities, interfaces, and internal structure of each component.</li><li>**Data Model:** ER diagrams, etc., showing the main entities and their relationships.</li><li>**Infrastructure:** Describe the configuration of the production and development environments, the cloud services used, etc.</li><li>**Reasons for Technology Selection:** Record the reasons for selecting specific technologies (language, DB, framework) and the other options that were considered.</li></ul> | When there are changes related to the system's structure, such as the addition of new components, changes in the responsibilities of existing components, or changes in the infrastructure configuration. |
| `docs/01_ARCHITECTURE.md` | Defines the **system's structure and design philosophy** and records the rationale for technical decisions.<br><ul><li>**Architecture Overview:** Show the relationships between components using a system-wide diagram (e.g., C4 model).</li><li>**Design Principles:** Explain the adopted design philosophy (e.g., Clean Architecture, Microservices) and the reasons for its selection.</li><li>**Details of Main Components:** Describe in detail the responsibilities, interfaces, and internal structure of each component.</li><li>**Data Model:** ER diagrams, etc., showing the main entities and their relationships.</li><li>**Infrastructure:** Describe the configuration of the production and development environments, the cloud services used, etc.</li><li>**Reasons for Technology Selection:** Record the reasons for selecting specific technologies (language, DB, framework) and the other options that were considered.</li></ul> | When there are changes related to the system's structure, such as the addition of new components, changes in the responsibilities of existing components, or changes in the infrastructure configuration. |
| `docs/02_CODING_STANDARDS.md` | Defines the conventions for maintaining **code consistency**.<br><ul><li>**Formatting Conventions:** Specify the settings for linters and formatters (e.g., Black, Prettier, ESLint) and how to run them.</li><li>**Naming Conventions:** Specifically define the naming rules for variables, functions, classes, file names, etc.</li><li>**Coding Style:** Define specific coding rules, such as how to write comments, error handling policies, and how to handle asynchronous processing.</li><li>**Library Usage Conventions:** Define the policy for using standard and external libraries, and the libraries that are recommended or prohibited.</li><li>**Discouraged Patterns:** Present anti-patterns and specific examples of code to be avoided.</li></ul> | When new conventions are added, existing conventions are changed, or the linters used are changed. |
| `docs/03_TESTING_GUIDELINES.md` | Defines the testing policies and procedures for **ensuring quality**.<br><ul><li>**Test Strategy:** Define the roles of unit tests, integration tests, and E2E tests, and what each test guarantees.</li><li>**How to Write Tests:** Define specific implementation rules, such as the structure of test code, naming conventions, and how to write assertions.</li><li>**Test Scope:** Define which code should be tested, and the target coverage value (if any).</li><li>**How to Run Tests:** Specify the test execution commands and procedures for the local and CI environments.</li><li>**Policy for Using Mocks/Stubs:** Define the use of mocks and stubs, the libraries to be used, etc.</li></ul> | When the test strategy is changed, a new test framework is introduced, or the method of running tests is changed. |
| `docs/04_SETUP.md` | Defines the **development environment setup procedure** in detail.<br><ul><li>**Prerequisites:** Specify the required OS, language versions, and package managers (npm, pip, etc.).</li><li>**Installation Procedure:** Describe the steps from cloning the repository to installing dependencies, step by step.</li><li>**Environment Variable Settings:** Explain the list of necessary environment variables and how to set them (e.g., `.env.example`).</li><li>**Starting the Application:** Describe the command to start the development server and how to check its operation.</li><li>**Troubleshooting:** Summarize common errors and their solutions in a Q&A format.</li></ul> | When there are changes to the development environment setup procedure, the necessary tools, or environment variables. |
| `docs/04_SETUP.md` | Defines the **development environment setup procedure** in detail.<br><ul><li>**Prerequisites:** Specify the required OS, language versions, and package managers (npm, pip, etc.).</li><li>**Installation Procedure:** Describe the steps from cloning the repository to installing dependencies, step by step.</li><li>**Environment Variable Settings:** Explain the list of necessary environment variables and how to set them (e.g., `.env.example`).</li><li>**Starting the Application:** Describe the command to start the development server and how to check its operation.</li><li>**Troubleshooting:** Summarize common errors and their solutions in a Q&A format.</li></ul> | When there are changes to the development environment setup procedure, the necessary tools, or environment variables. |

### 5.2. Documentation Update Process
*   **Principle:** Based on the **Documentation Strategy** defined in Chapter 3, especially the principle of **Documentation as Code (DaC)**, changes to code and updates to documentation are always treated as a single atomic task. If an implementation or specification change affects the content of any of the documents defined in `5.1`, a Pull Request to update the corresponding document must be created.
*   **Procedure:**
    1.  At the `Step 2: Implementation Planning and Agreement` stage, the AI identifies the documents that need to be updated along with the code changes and includes the update content in the implementation plan.
    2.  If the AI determines that a document needs to be updated along with a code change, it first checks if the corresponding document file exists.
        *   If the file does not exist, it creates a new one with the appropriate file name based on `5.1. Document Structure and Content`.
        *   If the file exists but is missing necessary content, it adds that content.
    3.  After user approval, the AI updates the documentation along with the code changes.
    4.  In the Pull Request review, the appropriateness of the documentation description is also subject to review, just like the correctness of the code.

### 5.3. Specification and Design Documentation Support Workflow
If the AI determines that the specifications or design that are prerequisites for code implementation are missing from the documentation, it will proactively support their clarification and documentation through the following interactive workflow.

1.  **Trigger (Detection of Missing Information)**
    *   The AI starts this workflow when, during Issue response, it determines that essential design information for starting implementation (e.g., concrete specifications for a new feature, the flow of complex business logic, API endpoint details, etc.) is not specified in the existing documentation.

2.  **Step 1: Proposal for Documentation**
    *   The AI temporarily suspends the implementation work and proposes to the user the benefits of documenting, for example, by saying, "Before we start implementing the 〇〇 feature, why don't we document its specifications and design in `docs/01_ARCHITECTURE.md`? This will prevent rework and improve future development efficiency."

3.  **Step 2: Hearing of Functional Requirements**
    *   If the user agrees, the AI will ask the user about the functional requirements, constraints, expected behavior, etc., necessary for implementation.

4.  **Step 3: Presentation of Design Proposal by AI**
    *   Based on the heard requirements, the AI will create and present a concrete design proposal. The presented design proposal will include content such as:
        *   Proposed updates to the relevant architecture diagrams
        *   Sequence diagrams or flowcharts showing the processing flow
        *   Database table design and ER diagrams
        *   API endpoint design (request, response formats, etc.)

5.  **Step 4: Agreement and Issue Creation Proposal**
    *   The user reviews the presented design proposal and approves it. If modifications are necessary, the design is refined through dialogue.
    *   Once the design is solidified, the AI proposes to the user that a new `type: documentation` Issue be created to reflect the design content in the documentation.
    *   If this proposal is approved, the AI will create a new Issue and perform the documentation update work according to the normal `4.2 Issue-Driven Development Process`. This ensures that the implementation and design remain in sync.
