import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, deleteDoc, addDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import carritoImg from './img/carrito.png';
import './styles/carrito.css';

function Carrito() {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");  
  const db = getFirestore();

  useEffect(() => {
    const refCarrito = collection(db, "carrito");
  
    const unsubscribe = onSnapshot(refCarrito, (snapshot) => {
      const productos = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nombre: data.nombre || "Producto sin nombre",
          precio: parseFloat(data.precio) || 0,
          cantidad: parseInt(data.cantidad, 10) || 0,
        };
      });
      setProductosEnCarrito(productos);
    });
  
    return () => unsubscribe();
  }, [db]);

  const agregarAlCarrito = async (producto) => {
    const refCarrito = collection(db, "carrito");
    const snapshot = await getDocs(refCarrito);
    const productoExistente = snapshot.docs.find((doc) => doc.data().id === producto.id);

    if (productoExistente) {
      const productoRef = productoExistente.ref;
      await setDoc(productoRef, {
        ...productoExistente.data(),
        cantidad: productoExistente.data().cantidad + 1,
      });
    } else {
      await setDoc(doc(refCarrito), {
        ...producto,
        cantidad: 1,
      });
    }
  };

  const vaciarCarrito = async () => {
    const refCarrito = collection(db, "carrito");
    const snapshot = await getDocs(refCarrito);

    const batchPromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(batchPromises);

    setProductosEnCarrito([]);
  };

  const finalizarCompra = async () => {
    if (productosEnCarrito.length === 0) {
      setMensaje("No hay nada en el carrito.");
      return;
    }
  
    const total = productosEnCarrito.reduce((acc, prod) => {
      const precio = prod.precio || 0;
      const cantidad = prod.cantidad || 0;
      return acc + precio * cantidad;
    }, 0);
  
    if (total === 0) {
      setMensaje("Hubo un error con los datos del carrito.");
      return;
    }
  
    const ordenRef = collection(db, "ordenes");
    await addDoc(ordenRef, {
      productos: productosEnCarrito,
      total,
      fecha: new Date(),
    });
  
    await vaciarCarrito();
  
    setMensaje(`¡Compra finalizada con éxito! Total: $${total.toFixed(2)}`);
  
    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };
  return (
    <div className="carritoContenedor">
      <div className="carrito" onClick={() => setIsOpen(!isOpen)}>
        <img className="fotocarrito" src={carritoImg} alt="Carrito" />
      </div>
      {isOpen && (
        <div className="carrito-contenido">
          <h2>Carrito</h2>
          {productosEnCarrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <ul>
              {productosEnCarrito.map((prod) => (
                <li key={prod.id} className="carritoitem">
                  <div>
                    {prod.nombre} - ${prod.precio.toFixed(2)} (x{prod.cantidad})
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="carrito-boton " onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <button className="carrito-boton " onClick={finalizarCompra}>
            Terminar compra
          </button>
          {mensaje && <p className="mensaje-carrito">{mensaje}</p>} 
          <button className="carrito-cerrar" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrito;