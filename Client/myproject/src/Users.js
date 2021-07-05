import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import UserComp from './User'
import Grid from '@material-ui/core/Grid';
import './Users.css'
import AddUserComp from './AddUser'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function UsersComp(props) {
  const classes = useStyles();
  const [users,setUsers] = useState([])
  const [open, setOpen] = useState(true);

  useEffect(() =>
  {
    // let id = props.match.params.id;
    axios.get("http://localhost:8000/api/users/")
    .then(resp => { setUsers(resp.data); })  
    // axios.get("http://localhost:8000/api/login/")
    // .then(resp => { setUserslogin(resp.data); })
    // axios.get("http://localhost:8000/api/permissions/")
    // .then(resp => { setPermissions(resp.data); })
  },[])


  const deleteUser = async (id) =>
  {
    await axios.delete("http://localhost:8000/api/users/" + id);
    window.location.reload();
  }

  const openAdd = () =>
  {
    setOpen(false);
  }

  const openUsers = () =>
  {
    setOpen(true);
  }


  let user_items = users.map((item,index) =>
    {
      return <div style={{padding: "15px"}} key={index}> <UserComp user={item} 
                                  callbackDelete={data => deleteUser(data)}
                                  callbackUpdate={data => this.update(data)}   
                                   />
                                  <br/> 
                               
                               </div> 
                                      
    })

  return (
    <div className="Window">
      <div> 
        <h1 style={{color : "white"}}>Users</h1> 
        <input type="button" value="Add User" onClick={openAdd}/> {"  "}
        <input type="button" value="All Users" onClick={openUsers}/> 
      </div> <br/> <br/>
      {open ? 
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="left" spacing={3}>
             {user_items} 
             </Grid>
         </Grid>
         </Grid>
      </div> : <AddUserComp  callbackUpdate={openUsers}/>}       
    </div>
  );
}

export default UsersComp;