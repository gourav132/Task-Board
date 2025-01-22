import React from "react";
import { IconButton, Typography } from "@mui/material";

export default function Category() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        width: "240px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Chip
          style={{
            backgroundColor: chipColors[container] || "#e0e0e0",
            color: "#000",
          }}
          size="small"
          label={container}
        />
        <Chip
          style={{
            backgroundColor: "#e0e0e0",
            color: "#000",
          }}
          size="small"
          label={`${todos[container].length}`}
        />
      </div>
      <div>
        <IconButton size="small" onClick={(e) => handleClick(e, container)}>
          <MoreHorizIcon fontSize="" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div style={{ padding: "18px" }}>
            <Typography sx={{ marginBottom: "10px" }}>Chip color</Typography>
            <TwitterPicker
              color={chipColors[selectedCategory] || "#e0e0e0"}
              onChangeComplete={handleColorChange}
            />
          </div>
        </Menu>
        <IconButton size="small" onClick={() => handleAddCard(container)}>
          <AddIcon fontSize="" />
        </IconButton>
      </div>
    </div>
  );
}
