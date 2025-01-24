import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";

function TraerCollection() {
    useEffect(() => {
        const db = getFirestore();

        const itemCollection=collection(db, "items")

        getDocs(itemCollection).then(snapshot=>snapshot.docs.map(documento=>
            {
                console.log(documento.data())
                console.log(documento.id)
            }
        ))

    },[])
    return (
        <div></div>
    )
}


export default TraerCollection