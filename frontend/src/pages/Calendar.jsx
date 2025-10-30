import { useEffect, useState } from "react";
import { getHabits, toggleHabitDone } from "../api/habitsApi";

export default function Calendar({ usuarioId }) {
  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
  const today = new Date().getDay();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function fetchHabits() {
      const data = await getHabits(usuarioId);
      setHabits(data);
    }
    fetchHabits();
  }, [usuarioId]);

  const handleToggle = async (habit, dia) => {
    const diaObj = habit.dias_detalle.find(d => d.nombre === dia);
    if (!diaObj) return;

    const updated = !diaObj.completado;
    await toggleHabitDone(habit.id, diaObj.id, updated);

    setHabits(habits.map(h => {
      if (h.id !== habit.id) return h;
      return {
        ...h,
        dias_detalle: h.dias_detalle.map(d => d.nombre === dia ? { ...d, completado: updated } : d)
      };
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendario</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {days.map((day, index) => {
          const dayHabits = habits.filter(h => h.dias.includes(day));
          const isToday = (today === 0 && day === "domingo") || (today === index + 1 && day !== "domingo");

          return (
            <div
              key={day}
              className={`p-4 rounded-md shadow-md transition-all ${isToday ? "bg-blue-100 border-2 border-blue-400" : "bg-white"}`}
            >
              <h2 className="font-semibold text-xl capitalize mb-2">{day}</h2>

              {dayHabits.length === 0 ? (
                <p className="text-gray-400 text-sm">No hay habitos</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {dayHabits.map(h => (
                    <li key={h.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-all">
                      <span className={h.dias_detalle.find(d => d.nombre === day)?.completado ? "line-through text-gray-400" : ""}>
                        {h.nombre}
                      </span>
                      <input
                        type="checkbox"
                        checked={h.dias_detalle.find(d => d.nombre === day)?.completado || false}
                        onChange={() => handleToggle(h, day)}
                        className="checkbox checkbox-primary"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
