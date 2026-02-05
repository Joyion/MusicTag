import CustomError from "../customError.js";

export const validateRequiredComposerFields = (body) => {
    if (!body.fName || body.fName.trim() === "") {
        throw new CustomError("First name is required", 400);
    }

    if (!body.lName || body.lName.trim() === "") {
        throw new CustomError("Last name is required", 400);
    }

    if ((body.cae == null || body.cae.trim() === "") || (body.pro == null || body.pro.trim() === "")) {
        throw new CustomError("CAE and PRO are required", 400);
    }

    return {  
        fName: body.fName.trim(),
        ...(body.mName ? { mName: body.mName.trim() } : {}),
        lName: body.lName.trim(),
        ...(body.suffix ? { suffix: body.suffix.trim() } : {}),
        cae: body.cae.trim(),
        pro: body.pro.trim()
    };
};

export const validateEditableComposerFields = (body) => {
    const editableFields = ["fName", "mName", "lName", "suffix", "cae", "pro"];
    let updatedData = {};

    editableFields.forEach(field => {
        if (field in body) {
            if (typeof body[field] === 'string' && body[field].trim() !== "") {
                updatedData[field] = body[field].trim();
            }
        }
    });

    if (Object.keys(updatedData).length === 0) {
        throw new CustomError("No valid fields to update", 400);
    }

    return updatedData;
};

const getEditableCueFields = (body = {}) => {
    const editableFields = [
        "catalogName", "songTitle", "genre", "style", "genreStyle", "genreId", "instruments", "descriptions", "tempo", "rating", "bands", "films", "hidden", "top", "status"
    ]
    const updatedFields = {};

    editableFields.forEach((field) => {
        if (body[field] !== undefined) {
            updatedFields[field] = body[field];
        }
    });

    if(Object.keys(updatedFields).length === 0){
        throw new Error("No valid fields to update");
    }

    return updatedFields;
};

