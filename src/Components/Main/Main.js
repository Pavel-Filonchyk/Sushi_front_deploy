import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { onPlus, onMinus } from '../../core/actions/getSushiAction'
import { addToCart } from '../../core/actions/addToCartAction'

import './Main.scss'

export default function Main() {

    const sushi = useSelector(({ getSushi: { sushi } }) => sushi)

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
        <div className="wrap_card">
            <h1 style={{margin: 5}}>Sushi delivery</h1>
            <h3 style={{margin: 5, marginBottom: 15}}>Promptly and tasty</h3>
            {
                sushi.map((item) =>{ 
                    return (
                <div key={item.id} >
                <div className="card">
                    <img className="product-img" src={item.url} alt=""/>
                        <h3 style={{margin: 5}}>{item.sushiName}</h3>
                        <p style={{margin: 5, marginBottom: 10}}>{item.amount} pcs.</p>
                            <div className="items">
                                <div className="items__control" data-action="minus"
                                    onClick={() => isOnMinus(item._id)}
                                >-</div>
                                <div className="items__current" data-counter>
                                    <div>{item.counter}</div>
                                </div>
                                <div className="items__control" data-action="plus"
                                    onClick={() => isOnPlus(item._id)}
                                >+</div>
                            </div>
                            <div className="price">
                                <div className="price__weight">{item.weight}g.</div>
                                <div className="price__currency">{item.price}$</div>
                            </div>
                            <button type="button" className="btn"
                            onClick={()=> isAddToCart(item._id)}
                        >+ add to cart</button>
                    </div>
                </div>   
                )
            })
        } 
        <div className="cart">
            <Link className="link" to="/ShoppingCart/">
                <div className="button">
                    <h3 style={{margin: 0}}>Your cart</h3>
                </div> 
            </Link> 
        </div>
    </div>
    )
}
