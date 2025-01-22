import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(`Card ${id}`);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not-Started");

  const handleSave = () => {
    // Update the task in local storage or state
    // (Implement logic here based on Home component structure)
    navigate("/");
  };

  const handleDelete = () => {
    // Delete the task in local storage or state
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Task {id}
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Status"
        variant="outlined"
        fullWidth
        margin="normal"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
