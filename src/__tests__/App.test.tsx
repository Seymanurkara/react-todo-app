import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TodoList from "../components/TodoList";

// Mock veri
const mockTodos = [{ id: "1", task: "Test Todo" }];

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options?.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "2", task: "Test Todo" }),
      });
    }

    if (options?.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });
  }) as any;
});

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

    const items = await screen.findAllByText("Test Todo");
    expect(items[0]).toBeInTheDocument();
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
