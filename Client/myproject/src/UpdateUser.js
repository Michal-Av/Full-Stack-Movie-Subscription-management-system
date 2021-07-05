import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import {useState, useEffect } from 'react'
import axios from 'axios'


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

export default function UpdateUserComp(props) {
  const classes = useStyles();
  
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [session, setSession] = useState(0);
  const [created, setCreate] = useState("");
  const [per,setPer] = useState([]);

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
    setUsername(props.usrname)
    setPer(props.permissions);
    setFname(props.user.firstName)
    setLname(props.user.lastName)
    setSession(props.user.sessionTimeOut)
    setCreate(props.user.created)

  
    setVMovie(props.permissions.includes("View Movies"));
    setCMovie(props.permissions.includes("Create Movies"))
    setDMovie(props.permissions.includes("Delete Movies"))
    setUMovie(props.permissions.includes("Update Movies"))
    setVSubs(props.permissions.includes("View Subscriptions"));
    setCSubs(props.permissions.includes("Create Subscriptions"))
    setDSubs(props.permissions.includes("Delete Subscriptions"))
    setUSubs(props.permissions.includes("Update Subscriptions"))

  },[])

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


  const customSubmit = async (e) =>
  {
    e.preventDefault();

    let obj = {firstName : fname,
               lastName : lname,
               sessionTimeOut : session,
               created : created,
              }
    let objLog = {
                userID : props.login.userID,
                userName : username,
                password : props.login.password
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
    userID : props.usrper.userID,
    permissions : arr
  }
      
    let resp1 = await axios.put(`http://localhost:8000/api/users/${props.user._id}`,obj);
    let resp2 = await axios.put(`http://localhost:8000/api/login/${ props.login._id}`,objLog);
    let resp3 = await axios.put(`http://localhost:8000/api/permissions/${ props.usrper._id}`,objPer);
    props.callbackUpdate(false)
    window.location = `/management/${sessionStorage["userID"]}`;
      
  }

  const closeuser = () =>
  {
    props.callbackUpdate(false)
  }

  return (
    
      <CardContent>
       <Typography variant="h5" component="h2">
           Edit User : {props.user.firstName} {props.user.lastName}
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
      <div style={{marginLeft: "60%"}}>
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
     
    
  );
}
