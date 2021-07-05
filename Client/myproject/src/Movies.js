import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import MovieComp from './Movie'
import './Users.css'
import AddMovieComp from './AddMovie';

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


function MoviesComp(props) {
  const classes = useStyles();
  const [movies,setMovies] = useState([]);
  const [movie,setMovie] = useState([]);
  const [per,setPer] = useState([]);
  const [searchLine, setSearchLine] = useState("");
  const [open, setOpen] = useState(true);
  const [cMovie,setCMovie] = useState (false);
  const [dMovie,setDMovie] = useState (false);
  const [uMovie,setUMovie] = useState (false);


  useEffect(() =>
  {
    let id = props.match.params.id;
    if (id != sessionStorage["userID"])
    {
      axios.get("http://localhost:8000/api/movies/" + id)
      .then(resp => {
        setSearchLine(resp.data.name)
        setCMovie(false); })
    }
    axios.get("http://localhost:8000/api/movies/")
    .then(resp => { setMovies(resp.data); })
    axios.get("http://localhost:8000/api/permissions/")
    .then(resp => {
        resp.data.forEach(x =>
        {
            if(x.userID == sessionStorage["userID"])
              {
                setPer(x.permissions);
              }
        })
     })  
  },[])

   useEffect(() =>
   {
    let id = props.match.params.id;
    if (id != sessionStorage["userID"])
     {
       setCMovie(per.includes("Create Movies"));
       setUMovie(per.includes("Update Movies"));
       setDMovie(per.includes("Delete Movies"));
      }
   },[per])


  const deleteMovie = async (id) =>
  {
    await axios.delete("http://localhost:8000/api/movies/" + id);
    window.location.reload();
  }

  const openAdd = () =>
  {
    setOpen(false);
  }

  const openMovies = () =>
  {
    setOpen(true);
  }

  let movies_items = movies.map((item,index) =>
    {
      if(searchLine.length < 2)
      {
        return <div style={{padding: "15px"}} key={index}> 
                <MovieComp movie={item} edit={uMovie} delete={dMovie} pers={per} 
                           callbackDelete={data => deleteMovie(data)} />
                <br/> 
               </div> 
        }
      if(item.name.includes(searchLine) || item.genres.includes(searchLine))
      {
      return <div style={{padding: "15px"}} key={index}> 
              <MovieComp movie={item} edit={uMovie} delete={dMovie} pers={per} 
                         callbackDelete={data => deleteMovie(data)} />
              <br/> 
             </div> 
      }
      else return null;                                
    })

  return (
    <div className="Window">
    <div> 
      <h1 style={{color : "white"}}>Movies</h1> 
      {cMovie && <div>
      <input type="button" value="Add Movie" onClick={openAdd}/>{"  "}
      <input type="button" value="All Movies" onClick={openMovies}/> 
      </div>} <br/>
      <div style={{color : "white"}}> Find Movie : <input type="text" onChange={e => setSearchLine(e.target.value)} />
      </div>
      </div> <br/> <br/>
    {open ? 
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={3}>
           {movies_items} 
           </Grid>
       </Grid>
       </Grid>
    </div> : <AddMovieComp  callbackUpdate={openMovies}/>}       
  </div>
  );
}

export default MoviesComp;