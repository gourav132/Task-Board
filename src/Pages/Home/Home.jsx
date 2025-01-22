import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import {
  Card,
  Button,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { SketchPicker, CirclePicker, TwitterPicker } from "react-color"; // Import react-color library for the color picker
import { motion } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : {
          "Not-Started": [1, 2, 3, 4, 5],
          "In-Progress": [6, 7, 8, 9, 10],
          Completed: [11, 12, 13, 14, 15],
        };
  });

  const [newCategory, setNewCategory] = useState("");
  const [chipColors, setChipColors] = useState(() => {
    const savedColors = localStorage.getItem("chipColors");
    return savedColors ? JSON.parse(savedColors) : {};
  });

  const dragItem = useRef();
  const dragContainer = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("chipColors", JSON.stringify(chipColors));
  }, [chipColors]);

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setTodos((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddCard = (container) => {
    const newId = Math.max(...Object.values(todos).flat(), 0) + 1;
    setTodos((prev) => ({
      ...prev,
      [container]: [...prev[container], newId],
    }));
  };

  const handleDeleteCard = (container, item) => {
    setTodos((prev) => ({
      ...prev,
      [container]: prev[container].filter((i) => i !== item),
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !todos[newCategory]) {
      setTodos((prev) => ({
        ...prev,
        [newCategory]: [],
      }));
      setNewCategory("");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handleColorChange = (color) => {
    setChipColors((prev) => ({
      ...prev,
      [selectedCategory]: color.hex,
    }));
  };

  return (
    <div
      style={{
        padding: "40px",
        border: "1px solid #d4d4d4",
        borderRadius: "20px",
        maxWidth: "1200px",
        minHeight: "600px",
        maxHeight: "600px",
        overflowX: "scroll",
      }}
      className="no-scroll"
    >
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

      <div
        style={{ display: "flex", gap: "100px", overflowX: "scroll" }}
        className="no-scroll"
      >
        {Object.keys(todos).map((container, index) => (
          <motion.div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            layout
          >
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
                <IconButton
                  size="small"
                  onClick={(e) => handleClick(e, container)}
                >
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
                    <Typography sx={{ marginBottom: "10px" }}>
                      Chip color
                    </Typography>
                    <TwitterPicker
                      color={chipColors[selectedCategory] || "#e0e0e0"}
                      onChangeComplete={handleColorChange}
                    />
                  </div>
                </Menu>
                <IconButton
                  size="small"
                  onClick={() => handleAddCard(container)}
                >
                  <AddIcon fontSize="" />
                </IconButton>
              </div>
            </div>
            <motion.div layout>
              {todos[container].map((item, index) => (
                <motion.div
                  layout
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  onClick={() => navigate(`/task/${item}`)}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      padding: "10px",
                      width: "240px",
                      background: "#ffffff",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      cursor: "grab",
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, container)}
                    onDragEnd={handleDragEnd}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle2">Card {item}</Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCard(container, item);
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" color="error" />
                      </IconButton>
                    </div>
                  </Card>
                </motion.div>
              ))}
              <div
                style={{
                  padding: "10px",
                  width: "200px",
                  background: "#ffffff",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "grey",
                }}
                onClick={() => handleAddCard(container)}
              >
                <Typography variant="subtitle2">New</Typography>
                <AddIcon fontSize="small" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
