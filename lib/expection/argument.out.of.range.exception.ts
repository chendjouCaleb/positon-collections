export class ArgumentOutOfRangeException implements Error {
    name: string = "ArgumentOutOfRangeException";
    stack?: string | undefined;
    constructor(public message = "The given index is out of range of index of the collection"){

    }
}