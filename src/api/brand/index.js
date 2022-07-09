import { Http } from '@/api';

export function getBrands(subCategoryId) {
    let query = '';

    if(subCategoryId) {
        query = '?subCategoryId=' + subCategoryId
    }

    return Http.get('/brands' + query)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}
