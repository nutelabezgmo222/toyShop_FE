
export const createCategoryMenu = (categories) => {
    let result = [];
    categories.forEach(category => {
        let subItems = [];

        category.sub_categories.forEach(subCategory => {
            subItems.push({
                path: '/catalog/category/' + category.id + '/subcategory/' + subCategory.id,
                title: subCategory.title,
                id: subCategory.id
            });
        });

        result.push({
            title: category.title,
            id: category.id,
            subItems
        });
    });

    return result;
}