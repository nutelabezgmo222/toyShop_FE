import { Http } from '@/api';

export function getAgeLimits() {
    return Http.get('/age_limits')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function getCountries() {
    return Http.get('/countries')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

