export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">E-commerce</h3>
            <p className="text-gray-400">
              Tu tienda online de confianza
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/catalog" className="hover:text-white">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white">
                  Carrito
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400">
              Email: contacto@ecommerce.com
            </p>
            <p className="text-gray-400">
              Teléfono: +1 234 567 890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 E-commerce. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
