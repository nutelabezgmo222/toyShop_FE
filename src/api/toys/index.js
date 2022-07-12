import Http from '@/api';

export function getToys(filterObj) {
    let query = '';

    if(filterObj) {
        query = `?subCategoryId=${filterObj.subCategoryId}`;
    }
    return Http.get('/toys' + query)
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

