const {createCanvas, loadImage} = require('canvas')
const fs = require('fs')

const HEIGHT_IMAGE = 4292
const WIDTH_IMAGE = 4292

exports.drawStraightTrack = function drawStraightTrack(track_id, lanes) {
    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    //Calculate distance to outer part of the track
    let x = ((4292 - ((lanes * 90) + 80)) / 2)

    //x value where the first lane starts
    let start_x = WIDTH_IMAGE - x - 170

    console.log(x)
    console.log(start_x)

    let default_location_id_code_top = 0
    let default_location_id_code_middle = 1
    let default_location_id_code_bottom = 2

    //const track_id_code_zero_x = 48
    const track_id_code_zero_x = 67
    //const track_id_code_one_x = 44
    const track_id_code_one_x = 64
    //const location_id_code_zero_x = 80
    const location_id_code_zero_x = 99
    //const location_id_code_one_x = 78
    const location_id_code_one_x = 96

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Draw the inner Sideline
    ctx.fillRect(start_x + 154, 100, 16, 4092)
    ctx.fillRect(x, 100, 16, 4092)

    //Draw 2nd inner Sideline
    ctx.fillRect(start_x + 185, 100, 3, 4092)
    ctx.fillRect(x - 18, 100, 3, 4092)

    //Draw 3nd inner Sideline
    ctx.fillRect(start_x + 193, 100, 22, 4092)
    ctx.fillRect(x - 45, 100, 22, 4092)

    //Draw 3nd outer Sideline
    ctx.fillRect(start_x + 238, 100, 22, 4092)
    ctx.fillRect(x - 90, 100, 22, 4092)

    //Draw 2nd outer Sideline
    ctx.fillRect(start_x + 270, 100, 3, 4092)
    ctx.fillRect(x - 103, 100, 3, 4092)

    //Draw the outer Sideline
    ctx.fillRect(start_x + 278, 100, 20, 4092)
    ctx.fillRect(x - 128, 100, 20, 4092)

    //Draw 3 side line squares at the top
    ctx.fillRect(start_x + 180, 0, 80, 100)
    ctx.fillRect(x - 90, 0, 80, 100)

    ctx.fillRect(start_x + 270, 0, 28, 100)
    ctx.fillRect(x - 128, 0, 28, 100)

    //Draw 3 side line squares at the bottom
    ctx.fillRect(start_x + 180, HEIGHT_IMAGE - 100, 80, 100)
    ctx.fillRect(x - 90, HEIGHT_IMAGE - 100, 80, 100)

    ctx.fillRect(start_x + 270, HEIGHT_IMAGE - 100, 28, 100)
    ctx.fillRect(x - 128, HEIGHT_IMAGE - 100, 28, 100)


    for (let i = 0; i < lanes; i++) {

        let start_y_top_track = 436
        let start_y_top_location = 436
        let start_y_bottom_track = 2868
        let start_y_bottom_location = 2868
        let start_y_middle_track = 1652
        let start_y_middle_location = 1652

        let lane = i
        //Draw both squares at the top
        ctx.fillRect(start_x, 0, 80, 100)
        ctx.fillRect(start_x + 90, 0, 80, 100)
        //Draw both squares at the bottom
        ctx.fillRect(start_x, HEIGHT_IMAGE - 100, 80, 100)
        ctx.fillRect(start_x + 90, HEIGHT_IMAGE - 100, 80, 100)

        //Draw the line the car follows
        ctx.fillRect(start_x + 80, 100, 10, 4092)

        //Drawing the Code at the top that tells the car where the track starts or stops
        ctx.fillRect(start_x + 67, 132, 4, 76)
        ctx.fillRect(start_x + 96, 132, 16, 76)

        ctx.fillRect(start_x + 67, 284, 4, 76)
        ctx.fillRect(start_x + 96, 284, 16, 76)

        //Drawing the Code at the bottom that tells the car where the track starts or stops
        ctx.fillRect(start_x + 67, HEIGHT_IMAGE - 202, 4, 76)
        ctx.fillRect(start_x + 96, HEIGHT_IMAGE - 202, 16, 76)

        ctx.fillRect(start_x + 67, HEIGHT_IMAGE - 354, 4, 76)
        ctx.fillRect(start_x + 96, HEIGHT_IMAGE - 354, 16, 76)

        //Drawing the code in the middle that tells the car where the track starts or stops
        ctx.fillRect(start_x + 67, HEIGHT_IMAGE - ((15 * 76) + 436), 4, 76)
        ctx.fillRect(start_x + 96, HEIGHT_IMAGE - ((15 * 76) + 436), 16, 76)

        ctx.fillRect(start_x + 67, 15 * 76 + 360, 4, 76)
        ctx.fillRect(start_x + 96, 15 * 76 + 360, 16, 76)

        //Draw the track ids and locations ids for the track at the top
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x + track_id_code_one_x, start_y_top_track, 10, 76)
            } else {
                ctx.fillRect(start_x + track_id_code_zero_x, start_y_top_track, 4, 76)
            }

            start_y_top_track += 152
        }
        let location_code_top = default_location_id_code_top + (lane * 3)
        //let location_code_top = default_location_id_code_top + (3 * 3)
        let loc_binary_top = location_code_top.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_top[k] === '1') {
                ctx.fillRect(start_x + location_id_code_one_x, start_y_top_location, 10, 76)
            } else {
                ctx.fillRect(start_x + location_id_code_zero_x, start_y_top_location, 4, 76)
            }
            start_y_top_location += 152
        }

        //Draw the track ids and locations ids for the track in the middle
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x + track_id_code_one_x, start_y_middle_track, 10, 76)
            } else {
                ctx.fillRect(start_x + track_id_code_zero_x, start_y_middle_track, 4, 76)
            }
            start_y_middle_track += 152
        }
        let location_code_middle = default_location_id_code_middle + (lane * 3)
        //let location_code_middle = default_location_id_code_middle + (3 * 3)
        let loc_binary_middle = location_code_middle.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_middle[k] === '1') {
                ctx.fillRect(start_x + location_id_code_one_x, start_y_middle_location, 10, 76)
            } else {
                ctx.fillRect(start_x + location_id_code_zero_x, start_y_middle_location, 4, 76)
            }
            start_y_middle_location += 152
        }

        //Draw the track ids and locations ids for the track at the bottom
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x + track_id_code_one_x, start_y_bottom_track, 10, 76)
            } else {
                ctx.fillRect(start_x + track_id_code_zero_x, start_y_bottom_track, 4, 76)
            }
            start_y_bottom_track += 152
        }
        let location_code_bottom = default_location_id_code_bottom + (lane * 3)
        //let location_code_bottom = default_location_id_code_bottom + (3 * 3)
        let loc_binary_bottom = location_code_bottom.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_bottom[k] === '1') {
                ctx.fillRect(start_x + location_id_code_one_x, start_y_bottom_location, 10, 76)
            } else {
                ctx.fillRect(start_x + location_id_code_zero_x, start_y_bottom_location, 4, 76)
            }
            start_y_bottom_location += 152
        }


        ctx.drawImage(canvas, 0, 0)
        console.log("Finished Lane: " + lane)
        start_x -= 90
    }

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./straight_track_piece.png', buffer)
    console.log("Finished Drawing")
    return canvas
}

exports.drawIntersectiontTrack = function drawInterSectionTrack(lanes) {
    let track_id = 10
    let binary = track_id.toString(2).split("")
    //binary.reverse()
    console.log("Start Drawing Process")

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Calculate distance to outer part of the track
    let outer_distance = ((4292 - ((lanes * 90) + 80)) / 2)

    //x value where the first lane starts
    let start_val = WIDTH_IMAGE - outer_distance - 170

    //Distances for the different track and location codes
    const track_id_code_zero_x = 67
    const track_id_code_one_x = 64
    const location_id_code_zero_x = 99
    const location_id_code_one_x = 96

    //Distances for the different intersection codes
    //small
    const intersection_center_small = 83

    //big
    const intersection_center_big = 78

    for (let i = 0; i < lanes; i++) {

        let start_y_top = 132
        let start_x_top = 132
        let start_y_bottom = 4090
        let start_x_bottom = 4090

        let lane = i
        //Draw both squares at the top (2)
        ctx.fillRect(start_val, 0, 80, 100)
        ctx.fillRect(start_val + 90, 0, 80, 100)

        //Draw both squares at the bottom (1)
        ctx.fillRect(start_val, HEIGHT_IMAGE - 100, 80, 100)
        ctx.fillRect(start_val + 90, HEIGHT_IMAGE - 100, 80, 100)

        //Draw both squares on the left (4)
        ctx.fillRect(0, start_val, 100, 80)
        ctx.fillRect(0, start_val + 90, 100, 80)

        //Draw both squares on the right (3)
        ctx.fillRect(WIDTH_IMAGE - 100, start_val, 100, 80)
        ctx.fillRect(WIDTH_IMAGE - 100, start_val + 90, 100, 80)

        //Draw the lines at the top (2) for the car to follow
        ctx.fillRect(start_val + 80, 100, 10, 640)

        //Draw the lines at the bottom (1) for the car to follow
        ctx.fillRect(start_val + 80, HEIGHT_IMAGE - 740, 10, 640)

        //Draw the lines to the right (3) for the car to follow
        ctx.fillRect(100, start_val + 80, 640, 10)

        //Draw the lines to the left (4) for the car to follow
        ctx.fillRect(WIDTH_IMAGE - 740, start_val + 80, 640, 10)

        /**
         * Drawing the 3 codes at the bottom, that tell the car that the current track a intersection is
         */

        //Drawing the intersection code at the bottom
        ctx.fillRect(start_val + intersection_center_small, HEIGHT_IMAGE - 816, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 14, HEIGHT_IMAGE - 816, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 28, HEIGHT_IMAGE - 816, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 14, HEIGHT_IMAGE - 816, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 28, HEIGHT_IMAGE - 816, 4, 76)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(start_val + 80, HEIGHT_IMAGE - 892, 10, 76)

        //Drawing the intersection code in the middle
        ctx.fillRect(start_val + intersection_center_big, HEIGHT_IMAGE - 968, 12, 76)
        ctx.fillRect(start_val + intersection_center_big - 18, HEIGHT_IMAGE - 968, 12, 76)
        ctx.fillRect(start_val + intersection_center_big - 36, HEIGHT_IMAGE - 968, 12, 76)
        ctx.fillRect(start_val + intersection_center_big + 18, HEIGHT_IMAGE - 968, 12, 76)
        ctx.fillRect(start_val + intersection_center_big + 36, HEIGHT_IMAGE - 968, 12, 76)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(start_val + 80, HEIGHT_IMAGE - 1044, 10, 76)

        //Drawing the intersection code at the top
        ctx.fillRect(start_val + intersection_center_small, HEIGHT_IMAGE - 1120, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 14, HEIGHT_IMAGE - 1120, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 28, HEIGHT_IMAGE - 1120, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 14, HEIGHT_IMAGE - 1120, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 28, HEIGHT_IMAGE - 1120, 4, 76)

        /**
         * Drawing the 3 codes at the top, that tell the car that the current track a intersection is
         */

        //Drawing the intersection code at the bottom
        ctx.fillRect(start_val + intersection_center_small, 740, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 14, 740, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 28, 740, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 14, 740, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 28, 740, 4, 76)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(start_val + 80, 816, 10, 76)

        //Drawing the intersection code in the middle
        ctx.fillRect(start_val + intersection_center_big, 892, 14, 76)
        ctx.fillRect(start_val + intersection_center_big - 14, 892, 4, 76)
        ctx.fillRect(start_val + intersection_center_big - 28, 892, 4, 76)
        ctx.fillRect(start_val + intersection_center_big + 22, 892, 4, 76)
        ctx.fillRect(start_val + intersection_center_big + 36, 892, 4, 76)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(start_val + 80, 968, 10, 76)

        //Drawing the intersection code at the top
        ctx.fillRect(start_val + intersection_center_small, 1044, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 14, 1044, 4, 76)
        ctx.fillRect(start_val + intersection_center_small - 28, 1044, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 14, 1044, 4, 76)
        ctx.fillRect(start_val + intersection_center_small + 28, 1044, 4, 76)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(start_val + 79, 1120, 12, 2052)

        /**
         * Drawing the 3 codes on the right, that tell the car that the current track a intersection is
         */

        //Drawing the intersection code at the bottom
        ctx.fillRect(WIDTH_IMAGE - 816, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 816, start_val + intersection_center_small - 14, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 816, start_val + intersection_center_small - 28, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 816, start_val + intersection_center_small + 14, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 816, start_val + intersection_center_small + 28, 76, 4)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(WIDTH_IMAGE - 892, start_val + 80, 76, 10)

        //Drawing the intersection code in the middle
        ctx.fillRect(WIDTH_IMAGE - 968, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 968, start_val + intersection_center_big - 14, 76, 12)
        ctx.fillRect(WIDTH_IMAGE - 968, start_val + intersection_center_big - 32, 76, 12)
        ctx.fillRect(WIDTH_IMAGE - 968, start_val + intersection_center_big + 14, 76, 12)
        ctx.fillRect(WIDTH_IMAGE - 968, start_val + intersection_center_big + 32, 76, 12)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(WIDTH_IMAGE - 1044, start_val + 80, 76, 10)

        //Drawing the intersection code at the top
        ctx.fillRect(WIDTH_IMAGE - 1120, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 1120, start_val + intersection_center_small - 14, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 1120, start_val + intersection_center_small - 28, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 1120, start_val + intersection_center_small + 14, 76, 4)
        ctx.fillRect(WIDTH_IMAGE - 1120, start_val + intersection_center_small + 28, 76, 4)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(1120, start_val + 82, 2052, 6)

        /**
         * Drawing the 3 codes on the left, that tell the car that the current track a intersection is
         */

        //Drawing the intersection code at the bottom
        ctx.fillRect(740, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(740, start_val + intersection_center_small - 14, 76, 4)
        ctx.fillRect(740, start_val + intersection_center_small - 28, 76, 4)
        ctx.fillRect(740, start_val + intersection_center_small + 14, 76, 4)
        ctx.fillRect(740, start_val + intersection_center_small + 28, 76, 4)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(816, start_val + 80, 76, 10)

        //Drawing the intersection code in the middle
        ctx.fillRect(892, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(892, start_val + intersection_center_small - 14, 76, 4)
        ctx.fillRect(892, start_val + intersection_center_small - 28, 76, 4)
        ctx.fillRect(892, start_val + intersection_center_small + 14, 76, 4)
        ctx.fillRect(892, start_val + intersection_center_small + 28, 76, 4)

        //Drawing the connection line between the intersection codes
        ctx.fillRect(968, start_val + 80, 76, 10)

        //Drawing the intersection code at the top
        ctx.fillRect(1044, start_val + intersection_center_small, 76, 4)
        ctx.fillRect(1044, start_val + intersection_center_small - 14, 76, 4)
        ctx.fillRect(1044, start_val + intersection_center_small - 28, 76, 4)
        ctx.fillRect(1044, start_val + intersection_center_small + 14, 76, 4)
        ctx.fillRect(1044, start_val + intersection_center_small + 28, 76, 4)

        //Drawing the bottom (1) four lines of code for the car to read
        for (let i = 0; i < 4; i++) {
            if (binary[i] === "1") {
                ctx.fillRect(start_val + location_id_code_one_x, start_y_bottom, 10, 76)
            } else {
                ctx.fillRect(start_val + location_id_code_zero_x, start_y_bottom, 4, 76)
            }
            ctx.fillRect(start_val + track_id_code_zero_x, start_y_bottom, 4, 76)
            start_y_bottom -= 152
        }

        //Drawing the top (2) four lines of code for the car to read
        for (let i = 0; i < 4; i++) {
            if (binary[i] === "1") {
                ctx.fillRect(start_val + track_id_code_one_x, start_y_top, 10, 76)
            } else {
                ctx.fillRect(start_val + track_id_code_one_x, start_y_top, 4, 76)
            }
            ctx.fillRect(start_val + location_id_code_zero_x, start_y_top, 4, 76)
            start_y_top += 152
        }

        //Drawing the top four lines of code on the right (3) for the car to read
        for (let i = 0; i < 4; i++) {
            if (binary[i] === "1") {
                ctx.fillRect(start_x_bottom, start_val + track_id_code_one_x, 76, 10)
            } else {
                ctx.fillRect(start_x_bottom, start_val + track_id_code_zero_x, 76, 4)
            }
            //ctx.fillRect(start_x_bottom, start_val + track_id_code_zero_x, 76, 4)
            ctx.fillRect(start_x_bottom, start_val + location_id_code_zero_x, 76, 4)
            start_x_bottom -= 152
        }

        //Drawing the four lines of code on the left (4) for the car to read
        for (let i = 0; i < 4; i++) {
            if (binary[i] === "1") {
                ctx.fillRect(start_x_top, start_val + location_id_code_one_x, 76, 10)
            } else {
                ctx.fillRect(start_x_top, start_val + location_id_code_zero_x, 76, 4)
            }
            ctx.fillRect(start_x_top, start_val + location_id_code_zero_x, 76, 4)
            start_x_top += 152
        }


        ctx.drawImage(canvas, 0, 0)
        //console.log("Finished Lane: " + lane)
        start_val -= 90
    }

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./intersection_track_piece.png', buffer)
    console.log("Finished Drawing")
}

exports.drawCurveTrack = function drawCurveTrack(track_id, lanes) {

    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Define the start point of the arc in radiant
    let start = Math.PI * 3 / 2
    //Define the end point of the arc in radiant
    let end = 0
    //Calculate distance to outer part of the track
    let outer_distance = ((4292 - ((lanes * 90) + 80)) / 2)+85

    let loc_code_counter = -1

    //Draw the outlines on the left
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-135, end, end - ((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-135, start, start + ((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-70, end, start, true);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-89, end-((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-105, end, start, true);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-164, end, start, true);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-183, end-((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-200, end, start, true);
    ctx.stroke();

    for (let i=0; i<lanes; i++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference = (outer_distance * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = (76 / quarter_circumference)
        const code_length_rad = code_length_percent * Math.PI/2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference)
        const start_length_rad = start_length_percent * Math.PI/2

        //Start Position for the code pieces
        let start_code = start + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference - 190) / (76*1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes%8)

        amount_of_codes = Math.floor(amount_of_codes)

        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance, start, end, false);
        ctx.stroke();

        //Draw the codes the car reads for information
        for (let j = 0; j < amount_of_codes; j++) {

            //Get the binary string of the current location code
            let binary_loc = loc_code_counter.toString(2).split("")
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes>0){
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 16
                    ctx.arc(0, WIDTH_IMAGE, outer_distance-22, start_code, start_code + code_length_rad, false);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 4
                    ctx.arc(0, WIDTH_IMAGE, outer_distance+13, start_code, start_code + code_length_rad, false);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j%8)-1] === "1"){
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance-16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance-13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j%8)-1] === "1"){
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance+16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance+13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                }
            }
            else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.lineWidth = 16
                ctx.arc(0, WIDTH_IMAGE, outer_distance-22, start_code, start_code + code_length_rad, false);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4
                ctx.arc(0, WIDTH_IMAGE, outer_distance+13, start_code, start_code + code_length_rad, false);
                ctx.stroke();
            }
            start_code += code_length_rad * 1.7
            amount_of_nub_codes--
        }
        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance+45, end, end - start_length_rad, true);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance-45, end, end - start_length_rad, true);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance, end, end - start_length_rad, true);
        ctx.stroke();

        //Draw Squares at the Top

        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance+45, start, start + start_length_rad, false);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance-45, start, start + start_length_rad, false);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance, start, start + start_length_rad, false);
        ctx.stroke();

        //Iterate distance for next lane
        outer_distance += 90
    }

    //Draw the outlines on the right
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+45, end, end - ((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+45, start, start + ((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-20, end, start, true);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance-1, end-((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+15, end, start, true);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+74, end, start, true);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+93, end-((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance+110, end, start, true);
    ctx.stroke();
        /*

        #Save for documentation

        for (let i = 1; i < 8; i++) {

            let code_angle_beta = radianToDegree(start_code)
            let code_angle_alpha = 90 - code_angle_beta

            let code_dist_a_y = Math.round((WIDTH_IMAGE - (Math.sin(degreeToRadian(code_angle_beta)) * radius))*100)/100
            let code_dist_b_x = Math.round(((Math.sin(degreeToRadian(code_angle_alpha)) * radius))*100)/100

            //let code_dist_a_y = WIDTH_IMAGE - (Math.sin(degreeToRadian(code_angle_beta)) * radius)
            //let code_dist_b_x = (Math.sin(degreeToRadian(code_angle_alpha)) * radius)

            let code_dist_line_b_y = (Math.sin(degreeToRadian(code_angle_alpha))*16)
            let code_dist_line_a_x = (Math.sin(degreeToRadian(code_angle_beta))*16)

            //console.log("alpha: " + code_angle_alpha)
            //console.log("alpha_dist: " + code_dist_a_y)
            //console.log("beta: " + code_angle_beta)
            //console.log("beta_dist: " + code_dist_b_x)
            ctx.fillStyle = "black"

            let cx = ((code_dist_b_x-38) + 0.5 * 76)
            let cy = ((code_dist_a_y) + 0.5 * 4)

            let code_right_width = 4
            let code_right_zero_distance = 16
            let code_right_2_distance = 16

            if (i%7 === 0){
                code_right_width = 16
            }

            ctx.save()
            //ctx.translate( x+width/2, y+height/2 );
            ctx.translate( cx, cy);

            ctx.rotate(degreeToRadian(code_angle_alpha));

            ctx.translate(-((code_dist_b_x) + 0.5 * 76), -cy)

            ctx.fillRect( code_dist_b_x , code_dist_a_y-16, 76, 4);
            ctx.fillRect( code_dist_b_x , code_dist_a_y+16, 76, 4);

            console.log(code_dist_line_b_y)
            console.log(code_dist_line_a_x)

            ctx.restore()

            //ctx.fillRect(0, 0, width,height);

            //drawRotatedRect(ctx, code_dist_b_x, code_dist_a_y, 76, 4, code_dist_line_a_x, code_dist_line_b_y, code_angle_alpha)
            //ctx.fillRect(code_dist_b_x, code_dist_a_y, 76, 4)

            start_code += (Math.PI * code_length_percent)
        }

         */

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //const buffer = canvas.toBuffer('image/png')
    //fs.writeFileSync('./curve_track_piece.png', buffer)
    console.log("Finished Drawing")

    return canvas.toDataURL()
}

exports.drawJunctionTrack = function drawJunctionTrack(track_id, lanes, left, right){

    right = lanes - left

    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Define the start point of the arc in radiant
    let start = Math.PI * 3 / 2
    //Define the end point of the left arc in radiant
    let end_left = 0
    //Define the end point of the right arc in radiant
    let end_right = Math.PI

    //Calculate distance to outer part of the track
    let outer_distance_right = ((4292 - ((lanes * 90) + 80)) / 2)+85
    let outer_distance_left = outer_distance_right

    let loc_code_counter = -1

    //Draw the outlines on the left
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-135, end_left, end_left - ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-135, start, start + ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-70, end_left, start, true);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-89, end_left-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-105, end_left, start, true);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-164, end_left, start, true);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-183, end_left-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-200, end_left, start, true);
    ctx.stroke();

    //Draw the outlines on the right
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-135, end_right, end_right + ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-135, start, start - ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-70, end_right, start, false);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-89, end_right+((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), start-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-105, end_right, start, false);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-164, end_right, start, false);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-183, end_right+((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), start-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-200, end_right, start, false);
    ctx.stroke();

    for (let i=0; i<left; i++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference_left = (outer_distance_left * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = (76 / quarter_circumference_left)
        const code_length_rad = code_length_percent * Math.PI/2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference_left)
        const start_length_rad = start_length_percent * Math.PI/2

        //Start Position for the code pieces
        let start_code = start + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference_left - 190) / (76*1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes%8)

        amount_of_codes = Math.floor(amount_of_codes)

        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, start, end_left, false);
        ctx.stroke();

        for (let j = 0; j < amount_of_codes; j++) {

            //Get the binary string of the current location code
            let binary_loc = loc_code_counter.toString(2).split("")
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes>0){
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 16
                    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-22, start_code, start_code + code_length_rad, false);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 4
                    ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j%8)-1] === "1"){
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j%8)-1] === "1"){
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                }
            }
            else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.lineWidth = 16
                ctx.arc(0, WIDTH_IMAGE, outer_distance_left-22, start_code, start_code + code_length_rad, false);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4
                ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                ctx.stroke();
            }
            start_code += code_length_rad * 1.7
            amount_of_nub_codes--
        }

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-45, end_left, end_left - start_length_rad, true);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, end_left, end_left - start_length_rad, true);
        ctx.stroke();

        //Draw Squares at the Top

        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+45, start, start + start_length_rad, false);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-45, start, start + start_length_rad, false);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, start, start + start_length_rad, false);
        ctx.stroke();
        //Iterate distance for next lane
        outer_distance_left += 90
    }
        //Todo Workaround
        outer_distance_left -= 90
        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 40
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+25, end_left, end_left - ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
        ctx.stroke();



    for (let j=0; j<right; j++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference_right = (outer_distance_right * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = 76 / quarter_circumference_right
        const code_length_rad = code_length_percent * Math.PI/2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference_right)
        const start_length_rad = start_length_percent * Math.PI/2

        //Start Position for the code pieces
        let start_code = end_right + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference_right - 190) / (76*1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes%8)

        amount_of_codes = Math.floor(amount_of_codes)
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, end_right, start, false);
        ctx.stroke();


        //Draw the codes the car reads for information
        for (let j = 0; j < amount_of_codes; j++) {

            //Get the binary string of the current location code
            let binary_loc = loc_code_counter.toString(2).split("")
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes>0){
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 16
                    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-22, start_code, start_code + code_length_rad, false);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 4
                    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j%8)-1] === "1"){
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j%8)-1] === "1"){
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                }
            }
            else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.lineWidth = 16
                ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-22, start_code, start_code + code_length_rad, false);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4
                ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                ctx.stroke();
            }
            start_code += code_length_rad * 1.7
            amount_of_nub_codes--
        }
        //Draw Squares at the Bottom
        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-45, end_right, end_right + start_length_rad, false);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, end_right, end_right + start_length_rad, false);
        ctx.stroke();

        //Draw Squares at the Top
        //Draw Squares at the Top

        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+45, start, start - start_length_rad, true);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-45, start, start - start_length_rad, true);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, start, start - start_length_rad, true);
        ctx.stroke();

        //Iterate distance for next lane
        outer_distance_right += 90
    }
    //Todo Workaround
    outer_distance_right -= 90
    //Left Side
    ctx.beginPath();
    ctx.lineWidth = 40
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, WIDTH_IMAGE, outer_distance_right+25, end_right, end_right + ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), false);
    ctx.stroke();

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //const buffer = canvas.toBuffer('image/png')
    //fs.writeFileSync('./junction_track_piece.png', buffer)
    console.log("Finished Drawing")
    return canvas.toDataURL()
}

exports.drawJunctionWithStraightTrack = function drawJunctionWithStraight(track_id, lanes, left, middle, right) {

    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Define the start point of the arc in radiant
    let start = Math.PI * 3 / 2
    //Define the end point of the left arc in radiant
    let end_left = 0
    //Define the end point of the right arc in radiant
    let end_right = Math.PI

    //Calculate distance to outer part of the track
    let outer_distance_right = ((4292 - ((lanes * 90) + 80)) / 2)+85
    let outer_distance_left = outer_distance_right

    let loc_code_counter = -1

    //Draw the outlines on the left
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-135, end_left, end_left - ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-135, start, start + ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-70, end_left, start, true);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-89, end_left-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-105, end_left, start, true);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-164, end_left, start, true);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-183, end_left-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), start+((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-200, end_left, start, true);
    ctx.stroke();

    //Draw the outlines on the right
    //Draw outer square at the bottom
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-135, end_right, end_right + ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw outer square at the top
    ctx.beginPath();
    ctx.lineWidth = 80
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-135, start, start - ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-70, end_right, start, false);
    ctx.stroke();

    //Draw 2nd inner outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-89, end_right+((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), start-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), false);
    ctx.stroke();

    //Draw 3th inner outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-105, end_right, start, false);
    ctx.stroke();

    //Draw 3th outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-164, end_right, start, false);
    ctx.stroke();

    //Draw 2nd outer outline
    ctx.beginPath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-183, end_right+((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), start-((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    //Draw the outer outline
    ctx.beginPath();
    ctx.lineWidth = 23
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-200, end_right, start, false);
    ctx.stroke();

    for (let i=0; i<left; i++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference_left = (outer_distance_left * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = (76 / quarter_circumference_left)
        const code_length_rad = code_length_percent * Math.PI/2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference_left)
        const start_length_rad = start_length_percent * Math.PI/2

        //Start Position for the code pieces
        let start_code = start + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference_left - 190) / (76*1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes%8)

        amount_of_codes = Math.floor(amount_of_codes)

        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, start, end_left, false);
        ctx.stroke();

        for (let j = 0; j < amount_of_codes; j++) {

            //Get the binary string of the current location code
            let binary_loc = loc_code_counter.toString(2).split("")
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes>0){
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 16
                    ctx.arc(0, WIDTH_IMAGE, outer_distance_left-22, start_code, start_code + code_length_rad, false);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 4
                    ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j%8)-1] === "1"){
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j%8)-1] === "1"){
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                }
            }
            else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.lineWidth = 16
                ctx.arc(0, WIDTH_IMAGE, outer_distance_left-22, start_code, start_code + code_length_rad, false);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4
                ctx.arc(0, WIDTH_IMAGE, outer_distance_left+13, start_code, start_code + code_length_rad, false);
                ctx.stroke();
            }
            start_code += code_length_rad * 1.7
            amount_of_nub_codes--
        }

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-45, end_left, end_left - start_length_rad, true);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, end_left, end_left - start_length_rad, true);
        ctx.stroke();

        //Draw Squares at the Top

        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left+45, start, start + start_length_rad, false);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left-45, start, start + start_length_rad, false);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(0, WIDTH_IMAGE, outer_distance_left, start, start + start_length_rad, false);
        ctx.stroke();
        //Iterate distance for next lane
        outer_distance_left += 90
    }

    let outer_distance_middle = outer_distance_left

    //Todo Workaround
    outer_distance_left -= 90
    //Right Side
    ctx.beginPath();
    ctx.lineWidth = 40
    ctx.strokeStyle = 'black'
    ctx.arc(0, WIDTH_IMAGE, outer_distance_left+25, end_left, end_left - ((Math.PI/2)*(100/((outer_distance_left * Math.PI) / 2))), true);
    ctx.stroke();

    for (let i=0; i<middle; i++){

    }

    for (let j=0; j<right; j++) {

        //Calculate the circumference of the whole circle
        const quarter_circumference_right = (outer_distance_right * Math.PI) / 2

        //Percentage length of the code piece
        const code_length_percent = 76 / quarter_circumference_right
        const code_length_rad = code_length_percent * Math.PI/2

        //Percentage length of the squares at the beginning and in the end
        const start_length_percent = (100 / quarter_circumference_right)
        const start_length_rad = start_length_percent * Math.PI/2

        //Start Position for the code pieces
        let start_code = end_right + code_length_rad * 1.8

        //Calculate how many codes will fit on the arc
        let amount_of_codes = (quarter_circumference_right - 190) / (76*1.7)

        //Calculate how many numbered codes will be on the arc
        let amount_of_nub_codes = amount_of_codes - (amount_of_codes%8)

        amount_of_codes = Math.floor(amount_of_codes)
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, end_right, start, false);
        ctx.stroke();


        //Draw the codes the car reads for information
        for (let j = 0; j < amount_of_codes; j++) {

            //Get the binary string of the current location code
            let binary_loc = loc_code_counter.toString(2).split("")
            binary_loc.reverse()

            //When the max amount of codes that carry information is drawn the rest of the codes will be drawn as the extra thick code, which signal the end of a section
            if (amount_of_nub_codes>0){
                //Every 8th code will signal the end of the 7 Bit long array
                if (j % 8 === 0) {
                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 16
                    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-22, start_code, start_code + code_length_rad, false);
                    ctx.stroke();

                    //Draw the code that signals the car that a new section begins
                    ctx.beginPath();
                    ctx.lineWidth = 4
                    ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                    ctx.stroke();
                    loc_code_counter++
                } else {
                    //Drawing the location ID code
                    if (binary_loc[(j%8)-1] === "1"){
                        //Draw the location code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw the location code for the binary value zero
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    //Drawing the track ID Code
                    if (binary[(j%8)-1] === "1"){
                        //draw the track id code for the binary value one
                        ctx.beginPath();
                        ctx.lineWidth = 10
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+16, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                    else {
                        //Draw code at the side of the arc that the car follows
                        ctx.beginPath();
                        ctx.lineWidth = 4
                        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                        ctx.stroke();
                    }
                }
            }
            else {
                //Draw code at the side of the arc that the car follows
                ctx.beginPath();
                ctx.lineWidth = 16
                ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-22, start_code, start_code + code_length_rad, false);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4
                ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+13, start_code, start_code + code_length_rad, false);
                ctx.stroke();
            }
            start_code += code_length_rad * 1.7
            amount_of_nub_codes--
        }
        //Draw Squares at the Bottom
        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-45, end_right, end_right + start_length_rad, false);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, end_right, end_right + start_length_rad, false);
        ctx.stroke();

        //Draw Squares at the Top
        //Draw Squares at the Top

        //Right Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right+45, start, start - start_length_rad, true);
        ctx.stroke();

        //Left Side
        ctx.beginPath();
        ctx.lineWidth = 80
        ctx.strokeStyle = 'black'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right-45, start, start - start_length_rad, true);
        ctx.stroke();

        //Middle
        //Draw arc the car follows
        ctx.beginPath();
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.arc(WIDTH_IMAGE, HEIGHT_IMAGE, outer_distance_right, start, start - start_length_rad, true);
        ctx.stroke();

        //Iterate distance for next lane
        outer_distance_right += 90
    }
    //Todo Workaround
    outer_distance_right -= 90
    //Left Side
    ctx.beginPath();
    ctx.lineWidth = 40
    ctx.strokeStyle = 'black'
    ctx.arc(WIDTH_IMAGE, WIDTH_IMAGE, outer_distance_right+25, end_right, end_right + ((Math.PI/2)*(100/((outer_distance_right * Math.PI) / 2))), false);
    ctx.stroke();

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./junction_with_straight_track_piece.png', buffer)
    console.log("Finished Drawing")
}

function radianToDegree(radian) {
    return radian * (180 / Math.PI)
}

function degreeToRadian(degree) {
    return degree * (Math.PI / 180)
}

function drawRotatedRect(ctx, x, y, width, height, moveX, moveY, degrees){

    // first save the untranslated/unrotated context
    ctx.save();

    //ctx.translate( x+width/2, y+height/2 );
    ctx.translate( x, y);

    ctx.rotate(degrees*Math.PI/180);

    ctx.fillRect( 0, 0, 76, 4);
    //ctx.fillRect(0, 0, width,height);

    // restore the context to its untranslated/unrotated state
    ctx.restore();

}


