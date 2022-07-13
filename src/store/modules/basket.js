
const BASKET_KEY = 'toy_shop_basket';

export default {
    actions: {
        updateItemNumber(ctx, { itemId, number }) {
            ctx.commit('changeItemNumber', { itemId, number });
        },
        removeItem(ctx, itemId) {
            ctx.commit('removeItem', itemId);
        },
        addItem(ctx, item) {
            ctx.commit('addItem', item);
        },
        setItems(ctx, items) {
            ctx.commit('setItems', items);
        },
        clearItems(ctx) {
            ctx.commit('clearItems');
        },
        loadItemsFromLocalStorage(ctx) {
            let state = localStorage.getItem(BASKET_KEY);

            if(state) {
                state = JSON.parse(state);
                ctx.commit('setItems', state);
            }
        }
    },
    mutations: {
        changeItemNumber(state, { itemId, number }) {
            let itemIdx = state.items.findIndex(basketItem => basketItem.id === itemId);

            if(itemIdx !== -1) {
                state.items[itemIdx].number = number;
                this.commit('saveToLocalStorage');
            }
        },
        removeItem(state, itemId) {
          let itemIdx = state.items.findIndex(basketItem => basketItem.id === itemId);
          
          if(itemIdx !== -1) {
              state.items.splice(itemIdx, 1);
              this.commit('saveToLocalStorage');
          }
        },
        addItem(state, item) {
            state.items.push(item);
            this.commit('saveToLocalStorage');
        },
        setItems(state, items) {
            state.items = items;
            this.commit('saveToLocalStorage');
        },
        clearItems(state) {
            state.items = [];
            localStorage.removeItem(BASKET_KEY);
        },
        saveToLocalStorage(state) {
            localStorage.setItem(BASKET_KEY, JSON.stringify(state.items));
        }
    },
    state: {
        items: []
    },
    getters: {
        itemInBasket: state => state.items,
        idsInBasket: state => state.items.map(item => item.id),
        itemsNumberInBasket: state => state.items.length
    }
};