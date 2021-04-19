const initial_state = {loginStatus:'Please fill the details to Login/Sigup', loggedIn:'N'}

const reducer = (state=initial_state, action) =>{
    switch(action.type){
        case 'CHANGE_STATUS':
            return {...state,loginStatus:action.payload};
        case 'LOGIN' :
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default reducer;