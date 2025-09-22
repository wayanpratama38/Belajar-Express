import ClientError from "./clientError.js"

export class BadRequest extends ClientError {
    constructor(message){
        super(message)
        this.name = "BadRequest"
    }
}