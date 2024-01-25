import { Button } from 'antd';
import "./ItemCount.scss"
import { useCount } from '../../hooks/useCount';
import { useMainContext } from '../../providers/mainContext';


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
                <Button onClick={decrement}>-</Button>
                <span className='counterValue'>{count}</span>
                <Button onClick={increment}>+</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
            <div>
                <button onClick={handleAddProductToCart}>Agregar al Carrito</button>
            </div>
        </div>
    )
}
