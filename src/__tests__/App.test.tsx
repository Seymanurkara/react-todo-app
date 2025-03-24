import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TodoList from "../components/TodoList";

// Mock-data
const mockTodos = [{ id: "1", task: "Test Todo" }];

beforeEach(() => {
  globalThis.fetch = vi.fn((_, options) => {
    if (options?.method === "POST") {
      const body = JSON.parse(options.body as string);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "2", task: body.task }),
      });
    }

    if (options?.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: "1", task: "Test Todo" }]),
    });
  }) as any;
});

describe("TodoList component", () => {
  it("renders heading", () => {
    render(<TodoList />);
    expect(screen.getByTestId("heading")).toBeInTheDocument();
  });

  it("renders heading with correct text", () => {
    render(<TodoList />);
    const heading = screen.getByTestId("heading");
    expect(heading).toHaveTextContent(/todo list/i);
  });

  it("adds a new todo via Add button", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    const items = await screen.findAllByText("Test Todo");
    expect(items[0]).toBeInTheDocument();
  });

  it("adds a new todo with Enter key", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
  
    fireEvent.change(input, { target: { value: "New Task with Enter" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  
    const newItem = await screen.findByText("New Task with Enter");
    expect(newItem).toBeInTheDocument();
  });
  
  it("renders heading", async () => {
    await waitFor(() => {
      render(<TodoList />);
    });
    expect(screen.getByTestId("heading")).toBeInTheDocument();
  });

  
  it("deletes a todo", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    const deleteButtons = await screen.findAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const remainingItems = screen.queryAllByText("Test Todo");
      expect(remainingItems.length).toBeLessThan(2);
    });
  });
});
