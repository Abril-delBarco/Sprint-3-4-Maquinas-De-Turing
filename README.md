# E-commerce Hermanos Jota

Tienda online de muebles desarrollada como proyecto integrador de los Sprints 3 y 4.
El backend es una API REST en Express que sirve el catálogo de productos; el frontend es
una SPA en React que consume esa API, maneja el carrito en memoria y permite ver el
detalle de cada mueble y enviar una consulta de contacto.

## Integrantes

| Integrante | Parte | Rama |
| --- | --- | --- |
| Matias Ismael Alegret | Backend: servidor Express y middlewares (`logger`, `notFound`, `errorHandler`) | `feat/backend-servidor` |
| Matías Joel Gonzales | Backend: datos de productos y rutas de la API | `feat/api-productos` |
| Abril Dominguez del Barco | Frontend: `App.jsx`, `Navbar`, `Footer` y estilos globales | `feat/app-base` |
| Lautaro Ardizzi | Frontend: catálogo (`ProductList`, `ProductCard`) y `services/api.js` | `feat/catalogo` |
| Martín Ortega | Frontend: detalle de producto, formulario de contacto y README | `feat/detalle-contacto` |

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

Verificá tu versión con `node -v` y `npm -v`.

## Instalación y ejecución

El proyecto son dos aplicaciones independientes, así que necesitás **dos terminales
abiertas en paralelo**: una para el backend y otra para el frontend.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Abril-delBarco/Sprint-3-4-Maquinas-De-Turing.git
cd Sprint-3-4-Maquinas-De-Turing
```

### 2. Backend (terminal 1)

```bash
cd backend
npm install
npm run dev
```

El servidor queda escuchando en **http://localhost:5000**. En la consola vas a ver el
método y la URL de cada petición que llega, gracias al middleware de logging.

### 3. Frontend (terminal 2)

```bash
cd client
npm install
npm run dev
```

La aplicación queda disponible en **http://localhost:3000**.

> El frontend necesita el backend corriendo para mostrar los productos. Si lo abrís con
> el backend apagado, la app no se rompe: muestra un mensaje de error.

## Endpoints de la API

Base: `http://localhost:5000`

| Método | Ruta | Descripción | Código |
| --- | --- | --- | --- |
| `GET` | `/api/productos` | Devuelve el listado completo de productos | `200` |
| `GET` | `/api/productos/:id` | Devuelve un único producto por su `id` | `200` |
| `GET` | `/api/productos/:id` | Si el `id` no existe | `404` |
| `GET` | cualquier otra ruta | Ruta no contemplada por la API | `404` |

### `GET /api/productos`

```json
[
  {
    "id": 1,
    "nombre": "Sofá Patagonia",
    "descripcion": "Sofá de tres cuerpos tapizado en lino Warm Alabaster con estructura de madera maciza y patas cónicas.",
    "precio": 389000,
    "imagen": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    "categoria": "Living"
  }
]
```

### `GET /api/productos/1`

```json
{
  "id": 1,
  "nombre": "Sofá Patagonia",
  "descripcion": "Sofá de tres cuerpos tapizado en lino Warm Alabaster con estructura de madera maciza y patas cónicas.",
  "precio": 389000,
  "imagen": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
  "categoria": "Living"
}
```

### `GET /api/productos/999`

```json
{ "error": "Producto no encontrado" }
```

### `GET /ruta-que-no-existe`

```json
{ "error": "Ruta no encontrada" }
```

## Forma del producto

Todos los productos tienen exactamente estos campos. Es el contrato que comparten el
backend, las tarjetas del catálogo y la vista de detalle:

| Campo | Tipo | Notas |
| --- | --- | --- |
| `id` | number | Único |
| `nombre` | string | |
| `descripcion` | string | |
| `precio` | number | En pesos, sin formato. El formato se aplica en el frontend |
| `imagen` | string | URL absoluta |
| `categoria` | string | |

## Arquitectura

```
Sprint-3-4-Maquinas-De-Turing/
├── backend/
│   ├── server.js                     # Monta middlewares y rutas, escucha en :5000
│   ├── data/
│   │   └── productos.js              # Array de productos (fuente de datos)
│   ├── routes/
│   │   └── productos.routes.js       # GET / y GET /:id
│   └── middlewares/
│       ├── logger.js                 # Registra método + URL de cada petición
│       ├── notFound.js               # 404 para rutas no contempladas
│       └── errorHandler.js           # Manejador central de errores
│
├── client/
│   ├── vite.config.js                # Puerto 3000 + proxy /api -> :5000
│   └── src/
│       ├── App.jsx                   # Estado global (carrito y producto seleccionado)
│       ├── App.css                   # Estilos globales y sistema de diseño
│       ├── services/
│       │   └── api.js                # Todas las llamadas a la API
│       └── components/
│           ├── Navbar.jsx            # Marca + contador del carrito
│           ├── Footer.jsx            # Datos de contacto
│           ├── ProductList.jsx       # Fetch del listado, estados de carga y error
│           ├── ProductCard.jsx       # Tarjeta individual
│           ├── ProductDetail.jsx     # Fetch por id, volver, agregar al carrito
│           └── ContactForm.jsx       # Formulario controlado
│
└── README.md
```

### Cómo viaja un pedido de React a Express

```
ProductList / ProductDetail
        |  llaman a getProductos() o getProductoPorId(id)
        v
src/services/api.js
        |  fetch("/api/productos")   <- ruta relativa, sin host
        v
Servidor de desarrollo de Vite (:3000)
        |  el proxy reescribe /api hacia http://localhost:5000
        v
server.js (:5000)
        |  cors -> express.json -> logger
        v
app.use("/api/productos", productosRouter)
        |
        +-- encuentra el producto  -> res.json(producto)         -> 200
        +-- no lo encuentra        -> next(error) -> errorHandler -> 404
```

La respuesta vuelve por el mismo camino y el componente la guarda en su estado con
`setProductos` o `setProducto`, lo que dispara el re-render.

## Decisiones tomadas

**El estado del carrito vive en `App.jsx` y baja por props.**
`App.jsx` es el ancestro común de `Navbar` (que muestra el contador), `ProductCard` y
`ProductDetail` (que agregan productos). Si el estado viviera en cualquiera de los hijos,
los otros no podrían leerlo ni modificarlo. Por eso `App.jsx` concentra `carrito` y
`productoSeleccionado`, y baja `cartCount`, `onSelect` y `onAddToCart`. El carrito se
actualiza siempre con un array nuevo (`[...carrito, producto]`) y nunca con
`carrito.push()`, porque mutar el estado no dispara el re-render.

**Los fetch están centralizados en `src/services/api.js`.**
Ningún componente llama a `fetch` directamente. Así la URL de la API está escrita en un
solo lugar, el manejo de `res.ok` es idéntico en todas las llamadas, y el día que haya que
cambiar una ruta se toca un único archivo. `ProductList` y `ProductDetail` sólo consumen
las funciones `getProductos()` y `getProductoPorId(id)`.

**Proxy de Vite para evitar CORS en desarrollo.**
El frontend y el backend corren en puertos distintos, así que un `fetch` directo de `:3000`
a `:5000` sería una petición cross-origin. En lugar de depender de CORS, el servidor de
desarrollo de Vite actúa como intermediario: el frontend pide `/api/productos` al mismo
origen y Vite lo reenvía al backend. Por eso en el código **siempre se usan rutas
relativas**, nunca la URL completa.

> Las guías de trabajo planteaban el proxy con la clave `"proxy"` de `package.json`, que es
> una convención de Create React App. Este cliente está hecho con **Vite**, donde esa
> clave no tiene ningún efecto, así que el proxy se configura en `client/vite.config.js`
> dentro de `server.proxy`. Los puertos del contrato original (3000 para el frontend, 5000
> para el backend) se mantienen tal cual.

**Los errores 404 se derivan al manejador central con `next(error)`.**
La ruta `GET /api/productos/:id` no construye la respuesta de error por su cuenta: crea un
`Error`, le asigna `status = 404` y lo pasa con `next(error)`. El `errorHandler` registrado
al final de `server.js` es el único lugar que decide el formato de las respuestas de error.
Así todos los errores de la API salen con la misma forma (`{ error: mensaje }`).

**El orden de los middlewares en `server.js` es significativo.**
`logger` va antes de las rutas para registrar todas las peticiones; `notFound` va después
de todas las rutas, porque sólo debe responder cuando ninguna coincidió; y `errorHandler`
va siempre al final, ya que Express identifica el manejador de errores por su firma de
cuatro parámetros `(err, req, res, next)`.

**El frontend no tiene datos propios.**
No hay ningún array de productos en el código del cliente. Todo lo que se muestra viene de
la API, y los estados de carga y error están manejados en los componentes que hacen el
pedido.
