import React, { useReducer } from 'react';

import './App.css';
import SignUp from './Components/Signup/SignUp';
import Users from './Components/Users/Users';
import Continue from './Components/Continue/Continue';
import userReducer from './contexts/userReducer'
import usersContext from './contexts/usersContext'
import { ADD_USER } from './contexts/types'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
   const initialState = {
     users:[]
   }

   const [state, dispatch] = useReducer(userReducer, initialState);

   const addUser = (user) => {
     dispatch({
       type: ADD_USER,
       payload: user
     });
   };
  return (

    <usersContext.Provider value={{
      users: state.users,
      addUser
    }}
    >

      <Router>
      <div className="App">

        <Switch>
          <Route exact path='/' component={SignUp}/>
          
         

          <Route exact path='/users' component={Users}/>

          <Route exact path='/continue' component={Continue}/>
          
        </Switch>
      
      
      
    </div>
      </Router>
      
    </usersContext.Provider>
  );
}

export default App;
