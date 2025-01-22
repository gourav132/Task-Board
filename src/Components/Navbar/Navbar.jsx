import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Navbar({
  newCategory,
  setNewCategory,
  handleAddCategory,
}) {
  return (
    <div>
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="primary">
          Task Board
        </Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            label="New Category"
            variant="outlined"
            size="small"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
