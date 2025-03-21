const API_BASE = "http://localhost:5001"; // Ensure this matches your backend port

export async function fetchTodos() {
    const res = await fetch(`${API_BASE}/todos`);
    return res.json();
}

export async function addTodo(task: string) {
    const res = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
    });

    return res.json(); // Ensure the response is returned
}

export async function deleteTodo(id: string) {
    await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
}
