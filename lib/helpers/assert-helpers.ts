import {NullArgumentException} from "../expection/null.argument.exception";

export class AssertHelpers {
    public static isNotNull(value: any, message: string = "A non null value is required") {
        if(value == null){
            throw new NullArgumentException(message);
        }
    }
}