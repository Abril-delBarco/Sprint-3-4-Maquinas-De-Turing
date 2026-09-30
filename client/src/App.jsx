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
  
      <Navbar cartCount={carrito.length} />

      <main className="contenedor">
        {productoSeleccionado === null ? (
          <>
            <ProductList
              onSelect={setProductoSeleccionado}
              onAddToCart={agregarAlCarrito}
            />
            <ContactForm />

          </>
        ) : (
          <ProductDetail
            id={productoSeleccionado}
            onBack={() => setProductoSeleccionado(null)}
            onAddToCart={agregarAlCarrito}
          />
        )}
      </main>

      <Footer />
    </>
  );
}