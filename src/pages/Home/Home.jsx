import { ItemListContainerComponent } from "../../components/ItemListContainerComponent/ItemListContainerComponent";
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent";
import { GetProductsFirebase } from "../../services/productsService";

import "./HomeStyle.scss"

export const Home = () => {
    const { productsData } = GetProductsFirebase('products');

    return (
        <>
            <div className="container">
                <NavbarComponent />
                <div className="home-content">
                    <ItemListContainerComponent productsData={productsData} />
                </div>
            </div>
        </>
    )
}
