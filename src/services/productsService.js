import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";


//Get all products 
export const GetProductsFirebase = (collectionName = "products") => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        const productsCollection = collection(db, collectionName); //Podemos usarlo para cualquier colección
        getDocs(productsCollection).then((snapshot) => {
            setProductsData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { productsData }
}

//Get specific products by category
export const getProductByCategory = async (category) => {
    const q = query(collection(db, "products"), where("genre", "==", String(category)));
    const querySnapshot = await getDocs(q);
    const resultQ = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return resultQ
}

//Get a product by specific ID
export const useGetProductById = (collectionName = "products", id) => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const docRef = doc(db, collectionName, id)

        getDoc(docRef).then((doc) => {
            setProductData({ id: doc.id, ...doc.data() })
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { productData };
};

//Create a new Category in collection "categories"
export const createCategoryFirebase = (collectionName = "categories", data) => {
    const productsCollection = collection(db, collectionName); //The collection of categories should be used
    return addDoc(productsCollection, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps    
}

//Create a new Category in collection "categories"
export const createProductFirebase = (collectionName = "products", data) => {
    const productsCollection = collection(db, collectionName); //The collection of categories should be used
    return addDoc(productsCollection, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps    
}

//Check if the category exists
export const checkCategoryFirebase = async (category) => {
    const q = query(collection(db, "categories"), where("titleCategory", "==", String(category)));
    const querySnapshot = await getDocs(q);
    const resultQ = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    return resultQ
}


