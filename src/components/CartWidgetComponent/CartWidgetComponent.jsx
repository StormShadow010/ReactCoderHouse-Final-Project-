import cartShoppingIcon from "../../assets/icons/cartShopping.png"
import { useMainContext } from "../../providers/mainContext"
import { Link } from 'react-router-dom';

// Styles
import "./CartWidgetComponentStyle.scss"

export const CartWidgetComponent = () => {
    const { cartShopping } = useMainContext()
    const totalQuantity = cartShopping.reduce((total, item) => total + item.quantity, 0);
    return (
        <Link to="/brief" className='cartWidgetContainer'>
            <div className="logoCart">
                <img src={cartShoppingIcon} alt="" />
            </div>
            <div className="counterCartWidget">
                <span>{totalQuantity}</span>
            </div>
        </Link>
    )
}
