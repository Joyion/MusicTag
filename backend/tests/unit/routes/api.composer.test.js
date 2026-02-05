import {describe, it, expect} from '@jest/globals';
import { validateEditableComposerFields, validateRequiredComposerFields } from '../../../routes/api.helper.js';
import CustomError from "../../../customError.js"

describe("Composer Helper Functions", () => {
    const missingAllFields = {};
    const onlyLastName = { lName: "Doe" };
    const onlyFirstName = { fName: "John" };
    const onlyNames = { fName: "John", lName: "Doe", };
    const missingCAE = { fName: "John", lName: "Doe", pro: "BMAT" };
    const missingPRO = { fName: "John", lName: "Doe", cae: "1234567890`" };
    const correctFields = { fName: "John", lName: "Doe", cae: "1234567890", pro: "BMAT" };
    const correctAllFields = { fName: "John", mName: "Abe", lName: "Doe", suffix: "JR", cae: "1234567890", pro: "BMAT" };
    const correctAllFieldsWithExtra = { ...correctAllFields, extraField: "extra" };
   
    it("Should throw an exception if required fields for a new composer are not provided", () => {

    let data = validateRequiredComposerFields(correctFields);
    expect(data).toEqual(correctFields);
    data = validateRequiredComposerFields(correctAllFields);
    expect(data).toEqual(correctAllFields);
    data = validateRequiredComposerFields(correctAllFieldsWithExtra);
    expect(data).toEqual(correctAllFields);

    expect(() => validateRequiredComposerFields(missingAllFields)).toThrow(expect.objectContaining({
                message: "First name is required",
                statusCode: 400
            }));

    expect(() => validateRequiredComposerFields(onlyLastName)).toThrow(
        expect.objectContaining({
            message: "First name is required",
            statusCode: 400
        })
    );
    expect(() => validateRequiredComposerFields(onlyFirstName)).toThrow(
        expect.objectContaining({
            message: "Last name is required",
            statusCode: 400
        })  
    );
    expect(() => validateRequiredComposerFields(onlyNames)).toThrow(
        expect.objectContaining({
            message: "CAE and PRO are required",
            statusCode: 400
        })
    );
    expect(() => validateRequiredComposerFields(missingCAE)).toThrow(
        expect.objectContaining({
            message: "CAE and PRO are required",
            statusCode: 400
        })
    );
    expect(() => validateRequiredComposerFields(missingPRO)).toThrow(
        expect.objectContaining({
            message: "CAE and PRO are required",
            statusCode: 400
        })
    );
    });

    
    it ("Should throw an exception if required fields for editing composer are not provided", () => {

        expect(() => validateEditableComposerFields(missingAllFields)).toThrow(expect.objectContaining({
            message: "No valid fields to update",
            statusCode: 400
        })); 



        let data = validateEditableComposerFields(correctAllFieldsWithExtra);
        expect(data).toEqual(correctAllFields);
        data = validateEditableComposerFields(correctAllFields);
        expect(data).toEqual(correctAllFields);
        data = validateEditableComposerFields(onlyFirstName);
        expect(data).toEqual({fName: "John"});
        

    });

});