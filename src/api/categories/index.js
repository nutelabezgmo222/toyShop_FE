import Http from '@/api';

export function getCategories() {
    return Http.get('/categories')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}
