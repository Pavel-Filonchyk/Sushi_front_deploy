import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { onPlus, onMinus } from '../../core/actions/getSushiAction'
import { addToCart } from '../../core/actions/addToCartAction'

import style from './Main.module.scss'

export default function Main() {

    const sushi = useSelector(({ getSushi: { sushi } }) => sushi)
    console.log(sushi)
    const dispatch = useDispatch()

    const isOnPlus = (id) => {
        dispatch(onPlus(id)) 
    }
    const isOnMinus = (id) => {
        dispatch(onMinus(id))
    }
    const isAddToCart = (id) => {   
        dispatch(addToCart(id))
    }
    return (
        <div className={style.wrapCard}>
            <h1 style={{margin: 5}}>Sushi delivery</h1>
            <h3 style={{margin: 5, marginBottom: 15}}>Promptly and tasty</h3>
            {
                sushi?.map((item) =>{ 
                    return (
                    <div key={item.id} >
                    <div className={style.card}>
                        <img className={style.productImg} src={item.url} alt=""/>
                            <h3 style={{margin: 5}}>{item.sushiName}</h3>
                            <p style={{margin: 5, marginBottom: 10}}>{item.amount} pcs.</p>
                                <div className={style.items}>
                                    <div className={style.itemsControl} data-action="minus"
                                        onClick={() => isOnMinus(item._id)}
                                    >-</div>
                                    <div className={style.itemsCurrent} data-counter>
                                        <div>{item.counter}</div>
                                    </div>
                                    <div className={style.itemsControl} data-action="plus" style={{paddingTop: 3}}
                                        onClick={() => isOnPlus(item._id)}
                                    >+</div>
                                </div>
                                <div className={style.price}>
                                    <div className={style.priceWeight}>{item.weight}g.</div>
                                    <div className={style.priceCurrency}>{item.price}$</div>
                                </div>
                                <button type="button" className={style.btn}
                                onClick={()=> isAddToCart(item._id)}
                            >+ add to cart</button>
                        </div>
                    </div>   
                )
            })
        } 
        <div className={style.cart}>
            <Link className={style.link} to="/ShoppingCart/">
                <div className={style.button}>
                    <h3 style={{margin: 0}}>Your cart</h3>
                </div> 
            </Link> 
        </div>
    </div>
    )
}
