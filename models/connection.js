let db;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';    
// Database Name
const dbName = 'zomato';
function dbConnector() { 
    return new Promise(function(resolve,reject){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            if (err) {
                reject(err);
            }
            else{
                console.log("Connected successfully to server");
            
                const data = client.db(dbName);
                resolve(data);
            }
        });
    }) 
}
dbConnector().then((data)=>{
    db = data;
    console.log("success");
},
(error)=>{
    console.log("connection got rejected with: ", err);
})
module.exports = db;

