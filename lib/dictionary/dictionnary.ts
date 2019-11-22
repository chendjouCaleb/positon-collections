import {AbstractDictionary} from "./abstract-dictionary";
import {AssertHelpers} from "../helpers/assert-helpers";
import {KeyPairValue} from "../interface/dictionary.interface";
import {DictionaryEnumerator, IEnumerator, List} from "..";

export class Dictionnary<TKey, TValue> extends AbstractDictionary<TKey, TValue> {
    private _map = new Map<TKey, TValue>();

    containsKey(key: TKey): boolean {
        return this._map.has(key);
    }

    containsValue(value: TValue): boolean {
        for(let i of this._map.values()){
            if(i === value){
                return true;
            }
        }
        return false;
    }

    enumerator(): DictionaryEnumerator<TKey, TValue> {
        throw new Error("Method not implemented.");
    }

    get(key: TKey): TValue {
        AssertHelpers.isNotNull(key);
        return this._map.get(key);
    }

    keyValues(): List<KeyPairValue<TKey, TValue>> {
        let list = new List<KeyPairValue<TKey, TValue>>();

        for(let key of this._map.keys()){
            list.add(new KeyPairValue(key, this._map.get(key)));
        }
        return list;
    }

    keys(): List<TKey> {
        let keys = new List<TKey>();

        for(let key of this._map.keys()){
            keys.add(key);
        }
        return keys;
    }

    values(): List<TValue> {
        const values = new List<TValue>();

        for(let value of this._map.values()){
            values.add(value);
        }
        return values;
    }
    put(key: TKey, value: TValue): void {
        AssertHelpers.isNotNull(key);
        this._map.set(key, value);
    }

    size(): number {
        return this._map.size;
    }

    remove(key: TKey): boolean {
        AssertHelpers.isNotNull(key);
        return this._map.delete(key);
    }

    clear() {
        this._map.clear();
    }

    findAll(filter: (key: TKey, value: TValue) => boolean): Dictionnary<TKey, TValue> {
        let dict = new Dictionnary<TKey, TValue>();

        for(let kvp of this){
            if(filter(kvp.key, kvp.value)){
                dict.add(kvp);
            }
        }
        return dict;
    }
}