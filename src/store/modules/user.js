import { logInByToken, logOut, logIn } from '@/api/logIn';

const REMEMBER_TOKEN_KEY = 'rememberToken';

export default {
    actions: {
        tryToLogIn(ctx) {
            let tokenFromLocalStorage = localStorage.getItem(REMEMBER_TOKEN_KEY);
            if(!tokenFromLocalStorage) return;

            return logInByToken(tokenFromLocalStorage)
                .then(response => {
                    ctx.commit('updateUserData', response.user);
                });
        },
        logOut(ctx) {
            return logOut()
                .then(() => {
                    ctx.commit('clearUserData');
                })
        },
        logIn(ctx, userData) {
            return logIn(userData)
                .then((response) => {
                    ctx.dispatch('saveUserData', response.user);
                })
        },
        saveUserData(ctx, userData) {
            if(userData.remember_token) {
                localStorage.setItem(REMEMBER_TOKEN_KEY, userData.remember_token);
            }

            ctx.commit('updateUserData', userData);
        }
    },
    mutations: {
        updateUserData(state, newData) {
            state.user = newData;
            state.remember_token = newData.remember_token;
        },
        clearUserData(state) {
            state.user = {};
            state.remember_token = null;
            localStorage.removeItem(REMEMBER_TOKEN_KEY);
        }
    },
    state: {
        user: {},
        remember_token: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        rememberToken: (state) => {
            return state.remember_token
        },
        isUserLogged: (state) => {
            return !!state.remember_token
        },
        isUserAdmin: (state) => {
            return state.user.is_admin;
        }
    }
};