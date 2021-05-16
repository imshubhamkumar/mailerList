import env from "./config/env";

const apiURL = env.API_URL+'/';

export async function loginUser(creadentials) {
    return fetch(apiURL + 'users/login', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(creadentials)
    })
    .then(data => data.json())
}

export async function sendTOAll(body, token) {
    
    return fetch(apiURL + 'users/sendToAll', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
}

export async function subscribeUser(body) {
    
    return fetch(apiURL + 'users/subscribe', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
}