/**
 * Base interface for all enumerators, providing a simple approach
 * to iterating over a collection.
 */
export interface IEnumerator<T> {
    /**
     * Advances the enumerator to the next element of the enumeration and
     * turns a boolean indicating whether an element is available. Upon
     * creation, an enumerator is conceptually positioned before the first
     * element of the enumeration, and the first call to moveNext
     * brings the first element of the enumeration into view.
     */

    moveNext(): boolean;
    /**
     * Returns the current element of the enumeration. The returned value is
     * undefined before the first call to moveNext and following a
     * call to moveNext that returned false. Multiple calls to
     * GetCurrent with no intervening calls to moveNext
     * will return the same object.
    */

    current(): T

    /**
     * Resets the enumerator to the beginning of the enumeration, starting over.
     * The preferred behavior for reset is to return the exact same enumeration.
     * This means if you modify the underlying collection then call reset, your
     * IEnumerator will be invalid, just as it would have been if you had called
     * moveNext or current.
    */
    reset(): void;

    /**
     * Checks that there are another item in the enumerator
     */
    hasMore(): boolean;

    /**
     * Checks if enumerator is finish.
     */
    done(): boolean;

}