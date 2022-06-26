import { Http } from '@/api';

export function getBrands() {
    return Http.get('/brands')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}
