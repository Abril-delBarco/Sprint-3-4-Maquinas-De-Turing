import { useState, useEffect, useRef } from "react";
import MiniCarrito from "./MiniCarrito";

export default function Navbar({ cartCount, carrito = [], onNavigate }) {

  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const carritoRef = useRef(null);

  // En mobile el CSS deja la navegacion colapsada hasta que aparece
  // .nav--abierto, asi que al elegir una seccion hay que volver a cerrarla.
  const irASeccion = (seccion) => {
    setSeccionActiva(seccion);
    setMenuAbierto(false);
    if (onNavigate) {
      onNavigate(seccion);
    }
  };

  // El panel se cierra al clickear fuera. Sin esto queda abierto para siempre
  // y tapa el contenido, porque no hay ningun overlay que lo cubra.
  useEffect(() => {
    if (!carritoAbierto) return;

    const alClickearFuera = (e) => {
      if (carritoRef.current && !carritoRef.current.contains(e.target)) {
        setCarritoAbierto(false);
      }
    };

    document.addEventListener("mousedown", alClickearFuera);
    return () => document.removeEventListener("mousedown", alClickearFuera);
  }, [carritoAbierto]);

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__barra">
        <a
          href="#inicio"
          className="encabezado__marca"
          onClick={() => irASeccion("inicio")}
        >
          <img src="/assets/logo.svg" alt="Logo Hermanos Jota" />
          <span>Hermanos Jota</span>
        </a>

        <nav
          className={`nav-principal${menuAbierto ? " nav--abierto" : ""}`}
          id="nav-principal"
        >
          <ul className="nav-principal__lista">
            <li>
              <a
                href="#inicio"
                aria-current={seccionActiva === "inicio" ? "page" : undefined}
                onClick={() => irASeccion("inicio")}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#coleccion"
                aria-current={seccionActiva === "coleccion" ? "page" : undefined}
                onClick={() => irASeccion("coleccion")}
              >
                Colección
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                aria-current={seccionActiva === "contacto" ? "page" : undefined}
                onClick={() => irASeccion("contacto")}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="encabezado__acciones">
          <div className="carrito-wrapper" ref={carritoRef}>
            <button
              className="boton-carrito"
              id="boton-carrito"
              type="button"
              aria-label="Ver carrito"
              aria-expanded={carritoAbierto}
              onClick={() => setCarritoAbierto((abierto) => !abierto)}
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

            <MiniCarrito carrito={carrito} abierto={carritoAbierto} />
          </div>

          <button
            className="boton-menu"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuAbierto}
            aria-controls="nav-principal"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
