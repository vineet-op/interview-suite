// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
} from '@google/genai';

async function main() {

    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const config = {
        responseMimeType: 'application/json',
    };

    const model = 'gemini-2.5-pro-preview-03-25';

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `Job Position: Full-stack dev, Job Description: React, Mysq,  Years of experience: 6 years  Depends on this information generate a 5 interview questions with answers in jSON format. Please Give the questions and answers  as feilds in jSON format.
  
  `,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `The user wants 5 interview questions and answers for a Full-stack developer position.
  The key requirements are:
  - Role: Full-stack dev
  - Technologies: React, MySQL
  - Experience: 6 years
  
  The output format must be a single JSON object containing an array of 5 question-answer pairs. Each pair should have a "question" field and an "answer" field.
  
  Plan:
  1.  **Question 1 (React):** Focus on a more advanced React concept suitable for 6 years of experience. Maybe state management beyond basic \`useState\`/\`useEffect\` or performance optimization.
  2.  **Question 2 (React):** Another React question, perhaps about hooks or component design patterns.
  3.  **Question 3 (MySQL):** Focus on database design, optimization, or complex queries relevant to a full-stack role.
  4.  **Question 4 (Full-stack Integration):** Ask about connecting React frontend with a backend (implicitly involving MySQL), focusing on API design, data flow, or state synchronization.
  5.  **Question 5 (Experience/Problem Solving):** Ask a behavioral or architectural question related to their 6 years of experience, possibly involving trade-offs between React and MySQL choices.
  
  Refine Questions & Answers:
  1.  **Q:** "Describe a complex state management challenge you faced in a React application and how you solved it. What were the trade-offs of your chosen solution (e.g., Redux, Zustand, Context API, Jotai)?"
      **A:** "In a large e-commerce project, managing shared state across many components (cart, user profile, product filters) became difficult with prop drilling and local state. We evaluated Redux and Context API. We chose Redux Toolkit for its structured approach, predictable state updates, and excellent dev tools, especially for debugging complex asynchronous actions like checkout flows. The trade-off was the initial boilerplate and learning curve for junior team members compared to Context, but the long-term maintainability and scalability benefits for a 6-year experienced dev handling complexity outweighed this."
  2.  **Q:** "How do you optimize the performance of a React application, especially when dealing with large lists or frequent updates? Mention specific techniques."
      **A:** "Performance optimization is crucial. Key techniques include: 1. **Memoization:** Using \`React.memo\` for functional components, \`PureComponent\` for class components, and hooks like \`useMemo\` and \`useCallback\` to prevent unnecessary re-renders. 2. **Code Splitting:** Using \`React.lazy\` and Suspense to load components only when needed, reducing initial bundle size. 3. **Virtualization:** Employing libraries like \`react-window\` or \`react-virtualized\` for rendering large lists efficiently by only rendering visible items. 4. **Bundle Analysis:** Using tools like Webpack Bundle Analyzer to identify large dependencies or chunks. 5. **Debouncing/Throttling:** Limiting the frequency of expensive operations triggered by events like scrolling or typing."
  3.  **Q:** "Explain database indexing in MySQL. When would you use different types of indexes (e.g., B-Tree, Full-Text), and what are the potential downsides of over-indexing?"
      **A:** "Indexes in MySQL are special lookup tables that the database search engine can use to speed up data retrieval operations. A B-Tree index is the default and most common, suitable for equality and range queries on various data types (\`=\`, \`>\`, \`<\`, \`BETWEEN\`, \`LIKE 'prefix%'\`). A Full-Text index is used for searching keywords within text data (\`MATCH() AGAINST()\`). While indexes significantly speed up \`SELECT\` queries, they slow down write operations (\`INSERT\`, \`UPDATE\`, \`DELETE\`) because the index also needs updating. Over-indexing consumes extra disk space and can degrade write performance significantly, so indexes should be added strategically based on query patterns, often identified using \`EXPLAIN\`."
  4.  **Q:** "Describe how you would design a RESTful API endpoint for fetching related data from multiple MySQL tables (e.g., fetching a user's profile along with their recent orders) and how the React frontend would consume this."
      **A:** "Backend (e.g., Node.js/Express): Define an endpoint like \`GET /api/users/:userId/profile-with-orders\`. The handler would: 1. Validate \`userId\`. 2. Use the ORM (like Sequelize/TypeORM) or raw SQL with \`JOIN\`s to fetch user data from the \`users\` table and related orders from the \`orders\` table, possibly limiting the number of orders (e.g., \`LIMIT 10\`). 3. Structure the response JSON, nesting orders within the user object. Frontend (React): Use \`fetch\` or Axios within a \`useEffect\` hook (triggered by \`userId\`). On component mount, call the API. Store the response data in component state (e.g., using \`useState\`). Handle loading and error states. Display the user profile and iterate over the orders array to render them."
  5.  **Q:** "With 6 years of experience, you've likely seen projects evolve. Can you describe a situation where you had to refactor a significant part of either the React frontend or the MySQL backend due to changing requirements or performance issues? What was your process?"
      **A:** "On a previous project, the initial MySQL schema for user permissions was simple, but business logic grew complex, leading to slow, convoluted queries. We decided to refactor: 1. **Analysis:** Used \`EXPLAIN ANALYZE\` and application logs to pinpoint bottlenecks in permission checks. 2. **Redesign:** Proposed a new schema using a dedicated role-permission mapping table, normalizing the structure. 3. **Migration Plan:** Wrote migration scripts to carefully transfer existing data to the new structure with minimal downtime. 4. **Backend Refactor:** Updated backend code (API endpoints, services) to use the new schema and queries. 5. **Testing:** Implemented thorough integration and regression tests. 6. **Deployment:** Rolled out the changes during a low-traffic period. This significantly improved query performance and made adding new permissions much easier, demonstrating the value of proactive refactoring based on experience."
  
  Double-check JSON validity and ensure all values are strings where appropriate.`,
                },
                {
                    text: `[
    {
      "question": "Describe a complex state management challenge you faced in a React application with significant user interaction and how you solved it. Discuss the trade-offs of your chosen solution (e.g., Redux, Zustand, Context API).",
      "answer": "In a large dashboard application, synchronizing state between multiple components displaying related data (e.g., charts, tables, filters) became complex using only prop drilling and local state. This led to performance issues and difficult debugging. We evaluated Redux and Context API. We chose Redux Toolkit because its structured nature, immutable updates, and powerful DevTools were ideal for managing complex, interdependent state slices and asynchronous API calls triggered by user actions. The main trade-off was the initial learning curve and boilerplate compared to Context API, but for a system needing robust state tracking and scalability, the long-term maintainability and debugging ease provided by Redux were decisive advantages for our experienced team."
    },
    {
      "question": "How do you optimize the performance of a React application that fetches and displays large amounts of data from a MySQL backend? Mention specific techniques for both frontend and backend.",
      "answer": "Frontend (React): 1. **Virtualization:** Use libraries like \`react-window\` or \`react-virtualized\` to render only visible list/table items. 2. **Memoization:** Employ \`React.memo\`, \`useMemo\`, and \`useCallback\` to prevent unnecessary re-renders of components and expensive calculations. 3. **Code Splitting:** Use \`React.lazy\` and Suspense to load components on demand. 4. **Debouncing/Throttling:** Limit frequent API calls triggered by user input (e.g., search). Backend (MySQL): 1. **Pagination:** Implement server-side pagination (\`LIMIT\`, \`OFFSET\`) in API endpoints so React only fetches data chunks. 2. **Indexing:** Ensure proper indexing on MySQL tables for columns used in \`WHERE\` clauses and \`JOIN\` conditions to speed up queries. 3. **Query Optimization:** Analyze slow queries using \`EXPLAIN\` and refactor them, potentially denormalizing slightly if read performance is critical. 4. **Selective Fetching:** Only select necessary columns (\`SELECT col1, col2\` instead of \`SELECT *\`)."
    },
    {
      "question": "Explain database indexing in MySQL. Describe a scenario where you needed to add or modify indexes to resolve a performance bottleneck. What steps did you take?",
      "answer": "Indexes in MySQL are data structures (like B-Trees) that improve the speed of data retrieval operations on database tables at the cost of slower writes and extra storage. They work like an index in a book, allowing the database engine to find rows matching specific criteria quickly without scanning the entire table. Scenario: In an application with millions of user activity logs, a report generating page filtering logs by \`user_id\` and a \`timestamp\` range was extremely slow. Steps: 1. Used \`EXPLAIN\` on the query to confirm it was performing a full table scan. 2. Identified \`user_id\` and \`timestamp\` as key filtering columns. 3. Created a composite index on (\`user_id\`, \`timestamp\`) using \`CREATE INDEX idx_user_timestamp ON activity_logs (user_id, timestamp);\`. 4. Re-ran \`EXPLAIN\` to verify the index was being used (showing 'Using index condition' or similar). 5. Tested the report generation page, observing a significant reduction in load time (e.g., from 30 seconds to under 1 second)."
    },
    {
      "question": "Describe the process of designing and implementing a feature that requires interaction between a React frontend and a MySQL database, for instance, a user profile editing feature.",
      "answer": "1. **API Design:** Define RESTful endpoints on the backend (e.g., \`GET /api/users/:id\` to fetch profile, \`PUT /api/users/:id\` to update). Specify request/response formats (JSON). 2. **Database Schema:** Ensure the \`users\` table in MySQL has the necessary columns (e.g., \`name\`, \`email\`, \`bio\`). Add constraints/indexes as needed. 3. **Backend Implementation:** Create controllers/handlers for the API endpoints. Use an ORM (like Sequelize/TypeORM) or raw SQL to interact with the MySQL database - fetch data for GET, validate and update data for PUT. Implement validation logic. 4. **Frontend (React):** Create a form component using React state (\`useState\`) to manage form data. Fetch initial profile data using \`useEffect\` and an API call (e.g., Axios/fetch) to the GET endpoint. Handle form submission: make a PUT request with updated data, handle success (e.g., show message, refresh data) and error states (e.g., display validation errors from API)."
    },
    {
      "question": "With 6 years of experience, you've likely encountered situations requiring significant refactoring. Describe a time you had to refactor code involving both React components and related backend logic interacting with MySQL. What prompted the refactoring, and what was the outcome?",
      "answer": "We had a feature allowing users to manage complex project permissions. Initially, the logic was scattered: some in React components (conditionally rendering UI), some in API controllers, and complex logic embedded within MySQL stored procedures. This became unmaintainable and hard to test. Prompt: Adding a new user role required changes in all three places, leading to bugs. Refactoring: 1. **Centralized Logic:** Moved all authorization logic to a dedicated backend service layer. 2. **Simplified API:** The API endpoint now just took the action and resource, delegating the permission check to the service. 3. **Refactored DB:** Replaced complex stored procedures with simpler queries managed by the backend service, improving testability and portability. 4. **Cleaned React:** Removed authorization checks from components; components now primarily focused on rendering UI based on data fetched from the API (which implicitly handled permissions). Outcome: Significantly improved maintainability, testability (unit tests for the service layer), and reduced the effort required to add new roles or permissions. Debugging became much easier as logic was centralized."
    }
  ]`,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `INSERT_INPUT_HERE`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    for await (const chunk of response) {
        console.log(chunk.text);
    }

}

main();
