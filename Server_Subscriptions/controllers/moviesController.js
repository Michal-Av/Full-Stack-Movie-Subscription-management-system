const express  = require('express');
const moviesBL = require('../models/moviesBL');

const router = express.Router();

router.route('/')
    .get(async function(req,resp)
    {
        let data =  await moviesBL.getAllMovies();
        return resp.json(data);
    })

router.route('/:id')
    .get(async function(req,resp)
    {
        let id = req.params.id;

        let data =  await moviesBL.getMovie(id);
        return resp.json(data);
    })


router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
  
        let result =  await moviesBL.addMovie(obj);
        console.log(result);
        return resp.json(result);
    })


router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
  
        let result =  await moviesBL.updateMovie(id,obj);
        
        return resp.json(result);
    })



router.route('/:id')
    .delete(async function(req,resp)
    {
        try
        {
            let id = req.params.id;
  
            let result =  await moviesBL.deleteMovie(id);
            return resp.json(result);
        }
        catch(err)
        {
            return resp.json(err);
        }
 
    })

module.exports = router;

