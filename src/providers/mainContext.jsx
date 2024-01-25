// import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const mainContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => {
    const context = useContext(mainContext);
    if (!context) throw new Error("There is no provider");
    return context;
};


// eslint-disable-next-line react/prop-types
export const MainProviderContext = ({ children }) => {

    const [cartShopping, setCartShopping] = useState([]);

    const [categories, setCategories] = useState();

    //Bring categories from firebase
    const getCategoriesFirebase = async (collectionName = "categories") => {
        const productsCollection = collection(db, collectionName); //Podemos usarlo para cualquier colección
        const snapshot = await getDocs(productsCollection)
        setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
        getCategoriesFirebase("categories")
    }, []);

    return (
        <mainContext.Provider value={{ getCategoriesFirebase, categories, cartShopping, setCartShopping }}>
            {children}
        </mainContext.Provider>
    )
}
