const {createCanvas, loadImage} = require('canvas')
const fs = require('fs')

const HEIGHT_IMAGE = 4292
const WIDTH_IMAGE = 4292

//drawStraightTrack(127, 25)
drawInterSectionTrack(16)

function drawStraightTrack(track_id, lanes) {
    let binary = track_id.toString(2).split("")
    binary.reverse()
    console.log("Start Drawing Process")

    //Calculate distance to outer part of the track
    let x = ((4292-((lanes*90)+80))/2)

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
    ctx.fillRect(start_x+154, 100, 16, 4092)
    ctx.fillRect(x, 100, 16, 4092)

    //Draw 2nd inner Sideline
    ctx.fillRect(start_x+185, 100, 3, 4092)
    ctx.fillRect(x-18, 100, 3, 4092)

    //Draw 3nd inner Sideline
    ctx.fillRect(start_x+193, 100, 22, 4092)
    ctx.fillRect(x-45, 100, 22, 4092)

    //Draw 3nd outer Sideline
    ctx.fillRect(start_x+238, 100, 22, 4092)
    ctx.fillRect(x-90, 100, 22, 4092)

    //Draw 2nd outer Sideline
    ctx.fillRect(start_x+270, 100, 3, 4092)
    ctx.fillRect(x-103, 100, 3, 4092)

    //Draw the outer Sideline
    ctx.fillRect(start_x+278, 100, 20, 4092)
    ctx.fillRect(x-128, 100, 20, 4092)

    //Draw 3 side line squares at the top
    ctx.fillRect(start_x+180, 0, 80, 100)
    ctx.fillRect(x-90, 0, 80, 100)

    ctx.fillRect(start_x+270, 0, 28, 100)
    ctx.fillRect(x-128, 0, 28, 100)

    //Draw 3 side line squares at the bottom
    ctx.fillRect(start_x+180, HEIGHT_IMAGE-100, 80, 100)
    ctx.fillRect(x-90, HEIGHT_IMAGE-100, 80, 100)

    ctx.fillRect(start_x+270, HEIGHT_IMAGE-100, 28, 100)
    ctx.fillRect(x-128, HEIGHT_IMAGE-100, 28, 100)



    for (let i = 0; i<lanes; i++){

        let start_y_top_track = 436
        let start_y_top_location = 436
        let start_y_bottom_track = 2868
        let start_y_bottom_location = 2868
        let start_y_middle_track = 1652
        let start_y_middle_location = 1652

        let lane=i
        //Draw both squares at the top
        ctx.fillRect(start_x, 0, 80, 100)
        ctx.fillRect(start_x+90, 0, 80, 100)
        //Draw both squares at the bottom
        ctx.fillRect(start_x, HEIGHT_IMAGE - 100, 80, 100)
        ctx.fillRect(start_x+90, HEIGHT_IMAGE - 100, 80, 100)

        //Draw the line the car follows
        ctx.fillRect(start_x+80, 100, 10, 4092)

        //Drawing the Code at the top that tells the car where the track starts or stops
        ctx.fillRect(start_x+67, 132, 4, 76)
        ctx.fillRect(start_x+96, 132, 16, 76)

        ctx.fillRect(start_x+67, 284, 4, 76)
        ctx.fillRect(start_x+96, 284, 16, 76)

        //Drawing the Code at the bottom that tells the car where the track starts or stops
        ctx.fillRect(start_x+67, HEIGHT_IMAGE - 202, 4, 76)
        ctx.fillRect(start_x+96, HEIGHT_IMAGE - 202, 16, 76)

        ctx.fillRect(start_x+67, HEIGHT_IMAGE - 354, 4, 76)
        ctx.fillRect(start_x+96, HEIGHT_IMAGE - 354, 16, 76)

        //Drawing the code in the middle that tells the car where the track starts or stops
        ctx.fillRect(start_x+67, HEIGHT_IMAGE - ((15 * 76) + 436), 4, 76)
        ctx.fillRect(start_x+96, HEIGHT_IMAGE - ((15 * 76) + 436), 16, 76)

        ctx.fillRect(start_x+67, 15 * 76 + 360, 4, 76)
        ctx.fillRect(start_x+96, 15 * 76 + 360, 16, 76)

        //Draw the track ids and locations ids for the track at the top
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_top_track, 10, 76)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_top_track, 4, 76)
            }

            start_y_top_track += 152
        }
        let location_code_top = default_location_id_code_top + (lane * 3)
        //let location_code_top = default_location_id_code_top + (3 * 3)
        let loc_binary_top = location_code_top.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_top[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_top_location, 10, 76)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_top_location, 4, 76)
            }
            start_y_top_location += 152
        }

        //Draw the track ids and locations ids for the track in the middle
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_middle_track, 10, 76)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_middle_track, 4, 76)
            }
            start_y_middle_track += 152
        }
        let location_code_middle = default_location_id_code_middle + (lane * 3)
        //let location_code_middle = default_location_id_code_middle + (3 * 3)
        let loc_binary_middle = location_code_middle.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_middle[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_middle_location, 10, 76)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_middle_location, 4, 76)
            }
            start_y_middle_location += 152
        }

        //Draw the track ids and locations ids for the track at the bottom
        for (let k = 6; k >= 0; k--) {
            if (binary[k] === '1') {
                ctx.fillRect(start_x+track_id_code_one_x, start_y_bottom_track, 10, 76)
            } else {
                ctx.fillRect(start_x+track_id_code_zero_x, start_y_bottom_track, 4, 76)
            }
            start_y_bottom_track += 152
        }
        let location_code_bottom = default_location_id_code_bottom + (lane * 3)
        //let location_code_bottom = default_location_id_code_bottom + (3 * 3)
        let loc_binary_bottom = location_code_bottom.toString(2).split("").reverse()
        for (let k = 6; k >= 0; k--) {
            if (loc_binary_bottom[k] === '1') {
                ctx.fillRect(start_x+location_id_code_one_x, start_y_bottom_location, 10, 76)
            } else {
                ctx.fillRect(start_x+location_id_code_zero_x, start_y_bottom_location, 4, 76)
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
    fs.writeFileSync('./lane.png', buffer)
    console.log("Finished Drawing")
    return canvas
}

function drawInterSectionTrack(lanes) {
    let canvas = createCanvas(WIDTH_IMAGE, HEIGHT_IMAGE)
    let ctx = canvas.getContext('2d')

    //Calculate distance to outer part of the track
    let outer_distance = ((4292-((lanes*90)+80))/2)

    //x value where the first lane starts
    let start_val = WIDTH_IMAGE - outer_distance - 170

    //const track_id_code_zero_x = 48
    const track_id_code_zero_x = 67
    //const track_id_code_one_x = 44
    const track_id_code_one_x = 64
    //const location_id_code_zero_x = 80
    const location_id_code_zero_x = 99
    //const location_id_code_one_x = 78
    const location_id_code_one_x = 96

    for (let i = 0; i<lanes; i++){

        let start_y_top_track = 132
        let start_y_top_location = 132
        let start_y_bottom_track = 4090
        let start_y_bottom_location = 4090

        let lane=i
        //Draw both squares at the top (2)
        ctx.fillRect(start_val, 0, 80, 100)
        ctx.fillRect(start_val+90, 0, 80, 100)

        //Draw both squares at the bottom (1)
        ctx.fillRect(start_val, HEIGHT_IMAGE - 100, 80, 100)
        ctx.fillRect(start_val+90, HEIGHT_IMAGE - 100, 80, 100)

        //Draw both squares on the left (4)
        ctx.fillRect(0, start_val, 100, 80)
        ctx.fillRect(0, start_val+90, 100, 80)

        //Draw both squares on the right (3)
        ctx.fillRect(WIDTH_IMAGE-100, start_val, 100, 80)
        ctx.fillRect(WIDTH_IMAGE-100, start_val+90, 100, 80)


        //Draw the lines at the top (2) for the car to follow
        ctx.fillRect(start_val+80, 100, 10, 640)

        //Draw the lines at the bottom (1) for the car to follow
        ctx.fillRect(start_val+80, HEIGHT_IMAGE - 740, 10, 640)

        //Draw the lines to the right (3) for the car to follow
        ctx.fillRect(100, start_val+80, 640, 10)

        //Draw the lines to the left (4) for the car to follow
        ctx.fillRect(WIDTH_IMAGE-740, start_val+80, 640, 10)

        //Drawing the top (1) four lines of code for the car to read
        for (let i=0; i<4; i++){
            ctx.fillRect(start_val+track_id_code_zero_x, start_y_top_track, 4, 76)
            ctx.fillRect(start_val+location_id_code_zero_x, start_y_top_track, 4, 76)
            start_y_top_track += 152
            start_y_top_location += 152
        }

        //Drawing the top (2) four lines of code for the car to read
        for (let i=0; i<4; i++){
            ctx.fillRect(start_val+track_id_code_zero_x, start_y_bottom_track, 4, 76)
            ctx.fillRect(start_val+location_id_code_zero_x, start_y_bottom_location, 4, 76)
            start_y_bottom_track -= 152
            start_y_bottom_location -= 152
        }

        //Drawing the four lines of code on the right (3) for the car to read
        for (let i=0; i<4; i++){
            ctx.fillRect(start_val+track_id_code_zero_x, start_y_top_track, 4, 76)
            ctx.fillRect(start_val+location_id_code_zero_x, start_y_top_track, 4, 76)
            start_y_top_track += 152
            start_y_top_location += 152
        }

        //Drawing the top four lines of code on the left (4) for the car to read
        for (let i=0; i<4; i++){
            ctx.fillRect(start_val+track_id_code_zero_x, start_y_bottom_track, 4, 76)
            ctx.fillRect(start_val+location_id_code_zero_x, start_y_bottom_location, 4, 76)
            start_y_bottom_track -= 152
            start_y_bottom_location -= 152
        }


        ctx.drawImage(canvas, 0, 0)
        console.log("Finished Lane: " + lane)
        start_val -= 90
    }

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./lane.png', buffer)
    console.log("Finished Drawing")
}

