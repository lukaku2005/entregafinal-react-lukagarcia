import { addDoc, collection,getDocs, getFirestore, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import "./styles/cards.css"
import Carrito from "./Carrito"


function filtrado (){
    const [productos, setProductos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const expansiones = {
        SOLLUNA: "Sol y Luna",
        XY: "XY",
        ESPADAESCUDO: "Espada y Escudo",
    }
    const db=getFirestore();

    useEffect(()=>{
        const refItems=collection(db,"items")
        const refItemFiltrados= selectedCategory ? query(refItems, where("expansion", "==", selectedCategory)) : refItems
        
        getDocs(refItemFiltrados).then(snapshot => {
            const productos = snapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(productos)
        });

    },[selectedCategory, db]);
    const agregarAlCarrito = async (item) => {
        await addDoc(collection(db, "carrito"), item)
    }



    return (
        <div className="cardsContainer">
            <h2>Sobres de cartas pokemon</h2>
            <h4>Elegi la expansion que mas te guste</h4>
            <div>
                <button onClick={() => setSelectedCategory(expansiones.SOLLUNA)}>
                    Sol y Luna
                </button>
                <button onClick={() => setSelectedCategory(expansiones.XY)}>XY</button>
                <button onClick={() => setSelectedCategory(expansiones.ESPADAESCUDO)}>
                    Espada y Escudo
                </button>
            
            </div>
            <div>
                {productos.length === 0 ? (
                    <p>No hay productos disponibles</p>
                ) : (
                    productos.map(prod => (
                        <div key={prod.id} className="card">
                            <h3>{prod.nombre}</h3>
                            <p>{prod.descripcion}</p>
                            <img className="imgCards" src={prod.img} alt={prod.nombre} />
                            <p>Precio: ${prod.precio}</p>
                            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default filtrado