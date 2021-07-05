let jsonfile = require('jsonfile');
var fs = require('fs');   

exports.getAllPers = function()
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/permissions.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve( data.permissions );
                }
            })
        })
}

exports.getPer = function(id)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/permissions.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    let arr = data.permissions.filter(x => x._id == id)
                    if(arr.length > 0)
                    {
                        resolve(arr[0]);
                    }
                    else resolve(null);
                   
                }
            })
        })
}

exports.addPer = function(obj)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/permissions.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    obj._id = Date.now();
                    let newPer = data.permissions;
                    newPer.push(obj)
                    fs.writeFile(__dirname + "/../data_source/permissions.json", '{ "permissions" :' + JSON.stringify(newPer) + '}', function (err) {
                        if (err) throw err;
                        resolve('done!');
                      });
                }
            })
        })
}

exports.updatePer = function(id,obj)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/permissions.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    obj._id = id;
                    let per = data.permissions;
                    let index= per.findIndex(x => x._id == id)
                    if(index >= 0)
                        per[index] = obj;
                    fs.writeFile(__dirname + "/../data_source/permissions.json", '{ "permissions" :' + JSON.stringify(per) + '}', function (err) {
                        if (err) throw err;
                        resolve('updated!');
                      });   
                }
            })
        })
}


exports.deletePer = function(id)
{
    return new Promise((resolve,reject) =>
        {
            jsonfile.readFile(__dirname + "/../data_source/permissions.json",function(err,data)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    let per = data.permissions;
                    let index= per.findIndex(x => x._id == id)
                    if(index >= 0)
                    {
                        per.splice(index,1);
                    }
                    fs.writeFile(__dirname + "/../data_source/permissions.json", '{ "permissions" :' + JSON.stringify(per) + '}', function (err) {
                        if (err) throw err;
                        resolve('deleted!');
                      });   
                }
            })
        })
}



