import React, {useState, useEffect, useRef, ChangeEvent} from 'react'
import {Link} from 'react-router-dom';
import { Form, Input, Button, Upload } from 'antd'
import Axios from 'axios'

import httpProvider from '../../common/constants/httpProvider';
import style from './Checkout.module.scss'

const Checkout = () => {

    useEffect(() => {
        httpProvider.get("http://localhost:3001/payment").then(response => {
        console.log(response);
      })
    }, [])


    const [img, setImg] = useState(null)

    const handleChange = (e) => {
        if (e.target.files.length !== 0) {
            setImg(URL.createObjectURL(e.target.files[0]))      
        }
  
        // const formData = new FormData();
        // formData.append('customFile', e.target.files[0])      // отправка на сервак
        // console.log(formData)
    }
    console.log(img)
  
    const submit = () => {
        // Axios.post("http://localhost:3001/payment", {
        //     name: 'Pavel',
        //     position: 'fullstack developer',
        //     img: img
        // })
      
        fetch('http://localhost:3001/postPhoto', {
            method: 'POST',
            headers: {
                "Contetnt-Type":"multipart/form-data" 
            },
            body: JSON.stringify(img)
        })
    }
    return (
        <section className={style.checkout}>
            <div className={style.wrapBtnBack}>
                <Link className={style.link} to="/">
                    <div className={style.backToMain}>
                        <h4 className={style.btnToShopping}>Back to shopping</h4>
                    </div>
                </Link>
            </div>
            <input type="file" name="img" id="content-img"  multiple accept="image/*"
                onChange={(e) => handleChange(e) }
            ></input>
            <button
                onClick={submit}
            >Отправить</button>

            <img src={img} />
        </section>
    )
}

export default Checkout

