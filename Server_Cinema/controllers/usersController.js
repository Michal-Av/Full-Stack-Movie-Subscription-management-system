const express  = require('express');
const usersBL = require('../models/usersBL');

const router = express.Router();

router.route('/')
    .get(async function(req,resp)
    {
        let data =  await usersBL.getAllUsers();
        return resp.json(data);
    })

router.route('/:id')
    .get(async function(req,resp)
    {
        let id = req.params.id;

        let data =  await usersBL.getUser(id);
        return resp.json(data);
    })


router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
  
        let result =  await usersBL.addUser(obj);
        console.log(result);
        return resp.json(result);
    })


router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
  
        let result =  await usersBL.updateUser(id,obj);
        
        return resp.json(result);
    })



router.route('/:id')
    .delete(async function(req,resp)
    {
        try
        {
            let id = req.params.id;
  
            let result =  await usersBL.deleteUser(id);
            return resp.json(result);
        }
        catch(err)
        {
            return resp.json(err);
        }
 
    })

module.exports = router;

