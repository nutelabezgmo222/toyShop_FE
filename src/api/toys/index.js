import { Http } from '@/api';

export function getToys() {
    return Http.get('/toys')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function createToy(toy) {
    return Http.post('/toys', toy)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

