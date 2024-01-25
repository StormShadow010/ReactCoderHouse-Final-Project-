import { useParams } from "react-router-dom";
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent"
import "./ItemDetailIndividualStyle.scss"
import { useGetProductById } from "../../services/productsService";
import { ItemCount } from "../../components/ItemCount/ItemCount";

export const ItemDetailIndividual = () => {
    const { id } = useParams()
    // const { productsData } = useGetProductById('products', id)
    const { productData } = useGetProductById("products", id)
    // console.log(productData)

    return (
        <div className="mainContainerItemDetail" >
            <NavbarComponent />
            <div className="mainInfoDetail">
                <div className="imageContainer">
                    <img src={productData?.imageLinkGame} alt="Image Game" />
                </div>
                <div className="infoContainer">
                    <div className="infoTitle">
                        <p className="titleInfo">Title Game</p>
                        <p className="dataInfo">{productData?.titleGame}</p>
                    </div>
                    <div className="infoGenres">
                        <p className="titleInfo">Genre</p>
                        <p className="dataInfo">{productData?.genre}</p>
                        {/* <Genres /> */}
                    </div>
                    <div className="infoDescription">
                        <p className="titleInfo">Description</p>
                        <p className="textInfo">{productData?.descriptionGame}</p>
                        {/* <Platforms /> */}
                    </div>
                    <div className="infoPrice">
                        <p className="titleInfo">Price</p>
                        <p className="dataInfo">$ {productData?.priceGame}</p>
                        {/* <Platforms /> */}
                    </div>

                </div>

                <ItemCount product={productData} />
            </div>
        </div >
    )
}
