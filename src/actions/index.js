import types from './types';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';

export function signUp(cred){
    return dispatch => {

        axios.post(`${BASE_URL}/signup`, cred).then(resp => {
            console.log('Resp From Sign Up:', resp);

            localStorage.setItem('token', resp.data.token);

            dispatch({ type: types.SIGN_UP });
        }).catch(err => {
            dispatch({
                type: types.ERROR,
                payload: err.response.data.error
            });
        });
    }
}

export function signIn(cred){
    return dispatch => {

        axios.post(`${BASE_URL}/signin`, cred).then(resp => {
            console.log('Resp From Sign In:', resp);

            localStorage.setItem('token', resp.data.token);

            dispatch({ type: types.SIGN_IN });
        }).catch(err => {
            dispatch({
                type: types.ERROR,
                payload: 'Invalid login information'
            });
        });
    }
}

export function logout(){
    localStorage.removeItem('token');

    return {
        type: types.LOG_OUT
    }
}

export function getQuote(){
    return dispatch => {

        const config = {
            headers: {
                authorization: localStorage.getItem('token')
            }
        } 

        axios.get(BASE_URL, config).then(resp => {
            dispatch({
                type: types.GET_QUOTE,
                payload: resp.data.message
            });
        });
    }
}
