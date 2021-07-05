const User = require('./loginModel');


exports.getAllLogin = function()
{
    return new Promise((resolve,reject) =>
    {
        User.find({}, function(err, usrs)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(usrs)
            }
        })
    });
}

exports.getUserLogin = function(id)
{
    return new Promise((resolve,reject) =>
    {
        User.findById(id, function(err,per)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(per)
            }
        })
    });   
}

exports.addUserLogin = function(obj)
{
    return new Promise((resolve,reject) =>
    {
    const newUsr = new User({
        userName : obj.userName,
        password : obj.password,
        userID : obj.userID,
    });

    newUsr.save(function(err)
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

exports.updateUserLogin = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        User.findByIdAndUpdate(id,
            {
                userName : obj.userName,
                password : obj.password,
                userID : obj.userID,
            } , function(err)
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


exports.deleteUserLogin = function(id)
{
    return new Promise((resolve,reject) =>
    {
        User.findByIdAndDelete(id, function(err)
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




