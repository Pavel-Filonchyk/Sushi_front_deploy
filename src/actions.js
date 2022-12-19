import {serverAPI} from './serverAPI/serverAPI'
const getFrom3001Port = () =>{
    return (dispatch) =>{
        serverAPI.getItems()  
        .then((data) => dispatch(loader(data))) 
    }
}
const postTo3000Port = (elems) =>{
    return (dispatch) =>{
        serverAPI.postTo3000Port(elems)  
        .then((data) => dispatch(loader3000(data))) 
    }
}
const getFrom3000Port = () =>{
    return (dispatch) =>{
        serverAPI.getFrom3000Port() 
        .then((data) => dispatch(loader3000(data)))  
    }
}
const deleteFrom3000Port = (id, sushiName, weight, price, counter) =>{
    return (dispatch) =>{
        serverAPI.deleteFrom3000Port(id, sushiName, weight, price, counter)  
        .then((data) => dispatch(loader3000(data))) 
    }
}
const putPlusItem3000Port = (id, sushiName, weight, price, counter) =>{
    return (dispatch) =>{
        serverAPI.putPlusItem3000Port(id, sushiName, weight, price, counter) 
        .then((data) => dispatch(onPlus(data))) 
    }
}
const putMinusItem3000Port = (id, sushiName, weight, price, counter) =>{
    return (dispatch) =>{
        serverAPI.putMinusItem3000Port(id, sushiName, weight, price, counter) 
        .then((data) => dispatch(onMinus(data))) 
    }
}

const loader = (data) => {
    return {
        type: 'LOADER',
        payload: data 
    } 
}

const loader3000 = (data) => {
    return {
        type: 'LOADER_3000',
        payload: data 
    } 
}
const addToCart = (id) =>{
    return {
        type: 'ADD_TO_CART', 
        payload: id
    }
}

const addToCounter = (id) => {
    return {
        type: "ADD_TO_COUNTER",
        payload: id,
    }
}
const deductFromCounter = (counter) => {
    return {
        type: "DEDUCT_FROM_COUNTER",
        payload: counter
       
    }
}
const onPlus = (id) => {
    return {
        type: "PLUS_TO_COUNTER",
        payload: id
    }
}
const onMinus = (data) => {
    return {
        type: "DELETE_FROM_COUNTER",
        payload: data
    }
}
const onShowMain = () => {
    return {
        type: "ON_SHOW_MAIN",
    }
}
const onHideMain = () => {
    return {
        type: "ON_HIDE_MAIN",
    }
}

const deleteItem = (id) => {
    return {
        type: "DELETE_ITEM",
        payload: id
    }
}

export {
    postTo3000Port,
    getFrom3001Port,
    getFrom3000Port,
    putPlusItem3000Port,
    putMinusItem3000Port,
    deleteFrom3000Port,
    loader,
    loader3000,
    onPlus,
    onMinus,
    addToCounter,
    deductFromCounter,
    onHideMain,
    onShowMain,
    deleteItem,
    addToCart
}