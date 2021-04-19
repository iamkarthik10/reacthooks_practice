import axios from "axios"

const URL_BACKEND = 'http://127.0.0.1:8000'

export function loginAction(data){
    return async function(dispatch){
    let resp = await axios.post(`${URL_BACKEND}/users/`, data)
        .then(res => res)
        .catch(err => err.response)
        
        if (resp.status === 200){
            dispatch({type:'LOGIN',payload:{...resp.data,loggedIn:'Y'}})
        }
        else{
            dispatch({type:'LOGIN',payload:{loginStatus:resp.data,loggedIn:'N'}})
        }
    }
}

export function changeLoginStatus(status){
    return function(dispatch){
        return dispatch({type:'CHANGE_STATUS',payload:status})
    }
}