import axios from 'axios';
import { AsyncStorage } from 'react-native';


export default function () {
    axios.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['X-Auth-Token'] = token;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
}