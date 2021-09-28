//mpngodb Atlas connection strting
var connectionstr = "mongodb+srv://nodejs:nodejs@nodejs.pnogr.mongodb.net/nodejs?retryWrites=true&w=majority"
//mongodb localhost connaection string
//mongodb://localhost:27017

const MongoClient = require("mongodb").MongoClient;
const assert= require("assert")
const dbname = "nodejs";
var mongoClient = new MongoClient(connectionstr, { useUnifiedTopology: true });
//connect 1 adet callback fonksiyon döner
/*mongoClient.connect(function (err) {
    if (err) {
        console.log("Connection Failure");
        console.log(err)
        return;
    }
    else {
        console.log("Connection Success");
    }
})*/
//Connect in promise ile yazılmış hali
mongoClient.connect().then((result)=>{
    console.log("Connection Success");
    //deepEqual nesnelerin tamamiyle eşit olup olmadığını kontrol eder
    assert.deepEqual(mongoClient,result)

    mongoClient.db(dbname).collection("users").find({}).toArray().then((resultset)=>{
        console.log("Kayit Adedi: "+resultset.length)
        //console.log(resultset)
        mongoClient.close().then((result)=>{
            //result undefinied gelir
            assert.deepEqual(undefined,result)
            console.log("DB Closed");
        }).catch((err)=>{
            console.log("Close Error: "+err)
        })
    })
}).catch((err)=>{
    if (err) {
        console.log("Connection Failure");
        console.log(err)
        return;
    }
})

//forTest



