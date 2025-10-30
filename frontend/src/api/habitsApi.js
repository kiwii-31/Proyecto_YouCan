const API_URL = import.meta.env.VITE_API_URL + "/habits";

// Obtener todos los habitos de un usuario con sus dias y completado
export async function getHabits(usuario_id) {
  const res = await fetch(`${API_URL}?usuario_id=${usuario_id}`);
  return await res.json();
}

// Crear un habito
export async function createHabit(habit) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  return await res.json();
}

// Actualizar un habito
export async function updateHabit(id, habit) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  return await res.json();
}

// Eliminar un habito
export async function deleteHabit(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

// Actualizar completado de un habito para un dia especifico
export async function toggleHabitDone(habito_id, dia_id, completado) {
  const res = await fetch(`${API_URL}/completado/${habito_id}/${dia_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completado }),
  });
  return await res.json();
}
