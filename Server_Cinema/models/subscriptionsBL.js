const axios = require('axios')

exports.getAllSubs = function()
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/subscriptions/")
        let subs = resp.data;
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve(subs);  
    })
}

exports.getSub = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/subscriptions/"+ id)
        let subs = resp.data;
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve(subs);  
    })
}


exports.addSub = function(obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.post(`http://localhost:8080/api/subscriptions/`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('created');  
    })
}

exports.updateSub = function(id,obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.put(`http://localhost:8080/api/subscriptions/${id}`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('updated');  
    })
}

exports.deleteSub = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.delete("http://localhost:8080/api/subscriptions/" + id);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('deleted');   
    });   
}
