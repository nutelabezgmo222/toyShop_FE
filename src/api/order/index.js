import Http from '@/api';

export function createOrder(orderInfo) {
    return Http.post('/create_order', orderInfo)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function getPostals() {
    return Http.get('/postals')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}
