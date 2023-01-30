import React from 'react'
import { useDispatch } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteItem, addToCounter, deductFromCounter } from '../../../core/actions/addToCartAction'

import style from "./ShopList.module.scss"

export default function ShopList({card}) {
    const {id, url, weight, sushiName, counter, price} = card
    const dispatch = useDispatch()

    const onPlus = (id) => {
        dispatch(addToCounter(id))
    }
    
    const onMinus = (id) => {
        dispatch(deductFromCounter(id))
    }
    const onDelete = (id) => {
        dispatch(deleteItem(id))
    }
    return (
    <div className={style.wrapCart} id={id}>
        <div className={style.wrapperElems}>
            <div className={style.cartItemImg}>
                <img src={url} alt=""/>
            </div>
            <div className={style.cartItemTitle}>{sushiName}</div>
        </div>
        <div className={style.wrapperItems}>
            <div className={style.items}>
                <div className={style.itemsControl} 
                    onClick={() => onMinus(id)}
                >-</div>
                <div className={style.itemsCurrent}>{counter}</div>
                <div className={style.itemsControl} style={{paddingTop: 3}}
                    onClick={() => onPlus(id)}
                >+</div>
            </div>
            <div className={style.priceCart}>
                <div className={style.priceCurrency}>{price}$</div>
            </div>
            <div className={style.cross}
                onClick={() => onDelete(id)}
            ><DeleteOutlined /></div>
        </div>
    </div>
    )
}
