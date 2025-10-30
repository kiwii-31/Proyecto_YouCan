import { useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setMessages([...messages, { ...form, id: Date.now() }]);
    setForm({ name: "", email: "", message: "" });
    setError("");
    alert("¡Mensaje enviado!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Enviar Mensaje</h1>
      <p className="text-gray-600 mb-6 text-center">
        Puedes enviarnos mensajes con tus dudas o comentarios sobre YouCan.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full hover:scale-105 transition-transform">
          Enviar
        </button>
      </form>

      {messages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Mensajes enviados en esta sesion:</h2>
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="bg-gray-50 p-4 rounded-md shadow hover:bg-gray-100 transition-all"
              >
                <p><strong>De:</strong> {msg.name} ({msg.email})</p>
                <p><strong>Mensaje:</strong> {msg.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
