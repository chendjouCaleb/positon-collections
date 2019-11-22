import {ICollection} from "./collections.interface";
import {IEnumerable} from "./enumerable.interface";
import {IEnumerator} from "./enumerator.interface";

/**
 * An IDictionary is a possibly unordered set of key-value pairs.
 * keys can be any non-null object.  values can be any object.
 * You can look up a value in an IDictionary via the default indexed
 * property, Items.
 */
export interface IDictionary<TKey, TValue> extends IEnumerable<KeyPairValue<TKey, TValue>>{

    /**
     * Returns a collections of the keys of this dictionary.
     */
     keys():ICollection<TKey>;

    /**
     * Returns a collections of the values of this dictionary.
     */
     values(): ICollection<TValue>;

    /**
     * Returns a collections of keyValuePair of this dictionary.
     */
    keyValues(): ICollection<KeyPairValue<TKey, TValue>>;

    /**
     * Returns whether this dictionary contains a particular key.
     * @param key The key to find.
     */
     containsKey(key: TKey): boolean;

    /**
     * Counts elements in this dictionary.
     */
    size(): number;

    /**
     * Adds a key-value pair to the dictionary.
     */
    put(key: TKey, value: TValue): void;

    /**
     * Removes a particular key from the dictionary.
     * @param key The key of item to remove.
     * @return True if the item is removed.
     */
    remove(key: TKey): boolean;

    /**
     * Check if the dictionary don't contains any element.
     */
    isEmpty() : boolean;


    /**
     * Check if dictionary has {@link value} among his values.
     * @param value The value to check.
     * @return true if the dictionary contains {@link value}.
     */
    containsValue(value: TValue): boolean;

    /**
     * find and return the value where the corresponding key is {@link key}.
     * @param key The key of value to find.
     */
    get(key: TKey): TValue;


    /**
     * Removes all of the elements from this dictionary.
     * The dictionary will be empty after this method returns.
     *
     * @throws UnsupportedOperationException if the <tt>clear</tt> operation
     *         is not supported by this dictionary.
     */
    clear(): void;
}

/**
 * A KeyValuePair holds a key and a value from a dictionary.
 * It is used by the IEnumerable<T> implementation for both IDictionary<TKey, TValue>
 */
export class KeyPairValue<TKey, TValue> {
    constructor(private _key: TKey, private _value: TValue) {}

    get key(){
        return this._key;
    }

    get value(){
        return this._value;
    }
}


export interface IDictionaryEnumerator<TKey, TValue> extends IEnumerator<KeyPairValue<TKey, TValue>>{

}