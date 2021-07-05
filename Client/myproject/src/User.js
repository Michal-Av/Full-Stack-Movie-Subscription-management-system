import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useState, useEffect } from 'react'
import UpdateUserComp from './UpdateUser';
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
    backgroundColor: red[500]
  },
}));

export default function UserComp(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [per,setPer] = useState({});
  const [username, setUsername] = useState("");
  const [updated, setUpdated] = useState(false);
  const [userslogin,setUserslogin] = useState({});
  const [permissions,setPermissions] = useState({});

  useEffect(() =>
  {
    axios.get("http://localhost:8000/api/login/")
    .then(resp => {  
    resp.data.forEach(item =>
    {
        if(item.userID == props.user._id) 
        {
          setUsername(item.userName)
          setUserslogin(item);
        }    
      })     

    })
    axios.get("http://localhost:8000/api/permissions/")
    .then(resp => { 
      resp.data.forEach(x =>
    {
        if(x.userID == props.user._id)
          {
            setPermissions(x)
            setPer(x.permissions);
          }
        })
    })

  },[])

  const deleteuser = () =>
  {
    let id = props.user._id;
    console.log(id)
    props.callbackDelete(id);
  }

  const updateuser = () =>
  {
    setUpdated(true)
  }

  const closeuser = (ans) =>
  {
    setUpdated(false)
  }


  return (
    <Card className={classes.root}>
      {/*       
      <CardMedia
        className={classes.media}
        image="./images/1.jpg"
        title="Paella dish"
      />
      */}
      {updated ? (<UpdateUserComp user={props.user} login={userslogin} usrname={username} permissions={per} usrper={permissions}
                                  callbackUpdate={data => closeuser(data)} />)
      : (<div>
      <CardContent> 

        <Typography variant="h5" component="h2">
          {props.user.firstName}{bull}{props.user.lastName}
        </Typography>
        <Typography className={classes.pos} >
          User Name : {username} <br />
          Session Timeout (Minutes): {props.user.sessionTimeOut} <br />
          Created : {props.user.created} <br />
        </Typography>
        <Typography variant="body2" component="h5" color="textSecondary">
         Permissions : {per[0] ? per[0]+"," : null} {per[1] ? per[1]+"," : null} {per[2] ? per[2]+"," : null}  {per[3] ? per[3] : null} <br/>
         {per[4] ? per[4]+"," : null} {per[5] ? per[5]+"," : null}  {per[6] ? per[6]+"," : null}  {per[7] ? per[7] : null}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={updateuser} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={deleteuser} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
      </div>)}
    </Card>
  );
}
