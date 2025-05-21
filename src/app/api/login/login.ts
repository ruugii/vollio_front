import { BASE_API_URL } from "../../data";

interface logininterface {
  email: string;
  password: string;
}

export default async function loginUser(info: logininterface) {
  try {
    const response = await fetch(`${BASE_API_URL}/users/login`, {
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