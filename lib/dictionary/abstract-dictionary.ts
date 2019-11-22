import {EnumeratorIterator, ICollection, IDictionary, IEnumerable, IEnumerator} from "..";
import {KeyPairValue} from "../interface/dictionary.interface";
import {AssertHelpers} from "../helpers/assert-helpers";

export abstract class AbstractDictionary<TKey, TValue> implements IDictionary<TKey, TValue>{

    abstract containsKey(key: TKey): boolean;

    abstract containsValue(value: TValue): boolean;

    abstract enumerator(): IEnumerator<KeyPairValue<TKey, TValue>>;

    abstract get(key: TKey): TValue;

    abstract keyValues(): ICollection<KeyPairValue<TKey, TValue>>;

    abstract keys(): ICollection<TKey>;

    abstract values(): ICollection<TValue>;

    abstract put(key: TKey, value: TValue): void;

    abstract remove(key: TKey): boolean;

    abstract size(): number;

    /**
     * Iterator to support a for..of operator.
     */
    [Symbol.iterator](): EnumeratorIterator<KeyPairValue<TKey, TValue>> {
        return new EnumeratorIterator(this.enumerator());
    }

    forEach(action: (item: KeyPairValue<TKey, TValue>) => void) {
        AssertHelpers.isNotNull(action);

        for(let i of this){
            action(i);
        }
    }

    isEmpty(): boolean {
        return this.size() == 0;
    }

    add(value: KeyPairValue<TKey, TValue>): void{
        return this.put(value.key, value.value);
    }

    addAll(items: IEnumerable<KeyPairValue<TKey, TValue>>): void{
        for(let kp of items){
            this.add(kp);
        }
    }

    abstract clear();

    contains(item: KeyPairValue<TKey, TValue>): boolean {
        for(let kvp of this.keyValues()){
            if(item.key === kvp.key && item.value === kvp.value){
                return true;
            }
        }
        return false;
    }

    containsAll(c: IEnumerable<KeyPairValue<TKey, TValue>>): boolean {
        let result = true;

        for(let item of c){
            if(!this.contains(item)){
                result = false;
            }
        }
        return true;
    }

    containsIf(filter: (key: TKey, value:TValue) => boolean): boolean {
        AssertHelpers.isNotNull(filter);
        for(let item of this){
            if(filter(item.key, item.value)){
                return true;
            }
        }
        return false;
    }

    find(filter: (key: TKey, value:TValue) => boolean): KeyPairValue<TKey, TValue> {
        AssertHelpers.isNotNull(filter);
        for(let item of this){
            if(filter(item.key, item.value)){
                return item;
            }
        }
        return null;
    }

    abstract findAll(filter: (key: TKey, value:TValue) => boolean): IEnumerable<KeyPairValue<TKey, TValue>>;

    removeAll(items: IEnumerable<KeyPairValue<TKey, TValue>>): number {
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

    removeIf(filter: (key: TKey, value:TValue) => boolean ): number {
        AssertHelpers.isNotNull(filter);
        let items = this.findAll(filter);
        return this.removeAll(items);
    }

    toArray(): KeyPairValue<TKey, TValue>[] {
        return this.keyValues().toArray();
    }
}