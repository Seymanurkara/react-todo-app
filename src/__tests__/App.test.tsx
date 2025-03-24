// src/__tests__/App.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoList from "../components/TodoList";

// ✅ API fonksiyonlarını mockla
vi.mock("../api", () => ({
  fetchTodos: vi.fn().mockResolvedValue([]),
  addTodo: vi.fn().mockImplementation((task: string) => {
    return Promise.resolve({ id: "1", task });
  }),
  deleteTodo: vi.fn().mockResolvedValue(undefined),
}));

describe("TodoList component", () => {
  it("renders heading", () => {
    render(<TodoList />);
    expect(screen.getByTestId("heading")).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });
  });

  it("deletes a todo", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
    });
  });
});
