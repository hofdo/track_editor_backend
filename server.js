const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const emitter = require('events').EventEmitter
const {createCanvas, loadImage} = require('canvas')
const track_generator = require("./track_editor_generator")

const HEIGHT_IMAGE = 2146
const WIDTH_IMAGE = 2146

let app = express();
let parser = bodyParser.json()
app.use(cors())
let em = new emitter()

//REST
/*
//Get image
app.get('/image', function (req, res) {
    let uri = getImgUri(req.query["type"])
    res.sendFile(uri)
})

 */

//Get image
app.get('/image', function (req, res) {
    let type = req.query["type"]
    let track_id = req.query["track_id"]
    let lanes = req.query["lanes"]
    let bla = req.query["bla"]
    let left = 0
    let right = 0
    let middle = 0

    console.log(track_id)
    console.log(type)
    console.log(lanes)
    console.log(bla)

    switch (type) {
        case "straight":
            track_generator.drawStraightTrack(track_id, lanes)
            break
        case "curve":
            track_generator.drawCurveTrack(track_id, lanes)
            break
        case "intersection":
            track_generator.drawIntersectiontTrack(lanes)
            break
        case "junction":
            if (req.query["left"] !== undefined) left = req.query["left"]
            track_generator.drawJunctionTrack(track_id, lanes, left, right)
            break
    }
    res.sendFile("wat")
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

/**
 *
 * @param type
 * @returns {string}
 */

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

/**
 *
 * @param grid_items
 * @param rows
 * @param cols
 * @returns {Promise<Canvas>}
 */

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

/**
 *
 */

process.on('exit', code => {
    console.log("exit")
    em.removeAllListeners()
    process.exit()
});

/**
 *
 */

process.on('SIGINT', code => {
    console.log("CTRL+C")
    em.removeAllListeners()
    process.exit()
});



