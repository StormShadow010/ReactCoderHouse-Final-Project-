import { useParams } from "react-router-dom"
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent"
import { useEffect, useState } from "react"
import { getProductByCategory } from "../../services/productsService"
import { ItemListContainerComponent } from "../../components/ItemListContainerComponent/ItemListContainerComponent"

// Styles
import "./CategoryStyle.scss"

export const Category = () => {
    const { category } = useParams()

    const [productsData, setProductsData] = useState([]);

    const fetchDataGeneral = async () => {
        const fetchedData = await getProductByCategory(category);
        setProductsData(fetchedData)
    }

    useEffect(() => {
        fetchDataGeneral()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <>
            <div className="containerCategoryIndividual">
                <NavbarComponent />
                <div className="categoryIndividual-content">
                    {productsData && (< ItemListContainerComponent productsData={productsData} />)}
                </div>
            </div>
        </>
    )
}
