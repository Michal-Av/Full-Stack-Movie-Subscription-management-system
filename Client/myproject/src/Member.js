import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'
import UpdateMemberComp from './UpdateMember';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    backgroundColor: '#e6ffe6',
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

export default function MemberComp(props) {
  const classes = useStyles();
  const [movies,setMovies] = useState([]);
  const [newsubs,setNewsubs] = useState([]);
  const [subs, setSubs] = useState([]);
  const [idS, setIdS] = useState("");
  const [updated, setUpdated] = useState(false);
  const [hide, setHide] = useState(false);
  const [movie,setMovie] = useState({});
  const [date, setDate] = useState();
  const [names, setNames] = useState([]);

  useEffect(() =>
  {
    axios.get("http://localhost:8000/api/movies/")
    .then(resp => 
      { 
        let arrMovies=[];
        resp.data.forEach(y => arrMovies.push(y.name))
        setNames(arrMovies);
        setMovies(resp.data); 
      })
    axios.get("http://localhost:8000/api/subscriptions/")
    .then(resp => {  
    resp.data.map(item =>
    {
        if(item.memberID == props.member._id) 
        {
          setIdS(item._id)
          setSubs(item.movies);
        }    
      })     
   })
  },[])

  // useEffect(() =>
  // {
  //   let temp = [];
  //   subs.map(x => 
  //   {
  //     movies.forEach(y =>
  //     {
  //       if(x.movieID === y._id)
  //         temp.push({_id : x.movieID, name : y.name, date : x.date })
  //     })
  // })
  // setNewsubs(temp);
  // },[subs])

useEffect(() =>
{
  let temp=[];
  subs.map(x => 
  {
    axios.get("http://localhost:8000/api/movies/"+x.movieID)
    .then(resp => 
    { 
      temp.push({_id : x.movieID, name : resp.data.name, date : x.date })
    })
  })
//console.log(temp)
setNewsubs(temp);

},[subs])

  const deletemember = () =>
  {
    let id = props.member._id;
    console.log(id)
    props.callbackDelete(id);
  }

  const updatemember = () =>
  {
    setUpdated(true)
  }

  const closemember = (ans) =>
  {
    setUpdated(false);
  }

  const newSub = () =>
  {
    setHide(true);
  }

  const closeSub = () =>
  {
    setHide(false);
  }
  
  const createSub = async() =>
  {
    let idM;
    movies.forEach(x =>
      {
        if(movie == x.name)
          idM = x._id;
      })
    let arr=[];
    subs.forEach( y => {
      arr.push({ movieID : y.movieID, date : y.date })
    });
    arr.push({ movieID : idM, date : date })
    let obj={
      memberID : props.member._id,
      movies : arr
    }
    console.log(idS)
    if(idS == "")
    {
      let resp = await axios.post(`http://localhost:8000/api/subscriptions/`,obj);
      window.location.reload();
    }
    else
    {
       let resp1 = await axios.put(`http://localhost:8000/api/subscriptions/${idS}`,obj);
       window.location.reload();
      }
  }

  let movies_items = newsubs.map((item,index) =>
  {
    return <li key={index}>
        <Typography variant="body2" component="h5">
        <Link to={`/movies/${item._id}`}>{item.name}</Link>, {item.date}. </Typography>
        </li>
  })

  return (
    <Card className={classes.root}>

      {updated ? (
      <UpdateMemberComp member={props.member} callbackUpdate={data => closemember(data)} /> )
      : (<div>
      <CardContent> 

        <h2>
          {props.member.name}
        </h2>
        <div className={classes.pos} >
          Email : {props.member.email} <br />
          City: {props.member.city} <br />
        </div>
        <br/>
        <div style={{padding: "10px", "border-style": 'dotted'}}>
            Movies Watched:<br/>
            {!hide && props.create && <input type="button" value="Subscribe to new Movie" onClick={newSub} />}            
            {hide && <div> <br/>
              <select onChange={e=> setMovie(e.target.value)}>
              {names.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}</select> 
              <input value={date} type="date" name="date"  onChange={e => setDate(e.target.value)} /><br/>
              <div style={{marginLeft : "40%"}}>
                <input type="button" value="Subscribe" onClick={createSub} /> {" "}
                <input type="button" value="Cancel" onClick={closeSub} />
              </div>
              </div>}
          <div>
            <ul>     
            { movies_items }
            </ul>
          </div>
        </div>
      
      </CardContent>
     
      <CardActions disableSpacing>
      {props.edit && <IconButton onClick={updatemember} aria-label="edit">
          <EditIcon />
        </IconButton>}
      {props.delete && <IconButton onClick={deletemember} aria-label="delete">
          <DeleteIcon />
        </IconButton>}
      </CardActions>
      </div>)}
    </Card>
  );
}
