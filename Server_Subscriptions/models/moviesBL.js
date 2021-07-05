const Movie = require('./movieModel');


// exports.getAllMovies = async function()
// {
//     return new Promise(async(resolve,reject) =>
//     {
//     let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
//     let moviesArr = resp.data;
//     let movies = moviesArr.map(x =>
//         {
//         return ({name : x.name, email : x.email, city : x.address.city});
//             })
//         resolve(movies);
   
//         })
// }

exports.getAllMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err, movies)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(movies)
            }
        })
    });
}

exports.getMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findById(id, function(err,movie)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(movie)
            }
        })
    });   
}

exports.addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
    const new_movie = new Movie({
            name : obj.name,
            genres : obj.genres,
            image : obj.image,
            premiered : obj.premiered
        });

        new_movie.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created!')
            }
        })
    })
}

exports.updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndUpdate(id,
            {
                name : obj.name,
                genres : obj.genres,
                image : obj.image,
                premiered : obj.premiered
            },function(err)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Updated!')
                }
            })
    })
}


exports.deleteMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Deleted")
            }
        })
    });   
}




