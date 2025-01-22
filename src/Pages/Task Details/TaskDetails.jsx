import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useContext(DataContext);

  // Find the task by ID
  const task =
    Object.values(todos)
      .flat()
      .find((t) => t.id === parseInt(id, 10)) || {};

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(
    Object.keys(todos).find((key) =>
      todos[key].some((t) => t.id === parseInt(id, 10))
    ) || ""
  );

  const handleSave = () => {
    // Create updated task object
    const updatedTask = { ...task, title, description };

    setTodos((prev) => {
      const newTodos = { ...prev };

      // Remove the task from its current category
      Object.keys(newTodos).forEach((container) => {
        newTodos[container] = newTodos[container].filter(
          (t) => t.id !== task.id
        );
      });

      // Add the task to the selected category
      newTodos[status] = [...(newTodos[status] || []), updatedTask];

      return newTodos;
    });
    navigate("/");
  };

  const handleDelete = () => {
    setTodos((prev) => {
      const newTodos = { ...prev };

      // Remove the task from all categories
      Object.keys(newTodos).forEach((container) => {
        newTodos[container] = newTodos[container].filter(
          (t) => t.id !== task.id
        );
      });

      return newTodos;
    });

    // Navigate back to the main board
    navigate("/");
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          width: "450px",
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          sx={{ marginBottom: "20px", textAlign: "center" }}
        >
          Edit Task {id}
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Task Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
            Change Task Status
          </Typography>
          <Select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
          >
            {Object.keys(todos).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Tooltip title="back">
            <IconButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            size="small"
          >
            Save
          </Button>
          <Tooltip title="Delete">
            <IconButton
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
}

export default TaskDetails;
