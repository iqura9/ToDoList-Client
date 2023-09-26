import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your actual server URL

// Function to fetch all todos
export const getTodos = async (page?: number, pageSize?: number) => {
  try {
    const params = new URLSearchParams();

    if (page) {
      params.append("page", page.toString());
    }

    if (pageSize) {
      params.append("limit", pageSize.toString());
    }

    const queryString = params.toString();

    const response = await axios.get(
      `${API_BASE_URL}/todo${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Function to create a new todo
export const createTodo = async (newTodo: { value: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todo`, newTodo);
    return response.data;
  } catch (error) {
    console.error("Error creating a new todo:", error);
    throw error;
  }
};

// Function to update an existing todo by ID
export const updateTodo = async (
  todoId: string,
  updatedTodo: { value: string }
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/todo/${todoId}`,
      updatedTodo
    );
    return response.data;
  } catch (error) {
    console.error("Error updating the todo:", error);
    throw error;
  }
};

// Function to delete an existing todo by ID
export const deleteTodo = async (todoId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/todo/${todoId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting the todo:", error);
    throw error;
  }
};
