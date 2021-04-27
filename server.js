const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws');
const mqtt = require('mqtt');
const emitter = require('events').EventEmitter
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')
const gm = require('gm')

const HEIGHT_IMAGE = 2146
const WIDTH_IMAGE = 2146

let app = express();
let parser = bodyParser.json()
app.use(cors())
let em = new emitter()

let cars = []

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

client.on("connect", function () {
    //client.subscribe("Anki/poc/#")
    client.publish('Anki/Host/' + 'test12345' + '/S/HostStatus', JSON.stringify({
        "value": true
    }), {
        "retain": true,
        "qos": 1
    })
    client.subscribe("Anki/Host/+/E/#");
    client.subscribe("Anki/Host/+/S/#");
    client.subscribe("Anki/Car/+/E/Messages/#");
    client.subscribe("Anki/Car/+/S/Information");
});

client.on("message", function (topic, message) {
    em.emit('mqtt_msg_arrived', topic, message)
})

//Websocket
wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        let msg = JSON.parse(message)
        console.log(msg["command"])
        let cmd = msg["command"]

        switch (cmd) {
            case "Cars":
                client.publish("Anki/Host/host/I", JSON.stringify({
                    cars: true
                }))
                break
        }
    });

    em.on('mqtt_msg_arrived', function (topic, msg) {
        let message = JSON.parse(msg)
        if (RegExp("Anki[\/]Host[\/].*[\/]S[\/]Cars").test(topic)) {
            cars = message;
            ws.send(JSON.stringify({
                "eventID": "ANKI_CONTROLLER_MSG_CONNECTED_VEHICLES",
                "data": message
            }))
        } else if (RegExp("Anki[\/]Host[\/].*[\/]E[\/]CarConnected").test(topic)) {
            ws.send(JSON.stringify({
                "eventID": "ANKI_CONTROLLER_MSG_VEHICLE_CONNECTED",
                "data": message
            }))
        } else if (RegExp("Anki[\/]Host[\/].*[\/]E[\/]CarDisconnected").test(topic)) {
            ws.send(JSON.stringify({
                "eventID": "ANKI_CONTROLLER_MSG_VEHICLE_DISCONNECTED",
                "data": message
            }))
        } else if (RegExp("Anki[\/]Car[\/].*[\/]E[\/]Messages[\/].*").test(topic)) {
            let carID = topic.split("/")[2]
            let event = topic.split("/")[5]
            ws.send(JSON.stringify({
                "eventID": event,
                "carID": carID,
                "data": message
            }))

        } else if (RegExp("Anki[\/]Car[\/].*[\/]S[\/]Information").test(topic)) {
            let carID = topic.split("/")[2]
            let event = topic.split("/")[4]
            ws.send(JSON.stringify({
                "eventID": event,
                "carID": carID,
                "data": message
            }))

        }
        /*
        if (topic.split("/")[2] === 'cars'){
            ws.send(JSON.stringify(["cars", msg]))
        }
        else {
            let car = topic.split("/")[2]
            let cmd = topic.split("/")[3]
            ws.send(JSON.stringify([car, cmd, msg]))
        }
        */

    })
});

wss.on("")

//REST

//Get image
app.get('/image', function (req, res) {
    let uri = getImgUri(req.query["type"])
    res.sendFile(uri)
})


app.post("/export", parser, (req, res) => {
    let grid_items = req.body
    let rows = req.query["maxRows"]
    let cols = req.query["maxCols"]
    let data = drawImage(grid_items, rows, cols)
    data.then((dat) => {

        const im = dat.toDataURL().split(",")[1];

        const img = Buffer.from(im, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    })

})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

function getImgUri(type) {
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

async function drawImage(grid_items, rows, cols) {
    let canvas = createCanvas(WIDTH_IMAGE * rows, HEIGHT_IMAGE * cols)
    let ctx = canvas.getContext('2d')

    const promise = grid_items.map(grid => {
        let uri = getImgUri(grid.type)
        let degree

        switch (grid.item.degree.toString()) {
            case "0":
                degree = 0
                break
            case "90":
                degree = Math.PI / 2
                break
            case "180":
                degree = Math.PI
                break
            case "270":
                degree = 3 * Math.PI / 2
                break
        }

        loadImage(uri).then((image) => {
            ctx.save()
            ctx.translate(((grid.item.x + 1) * WIDTH_IMAGE) - 1073, ((grid.item.y + 1) * HEIGHT_IMAGE) - 1073);
            ctx.rotate(degree);
            ctx.drawImage(image, -1073, -1073, WIDTH_IMAGE, HEIGHT_IMAGE)
            ctx.restore()
        })
    })

    await Promise.all(promise)
    return canvas
}

process.on('exit', code => {
    console.log("exit")
    em.removeAllListeners()
    process.exit()
});

//catches ctrl+c event
process.on('SIGINT', code => {
    console.log("CTRL+C")
    em.removeAllListeners()
    process.exit()
});



