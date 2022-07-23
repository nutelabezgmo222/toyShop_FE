import Http from '@/api';

export function getAllOrders() {
    return Http.get('/admin/all_orders')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function changeOrderStatus(orderInfo) {
    return Http.post('/admin/change_order_status', orderInfo)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}