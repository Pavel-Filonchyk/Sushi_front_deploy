import React, {useEffect} from 'react'
import {Route,  Routes} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import Main from '../Main/Main';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Checkout from '../Checkout/Checkout';
import { getSushi } from '../../core/actions/getSushiAction'
import Logo from '../Main/img/LogoRoll.png'

import style from '../Main/Main.module.scss'

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSushi())
    }, [])

    return (
        <div>
            <header className={style.logo}>
                <div className={style.logo} style={{background: `url(${Logo}) center center/cover no-repeat`, height: "90px", width: "90px"}}></div>
            </header>
            
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
                <Route path="/Checkout" element={<Checkout/>}/>
            </Routes>
            
        </div> 
    )
}