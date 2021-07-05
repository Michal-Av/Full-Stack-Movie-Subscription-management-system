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
    backgroundColor: '#e6ffe6'
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

export default function UpdateMemberComp(props) {
  const classes = useStyles();
  
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [city, setCity] = useState("");

  useEffect(() =>
  {
    setName(props.member.name);
    setEmail(props.member.email);
    setCity(props.member.city);

  },[])

  const customSubmit = async (e) =>
  {
    e.preventDefault();
    let obj = {name : name,
               email : email,
               city : city,
              }
    let resp1 = await axios.put(`http://localhost:8000/api/members/${props.member._id}`,obj);
      window.location.reload();
  }

  const closeuser = () =>
  {
    props.callbackUpdate(false)
  }

  return (
    
      <CardContent>
       <Typography variant="h5" component="h2">
           Edit Member : {props.member.name}
        </Typography>
        <form onSubmit={e => customSubmit(e)}>
        Name : <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} /><br/>
        Email : <input value={email} type="text" name="email" onChange={e => setEmail(e.target.value)} /><br/>
        City : <input value={city} type="text" name="city" onChange={e => setCity(e.target.value)} /><br/>
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
