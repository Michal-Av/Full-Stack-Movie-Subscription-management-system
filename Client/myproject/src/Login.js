import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './login.css'

function LoginComp(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userslogin,setUserslogin] = useState([]);
  const [userID, setUserID] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() =>
  {
    axios.get("http://localhost:8000/api/login/")
    .then(resp =>
      {
        setUserslogin(resp.data);
      })
  },[])


  const customSubmit = async (e) =>
  {
    e.preventDefault();

    userslogin.forEach(item => 
    {
      if((username==item.userName) && (password ==item.password))
      {
        setUserID(item.userID);
        sessionStorage["userID"] = item.userID;
        props.history.push(`/${item.userID}`)
        window.location.reload();
      }
      else setMessage('User Name or password incorrect')
    });
    
  }

  return (
    <div style={{ height: "514px"}}>
    <div className="left">
      
     <h2 style={{color : "white"}}>Log in Page: </h2>

      <form style={{color : "white"}} onSubmit={e => customSubmit(e)}>
        User Name : <input type="text" name="username" onChange={e => setUsername(e.target.value)} /><br/>
        Password : <input type="password" name="pass" onChange={e => setPassword(e.target.value)} /><br/><br/>
        <div className="message">{message}</div>
       <div className="left">
        <input type="submit" value="Login" /> {" "} {" "} {" "} <Link to={`/create`} >Create Account</Link>
       </div>
      </form>
    </div>
    </div>
  );
}

export default LoginComp;