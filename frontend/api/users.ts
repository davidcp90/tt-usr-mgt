import { User } from "../types/user";

const API_URL = "http://localhost:3000";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function createUser(userData: Omit<User, "id">) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
}

export async function deleteUser(id: string) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
}
