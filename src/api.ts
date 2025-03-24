const API_BASE = "https://react-todo-app-c5d9fqgcfba0gdaj.northeurope-01.azurewebsites.net";

export async function fetchTodos() {
  const res = await fetch(`${API_BASE}/todos`);

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.statusText}`);
  }

  return res.json();
}

export async function addTodo(task: string) {
  const res = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add todo: ${res.statusText}`);
  }

  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete todo: ${res.statusText}`);
  }
}
