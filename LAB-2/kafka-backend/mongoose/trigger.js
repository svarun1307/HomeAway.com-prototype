/****************
 * 
 * 
 * ASYNC QUERY METHOD FOR MONGODB 
 * 
 * 
 * ************** */



async function executeAsyncQueryMongo(mdb1,mdb2,mdb3,mdb4 = {}){


    if(mdb3 == 'find')
    {
        /************SELECT QUERY*************** */
        return new Promise(function(resolve, reject) {
            mdb1.find( mdb2 , mdb4 , function(err,user){
                if (err) 
                {
                    reject(err);
                }
                else
                {
                    resolve(user);
                }
            })
        });
    }
    else if(mdb3 == 'insert')
    {
        /*************INSERT QUERY****************** */
        return new Promise(function(resolve, reject) {
            mdb1.save().then((data,doc,count)=>{
                console.log(data);
                console.log(doc);
                console.log(count);
                resolve(data);
            },(err)=>{
                reject(err);
            })
  
        });
    }
    else if(mdb3 == 'update')
    {
        /*************UPDATE QUERY****************** */
        return new Promise(function(resolve, reject) {
            mdb1.updateMany(mdb2,mdb4).then((data,doc,count)=>{
                resolve(data);
            },(err)=>{
                reject(err);
            })
  
        });
    }
    else if(mdb3 == 'aggregate')
    {
        return mdb1.find(mdb2, {}).sort(mdb4['sort']).skip(mdb4['skip']).limit(mdb4['limit']).exec();
    }


} 


module.exports = {
    executeAsyncQueryMongo
}

