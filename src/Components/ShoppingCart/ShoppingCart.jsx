import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendSushiCart, sendToExpo } from '../../core/actions/sendSushiCartAction'
import ShopList from './ShopList/ShopList'
import style from './ShoppingCart.module.scss'

//import { Expo } from 'expo-server-sdk'

export default function ShoppingCart() {

    const sushiInCart = useSelector(({ addToCart: { sushiInCart } }) => sushiInCart)
    const totalPrice = useSelector(({ addToCart: { totalPrice } }) => totalPrice )

    const dispatch = useDispatch()

    const onSushiCart = () => {
        dispatch(sendSushiCart())
    }

    const cardNames = sushiInCart?.flat().map(card =>{
        return (<ShopList
            card={card}
            key={card.id} 
        />)
    })

    const sendToServer = () => {
        // ExponentPushToken[dLrNa0D2-Ia74XA3RD3Pk2]
        // ExponentPushToken[8PhAhBMh3pD0_b9Z1nbX8Z]
        let message = [
            {
                to: 'ExponentPushToken[8PhAhBMh3pD0_b9Z1nbX8Z]',
                sound: 'default',
                body: 'This is a TEST notification',
                data: { withSome: 'HOLA' },
            },
            {
                to: 'ExponentPushToken[dLrNa0D2-Ia74XA3RD3Pk2]',
                sound: 'default',
                body: 'IBIZA RULES',
                data: { withSome: 'HOLA' },
            }
        ]
        dispatch(sendToExpo(message))
    }
        
    //

    return (
        <section className={style.shoppingCart}>
        <div className={style.wrapBtnBack}>
            <Link className={style.link} to="/sushi">
                <div className={style.backToMain}>
                    <h4 className={style.btnToShopping}>Back to shopping</h4>
                </div>
            </Link>
        </div>
        {cardNames}
        <div className={style.totalPrice}>
            <h4 className={style.textTotalPrice}>Total price: {totalPrice}$</h4>
        </div>
        <div
           onClick={() => sendToServer()}
           style={{backgroundColor: "wheat", width: 130, cursor: "pointer"}}
        >
            <span>SEND TO EXPO</span>
        </div>
        <div className={style.blockCheckout}>
            <Link className={style.link} to="/checkout/">
                <div className={style.btnToCheckout}>
                    <h4 style={{marginBlockStart: 0}}
                        onClick={() => onSushiCart()}
                    >Proceed to checkout</h4>
                </div>
            </Link>
        </div>
    </section>
    )
}
