import {Route, Switch, Redirect} from 'react-router-dom'
import LoginComp from './Login'
import NavigatorComp from './Navigator'
import CreateUserComp from './CreateUser'
import MoviesComp from "./Movies";
import SubscriptionsComp from './Subscriptions'
import TestComp from './Test'
import UsersComp from './Users'
import './MainPage.css'

function MainPageComp()  {


  return (
    <div className="App">
      <NavigatorComp usr={sessionStorage["userID"]} login={false} />
      <Switch>
        <Route exact path="/" component={LoginComp} />
        <Route path="/create" component={CreateUserComp} />
        <Route path= "/movies/:id" component={MoviesComp} />
        <Route path= "/subscriptions/:id" component={SubscriptionsComp} />
        <Route path= "/management/:id" component={UsersComp} />
        <Route path= "/:id" component={TestComp} />
      
      </Switch>
        
    </div>  
  );
}

export default MainPageComp;
