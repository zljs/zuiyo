import { errorMessage } from '../constants/apiConst';

export const delay = interval => promise =>
  new Promise((resolve, reject) => {
    promise
      .then((result) => {
        setTimeout(() => resolve(result), interval);
      })
      .catch((error) => {
        setTimeout(() => reject(error), interval);
      });
  });

export const timeout = interval => promise =>
  Promise.race([delay(interval)(Promise.reject(new Error(errorMessage.serverError))), promise]);
