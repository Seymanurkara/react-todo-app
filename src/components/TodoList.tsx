import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { fetchTodos, addTodo, deleteTodo } from "../api"; 

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: string; task: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (input.trim() === "") return;
    try {
      const newTodo = await addTodo(input);
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4" data-testid="heading">
          📝 Todo List
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a new task..."
          />
          <button
            onClick={handleAddTodo}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
          >
            <FaPlus />
            Add
          </button>
        </div>

        <ul className="mt-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 p-3 my-2 rounded-lg shadow-md"
            >
              <span className="text-lg font-medium">{todo.task}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-white bg-green-500 px-3 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
