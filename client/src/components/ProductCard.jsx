function ProductCard({ producto, onSelect, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(producto);
  };

  return (
    <article className="product-card" onClick={() => onSelect(producto.id)}>
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio.toLocaleString("es-AR")}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </article>
  );
}

export default ProductCard;