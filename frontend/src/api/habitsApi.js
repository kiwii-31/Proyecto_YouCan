const API_URL = import.meta.env.VITE_API_URL + "/habits";

export async function getHabits(usuarioId) {
  try {
    const res = await fetch(`${API_URL}?usuario_id=${usuarioId}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createHabit(habit) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  return await res.json();
}

export async function updateHabit(id, habit) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  return await res.json();
}

export async function deleteHabit(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function toggleHabitDone(habito_id, dia_id, completado) {
  const res = await fetch(`${API_URL}/completado/${habito_id}/${dia_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completado }),
  });
  return await res.json();
}
