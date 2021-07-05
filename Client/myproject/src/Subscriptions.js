import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import MemberComp from './Member'
import './Users.css'
import AddMemberComp from './AddMember'

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


function SubscriptionsComp(props) {
  const classes = useStyles();
  const [subs,setSubs] = useState([]);
  const [members,setMembers] = useState([]);
  const [per,setPer] = useState([]);
  const [open, setOpen] = useState(true);
  const [searchLine, setSearchLine] = useState("");
  const [cSubs,setCSubs] = useState (false);
  const [dSubs,setDSubs] = useState (false);
  const [uSubs,setUSubs] = useState (false);



  useEffect(() =>
  {
    let id = props.match.params.id;
    if (id != sessionStorage["userID"])
    {
      axios.get("http://localhost:8000/api/members/" + id)
      .then(resp => {
        setSearchLine(resp.data.name)
        setCSubs(false); })
      }
    axios.get("http://localhost:8000/api/members/")
    .then(resp => { setMembers(resp.data); })
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
     setCSubs(per.includes("Create Subscriptions"));
     setUSubs(per.includes("Update Subscriptions"));
     setDSubs(per.includes("Delete Subscriptions"));

   },[per])


  const deleteSubs = async (id) =>
  {
    await axios.delete("http://localhost:8000/api/members/" + id);
    window.location.reload();
  }

  const openAdd = () =>
  {
    setOpen(false);
  }

  const openSubs = () =>
  {
    setOpen(true);
  }


  let subs_items = members.map((item,index) =>
    {
      if(item.name.includes(searchLine))
      {
      return <div style={{padding: "15px"}} key={index}> 
              <MemberComp member={item} edit={uSubs} delete={dSubs} create={cSubs} pers={per} 
                         callbackDelete={data => deleteSubs(data)} />
              <br/> 
             </div> 
      }
      else return null;                              
    })

  return (
    <div className="Window">
    <div> 
      <h1 style={{color : "white"}}>Subscriptions</h1> 
      {cSubs && <div>
        <input type="button" value="Add Member" onClick={openAdd}/>{"  "}
      <input type="button" value="All Members" onClick={openSubs}/> 
      </div>} 
    </div> <br/> <br/>
    {open ? 
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={3}>
           {subs_items} 
           </Grid>
       </Grid>
       </Grid>
    </div> : <AddMemberComp  callbackUpdate={openSubs}/>}       
  </div>
  );
}

export default SubscriptionsComp;