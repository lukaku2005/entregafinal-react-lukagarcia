import { useContext } from "react"
import temaContext from "./context"

function Layout({children}) {
    const {tema} = useContext(temaContext)
    return(
        <div style={{background:tema.background, color:tema.font}}>
            {children}
        </div>
    )
}

export default Layout