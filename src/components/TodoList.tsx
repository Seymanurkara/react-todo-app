import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          📝 Todo List
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Yeni bir görev ekleyin..."
          />
          <button
            onClick={addTodo}
            className="bg-pink-500 text-white px-5 py-3 rounded-lg hover:bg-pink-700 transition-all flex items-center gap-2"
          >
            <FaPlus />
            Ekle
          </button>
        </div>

        <ul className="mt-6">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 my-2 rounded-lg shadow-md"
            >
              <span className="text-lg font-medium">{todo}</span>
              <button
                onClick={() => removeTodo(index)}
                className="text-white bg-red-500 px-3 py-2 rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <FaTrash />
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
