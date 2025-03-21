const API_BASE = "https://react-todo-app-c5d9fqgcfba0gdaj.northeurope-01.azurewebsites.net";

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
