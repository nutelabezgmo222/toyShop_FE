import { createStore } from 'vuex';
import user from './modules/user';
import basket from './modules/basket';

const store = createStore({
    modules: {
        user,
        basket
    },
});

export default store;
