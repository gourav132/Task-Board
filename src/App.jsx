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
              title: "Task 1",
              description:
                "Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1 Description for Task 1",
            },
            { id: 2, title: "Task 2", description: "Description for Task 2" },
          ],
          "In-Progress": [
            { id: 3, title: "Task 3", description: "Description for Task 3" },
            { id: 4, title: "Task 4", description: "Description for Task 4" },
          ],
          Completed: [
            { id: 5, title: "Task 5", description: "Description for Task 5" },
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
