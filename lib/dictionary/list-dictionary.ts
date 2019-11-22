import {IDictionary, IDictionaryEnumerator, KeyPairValue} from "../interface/dictionary.interface";
import {ICollection} from "..";
import {List} from "..";
import {DictionaryEnumerator} from "./dictionnary.enumerator";
import {AbstractDictionary} from "./abstract-dictionary";

/**
 * The {@link IDictionary} implementation based @link {@link List<@link KeyValuePair>}.
 */
export class ListDictionary<TKey, TValue> extends AbstractDictionary<TKey, TValue>{

    private _version = 0;

    private _keyValuesPairs = new List<KeyPairValue<TKey, TValue>>();
    private _keys = new List<TKey>();
    private _values = new List<TValue>();


    add(value: KeyPairValue<TKey, TValue>): void {
        if(!this._keyValuesPairs.contains(value)){
            this._keyValuesPairs.add(value);
        }
    }

    clear(): void {
        this._version++;
        this._keyValuesPairs.clear();
        this._values.clear();
        this._keys.clear();
    }


    containsKey(key: TKey): boolean {
        return this._keys.contains(key);
    }


    size(): number {
        return this._keyValuesPairs.size();
    }

    containsValue(value: TValue): boolean {
        return this._values.contains(value);
    }

    get(key: TKey): TValue | null {
        let value =  this._keyValuesPairs.find(kvp => kvp.key === key);
        if(value != null){
            return value.value;
        }
        return null;
    }

    enumerator(): IDictionaryEnumerator<TKey, TValue> {
        return new DictionaryEnumerator<TKey, TValue>(this._keyValuesPairs);
    }

    keyValues(): List<KeyPairValue<TKey, TValue>> {
        return this._keyValuesPairs.getRange();
    }

    keys(): ICollection<TKey> {
        return this._keys.getRange();
    }

    put(key: TKey, value: TValue): void {
        if(this.containsKey(key)){
            this.remove(key);
        }
        const kvp = new KeyPairValue(key, value);
        this._keyValuesPairs.add(kvp);
        this._values.add(value);
        this._keys.add(key);
    }

    remove(key: TKey): boolean {
        if(!this._keys.contains(key)){
            return false;
        }

        const kvp = this._keyValuesPairs.find(kvp => kvp.key === key);

        // Lack of language.
        if(kvp != null){
            const kvpIndex = this._keyValuesPairs.indexOf(kvp);
            this._keyValuesPairs.remove(kvp);
            this._keys.removeAt(kvpIndex);
            this._values.removeAt(kvpIndex);
        }
        return true;
    }

    values(): ICollection<TValue> {
        return this._values.getRange();
    }


}