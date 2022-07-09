import { Http } from '@/api';

export function register(user) {
    return Http.post('/registration', user)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function logIn(loginData) {
  return Http.post('/login', loginData)
      .then(response => response.data)
      .catch(err => {
          throw err;
      });
}

