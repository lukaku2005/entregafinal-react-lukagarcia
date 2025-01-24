import { createContext } from "react";

export const temas = {
    claro:{
        font:"black",
        background:"white"
    },
    oscuro:{
        font:"white",
        background:"black"
    }

};
const temaContext = createContext(temas.claro)

export default temaContext;