import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyDwN6iy_9okf5RBMDoCntS7Hzuln4odZCc'
    }
})

export default authApi;