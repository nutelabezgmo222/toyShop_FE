let baseUrl = 'https://toy-shop-api.herokuapp.com/api';

export function getToys() {
    return fetch(baseUrl + '/toys', {
        method: 'GET'
    }).then(data => data.json());
}

export function createToy(toy) {
    return fetch(baseUrl + '/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
    });
}

