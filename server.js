const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws');
const mqtt = require('mqtt');
const emitter = require('events').EventEmitter
const gm = require('gm')

let app = express();
let parser = bodyParser.json()
app.use(cors())
let em = new emitter()

const wss = new WebSocket.Server({port: 8082});

//MQTT
let client = mqtt.connect('mqtt://192.168.1.121', {
    clientId: 'test12345',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    will: {
        topic: 'Anki/Backend/' + 'test12345' + '/S/HostStatus',
        payload: JSON.stringify({
            "value": false
        }),
        retain: true,
        qos: 1
    }
});

client.on("message", function (topic, message) {
    let msg = message.toString()
    em.emit('mqtt_msg_arrived')
})

//Websocket
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    em.on('mqtt_msg_arrived', function () {
        ws.send(JSON.stringify("wat"))
    })
});

client.on("connect", function () {
    client.subscribe("Test")
    /*
    client.publish('Anki/Host/' + 'test12345' + '/S/HostStatus', JSON.stringify({
        "value": true
    }), {
        "retain": true,
        "qos": 1
    })
    client.subscribe("Anki/Host/+/E/#");
    client.subscribe("Anki/Host/+/S/#");
    client.subscribe("Anki/Car/+/E/#");
    client.subscribe("Anki/Car/+/S/#");

     */
});

//REST

//Get image
app.get('/image', function (req, res) {
    let uri = getImgUri(req.query["type"])
    res.sendFile(uri)
})

app.post("/export", parser,(req, res) => {
    let grid_items = req.body
})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

function getImgUri(type){
    let uri = ""
    switch (type) {
        case "straight":
            uri = "C:\\Users\\DominiqueHofmann\\WebstormProjects\\track_editor_backend\\imgs\\Straight_Template-Recovered.png"
            break
        case "curve":
            uri = "C:\\Users\\DominiqueHofmann\\WebstormProjects\\track_editor_backend\\imgs\\Curve_Template-Recovered.png"
            break
        case "intersection":
            uri = "C:\\Users\\DominiqueHofmann\\WebstormProjects\\track_editor_backend\\imgs\\Intersection_5-[Recovered].png"
            break
    }
    return uri
}


