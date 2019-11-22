import {IEnumerable} from "../interface/enumerable.interface";
import {AssertHelpers} from "./assert-helpers";

export class EnumerableHelpers {


    public static toArray<T>(items: IEnumerable<T>): Array<T> {
        AssertHelpers.isNotNull("Cannot transform null collection to array");
        const array: T[] = [];

        while (items.enumerator().hasMore()){
            items.enumerator().moveNext();
            array.push(items.enumerator().current());
        }

        return array;
    }
}