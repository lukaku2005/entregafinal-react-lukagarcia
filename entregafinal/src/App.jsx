import { useEffect, useState } from 'react'
import {getFirestore, doc, getDoc} from "firebase/firestore"
import temaContext, {temas} from './context';
import Body from './Body';
import Layout from './Layout';
import Footer from './footer';
import Navbar from './Navbar';
import Filtrado from './Filtrado.jsx';
import './styles/App.css'

function App() {

  const [tema, setTema]=useState(temas.claro)

  const cambiarTema = () => {
    setTema(tema === temas.oscuro ? temas.claro : temas.oscuro)
  } 


  const [data, setData] = useState ({});

  const db = getFirestore();

  useEffect(() => {
    const itemRef = doc(db, "items", "4rsCJJfn3KsSJggGESpt")

    getDoc(itemRef).then(snapshot=>{
      setData(snapshot.data());
    })
  },)

  return (
      <temaContext.Provider value={{tema, cambiarTema}}>
          <Layout>
              <Navbar/>
              <Body/>
              <Filtrado/>
              <Footer/>
          </Layout>
      </temaContext.Provider>
  )
}

export default App
