export const serverAPI = {
    getItems () {
    return fetch('http://localhost:3001/list')
        .then((response) => {
            return response.json()
        })
    },
    postTo3000Port (elems) {
        console.log(elems)
        return  fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               elems
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    deleteFrom3000Port (id, sushiName, weight, price, counter) {
        console.log(id)
        return  fetch(`http://localhost:3000/data/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sushiName": `${sushiName}`,
                "url": "",
                "amount": "6",
                "weight": `${weight}`,
                "price": `${price}`,
                "counter": `${counter}`,
              
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    getFrom3000Port () {
        return fetch('http://localhost:3000/data')
            .then((response) => {
                return response.json()
            })
        },
    putPlusItem3000Port (id, sushiName, weight, price, counter) {
        console.log(id)
        return  fetch(`http://localhost:3000/data/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sushiName": `${sushiName}`,
                "url": "",
                "amount": "6",
                "weight": `${weight}`,
                "price": `${price}`,
                "counter": `${counter}`,
                "id": `${id}`
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    putMinusItem3000Port (id, sushiName, weight, price, counter) {
        console.log(id)
        return  fetch(`http://localhost:3000/data/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sushiName": `${sushiName}`,
                "url": "",
                "amount": "6",
                "weight": `${weight}`,
                "price": `${price}`,
                "counter": `${counter}`,
                "id": `${id}`
            })
        })
        .then((response) => {
            return response.json()
        })
    }
}   
