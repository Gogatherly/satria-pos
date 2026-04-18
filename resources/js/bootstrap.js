import axios from 'axios';

if (typeof window !== 'undefined') {
    import('axios').then(({ default: axios }) => {
        window.axios = axios;
        window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
}
