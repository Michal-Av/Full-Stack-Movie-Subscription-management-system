import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
import UpdateMovieComp from './UpdateMovie';
import MovieSubscriptionComp from './MovieSubscription';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: 350,
    
    MaxHeight: 350,
    backgroundColor: '#ebebe0'
  },
  media: {
    height: '145px',
    width: '95px',
    //paddingTop: '56.25%', // 16:9
  }
}));

export default function MovieComp(props) {
  const classes = useStyles();
  const [genres,setGenres] = useState([]);
  const [year, setYear] = useState("");
  const [per,setPer] = useState([]);
  const [updated, setUpdated] = useState(false);
  

  useEffect(() =>
  {
    setGenres(props.movie.genres)
    
    setPer(props.pers);
    let date = props.movie.premiered
    let res = date.slice(0, 4);
    setYear(res);
 
  },[])

  const deletemovie = () =>
  {
    let id = props.movie._id;
    console.log(id)
    props.callbackDelete(id);
  }

  const updatemovie = () =>
  {
    setUpdated(true)
  }

  const closemovie = (ans) =>
  {
    setUpdated(false)
  }


  return (
    <Card className={classes.root}>
      {/*       
      
      */}
      {updated ? (<UpdateMovieComp movie={props.movie} 
                                  callbackUpdate={data => closemovie(data)} />)
      : (<div>
      <CardContent> 

        <Typography variant="'subtitle1'" component="h2">
          {props.movie.name}, {year}
        </Typography>
        <div>
          Genres : {genres[0] ? genres[0]+"," : null} {genres[1] ? genres[1]+"," : null} {genres[2] ? genres[2]+"," : null} {genres[3] ? genres[3]+"" : null}    
        </div>
        <div style={{padding: "10px"}}><br />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={3}>
          <CardMedia 
          style={{padding: "5px"}}
          className={classes.media}
          image= {props.movie.image}
          />
          <MovieSubscriptionComp id={props.movie._id} />
           </Grid>
       </Grid>
       </Grid>
    </div>
        <div>
         
        </div>
        <div >
        <CardActions disableSpacing>
        {props.edit && <IconButton onClick={updatemovie} aria-label="edit">
          <EditIcon />
        </IconButton>}
        {props.delete && <IconButton onClick={deletemovie} aria-label="delete">
          <DeleteIcon />
        </IconButton>}
      </CardActions>
      </div>
      </CardContent>

      </div>)}
    </Card>
  );
}
