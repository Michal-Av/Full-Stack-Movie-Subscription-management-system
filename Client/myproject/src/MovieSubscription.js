import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { Link} from 'react-router-dom'
import axios from 'axios'


export default function MovieSubscriptionComp(props)
{
    const [subs,setSubs] = useState([]);
    const [members,setMembers] = useState([]);
    const [newsubs,setNewsubs] = useState([]);

    useEffect(() =>
    {
        axios.get("http://localhost:8000/api/members/")
        .then(resp => { setMembers(resp.data); })    
        let id = props.id;
        let arr=[];
        let obj;
        axios.get("http://localhost:8000/api/subscriptions/")
        .then(resp => {
            //console.log(resp.data)
            //debugger;
            resp.data.forEach(x =>
            {
                x.movies.forEach(movie =>
                {
                    if(movie.movieID == id)
                    {
                        obj = { memberID : x.memberID,
                                    date : movie.date
                            }
                        arr.push(obj);
                    }
                    
                })
            })
            setSubs(arr);
        })  
    },[])

    useEffect(() =>
    {
        subs.map(x => 
            {
                members.forEach(y =>
                    {
                        if(x.memberID == y._id)
                            x.name = y.name;
                    })
            })
        setNewsubs(subs);
    },[subs])

    return (
        <div style={{padding: "15px", "border-style": 'dotted'}}>
            Subscriptions Watched:<br/>
           <ul>     
          { 
            newsubs.map((item,index) =>
              {
                return <li key={index}>
                    <Typography variant="body2" component="h7">
                    <Link to={`/subscriptions/${item.memberID}`}>{item.name}</Link>, {item.date}. </Typography>
                    </li>
              })
          }
          </ul>
        </div>
    );
}
