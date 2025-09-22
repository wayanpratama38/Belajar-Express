import ClientError from "./clientError.js"

export class NotFound extends ClientError {
    constructor(message){
        super(message,404)
        this.name = "NotFound"
    }
}