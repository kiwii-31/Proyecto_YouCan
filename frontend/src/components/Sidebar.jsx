import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaTasks,
  FaBars,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";

export default function Sidebar({ children, setUser }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/home", icon: <FaHome />, label: "Bienvenida" },
    { path: "/profile", icon: <FaUser />, label: "Perfil" },
    { path: "/messages", icon: <FaEnvelope />, label: "Mensajes" },
    { path: "/calendar", icon: <FaCalendar />, label: "Calendario" },
    { path: "/habits", icon: <FaTasks />, label: "Habitos" },
    { path: "/help", icon: <FaInfoCircle />, label: "Ayuda" },
    { path: "/about", icon: <FaInfoCircle />, label: "Sobre nosotros" },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-white shadow-lg h-screen fixed transition-all duration-300 overflow-y-auto ${
          open ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          {open && <h2 className="text-2xl font-bold text-gray-700">YouCan</h2>}
          <button
            className="p-2 rounded-md hover:bg-gray-200"
            onClick={() => setOpen(!open)}
          >
            <FaBars size={20} />
          </button>
        </div>

        <ul className="p-4 space-y-2 text-gray-700 pb-24">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
                  location.pathname === item.path
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {open && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>


        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 w-full text-red-600 hover:bg-red-100 rounded-md shadow-sm"
          >
            <FaSignOutAlt size={20} />
            {open && <span>Salir</span>}
          </button>
        </div>
      </aside>

      <div
        className={`flex-1 transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
