import { useState } from 'react';
import { Col, Row } from 'antd';
import { useMainContext } from '../../providers/mainContext';
import { CartWidgetComponent } from '../CartWidgetComponent/CartWidgetComponent';
import { Link } from 'react-router-dom';

// Styles
import "./NavbarComponentStyle.scss"

//Icons
import logoStore from "../../assets/icons/logoStore.jpg"
import dropDown from "../../assets/icons/dropDown.png"


export const NavbarComponent = () => {

    const { categories } = useMainContext()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const capitalizarPrimeraLetra = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Row className='navbar'>
            <Col className='left-side' xs={{ span: 8, offset: 0 }} md={{ span: 12, offset: 0 }}>
                <Link to="/"> <img src={logoStore} alt="LogoStore" /></Link>
            </Col>
            <Col xs={{ span: 16, offset: 0 }} md={{ span: 12, offset: 0 }}>
                <Row style={{ height: "100%" }}>
                    <Col className='middle-side' xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }}>
                        <ul>
                            <li> <Link to="/" className='pageLink'>Home</Link></li>
                            <li> <Link to="/create" className='pageLink'>Create</Link></li>
                            <li>
                                <button className='dropdown-toggle' onClick={toggleDropdown}>
                                    <h3>Categories</h3>
                                    <img src={dropDown} alt="dropdown" />
                                    {(isOpen && categories.length > 0) && (

                                        <ul className={`dropdown-menu ${isOpen ? "active" : ""}`}>
                                            {categories.map((categoryItem) => (
                                                // <h1 key={index}>{categoryItem}</h1>
                                                <li key={categoryItem.id}>
                                                    <Link to={`/category/${categoryItem.titleCategory}`} className='pageLink' onClick={() => console.log(`Clicked on category: ${categoryItem.titleCategory}`)}>{capitalizarPrimeraLetra(categoryItem.titleCategory)}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </Col>
                    <Col className='right-side' xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }}>
                        <CartWidgetComponent />
                    </Col>
                </Row>

            </Col >
        </Row >
    )
}
