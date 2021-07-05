const axios = require('axios')

exports.getAllMovies = async function()
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/movies/")
        let movies = resp.data;
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve(movies);  
    })
}


exports.getMovie = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.get("http://localhost:8080/api/movies/"+ id)
        let movie = resp.data;
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve(movie);  
    })
}

exports.addMovie = function(obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.post(`http://localhost:8080/api/movies/`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('created');  
    })
}

exports.updateMovie = function(id,obj)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.put(`http://localhost:8080/api/movies/${id}`,obj);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('updated');  
    })
}


exports.deleteMovie = function(id)
{
    return new Promise(async(resolve,reject) =>
    {
        let resp = await axios.delete("http://localhost:8080/api/movies/" + id);
        if (resp.data == '' || resp.data == null)
            reject('err');
        else resolve('deleted');   
    });   
}




