import React from 'react'
import {useState} from 'react';
import axios from 'axios';
const bcrypt = require('bcryptjs');

const UserLogin = () => {
    const [userIdentity, setUserIdentity] = useState("");
    const [userPassword, setUserPassword] = useState("");
    

       const handleSubmit = (e) => {
        e.preventDefault()


        setUserIdentity("");
        setUserPassword("");
    } // end of handle submit

    const sendData = () => { 

        let validData = true;
        if(userIdentity.length <  4){
            validData = false;
            alert("Username must have at least 4 characters");
        }

        if(userPassword.length <  4){
            validData = false;
            alert("Password must have at least 4 characters");
        }

        if(validData){
            const hashedPassword = bcrypt.hashSync(userPassword, 10);
            axios.post(
            "http://localhost:6005/login?userIdentity=" + String(userIdentity) 
                                                    + "&userPassword=" + String(hashedPassword)  
            ).then(response => {
                console.log(response);
            })
        }
        setUserIdentity("");
        setUserPassword("");
    }

    return (
        <div>
            <form action="" className="form-control" onSubmit={handleSubmit}>
                <label  htmlFor="username">UserName or email</label>
                <input 
                    type="text" 
                    placeholder="username or email"
                    onChange={(e) => setUserIdentity(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input  
                    type="password"
                    placeholder="password here ..."
                    onChange={(e) => setUserPassword(e.target.value)} 
                />
                <button className="submitBtn" type="submit" onClick={sendData}>Submit</button>
            </form>
           
        </div>
    )
}

export default UserLogin
