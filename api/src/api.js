

var express = require("express");
var app = express();

const config = require("config")

//redis setup
const redis = require("redis");
const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
});

client.on('error', err => {
    console.log('Error ' + err);
});


var cors = require('cors')

app.listen(8080, () => {
    client.flushall();
    console.log("Server running on port ", config.port);
    console.log("Redis running on port ", config.redis.port);
});

app.use(cors())
app.use(express.json())


app.get("/transactions", (req, res) => {

    let list = []
    client.smembers("list", function (err, reply) {
        reply.forEach(element => {
            list.push(JSON.parse(element))
        });
        res.json(list.sort(function (a, b) {
            return b.date - a.date;
        }));
    });

});

app.post("/purchase", (req, res) => {
    client.sadd("list", JSON.stringify(req.body))
    res.json([]);
});