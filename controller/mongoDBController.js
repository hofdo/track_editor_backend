/**
 * MongoDB Controller
 */

let mongoose = require("mongoose")

//Import the track piece schema
let track = require('../api/models/track_piece_model')

/**
 * This function adds a track piece to the MongoDB Database
 * @param track_id: The track id of the track piece
 * @param lanes: The amount of lanes the track piece has
 * @param type: The type of track piece
 * @param data: The Buffer data of the track piece
 * @param left: This parameter is for the junction only. It defines the amount of lanes on the left side
 * @param right: This parameter is for the junction only. It defines the amount of lanes on the right side
 * @returns {Promise<Document<any, any>>}
 */
exports.createTrack = function (track_id, lanes, type, data, left, right) {
    let new_track
    if (type === "junction"){
        new_track = new track({
            track_id: track_id, lanes: lanes, type: type, Data: data, left: left, right: right
        })
    }
    else {
        new_track = new track({
            track_id: track_id, lanes: lanes, type: type, Data: data
        })
    }
    return new_track.save()
}

/**
 * This function searches the Database for a existing track piece based on the parameters
 * @param track_id: Track id of the track piece
 * @param type: The type of the track piece
 * @param lanes: The amount of lanes the car has
 * @param left: This parameter is for the junction only. It defines the amount of lanes on the left side
 * @param right: This parameter is for the junction only. It defines the amount of lanes on the right side
 * @returns {Promise<Document<any, any> | null>}
 */
exports.findTrack = function (track_id, type, lanes, left, right){
    if (type === "junction"){
        return track.findOne({track_id: track_id, type: type, lanes: lanes, left: left, right: right}).exec()
    }
    else {
        return track.findOne({track_id: track_id, type: type, lanes: lanes}).exec()
    }
}
