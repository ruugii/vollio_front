import { BASE_API_URL } from "../../data.ts";

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

export default async function RegisterUser(info: RegisterRequest) {
  try {
    const response = await fetch(`${BASE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in register API:", error);
    throw new Error("Failed to register");
  }
}