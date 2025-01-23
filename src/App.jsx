import { useState } from "react";
import { Box } from "@mui/material";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, TaskDetails } from "./Pages";
import { DataContext } from "./Context/DataContext";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : {
          "Not-Started": [
            {
              id: 1,
              title: "Set up project repository",
              description:
                "Create a GitHub repository for the project and initialize it with a README and .gitignore.",
            },
            {
              id: 2,
              title: "Gather requirements",
              description:
                "Coordinate with stakeholders to document key requirements and use cases for the project.",
            },
            {
              id: 6,
              title: "Define API endpoints",
              description:
                "Draft a list of REST API endpoints, their request/response formats, and required parameters.",
            },
            {
              id: 7,
              title: "Create wireframes for UI",
              description:
                "Use a tool like Figma to design wireframes for the key user interfaces of the application.",
            },
          ],
          "In-Progress": [
            {
              id: 3,
              title: "Implement user authentication",
              description:
                "Set up login and signup functionality using JWT authentication for secure access.",
            },
            {
              id: 4,
              title: "Design database schema",
              description:
                "Create an ER diagram and implement the database structure using PostgreSQL.",
            },
            {
              id: 8,
              title: "Build dashboard page",
              description:
                "Develop the dashboard interface with charts and tables to display user-specific data.",
            },
            {
              id: 9,
              title: "Integrate payment gateway",
              description:
                "Implement payment processing using Stripe for subscription and one-time payments.",
            },
          ],
          Completed: [
            {
              id: 5,
              title: "Setup CI/CD pipeline",
              description:
                "Configured GitHub Actions to automate tests and deploy builds to the staging environment.",
            },
            {
              id: 10,
              title: "Configure development environment",
              description:
                "Installed required packages and set up the local environment for React and Node.js development.",
            },
            {
              id: 11,
              title: "Select tech stack",
              description:
                "Decided on the tech stack for the project: React, Node.js, PostgreSQL, and TailwindCSS.",
            },
          ],
        };
  });
  return (
    <DataContext.Provider value={[todos, setTodos]}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          // background: "#f3f3f3",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </Router>
      </Box>
    </DataContext.Provider>
  );
}

export default App;
