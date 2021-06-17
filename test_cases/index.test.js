let trackGeneratorController = require('../controller/imageGeneratorController')
let mongoDBController = require('../controller/mongoDBController')
const assert = require('assert').strict;
const chai = require('chai')
const expect = chai.expect

describe("Test track piece generation", function () {
    this.timeout(15000)
    it('should generate straight track piece', function () {
        let data = trackGeneratorController.drawTrackPiece("straight", 20, 15)
        assert.equal(Buffer.isBuffer(data), true)
        expect(data.length).to.be.greaterThan(1)
    });

    it('should generate curve track piece', function () {
        let data = trackGeneratorController.drawTrackPiece("curve", 20, 15)
        assert.equal(Buffer.isBuffer(data), true)
        expect(data.length).to.be.greaterThan(1)
    });

    it('should generate intersection', function () {
        let data = trackGeneratorController.drawTrackPiece("intersection", 0, 15)
        assert.equal(Buffer.isBuffer(data), true)
        expect(data.length).to.be.greaterThan(1)
    });

    it('should generate junction track', function () {
        let data = trackGeneratorController.drawTrackPiece("junction", 20, 15, 10, 5)
        assert.equal(Buffer.isBuffer(data), true)
        expect(data.length).to.be.greaterThan(1)
    });
})

