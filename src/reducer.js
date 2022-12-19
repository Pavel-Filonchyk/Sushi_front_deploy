const initialState = {
    items: [],
    elems: [],
    clientElems: [],
    totalPrice: 0,
    show: !null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'LOADER':
        return {
            ...state,
            items: action.payload,
            
        }
        case 'LOADER_3000':
            return {
                ...state,
                clientElems: action.payload
                
            }  
        case 'PLUS_TO_COUNTER': 
            const idx = action.payload
            const itemIndx = state.items.flat().findIndex(item => item.id === idx)
            const itemInState = state.items.flat().find(item => item.id === idx)
            const newItem = {
                ...itemInState,
                counter: ++itemInState.counter,
            }
            return {
                ...state, 
                items: [
                    ...state.items.flat().splice(0, itemIndx),
                    newItem,
                    ...state.items.flat().splice(itemIndx + 1)
                ]
            } 
        case 'DELETE_FROM_COUNTER': 
            const idy = action.payload
            const Index = state.items.flat().findIndex(item => item.id === idy)
            const itemIntoState = state.items.flat().find(item => item.id === idy);
            if (itemIntoState.counter > 1){
                const changedItem = {
                    ...itemIntoState,
                    counter: --itemIntoState.counter
                }
                return {
                    ...state, 
                    items: [
                        ...state.items.flat().splice(0, Index),
                        changedItem,
                        ...state.items.flat().splice(Index + 1)
                    ]
                }
            }else{
                const changedItem = {
                    ...itemIntoState,
                    counter: 1
                }
                return {
                    ...state, 
                    items: [
                        ...state.items.flat().splice(0, Index),
                        changedItem,
                        ...state.items.flat().splice(Index + 1)
                    ]
                }
            }
        
        case 'ADD_TO_CART':
            // if the elem is already in the cart
            // 1. find identical elems by index in elems
            // 2. find identical items by index in items and take its price and changed counter
            // 3. add the counters and multiply by the price 
            const idr = action.payload
            const itemInx = state.elems.flat().findIndex(item => item.id === idr)
            const findItem = state.items.flat().find(item => item.id === idr)
            const itemsInState = state.elems.flat().find(item => item.id === idr)
            const firstPrice = Number(findItem.counter) *  Number(findItem.price)
            if (itemInx >= 0){
                const sumCounters = Number(itemsInState.counter) + Number(findItem.counter)
                const newItem = {
                    ...itemsInState,
                    counter: sumCounters,
                    price: sumCounters *  Number(findItem.price)
                }
                return {
                    ...state, 
                    elems: [
                        ...state.elems.splice(0, itemInx),
                        newItem,
                        ...state.elems.splice(itemInx + 1)
                    ],
                    totalPrice: state.totalPrice + Number(firstPrice)
                }
            }
            // if the elem is not in the cart
            const elem = state.items.flat().find(item => item.id === idr);
            const newElem = {
                sushiName: elem.sushiName,
                amount: elem.amount,
                weight: elem.weight,
                price: findItem.counter * findItem.price,
                url: elem.url,
                counter: findItem.counter,
                id: elem.id
            };
            return {
                ...state,
                elems: [
                    ...state.elems,
                    newElem
                ],
                totalPrice: state.totalPrice + Number(newElem.price)
            }
        case 'ADD_TO_COUNTER':
            const id = action.payload
            const elemInd = state.elems.flat().findIndex(item => item.id === id)
            const elemInState = state.elems.flat().find(item => item.id === id);
            const findItems = state.items.flat().find(item => item.id === id);
            const newElement = {
                ...elemInState,
                counter: ++elemInState.counter,
                price: elemInState.counter * Number(findItems.price)
            }
                return {
                    ...state, 
                    elems: [
                        ...state.elems.flat().splice(0, elemInd),
                        newElement,
                        ...state.elems.flat().splice(elemInd + 1)
                    ],
                    totalPrice: state.totalPrice + Number(findItems.price)
                }
        case 'DEDUCT_FROM_COUNTER':
            const idn = action.payload
            const elemIndex = state.elems.flat().findIndex(item => item.id === idn)
            const elemIntoState = state.elems.flat().find(item => item.id === idn);
            const findItm = state.items.flat().find(item => item.id === idn);
            const deletePrice = Number(elemIntoState.price) - Number(findItm.price)
            if (elemIntoState.counter > 1){
                const changedElem = {
                    ...elemIntoState,
                    counter: --elemIntoState.counter,
                    price: deletePrice
                }
                return {
                    ...state, 
                    elems: [
                        ...state.elems.flat().splice(0, elemIndex),
                        changedElem,
                        ...state.elems.flat().splice(elemIndex + 1)
                    ],
                    totalPrice: state.totalPrice - Number(findItm.price)
                }
                
            }else{
                const changedElem = {
                    ...elemIntoState,
                    counter: 1,
                }
                return {
                    ...state, 
                    elems: [
                        ...state.elems.flat().splice(0, elemIndex),
                        changedElem,
                        ...state.elems.flat().splice(elemIndex + 1)
                    ],
                    totalPrice: state.totalPrice - 0
                }
            }
        case 'DELETE_ITEM':
            const idz = action.payload
            const index = state.elems.flat().findIndex(item => item.id === idz)
            const findItms = state.elems.flat().find(item => item.id === idz);
        return {
            ...state,
            elems: [
                ...state.elems.splice(0, index),
                ...state.elems.splice(index + 1)
            ],
            totalPrice: state.totalPrice - Number(findItms.price)
        }  
        case 'ON_SHOW_MAIN':
            return {
                ...state,
                show: null
            }
        case 'ON_HIDE_MAIN':
            return {
                ...state,
               show: !null
            }
        default: 
        return state;  
    }
}
export default reducer;

