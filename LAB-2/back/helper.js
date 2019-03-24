

//module.exports = hps;

module.exports = {
    hps : function(conn,val){
        console.log(val);
        for(var p = 0; p < Object.keys(val); p++)
        {
            val[Object.keys(val)[p]] = conn.escape(Object.keys(val)[p]);
        }
        return val;
    }
    
}