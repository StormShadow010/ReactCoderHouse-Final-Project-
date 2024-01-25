import { Button } from 'antd';
import { useCount } from '../../hooks/useCount';
import { useMainContext } from '../../providers/mainContext';

// Styles
import "./ItemCount.scss"

// eslint-disable-next-line react/prop-types
export const ItemCount = ({ product }) => {
    const { count, decrement, increment, reset } = useCount(1, 0, 10)

    const { cartShopping, setCartShopping } = useMainContext()

    const handleAddProductToCart = () => {
        // eslint-disable-next-line react/prop-types
        const productExists = cartShopping.find((item) => item.id === product.id);
        if (productExists) {
            setCartShopping(
                cartShopping.map((item) =>
                    // eslint-disable-next-line react/prop-types
                    item.id === product.id ? { ...item, quantity: item.quantity + count } : item
                )
            );
        } else {
            setCartShopping([...cartShopping, { ...product, quantity: count }]);
        }
        reset()
    }

    return (
        <div className="counterContainer">
            <div className='buttonsCounter'>
                <div className="wrap">
                    <button onClick={decrement}><div className="outline"><p>-</p></div></button>
                </div>
                <span className='counterValue'>{count}</span>
                <div className="wrap">
                    <button onClick={increment}><div className="outline"><p>+</p></div></button>
                </div>
            </div>
            <div>
                <Button type='primary' onClick={reset} style={{ margin: "10px" }}>Reset</Button>
                <Button type='primary' onClick={handleAddProductToCart} style={{ margin: "10px" }}>Add to cart</Button>
            </div>
        </div>
    )
}
