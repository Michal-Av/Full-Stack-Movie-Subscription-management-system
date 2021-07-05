import {useState, useEffect} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigatorComp(props) {

const [pers,setPers] = useState([]);
const [user,setUser] = useState({});
const [login, setLogin] = useState(false);
const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleChange = (event) => {
  setAuth(event.target.checked);
};

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

useEffect(() =>
{
  if(props.usr != null)
    setLogin(true);
  axios.get(`http://localhost:8000/api/permissions/`)
  .then(resp =>
  {
      setPers(resp.data);
  })
  axios.get(`http://localhost:8000/api/users/`+ [sessionStorage["userID"]])
  .then(resp =>
  {
      setUser(resp.data);
  })
},[sessionStorage["userID"]])

let movie = pers.map((item,index) =>
  {
    if(props.usr==item.userID) 
    {
      if(item.permissions.includes("View Movies") || item.permissions.includes("Create Movies") || item.permissions.includes("Delete Movies") ||item.permissions.includes("Update Movies"))
      {
        return <div key={index} > <Button href= {`/movies/${props.usr}`} color="inherit" >Movies </Button> </div>                                  
      }
      else return null;
    }
  });

let subscriptions = pers.map((item,index) =>
  {
    if(props.usr==item.userID) 
    {
      if(item.permissions.includes("View Subscriptions") || item.permissions.includes("Create Subscriptions") || item.permissions.includes("Delete Subscriptions") || item.permissions.includes("Update Subscriptions"))
      {
        return  <div key={index}> <Button href={`/subscriptions/${props.usr}`} color="inherit" >Subscriptions </Button> </div>                                  
      }
      else return null;
    }
  });

  let user_man = pers.map((item,index) =>
    {
      if(props.usr==item.userID) 
      {
        //manager
        if((item.permissions.includes("View Subscriptions") && item.permissions.includes("Create Subscriptions") && item.permissions.includes("Delete Subscriptions") && item.permissions.includes("Update Subscriptions")) && (item.permissions.includes("View Movies") || item.permissions.includes("Create Movies") || item.permissions.includes("Delete Movies") ||item.permissions.includes("Update Movies")))
        {
          return  <div key={index}> <Button href={`/management/${props.usr}`} color="inherit" >User Management </Button> </div>                                  
        }
        else return null;
      }
    });
  
const classes = useStyles();

const logout = () =>
{
  sessionStorage.clear();
  window.location = '/';
}

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" style={{ background: '#2E3B55' }}>
        <Toolbar>
        {login ? <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> : 
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{user.firstName}{" "}{user.lastName}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
          <Typography variant="h6" className={classes.title}>
            Movies & Subscription Website
          </Typography>
         
          {movie}
          {subscriptions}
          {user_man}
    
        </Toolbar>
      </AppBar>
    </div>
  );
}
