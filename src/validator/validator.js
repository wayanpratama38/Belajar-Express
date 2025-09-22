import { BadRequest } from "../exception/badRequest.js";
import { postNewBookValidator } from "./schema.js";

// book object validator
export const BookValidator = {
    validatePostNewBookPayload : (payload) => {
        const result = postNewBookValidator.validate(payload);
        if(result.error){
            throw new BadRequest("You doing bad request")
        }
    }
}