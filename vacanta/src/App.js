import {useState } from "react";

import Header from "./Components/Header";
import NewTrip from "./Components/NewTrip";
import UserLogin from"./Components/UserRegister";
import UserRegister from "./Components/UserLogin";
import Confirm from "./Components/Confirm";

import { Route, Routes } from 'react-router-dom';

const  App = () => {
  const [toggleRegister , setToggleRegister] = useState(false);
  const [toggleNewTrip , setToggleNewTrip] = useState(true);
  const [toggleLogin , setTogglelogin] = useState(false);

  

  return (
    <div className="container">

      <Routes>
        <Route path="/confirm/:confirmation" element={< Confirm />}  />
      </Routes>

      <Header 
        title = "Vacationey - Time to pack"
        onRegister = {() => {
          setToggleRegister(!toggleRegister);
          setToggleNewTrip(false);
          setTogglelogin(false);
        }}

        onLogin = { () => {
          setTogglelogin(!toggleLogin);
          setToggleRegister(false);
          setToggleNewTrip(false);
        }
        }

        onNewTrip = {() => {
          setToggleNewTrip(!toggleNewTrip);
          setToggleRegister(false);
          setTogglelogin(false);
        }}

      />
       
      <div className="main">
       
        {toggleNewTrip && <NewTrip />}
        {toggleLogin && <UserRegister/>}
        {toggleRegister &&  <UserLogin />}
      </div>
    </div>
    
  );
}

export default App;
