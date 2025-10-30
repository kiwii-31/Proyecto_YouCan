import { FaBirthdayCake } from "react-icons/fa";

export default function Profile() {
  const user = {
    name: "Laura Martínez",
    email: "laura@gmail.com",
    joined: "2025-10-20",
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Perfil del Usuario</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4 flex items-center gap-2">
          <FaBirthdayCake className="text-yellow-500" />
          <p className="text-gray-750">
            <span className="font-semibold">Fecha de registro:</span> {user.joined}
          </p>
        </div>

        <button className="mt-4 w-full bg-blue-650 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
          Editar Perfil
        </button>
      </div>
    </div>
  );
}
