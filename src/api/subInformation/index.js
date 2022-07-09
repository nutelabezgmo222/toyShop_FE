import { Http } from '@/api';

export function getAgeLimits(subCategoryId) {
    let query = '';

    if(subCategoryId) {
        query = '?subCategoryId=' + subCategoryId
    }

    return Http.get('/age_limits' + query)
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

