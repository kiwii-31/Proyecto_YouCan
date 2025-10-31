import React, { useState } from "react";

export default function Calendar() {
  const [habits, setHabits] = useState([
    { id: 1, nombre: "Ejercicio", descripcion: "30 minutos diarios", dias: ["lunes","miercoles"], done: false },
    { id: 2, nombre: "Lectura", descripcion: "Leer un libro", dias: ["martes","jueves"], done: false }
  ]);

  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
  const today = new Date().getDay(); // 0=domingo, 1=lunes ...

  const toggleDone = (habitId) => {
    setHabits(
      habits.map((h) =>
        h.id === habitId ? { ...h, done: !h.done } : h
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendario de Habitos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {days.map((day, index) => {
          const dayHabits = habits.filter((h) => h.dias.includes(day));
          const isToday = (today === 0 && day === "domingo") || (today === index + 1 && day !== "domingo");

          return (
            <div
              key={day}
              className={`p-4 rounded-md shadow-md transition-all ${
                isToday ? "bg-blue-100 border-2 border-blue-400" : "bg-white"
              }`}
            >
              <h2 className="font-semibold text-xl capitalize mb-2">{day}</h2>

              {dayHabits.length === 0 ? (
                <p className="text-gray-400 text-sm">No hay habitos</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {dayHabits.map((h) => (
                    <li
                      key={h.id}
                      className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-all"
                    >
                      <span className={h.done ? "line-through text-gray-400" : ""}>{h.nombre}</span>
                      <input
                        type="checkbox"
                        checked={h.done}
                        onChange={() => toggleDone(h.id)}
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

