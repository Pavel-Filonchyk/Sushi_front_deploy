import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ShoppingCart.css'
import ShopList from './ShopList/ShopList';

export default function ShoppingCart() {
    const sushiInCart = useSelector(({ addToCart: { sushiInCart } }) => sushiInCart)
    const totalPrice = useSelector(({ addToCart: { totalPrice } }) => totalPrice )


    const cardNames = sushiInCart.flat().map(card =>{
        return (<ShopList
            card={card}
            key={card.id} 
        />)
    })
    return (
        <section className="shopping_cart">
        <div className="wrap_btn_back">
            <Link className="link" to="/">
                <div className="back_to_main">
                    <h4 className="btn_to_shopping">Back to shopping</h4>
                </div>
            </Link>
        </div>
        {cardNames}
        <div className="total_price">
            <h4 className="text_total_price">Total price: {totalPrice}$</h4>
        </div>
        <div className="block_checkout">
            <Link className="link" to="/Checkout/">
                <div className="btn_to_checkout">
                    <h4 style={{marginBlockStart: 0}}>Proceed to checkout</h4>
                </div>
            </Link>
        </div>
    </section>
    )
}
