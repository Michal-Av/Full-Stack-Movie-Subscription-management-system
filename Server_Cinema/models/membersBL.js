const axios = require('axios')

exports.getAllMembers = function()
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/members/")
        let members = resp.data;
        if (members == '' || members == null)
            reject('err');
        else resolve(members);  
    })
}

exports.getMember = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/members/"+ id)
        let member = resp.data;
        if (member == '' || member == null)
            reject('err');
        else resolve(member);  
    })
}

exports.addMember = function(obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.post(`http://localhost:8080/api/members/`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('created');  
    })
}

exports.updateMember = function(id,obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.put(`http://localhost:8080/api/members/${id}`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('updated');  
    })
}


exports.deleteMember = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.delete("http://localhost:8080/api/members/" + id);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('deleted');   
    });   
}




