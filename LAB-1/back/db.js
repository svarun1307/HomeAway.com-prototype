/* var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'home_away_1'
  
}); 

connection.connect();

module.exports = connection;  
 */
/*****CONNECTION POOLING FOR HOME AWAY ***********/

 var mysql      = require('mysql');

var connection = mysql.createPool({
  connectionLimit  : 300,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'home_away_1'
  
});


let _query =  function(query,params,cb){

  //connection.getConnection(function(err,conn){
      // if(err)
     // {
          //conn.release();
         // cb(err);
        //  throw err;  
      //} 
      //console.log(query);
      connection.query(query,params,function(err,rows,fields){
        
        //console.log(rows);
          if(err)
          {
            //conn.release();
            cb(err);
          }
          else 
          {
            //conn.release();
            cb(null,rows,fields);
            return rows;
          }
      });
 // });

}

module.exports = {
  query : _query,
  escape : function(val){
    return mysql.escape(val);
  }
}; 