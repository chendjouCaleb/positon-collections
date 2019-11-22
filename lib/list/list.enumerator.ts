import { IEnumerator } from "../interface/enumerator.interface";
import { List } from "./list";
import { InvalidOperationException } from "../expection/invalid.operation.exception";
import { NullArgumentException } from "../expection/null.argument.exception";
import { ArgumentOutOfRangeException } from "../expection/argument.out.of.range.exception";

export class ListEnumerator<T> implements IEnumerator<T> {
    private _index: number;
    private readonly _version: number;
    constructor(private readonly _list: List<T>){
        if(_list == null){
            throw new NullArgumentException("Enumerator cannot be create with null argument");
        }
        this._index = -1;
        this._version = 0;
    }


    moveNext(): boolean {

        if(this._index < this._list.size){
            this._index++;
            return this._index < this._list.size;
        }

        return false;
    }    
    
    
    current(): T {
        if(this._index < 0){
            throw new InvalidOperationException("The enumerator is not started. Call moveNext() to start it");
        }

        if(this._index >= this._list.size){
            throw new ArgumentOutOfRangeException("The enumerator has already reached the last element of collection");
        }

        return this._list.get(this._index);
    }
    
    reset(): void {
        this._index = -1;
    }

    hasMore(): boolean {
        if(this._list.size == 0){
            return false;
        }
        return this._index < this._list.size - 1;
    }

    

    moveNextRare(){
        if(this._version != this._list.version){
            throw new InvalidOperationException("Enumerator version is different from the list version");
        }
        
        this._index = this._list.count() + 1;
        return false;
    }

    done(): boolean {
        return this._index == this._list.size - 1;
    }
}