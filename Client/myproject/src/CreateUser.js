import { useState, useEffect } from 'react';
import axios from 'axios'
import './login.css'

function CreateUserComp(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userslogin,setUserslogin] = useState([])
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

    userslogin.forEach(async item => 
    {
      if((username==item.userName))
      {
        let obj = {
          userID : item.userID,
          userName : item.userName,
          password : password } 
         let resp = await axios.put(`http://localhost:8000/api/login/${item._id}`,obj)

         setMessage('User Created!')
         props.history.push("/")
      }   
      else setMessage('User Name not exist, Please contact the manager')
    });
    
  }

  return (
    <div className="left">
     <h3>Create an Account </h3>

      <form onSubmit={e => customSubmit(e)}>
        User Name : <input type="text" name="username" onChange={e => setUsername(e.target.value)} /><br/>
        Password : <input type="password" name="pass" onChange={e => setPassword(e.target.value)} /><br/><br/>
       <div className="message">{message}</div>
       <div className="left">
        <input type="submit" value="Create" />
       </div>
      </form>
    </div>
  );
}

export default CreateUserComp;