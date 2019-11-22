import { IEnumerator } from "./enumerator.interface";
import {EnumeratorIterator} from "../enumerator.iterator";

export interface IEnumerable<T>{
    /**
     * Returns an IEnumerator for this enumerable Object.  The enumerator provides
     * a simple way to access all the contents of a collection.
     */
    enumerator() : IEnumerator<T>;


    /**
     * Provides the native for..of the the IEnumerable.
     */
    [Symbol.iterator]():EnumeratorIterator<T>;


    /**
     * Performs the given action for each element of the {@code IEnumerable}
     * until all elements have been processed or the action throws an
     * exception.  Unless otherwise specified by the implementing class,
     * actions are performed in the order of iteration (if an iteration order
     * is specified).  Exceptions thrown by the action are relayed to the
     * caller.
     * @param action The action to be performed for each element
     * @throws NullArgumentException if the specified action is null
     */
    forEach(action: (item: T) => void);
}



