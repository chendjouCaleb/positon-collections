import { IEnumerator } from "./interface/enumerator.interface";
import { InvalidOperationException } from "./expection/invalid.operation.exception";
import { NullArgumentException } from "./expection/null.argument.exception";

export class ArrayEnumerator<T> implements IEnumerator<T> {
    private _index: number;
    constructor(private readonly _array: T[]){
        if(_array == null){
            throw new NullArgumentException("Enumerator cannot be create with null argument");
        }
        this._index = -1;
    }


    moveNext(): boolean {

        if(this._index < this._array.length){
            this._index++;
            return this._index < this._array.length;
        }

        return false;
    }    
    
    
    current(): T {
        if(this._index < 0){
            throw new InvalidOperationException("The enumerator is not started. Call moveNext() to start it");
        }

        if(this._index > this._array.length){
            throw new InvalidOperationException("The enumerator has already reached the last element of collection")
        }

        return this._array[this._index];
    }
    
    reset(): void {
        this._index = -1;
    }

    hasMore(): boolean {
        return this._index < this._array.length
    }

    done(): boolean {
        return this._index == this._array.length - 1;
    }

}