'use strict'
/**
 * This function contains the REST-API-Routes
 * @param app
 */
module.exports = function(app) {
    //Import the MongoDB Controller
    let mongoController = require('../../controller/mongoDBController');

    //Import the Track Generator Controller
    let trackGeneratorController = require('../../controller/imageGeneratorController');
    const bodyParser = require('body-parser')

    let parser = bodyParser.json()

    /**
     * REST-Route /Image for exporting single images of track pieces
     */
    app.get('/image', function (req, res) {
        let type = req.query["type"]
        let track_id = req.query["track_id"]
        let lanes = req.query["lanes"]
        let left = 0
        let right = 0
        let middle = 0
        let data
        let im = ""

        if (req.query["left"] !== undefined){
            left = req.query["left"]
            right = lanes - left
        }

        //Search if the track already exists in the Mongo DB or not
        mongoController.findTrack(track_id, type, lanes, left, right).then(value => {
            if (value !== null){
                data = value.Data
            }
            //If not then the track piece will be requested to be drawn by the Track Generator Controller
            else {
                if (req.query["left"] !== undefined) {
                    left = req.query["left"]
                    data = trackGeneratorController.drawTrackPiece(type, track_id, lanes, left, right)
                }
                else {
                    data = trackGeneratorController.drawTrackPiece(type, track_id, lanes)
                }
                //After creation the track will be saved in the Mongo DB for later use
                if (type === "junction"){
                    mongoController.createTrack(track_id, lanes, type, data, left, right)
                }
                else {
                    mongoController.createTrack(track_id, lanes, type, data, 0, 0)
                }
            }
            //Send the data back to the Frontend as a Buffer object
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': data.length
            });
            res.end(data);
        })
    })

    /**
     * REST-Route /Export for exporting the whole track as a single image
     */
    app.post("/export", parser, (req, res) => {
        let grid_items = req.body
        let rows = req.query["maxRows"]
        let cols = req.query["maxCols"]
        //Request the picture of the track from the Track Generator Controller
        let data = trackGeneratorController.drawImage(grid_items, rows, cols)
        //When the data is returned transform it into a Buffer object and send back to the Frontend
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

};
