import {describe, it, expect} from '@jest/globals';


describe("Publisher Helper Functions", () => {
    let emptyPublisher = {};
    let missingPublisherName = {
        name: "",
        ipi: "1234",
        pro: "BMAT"

    }
    let missingPublisherPro = {
        name: "JTMusic",
        ipi: "1234"
    }

    let missingPublisherIPI = {
        name: "JTMusic",
        ipi: "",
        pro: "ASCAP"

    }


    it("Should throw an exception if missing required fields for new publisher", () => {

    })


    it("Should throw an exception if missing required fields for edit publisher", () => {

    })







})