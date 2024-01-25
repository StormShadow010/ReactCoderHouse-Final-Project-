/* eslint-disable react/prop-types */
import { InfoCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import "./ItemListContainerComponent.scss"

import { Link } from "react-router-dom";

const { Meta } = Card;
// eslint-disable-next-line react/prop-types
export const ItemListContainerComponent = ({ productsData }) => {
    return (
        <div className='productContainer'>
            {productsData.map((product) => {
                return (
                    <Card key={product.id} className='itemProduct'
                        style={{
                            width: 300,
                        }}
                        cover={
                            <img
                                alt="example"
                                src={product.imageLinkGame}
                                height={200}
                                style={{ objectFit: 'fill' }}
                            />
                        }
                        actions={[
                            <Link to={`/item/${product.id}`} key="setting"><InfoCircleOutlined /></Link>,
                        ]}
                    >
                        <Meta
                            title={product.titleGame}
                            description={<div style={{ height: "150px", display: "flex", alignItems: "center" }}>{product.descriptionGame}</div>}
                        />
                        <div style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, textAlign: "center" }}> ${product.priceGame},00 </div>
                    </Card>
                );
            })}





        </div>
        // <div className="productsContainer">
        //     {productsData.map((product) => {
        //         return (
        //             <div key={product.id} className="itemProduct">
        //                 <Card
        //                     style={{
        //                         width: 350,
        //                     }}
        //                     cover={
        //                         <img
        //                             alt="example"
        //                             src={product.background_image}
        //                             width={350}
        //                             height={200}
        //                             style={{ objectFit: 'cover' }}
        //                         />
        //                     }
        //                     actions={[
        //                         // <Link to={`/item/${product.id}`} key="setting"><InfoCircleOutlined /></Link>,
        //                         <PriceGame key="price" />,
        //                     ]}
        //                 >
        //                     {/* <Meta
        //                         title={product.name}
        //                     // description={<Platforms platforms={product.parent_platforms} />}
        //                     /> */}
        //                 </Card>
        //             </div>
        //         );
        //     })}
        // </div>
    )
}
