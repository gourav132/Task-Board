import { useState, useEffect, useRef, useContext } from "react";
import Typography from "@mui/material/Typography";
import { Card, Chip, IconButton, Menu, Button } from "@mui/material";
import { TwitterPicker } from "react-color";
import { motion } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

import { Category, Navbar } from "../../Components";

export default function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useContext(DataContext);

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
    const taskId = dragItem.current;
    const sourceContainer = dragContainer.current;

    setTodos((prev) => {
      const newData = { ...prev };
      const task = newData[sourceContainer].find((t) => t.id === taskId);

      newData[sourceContainer] = newData[sourceContainer].filter(
        (t) => t.id !== taskId
      );
      newData[targetContainer] = [...newData[targetContainer], task];

      return newData;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddCard = (container) => {
    const newId =
      Math.max(
        ...Object.values(todos)
          .flat()
          .map((task) => task.id),
        0
      ) + 1;
    const newTask = {
      id: newId,
      title: `New Task ${newId}`,
      description: "Description of the new task",
    };
    setTodos((prev) => ({
      ...prev,
      [container]: [...prev[container], newTask],
    }));
  };

  const handleDeleteCard = (container, taskId) => {
    setTodos((prev) => ({
      ...prev,
      [container]: prev[container].filter((task) => task.id !== taskId),
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
        minWidth: "1000px",
        maxWidth: "1200px",
        minHeight: "600px",
        maxHeight: "600px",
        overflowX: "scroll",
      }}
      className="no-scroll"
    >
      <Navbar
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
      />

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
            {/* <Category /> */}
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
                    {/* Chip Color Picker */}
                    <Typography sx={{ marginBottom: "10px" }}>
                      Chip color
                    </Typography>
                    <TwitterPicker
                      color={chipColors[selectedCategory] || "#e0e0e0"}
                      onChangeComplete={handleColorChange}
                    />

                    {/* Rename Category */}
                    <div style={{ marginTop: "20px" }}>
                      <Typography sx={{ marginBottom: "10px" }}>
                        Rename Category
                      </Typography>
                      <input
                        type="text"
                        value={selectedCategory || ""}
                        onChange={(e) => {
                          const newName = e.target.value;
                          if (!newName.trim()) return;

                          setTodos((prev) => {
                            const newData = { ...prev };
                            const tasks = newData[selectedCategory];
                            delete newData[selectedCategory];
                            newData[newName] = tasks;
                            return newData;
                          });

                          setChipColors((prev) => {
                            const newColors = { ...prev };
                            const color = newColors[selectedCategory];
                            delete newColors[selectedCategory];
                            newColors[newName] = color;
                            return newColors;
                          });

                          setSelectedCategory(newName);
                        }}
                        placeholder="Enter new category name"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d4d4d4",
                          borderRadius: "4px",
                          marginBottom: "10px",
                        }}
                      />
                    </div>

                    {/* Delete Category */}
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onClick={() => {
                        setTodos((prev) => {
                          const newData = { ...prev };
                          delete newData[selectedCategory];
                          return newData;
                        });
                        setChipColors((prev) => {
                          const newColors = { ...prev };
                          delete newColors[selectedCategory];
                          return newColors;
                        });
                        handleClose();
                      }}
                    >
                      <Typography>Delete Category</Typography>
                      <DeleteOutlineIcon />
                    </Button>
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
              {todos[container].map((task) => (
                <motion.div
                  layout
                  key={task.id}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  onClick={() => navigate(`/task/${task.id}`)}
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
                    onDragStart={(e) => handleDragStart(e, task.id, container)}
                    onDragEnd={handleDragEnd}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle2">{task.title}</Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation
                          handleDeleteCard(container, task.id);
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" color="error" />
                      </IconButton>
                    </div>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
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
