import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ShopList from './ShopList/ShopList'
import style from './ShoppingCart.module.scss'

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
        <section className={style.shoppingCart}>
        <div className={style.wrapBtnBack}>
            <Link className={style.link} to="/">
                <div className={style.backToMain}>
                    <h4 className={style.btnToShopping}>Back to shopping</h4>
                </div>
            </Link>
        </div>
        {cardNames}
        <div className={style.totalPrice}>
            <h4 className={style.textTotalPrice}>Total price: {totalPrice}$</h4>
        </div>
        <div className={style.blockCheckout}>
            <Link className={style.link} to="/Checkout/">
                <div className={style.btnToCheckout}>
                    <h4 style={{marginBlockStart: 0}}>Proceed to checkout</h4>
                </div>
            </Link>
        </div>
    </section>
    )
}