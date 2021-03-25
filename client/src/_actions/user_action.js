import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    console.log("loginUSEr");

    const request = axios.post('http://localhost:5014/api/users/login', dataToSubmit).then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    console.log("registerUser");

    const request = axios.post("http://localhost:5014/api/users/register", dataToSubmit).then((res) => {
        return res.data;
    });

    return {
        type: REGISTER_USER
        , payload: request
    }
}

export function authUser() {
    console.log("auth action");
    const request = axios.get("http://localhost:5014/api/users/auth").then((res) => {
        return res.data;
    });

    return {
        type: AUTH_USER
        , payload: request
    }
}