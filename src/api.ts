const API_BASE = "http://localhost:5000"; 

export async function fetchTodos() {
    const res = await fetch(`${API_BASE}/todos`);
    return res.json();
}

export async function addTodo(task: string) {
    await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
    });
}

export async function deleteTodo(id: string) {
    await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
}
