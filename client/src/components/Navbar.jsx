import { useState } from "react";

export default function Navbar({ cartCount }) {

  const [seccionActiva, setSeccionActiva] = useState("inicio");

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__barra">
        <a 
          href="#inicio" 
          className="encabezado__marca"
          onClick={() => setSeccionActiva("inicio")}
        >
          <img src="/assets/logo.svg" alt="Logo Hermanos Jota" />
          <span>Hermanos Jota</span>
        </a>

        <nav className="nav-principal" id="nav-principal">
          <ul className="nav-principal__lista">
            <li>
              <a 
                href="#inicio" 
                aria-current={seccionActiva === "inicio" ? "page" : undefined}
                onClick={() => setSeccionActiva("inicio")}
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#coleccion"
                aria-current={seccionActiva === "coleccion" ? "page" : undefined}
                onClick={() => setSeccionActiva("coleccion")}
              >
                Colección
              </a>
            </li>
            <li>
              <a 
                href="#contacto"
                aria-current={seccionActiva === "contacto" ? "page" : undefined}
                onClick={() => setSeccionActiva("contacto")}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="encabezado__acciones">
          <div className="carrito-wrapper">
            <button
              className="boton-carrito"
              id="boton-carrito"
              type="button"
              aria-label="Ver carrito"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                alt="Carrito"
                className="icono-carrito"
              />
              {cartCount > 0 && (
                <span className="contador-carrito" id="contador-carrito">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}