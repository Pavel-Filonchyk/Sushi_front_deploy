import React, {useEffect} from 'react'
import {Route,  Routes} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import Main from '../Main/Main';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Checkout from '../Checkout/Checkout';
import Registration from '../Registration/Registration'
import { getSushi } from '../../core/actions/getSushiAction'
import Logo from './img/LogoRoll.png'

import style from './App.module.scss'

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
                <Route path="/" element={<Registration/>}/>
                <Route path="/Main" element={<Main/>}/>
                <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
                <Route path="/Checkout" element={<Checkout/>}/>
            </Routes>
            
        </div> 
    )
}