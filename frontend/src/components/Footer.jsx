import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-200 to-blue-300 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        
        <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
          &copy; 2025 YouCan. Todos los derechos reservados.
        </p>

        <div className="flex gap-6 mb-4 sm:mb-0">
          <a href="/about" className="hover:underline hover:text-gray-200 transition-colors">Sobre Nosotros</a>
          <a href="/messages" className="hover:underline hover:text-gray-200 transition-colors">Contacto</a>
        </div>

        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com/reel/DQIDy_uEqxf/?igsh=cWszN3JiMWduZmZl" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <FaLinkedinIn size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
