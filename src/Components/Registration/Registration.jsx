import React, {useState, useEffect} from 'react'
import { Button, Form, Input } from 'antd'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ModalWrapper from '../../wrapers/ModalWrarrer/ModalWrapper'
import AlertWrapper from '../../wrapers/AlertWrapper/AlertWrapper'
import { postLogin, postRegistration } from '../../core/actions/registrationAction'

import style from './Registration.module.scss'
import {GET_SUSHI} from '../../common/api'

export default function Registration() {
    const dispatch = useDispatch()

    const token = useSelector(({ getToken: { token } }) => token)
    const errorMessage = useSelector(({ getError: { error } }) => error)
   
    const [form] = Form.useForm()

    const [showLogin, setShowLogin] = useState(false)
    const [showRegistration, setRegistration] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
      if(token) {
        navigate('/sushi')
      }
    }, [token])

    useEffect(() => {
        if(errorMessage) {
            setShowAlertError(true)
        }
      }, [errorMessage])
  
    const onFinishLogin = (e) => {
        setShowLogin(false)
        dispatch(postLogin(e))
        form.resetFields()
    }
    const onFinishRegistration = (e) => {
        setRegistration(false)
        dispatch(postRegistration(e))
        console.log(e)
        form.resetFields()
    }

    return (
        <div className={style.mainWrapper}>
            <h1 style={{margin: 5}}>Sushi delivery</h1>
            <h3 style={{margin: 5, marginBottom: 15}}>Promptly and tasty</h3>
            <div className={style.contentWrapper}>
                <div className={style.wrapBtn}>
                    <Button
                        className={style.btn}
                        style={{ border: '2px solid #eb5a1e' }}
                        onClick={() => setShowLogin(true)}
                    >LogIn</Button>
                    <Button
                        className={style.btn}
                        style={{ border: '2px solid #eb5a1e' }}
                        onClick={() => setRegistration(true)}
                    >Registration</Button> 
                </div>
                <Link className={style.link} to="/sushi">
                    <span>login without registration</span>
                </Link>
            </div>
            
            <ModalWrapper showLogin={showLogin}>
                <Form
                    onFinish={(e) => onFinishLogin(e)}
                    form={form}
                    initialValues={{
                    remember: false,
                    }}
                >
                    <div className={style.wrapTitle}>
                        <h3>Login</h3>   
                    </div>
                    <span>Username</span>
                    <Form.Item 
                        name='userName'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input
                            style={{ border: '2px solid #eb5a1e' }}
                            className={style.wrapInput}
                        />
                    </Form.Item>
                    <span>Password</span>
                    <Form.Item 
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password
                            style={{ border: '2px solid #eb5a1e' }}
                            className={style.wrapInput}
                        />
                    </Form.Item>
                    <div className={style.wrapButton}>
                        <Form.Item>
                            <Button 
                                htmlType='submit'
                                className={style.btn}
                                style={{ border: '2px solid #eb5a1e' }}
                                ><span>ENTER</span>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </ModalWrapper>
            <ModalWrapper showRegistration={showRegistration} >
                <Form
                    onFinish={(e) => onFinishRegistration(e)}
                    form={form}
                    initialValues={{
                    remember: false,
                    }}
                >
                    <div className={style.wrapTitle}>
                        <h3>Registration</h3>   
                    </div>
                    <span>Username</span>
                    <Form.Item 
                        name='userName'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input
                            style={{ border: '2px solid #eb5a1e' }}
                            className={style.wrapInput}
                        />
                    </Form.Item>
                    <span>Password</span>
                    <Form.Item 
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password
                            style={{ border: '2px solid #eb5a1e' }}
                            className={style.wrapInput}
                        />
                    </Form.Item>
                    <div className={style.wrapButton}>
                        <Form.Item>
                            <Button 
                                htmlType='submit'
                                className={style.btn}
                                style={{ border: '2px solid #eb5a1e' }}
                                >ENTER
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </ModalWrapper>
            <AlertWrapper showAlertError={showAlertError} >
                <div className={style.mainWrapAlert}>
                    <div className={style.wrapAlert}>
                        <span>{errorMessage?.message}</span>
                        
                    </div>
                    <div className={style.wrapBtnAlert}>
                        <Button
                            className={style.btnAlert}
                            style={{ border: '2px solid #eb5a1e', width: 80 }}
                            onClick={() => setShowAlertError(false)}
                        >
                            <span>Ok</span>
                        </Button>
                    </div>
                    
                </div> 
            </AlertWrapper>
        </div>
    ) 
}
