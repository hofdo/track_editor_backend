const {createCanvas, loadImage} = require('canvas')
const fs = require('fs')

const HEIGHT_IMAGE = 2146
const WIDTH_IMAGE = 2146

const track_id_code_zero_x = 24
const track_id_code_one_x = 22
const location_id_code_zero_x = 40
const location_id_code_one_x = 39

drawTrack(15, 4)

function drawTrack(track_id, lanes) {
    let binary = track_id.toString(2).split("")
    binary.reverse()

    let x = ((2146-((lanes*35)+31))/2)
    console.log(x)
    let start_x = WIDTH_IMAGE - x

    let default_location_id_code_top = 0
    let default_location_id_code_middle = 1
    let default_location_id_code_bottom = 2

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    for (let i = 0; i<lanes; i++){

        let start_y_top_track = 218
        let start_y_top_location = 218
        let start_y_bottom_track = 1434
        let start_y_bottom_location = 1434
        let start_y_middle_track = 826
        let start_y_middle_location = 826

        let lane=i
        //Draw both squares at the top
        ctx.fillRect(start_x, 0, 31, 35)
        ctx.fillRect(start_x+35, 0, 31, 35)
        //Draw both squares at the bottom
        ctx.fillRect(start_x, HEIGHT_IMAGE - 35, 31, 35)
        ctx.fillRect(start_x+35, HEIGHT_IMAGE - 35, 31, 35)


        //Draw the line the car follows
        ctx.fillRect(start_x+31, 35, 4, 2076)

        //Drawing the Code at the top that tells the car where the track starts or stops
        ctx.fillRect(start_x+24, 66, 2, 38)
        ctx.fillRect(start_x+38, 66, 7, 38)

        ctx.fillRect(start_x+24, 142, 2, 38)
        ctx.fillRect(start_x+38, 142, 7, 38)

        //Drawing the Code at the bottom that tells the car where the track starts or stops
        ctx.fillRect(start_x+24, HEIGHT_IMAGE - 101, 2, 38)
        ctx.fillRect(start_x+38, HEIGHT_IMAGE - 101, 7, 38)

        ctx.fillRect(start_x+24, HEIGHT_IMAGE - 177, 2, 38)
        ctx.fillRect(start_x+38, HEIGHT_IMAGE - 177, 7, 38)

        //Drawing the code in the middle that tells the car where the track starts or stops
        ctx.fillRect(start_x+24, HEIGHT_IMAGE - ((15 * 38) + 218), 2, 38)
        ctx.fillRect(start_x+38, HEIGHT_IMAGE - ((15 * 38) + 218), 7, 38)

        ctx.fillRect(start_x+24, 15 * 38 + 180, 2, 38)
        ctx.fillRect(start_x+38, 15 * 38 + 180, 5, 38)

        //Draw the track ids and locations ids for the track at the top
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_top_track, 5, 38)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_top_track, 2, 38)
            }

            start_y_top_track += 76
        }
        let location_code_top = default_location_id_code_top + (lane * 3)
        //let location_code_top = default_location_id_code_top + (3 * 3)
        let loc_binary_top = location_code_top.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_top[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_top_location, 5, 38)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_top_location, 2, 38)
            }
            start_y_top_location += 76
        }

        //Draw the track ids and locations ids for the track in the middle
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_middle_track, 5, 38)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_middle_track, 2, 38)
            }
            start_y_middle_track += 76
        }
        let location_code_middle = default_location_id_code_middle + (lane * 3)
        //let location_code_middle = default_location_id_code_middle + (3 * 3)
        let loc_binary_middle = location_code_middle.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_middle[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_middle_location, 5, 38)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_middle_location, 2, 38)
            }
            start_y_middle_location += 76
        }

        //Draw the track ids and locations ids for the track at the bottom
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_bottom_track, 5, 38)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_bottom_track, 2, 38)
            }
            start_y_bottom_track += 76
        }
        let location_code_bottom = default_location_id_code_bottom + (lane * 3)
        //let location_code_bottom = default_location_id_code_bottom + (3 * 3)
        let loc_binary_bottom = location_code_bottom.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_bottom[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_bottom_location, 5, 38)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_bottom_location, 2, 38)
            }
            start_y_bottom_location += 76
        }
        ctx.drawImage(canvas, 0, 0)
        start_x -= 35
    }
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./lane.png', buffer)
    return canvas
}

