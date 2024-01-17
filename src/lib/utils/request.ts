import axios from 'axios';

export const instance = axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 1000,
    headers: {}
});

// eslint-disable-next-line @typescript-eslint/unbound-method
export default instance.request;