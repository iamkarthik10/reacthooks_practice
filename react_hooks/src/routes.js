import {Switch, Route} from 'react-router-dom';
import LoginContainer from './containers/loginContainer';
import HomeContainer from './containers/homecontainer';
import ToDoContainer from './containers/todoContainer'

const Routes = () =>{
    return(
        <Switch>
            <Route path='/login' exact component={LoginContainer}></Route>
            <Route path='/home' exact component={HomeContainer}></Route>
            <Route path='/todoView/:bucketId' exact component={ToDoContainer}></Route>
        </Switch>
    )
}

export default Routes;