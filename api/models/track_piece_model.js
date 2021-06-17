/**
 * Schema for the MongoDB
 */

//Import Mongo DB Module
let mongoose = require("mongoose")

//Define the schema for the track for the MongoDB
const track_schema = new mongoose.Schema({
    track_id: String,
    lanes: String,
    type: String,
    left: String,
    right: String,
    Data: Buffer
})

module.exports = mongoose.model("Track", track_schema)
