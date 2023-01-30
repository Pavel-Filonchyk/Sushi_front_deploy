import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendSushiCart } from '../../core/actions/sendSushiCartAction'
import ShopList from './ShopList/ShopList'
import style from './ShoppingCart.module.scss'
import { LeftCircleOutlined } from '@ant-design/icons'
import { WalletOutlined } from '@ant-design/icons'

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

    return (
        <section className={style.shoppingCart}>
            <Link className={style.link} to="/sushi">
                <div className={style.button}>
                    <LeftCircleOutlined 
                        style={{fontSize: '35px'}}
                    />
                </div>
            </Link>
        {cardNames}
        <div className={style.totalPrice}>
            <h4 className={style.textTotalPrice}>Total price: {totalPrice}$</h4>
        </div>
        <div className={style.blockCheckout}>
            <Link className={style.link} to="/checkout/">
                <div className={style.btnToCheckout}
                    onClick={() => onSushiCart()}
                >
                    <WalletOutlined 
                        style={{fontSize: '40px'}}
                    />
                </div>
            </Link>
        </div>
    </section>
    )
}
