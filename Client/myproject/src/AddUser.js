import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import {useState, useEffect } from 'react'
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: '#e6f2ff'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AddUserComp(props) {
  const classes = useStyles();
  const [users,setUsers] = useState([])
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [session, setSession] = useState(0);
  const [created, setCreate] = useState("");
  const [usrId,setUsrId] = useState("");
  const [counter,setCounter] = useState(true);

  const [vMovie,setVMovie] = useState (false);
  const [cMovie,setCMovie] = useState (false);
  const [dMovie,setDMovie] = useState (false);
  const [uMovie,setUMovie] = useState (false);
  const [vSubs,setVSubs] = useState (false);
  const [cSubs,setCSubs] = useState (false);
  const [dSubs,setDSubs] = useState (false);
  const [uSubs,setUSubs] = useState (false);

  useEffect(() =>
  {
    if(cMovie || dMovie || uMovie)
      setVMovie(true);
  },[cMovie, dMovie, uMovie])

  useEffect(() =>
  {
    if(cSubs || dSubs || uSubs)
      setVSubs(true);
  },[cSubs, dSubs, uSubs])

  useEffect(async() =>
  {
    debugger;
    if(usrId != "")
    {
      let objLog = {
        userID : usrId,
        userName : username,
        password : null
      }

      let arr =[];
      if(vMovie)
      arr.push("View Movies");
      if(cMovie)
      arr.push("Create Movies");
      if(dMovie)
      arr.push("Delete Movies");
      if(uMovie)
      arr.push("Update Movies");
      if(vSubs)
      arr.push("View Subscriptions");
      if(cSubs)
      arr.push("Create Subscriptions");
      if(dSubs)
      arr.push("Delete Subscriptions");
      if(uSubs)
      arr.push("Update Subscriptions");

      let objPer = {
      userID : usrId,
      permissions : arr
      }

      let resp2 = await axios.post(`http://localhost:8000/api/login/`,objLog);
      let resp3 = await axios.post(`http://localhost:8000/api/permissions/`,objPer);  
      props.callbackUpdate()
      window.location = `/management/${sessionStorage["userID"]}`;
    }
  },[usrId])

  const customSubmit = async (e) =>
  {
    e.preventDefault();

    let obj = {firstName : fname,
               lastName : lname,
               sessionTimeOut : session,
               created : created,
              }
    if(counter)
    {  
      let resp1 = await axios.post(`http://localhost:8000/api/users/`,obj);
      setCounter(false)
    }
    axios.get("http://localhost:8000/api/users/")
    .then(resp => { 
      setUsers(resp.data);
      users.forEach(item => {
        debugger;
        if(item.firstName == fname && item.lastName == lname && item.created == created)
          {
            console.log(item._id)
            setUsrId(item._id);
          }
      });
    })
      
  }

  const closeuser = () =>
  {
    props.callbackUpdate();
  }

  return (
    <Card className={classes.root}>
      <CardContent>
       <Typography variant="h5" component="h2">
           Add New User :
        </Typography>
      <form onSubmit={e => customSubmit(e)}>
        First Name : <input value={fname} type="text" name="fname" onChange={e => setFname(e.target.value)} /><br/>
        Last Name : <input value={lname} type="text" name="lname" onChange={e => setLname(e.target.value)} /><br/>
        User Name : <input value={username} type="text" name="username" onChange={e => setUsername(e.target.value)} /><br/>
        Session Timeout (Minutes): <input value={session} style={{width:"54px"}} type="number" name="session" onChange={e => setSession(e.target.value)} /><br/>
        Created : <input value={created} type="date" name="created"  onChange={e => setCreate(e.target.value)} /><br/>
        Permissions :  <br/>
        View Movies <input type="checkbox" checked={vMovie} onChange={e => setVMovie(e.target.checked)}></input>  <br/>
        Create Movies <input type="checkbox"  checked={cMovie} onChange={e => setCMovie(e.target.checked)}></input> <br/>
        Delete Movies <input type="checkbox"  checked={dMovie} onChange={e => setDMovie(e.target.checked)}></input> <br/>
        Update Movies <input type="checkbox"  checked={uMovie} onChange={e => setUMovie(e.target.checked)}></input> <br/>
        View Subscriptions <input type="checkbox"  checked={vSubs} onChange={e => setVSubs(e.target.checked)}></input> <br/>
        Create Subscriptions <input type="checkbox" checked={cSubs} onChange={e => setCSubs(e.target.checked)}></input> <br/>
        Delete Subscriptions <input type="checkbox" checked={dSubs} onChange={e => setDSubs(e.target.checked)}></input> <br/>
        Update Subscriptions <input type="checkbox" checked={uSubs} onChange={e => setUSubs(e.target.checked)}></input> <br/>
{/* 
        <input type="button" value="Cancel" />
        <input type="submit" value="Update" /> */}

      </form>
      <div style={{marginLeft: "70%"}}>
      <CardActions disableSpacing>
      <IconButton onClick={customSubmit} aria-label="send">
          <SendIcon />
        </IconButton>
        <IconButton onClick={closeuser} aria-label="cancel">
          <CancelIcon  />
        </IconButton>
      </CardActions>
      </div>
      </CardContent>
  </Card>
    
  );
}
