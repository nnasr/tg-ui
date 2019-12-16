import axios from 'axios';

export default {
  setupInterceptors: (store, history) => {

    // returns response when the user is authorized
    axios.interceptors.response.use(response => {
      return response;
    }, error => {

      // redirects and clears the localstorage when user is unauthorized
      if (error.response.status === 401) {
        const redirectUrl = process.env.REACT_APP_APP_URL;
        localStorage.clear();

        return window.location.assign(redirectUrl);
      }

      // redirects and clears the localstorage when user is forbidden
      if (error.response.status === 403) {
        const redirectUrl = process.env.REACT_APP_APP_URL;
        localStorage.clear();

        return window.location.assign(redirectUrl);
      }

      // return to the parent call when status is 404
      if (error.response.status === 404) {
        return
      }

      // async operation for eventual failure if either of above status codes are not returned
      return Promise.reject(error);
    });
  },
};
