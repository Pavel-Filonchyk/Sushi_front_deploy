import React, {useState, useEffect, useRef, ChangeEvent} from 'react'
import {Link} from 'react-router-dom';
import { Form, Input, Button, Upload } from 'antd'
import Axios from 'axios'

import httpProvider from '../../common/constants/httpProvider';

const Checkout = () => {

    useEffect(() => {
        httpProvider.get("http://localhost:3001/payment").then(response => {
        console.log(response);
      })
    }, [])
    
    const onFinish = (e) => {
        //console.log(e)
    }

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
        <section className="checkout">
            <div className="wrap_btn_back">
                <Link className="link" to="/">
                    <div className="back_to_main">
                        <h4 className="btn_to_shopping">Back to shopping</h4>
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
            <img src="http://localhost:3001/images/8fd6cc82-5b68-4506-9895-ff2307c105d5.jpg" name="profile_pic"/>
        </section>
    )
}

export default Checkout

