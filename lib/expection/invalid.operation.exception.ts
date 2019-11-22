export class InvalidOperationException extends Error{
    constructor(message = "this operation is not invalid") {
        super(message);
    }
}

export class UnsupportedOperationException extends Error{
    constructor(message = "this operation is not supported") {
        super(message);
    }
}