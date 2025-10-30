const API_URL = import.meta.env.VITE_API_URL + "/users";

export async function loginUser(correo, contraseña) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }

    return await res.json();
  } catch (err) {
    console.error("loginUser error:", err);
    return { error: "Error al conectar con el servidor" };
  }
}

export async function registerUser({ nombre, correo, edad, contraseña }) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, edad, contraseña }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }

    return await res.json();
  } catch (err) {
    console.error("registerUser error:", err);
    return { error: "Error al conectar con el servidor" };
  }
}

