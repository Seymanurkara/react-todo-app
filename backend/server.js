const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let todos = []; // In-memory storage

// Fetch all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const newTodo = { id: uuidv4(), task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Todo deleted" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
