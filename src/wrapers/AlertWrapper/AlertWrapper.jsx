import React from 'react'
import { Modal } from 'antd'
import style from './AlertWrapper.module.scss'

export default function ModalWrapper(props) {
  return (

    <Modal
        open={props.showAlert || props.showAlertError}
        closable={false}
        footer={null}
        centered={true}
        //onCancel={closeModalPreview}
        className={style.modal}
        width={400}
        mask={true}
        maskStyle={{ background: 'rgba(235, 90, 30, 0.3)' }}
        bodyStyle={{ height: 150, padding: 0, borderRadius: '10px'}}
    >
        {props.children} 
    </Modal>
  )
}