function MiniCarrito({ carrito, abierto }) {
  // El carrito es una lista plana: agregar el mismo mueble dos veces mete dos
  // entradas iguales. Se agrupan por id para mostrar "x2" en vez de repetir la
  // fila, y de paso cada item queda con una key estable.
  const items = carrito.reduce((acc, producto) => {
    const existente = acc.find((item) => item.producto.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ producto, cantidad: 1 });
    }

    return acc;
  }, []);

  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

  return (
    <div
      className={`mini-carrito${abierto ? " mini-carrito--abierto" : ""}`}
      aria-hidden={!abierto}
    >
      <h3 className="mini-carrito__titulo">Tu carrito</h3>

      {items.length === 0 ? (
        <p className="mini-carrito__vacio">Todavía no agregaste productos.</p>
      ) : (
        <>
          <ul className="mini-carrito__lista">
            {items.map(({ producto, cantidad }) => (
              <li className="mini-carrito__item" key={producto.id}>
                <img
                  className="mini-carrito__img"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
                <div className="mini-carrito__info">
                  <span className="mini-carrito__nombre">{producto.nombre}</span>
                  <span className="mini-carrito__detalle">
                    {cantidad} × ${producto.precio.toLocaleString("es-AR")}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mini-carrito__footer">
            <span className="mini-carrito__nombre">
              Total: ${total.toLocaleString("es-AR")}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default MiniCarrito;
