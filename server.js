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
    console.log("done")
    console.log("Canvas width: " + canvas.width)
    console.log("Canvas height: " + canvas.height)
    return canvas
    //const buffer = canvas.toBuffer('image/png')
    //fs.writeFileSync('./image.png', buffer)
}



