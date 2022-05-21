import classes from "./Cart.module.css";
import Modal from "../components/UI/Modal";
import CartItem from "./CartItem";
import { useContext } from 'react';
import CartContext from "../store/cart-context";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;
    const carItemRemoveHandler = id => {
        console.log('removing item with id: ', id);
        cartCtx.removeItem(id);
    }
    const carItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map(
                (item) => (
                    <CartItem 
                    ket={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={carItemRemoveHandler.bind(null, item.id)}
                    onAdd={carItemAddHandler.bind(null, item)}
                    />
                )
            )}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
