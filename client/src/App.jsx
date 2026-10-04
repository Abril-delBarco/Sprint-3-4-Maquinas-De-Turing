import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";

export default function App() {

  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  return (
    <>

      <Navbar cartCount={carrito.length} carrito={carrito} />

      {/* main no lleva .contenedor: cada seccion pone el suyo, asi la franja
          de valores puede ocupar el ancho completo con su fondo propio. */}
      <main>
        {productoSeleccionado === null ? (
          <>
            <section className="hero contenedor" id="inicio">
              <div className="hero__texto">
                <span className="ojo-seccion">Taller de autor</span>
                <h1 className="hero__titulo">
                  Muebles que acompañan generaciones
                </h1>
                <p className="hero__descripcion">
                  Diseñamos y fabricamos cada pieza a mano, con maderas macizas
                  de origen responsable. Sin producción en serie, sin apuro:
                  mobiliario pensado para durar y para envejecer bien.
                </p>
                <div className="hero__acciones">
                  <a href="#coleccion" className="boton boton--principal">
                    Ver la colección
                  </a>
                  <a href="#contacto" className="boton boton--secundario">
                    Hablar con el taller
                  </a>
                </div>
              </div>

              <div className="hero__imagen">
                <img
                  src="/assets/sofa-patagonia.png"
                  alt="Sofá de tres cuerpos tapizado en lino, de la colección Hermanos Jota"
                />
              </div>
            </section>

            <section className="cita contenedor">
              <p className="cita__texto">
                “Un mueble bien hecho no se nota. Simplemente está ahí, todos los
                días, sosteniendo la vida de quienes lo usan.”
              </p>
              <span className="cita__autor">Taller Hermanos Jota</span>
            </section>

            <section className="contenedor" id="coleccion">
              <div className="cabecera-seccion">
                <div>
                  <span className="ojo-seccion">Colección</span>
                  <h2 className="titulo-seccion">Nuestra colección</h2>
                  <p className="catalogo-encabezado">
                    Piezas de living, comedor, dormitorio y oficina, fabricadas
                    en el taller y disponibles para entrega.
                  </p>
                </div>
              </div>

              <ProductList
                onSelect={setProductoSeleccionado}
                onAddToCart={agregarAlCarrito}
              />
            </section>

            <section className="franja">
              <div className="contenedor">
                <div className="franja__grilla">
                  <div className="franja__item">
                    <span className="franja__icono" aria-hidden="true">🌳</span>
                    <div>
                      <h3>Madera maciza</h3>
                      <p>Nogal, roble y algarrobo de proveedores certificados.</p>
                    </div>
                  </div>

                  <div className="franja__item">
                    <span className="franja__icono" aria-hidden="true">🔨</span>
                    <div>
                      <h3>Hecho a mano</h3>
                      <p>Ensambles tradicionales, sin herrajes a la vista.</p>
                    </div>
                  </div>

                  <div className="franja__item">
                    <span className="franja__icono" aria-hidden="true">🚚</span>
                    <div>
                      <h3>Entrega y armado</h3>
                      <p>Coordinamos la entrega y dejamos la pieza instalada.</p>
                    </div>
                  </div>

                  <div className="franja__item">
                    <span className="franja__icono" aria-hidden="true">🌿</span>
                    <div>
                      <h3>Huella neutra</h3>
                      <p>Compensamos las emisiones de cada producción.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="artesania contenedor">
              <span className="ojo-seccion">El taller</span>
              <h2 className="titulo-seccion">Artesanía lenta</h2>

              <div className="artesania__grid">
                <div className="artesania__panel">
                  <img
                    src="/assets/aparador-uspallata.png"
                    alt="Aparador de madera recuperada en el taller"
                  />
                  <span>Cada pieza pasa por una sola mesa de trabajo.</span>
                </div>

                <div className="artesania__tarjetas">
                  <article className="tarjeta-info tarjeta-info--claro">
                    <h3>Del bosque al living</h3>
                    <p>
                      Elegimos la madera por tabla, no por lote. Lo que no entra
                      en una pieza se reutiliza en la siguiente.
                    </p>
                  </article>

                  <article className="tarjeta-info tarjeta-info--salvia">
                    <h3>Reparable, no descartable</h3>
                    <p>
                      Mantenemos el stock de repuestos y herrajes de todo lo que
                      sale del taller, sin importar hace cuánto se fabricó.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <div className="contenedor">
              <ContactForm />
            </div>
          </>
        ) : (
          <div className="contenedor">
            <ProductDetail
              id={productoSeleccionado}
              onBack={() => setProductoSeleccionado(null)}
              onAddToCart={agregarAlCarrito}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
