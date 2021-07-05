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

export default function AddMemberComp(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [city, setCity] = useState("");


  const customSubmit = async (e) =>
  {
    e.preventDefault();
    let obj = {name : name,
               email : email,
               city : city,
              }
      let resp1 = await axios.post(`http://localhost:8000/api/members/`,obj);
      alert('Member created')
      window.location.reload();
  }

  const closemember = () =>
  {
    props.callbackUpdate();
  }

  return (
    <Card className={classes.root}>
      <CardContent>
       <Typography variant="h5" component="h2">
           Add New Member :
        </Typography>
      <form onSubmit={e => customSubmit(e)}>
        Name : <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} /><br/>
        Email : <input value={email} type="text" name="email" onChange={e => setEmail(e.target.value)} /><br/>
        City : <input value={city} type="text" name="city" onChange={e => setCity(e.target.value)} /><br/>
       </form>
      <div style={{marginLeft: "70%"}}>
      <CardActions disableSpacing>
      <IconButton onClick={customSubmit} aria-label="send">
          <SendIcon />
        </IconButton>
        <IconButton onClick={closemember} aria-label="cancel">
          <CancelIcon  />
        </IconButton>
      </CardActions>
      </div>
      </CardContent>
  </Card>
    
  );
}
