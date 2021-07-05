const Sub = require('./subscriptionModel');


exports.getAllSubs = function()
{
    return new Promise((resolve,reject) =>
    {
        Sub.find({}, function(err, subs)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(subs)
            }
        })
    });
}

exports.getSub = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Sub.findById(id, function(err,subs)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(subs)
            }
        })
    });   
}

exports.addSub = function(obj)
{
    return new Promise((resolve,reject) =>
    {
    const newSub = new Sub({
        memberID : obj.memberID,
        movies : obj.movies,
        });

    newSub.save(function(err)
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

exports.updateSub = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Sub.findByIdAndUpdate(id,
            {
                memberID : obj.memberID,
                movies : obj.movies,
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


exports.deleteSub = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Sub.findByIdAndDelete(id, function(err)
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




