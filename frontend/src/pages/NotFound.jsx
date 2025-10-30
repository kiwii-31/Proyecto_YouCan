import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4">La pagina que buscas no existe.</p>
      <Link to="/" className="text-green-600 hover:underline">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
