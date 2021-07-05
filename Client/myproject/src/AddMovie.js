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
    backgroundColor: '#ebebe0'
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

export default function AddMovieComp(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [genres,setGenres] = useState([]);
  const [image, setImage] = useState("");
  const [premiered,setPremiered] = useState("");


  const customSubmit = async (e) =>
  {
    e.preventDefault();
    let fields = genres.split(',');
    let obj = {name : name,
               genres : fields,
               image : image,
               premiered : premiered,
              }
      let resp1 = await axios.post(`http://localhost:8000/api/movies/`,obj);
      alert('Movie created')
      window.location.reload();
  }

  const closemovie = () =>
  {
    props.callbackUpdate();
  }

  return (
    <Card className={classes.root}>
      <CardContent>
       <Typography variant="h5" component="h2">
           Add New Movie :
        </Typography>
      <form onSubmit={e => customSubmit(e)}>
        Name : <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} /><br/>
        Genres : <input value={genres} type="text" name="lname" onChange={e => setGenres(e.target.value)} /><br/>
        Image Url : <input value={image} type="text" name="image" onChange={e => setImage(e.target.value)} /><br/>
        Premiered : <input value={premiered} type="date" name="premiered"  onChange={e => setPremiered(e.target.value)} /><br/>

      </form>
      <div style={{marginLeft: "70%"}}>
      <CardActions disableSpacing>
      <IconButton onClick={customSubmit} aria-label="send">
          <SendIcon />
        </IconButton>
        <IconButton onClick={closemovie} aria-label="cancel">
          <CancelIcon  />
        </IconButton>
      </CardActions>
      </div>
      </CardContent>
  </Card>
    
  );
}
