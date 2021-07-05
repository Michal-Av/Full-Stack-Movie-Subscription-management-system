let jsonfile = require('jsonfile');
var fs = require('fs');   

exports.getAllUsers = function()
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/users.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve( data.users );
                }
            })
        })
}

exports.getUser = function(id)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/users.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    let arr = data.users.filter(x => x._id == id)
                    if(arr.length > 0)
                    {
                        resolve(arr[0]);
                    }
                    else resolve(null);
                   
                }
            })
        })
}

exports.addUser = function(obj)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/users.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    obj._id = Date.now();
                    let newUser = data.users;
                    newUser.push(obj)
                    fs.writeFile(__dirname + "/../data_source/users.json", '{ "users" :' + JSON.stringify(newUser) + '}', function (err) {
                        if (err) throw err;
                        resolve(obj);
                      });
                }
            })
        })
}

exports.updateUser = function(id,obj)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/users.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    obj._id = id;
                    let usr = data.users;
                    let index= usr.findIndex(x => x._id == id)
                    if(index >= 0)
                        usr[index] = obj;
                    fs.writeFile(__dirname + "/../data_source/users.json", '{ "users" :' + JSON.stringify(usr) + '}', function (err) {
                        if (err) throw err;
                        resolve('updated');
                     });   
                }
            })
        })
}


exports.deleteUser = function(id)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/users.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    let usr = data.users;
                    let index= usr.findIndex(x => x._id == id)
                    if(index >= 0)
                    {
                        usr.splice(index,1);
                    }
                    fs.writeFile(__dirname + "/../data_source/users.json", '{ "users" :' + JSON.stringify(usr) + '}', function (err) {
                        if (err) throw err;
                        resolve('deleted!');
                      });   
                }
            })
        })
}



