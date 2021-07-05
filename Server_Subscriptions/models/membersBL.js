const Member = require('./memberModel');


exports.getAllMembers = function()
{
    return new Promise((resolve,reject) =>
    {
        Member.find({}, function(err, members)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(members)
            }
        })
    });
}

exports.getMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Member.findById(id, function(err,member)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(member)
            }
        })
    });   
}

exports.addMember = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        const newMember = new Member({
            name : obj.name,
            email : obj.email,
            city : obj.city
        });

        newMember.save(function(err)
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

exports.updateMember = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndUpdate(id,
        {
            name : obj.name,
            email : obj.email,
            city : obj.city
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



exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndDelete(id, function(err)
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




