const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
let routes = require('./api/routes/rest_routes.js')
const env = require('./env/env.js')

const db = mongoose.connection

let app = express();
app.use(cors())
routes(app)

/**
 *
 */
mongoose.connect(process.env.mongo_ip+':'+process.env.mongo_port, { user: 'admin', pass:'32-5#v3a1yoa9ekaI`<w+%;', useNewUrlParser: true, useUnifiedTopology: true })

/**
 *
 * @type {http.Server}
 */
let server = app.listen(process.env.http_port, process.env.http_ip,function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

//
db.on('error', console.error.bind(console, 'connection error:'));

//
db.once("open", function () {
    console.log("Connected")
})

/**
 *
 */

process.on('exit', code => {
    console.log("exit")
    db.close()
    process.exit()
});

/**
 *
 */

process.on('SIGINT', code => {
    console.log("CTRL+C")
    db.close()
    process.exit()
});



