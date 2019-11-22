import {ICollection} from "./interface/collections.interface";
import {IEnumerator} from "./interface/enumerator.interface";
import {EnumeratorIterator} from "./enumerator.iterator";
import {IEnumerable} from "./interface/enumerable.interface";
import {AssertHelpers} from "./helpers/assert-helpers";

export abstract class AbstractCollection<T> implements ICollection<T>{

    abstract clear(): void;

    abstract size(): number;
    abstract findAll(filter: (item: T) => boolean): IEnumerable<T>;

    abstract enumerator(): IEnumerator<T>;

    abstract remove(item: T): boolean;
    abstract add(value: T): boolean;

    [Symbol.iterator](): EnumeratorIterator<T> {
        return new EnumeratorIterator(this.enumerator());
    }

    isEmpty(): boolean {
        return this.size() ==0;
    }

    toArray(): T[] {
        let items: T[] = [];

        for(let item of this){
            items.push(item);
        }
        return items;
    }

    addAll(items: IEnumerable<T>): boolean {
        AssertHelpers.isNotNull(items);
        let modified = false;
        for (let item of items)
        if (this.add(item))
            modified = true;
        return modified;
    }

    contains(item: T): boolean {
        for(let it of this){
            if(item === it){
                return true;
            }
        }
        return false;
    }

    containsAll(c: IEnumerable<T>): boolean {
        let result = true;

        for(let item of c){
            if(!this.contains(item)){
                result = false;
            }
        }
        return true;
    }

    containsIf(filter: (item: T) => boolean): boolean {
        AssertHelpers.isNotNull(filter);
        for(let item of this){
            if(filter(item)){
                return true;
            }
        }
        return false;
    }

    removeAll(items: IEnumerable<T>): number {
        AssertHelpers.isNotNull(items);
        let count = 0;

        for(let item of items){
            if(this.contains(item)){
                this.remove(item);
                count++;
            }
        }
        return count;
    }

    removeIf(filter: (item: T) => boolean): number {
        AssertHelpers.isNotNull(filter);
        let items = this.findAll(filter);
        return this.removeAll(items);
    }


    find(filter: (item: T) => boolean): T {
        AssertHelpers.isNotNull(filter);
        for(let item of this){
            if(filter(item)){
                return item;
            }
        }
        return null;
    }

    forEach(action: (item: T) => void) {
        AssertHelpers.isNotNull(action);

        for(let i of this){
            action(i);
        }
    }
}