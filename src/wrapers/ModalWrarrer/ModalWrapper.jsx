import React from 'react'
import { Modal } from 'antd'
import style from './ModalWrapper.module.scss'

export default function ModalWrapper(props) {
  return (
    
    <Modal
        open={props.showLogin || props.showRegistration || props.showCheckout}
        closable={false}
        footer={null}
        centered={true}
        className={style.modal}
        width={400}
        mask={true}
        maskStyle={{ background: 'rgba(235, 90, 30, 0.3)' }}
        bodyStyle={{ height: 315, padding: 0, borderRadius: '10px'}}
        >
        {props.children}  
    </Modal>
  )
}
