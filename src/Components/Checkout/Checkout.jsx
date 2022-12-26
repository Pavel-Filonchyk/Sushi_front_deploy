import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button } from 'antd'

import ModalWrapper from '../../wrapers/ModalWrarrer/ModalWrapper'
import AlertWrapper from '../../wrapers/AlertWrapper/AlertWrapper'
import X from './images/X.png'
import { resetSushiCart } from '../../core/actions/addToCartAction'

import style from './Checkout.module.scss'


const Checkout = () => {
    const bill = useSelector(({ postBill: { bill } }) => bill)
  
    const [showCheckout, setShowCheckout] = useState(true)
    const [showAlert, setAlert] = useState(false)
    const [showOutAlert, setOutAlert] = useState(true)
    const images = <img src={X} style={{ width: 12, height: 12 }} alt="X" />
    const dispatch = useDispatch()
    
    const onBuySushi = () => {
        setShowCheckout(false)
        setAlert(true)
        dispatch(resetSushiCart())
    }

    const navigate = useNavigate()
    const closeAlert = () => {
        setAlert(false)
        navigate('/sushi')
        
    }
    const onCloseCheckout = () => {
        setShowCheckout(false)
    }
    const onOutAlert = () => {
        setOutAlert(false)
        navigate('/')
    }
    const ref = React.createRef()
    const closeModalPreview = (event) => {
      const domNode = ref.current;
      if (!domNode || !domNode.contains(event.target)) {
        setShowCheckout(false)
      }
    }
    return (
        <section className={style.checkout}>
            {
                document.cookie ? 
                    <ModalWrapper showCheckout={showCheckout}>
                        <div className={style.mainWrap}>
                            <div className={style.header}>
                                <p style={{ paddingLeft: 32 }}>{bill?.userName} here is your order</p>
                                <div className={style.x} onClick={() => onCloseCheckout()}>
                                    <Link className={style.link} to="/sushi">{images}</Link>
                                </div>
                            </div>  
                            {
                                bill?.check?.map(item => {
                                    return (
                                        <div key={item.sushiName} className={style.wrapCart}>
                                            <span>{item.sushiName}</span>
                                            <span>{item.price} $</span>
                                        </div>
                                    )
                                })
                            } 
                            <span className={style.price}>Total price { bill?.totalPrice} $</span>

                            <div className={style.wrapBtn}>
                                <Button 
                                    className={style.btn}
                                    style={{ border: '2px solid #eb5a1e' }}
                                    onClick={() => onBuySushi()}
                                >Buy sushi</Button> 
                            </div>  
                        </div> 
                    </ModalWrapper>
                :   <AlertWrapper showOutAlert={showOutAlert}>
                        <div className={style.mainWrap}>
                            <div className={style.wrapAlert}>
                                <span>You are not authorized,</span>
                                <span>register on the site</span>
                            </div>
                            <div className={style.wrapBtn}>
                                <Button
                                    className={style.btn}
                                    style={{ border: '2px solid #eb5a1e' }}
                                    onClick={() => onOutAlert()}
                                >
                                    <span>Ok</span>
                                </Button>
                            </div>
                            
                        </div> 
                    </AlertWrapper>
            }
            <AlertWrapper showAlert={showAlert}>
                <div className={style.mainWrap}>
                    <div className={style.wrapAlert}>
                        <span>Payment method not set</span>
                        <span>Try again</span>
                    </div>
                    <div className={style.wrapBtn}>
                        <Button
                            className={style.btn}
                            style={{ border: '2px solid #eb5a1e' }}
                            onClick={() => closeAlert()}
                        >
                            <span>Ok</span>
                        </Button>
                    </div>
                    
                </div> 
            </AlertWrapper>
            </section>
    )
}

export default Checkout

