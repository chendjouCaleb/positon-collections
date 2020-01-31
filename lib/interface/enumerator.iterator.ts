import {IEnumerator} from "./interface/enumerator.interface";

/**
 * The default {@code Iterator} support for all {@code IEnumerator}.
 * This is useful to give to collection the support of
 * native for..of loop.
 *
 * @author Chendjou deGrace
 */
export class EnumeratorIterator<T> {
    constructor(private enumerator: IEnumerator<T>){ }

    next(): IteratorResult<any> {
        if(this.enumerator.hasMore()){
            this.enumerator.moveNext();
            return { done: false, value: this.enumerator.current()}
        }
        return { done: true, value : null };
    }
}