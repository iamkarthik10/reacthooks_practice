import '../styles/login.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, changeLoginStatus} from '../actions/index';

const LoginComponent = (props) =>{

    var [inputData, setInputData] = useState({name:'',password:''})
    const dispatch = useDispatch();
    const status = useSelector(state => state.reducer)

    function handleLoginButton(){
        if(inputData.name === '' || inputData.password === ''){
            dispatch(changeLoginStatus('Please enter the Credentials to Login'))
        }
        else{
            dispatch(loginAction({...inputData, type:'LOGIN'}))
        }
    }

    useEffect(()=>{
        if (status.loggedIn === 'Y'){
            props.history.push('/home')
        }
        else{
            props.history.push('/login')
        }
    },[status.loggedIn, props.history])


    function handleSignUpButton(){
        if(inputData.name === '' || inputData.password === ''){
            dispatch(changeLoginStatus('Please enter the credentials to SigUp'))
        }
        else{
            dispatch(loginAction({...inputData, type:'SIGNUP'})) 
        }
    }

    function renderTemplate(){
        return(
            <div className='login-sub-container'>
                <div className='login-form-container'>
                    <div className='login-input-form'>
                        <div><label>Username: </label><input type='text' onChange={(event) => setInputData({...inputData, name:event.target.value})} value={inputData.name} ></input></div>
                        <div><label>Password: </label><input type='text' onChange={(event) => setInputData({...inputData, password:event.target.value})} value={inputData.password}></input></div>
                    </div>
                    <div className='login-submit-container'>
                        <button onClick={handleLoginButton}>Login</button>
                        <button onClick={handleSignUpButton}>Sign Up</button>
                    </div>
                    <label className='login-message'><b>{status.loginStatus}</b></label>
                </div>
            </div>
        )
    }

    return(
        <div className='login-main-container'>
            {renderTemplate()}
        </div>
    )
}

export default LoginComponent;