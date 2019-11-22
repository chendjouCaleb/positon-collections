import { ICollection } from "./collections.interface";

export interface IList<T> extends ICollection<T> {
    get(index: number): T;

    indexOf(item: T): number;

    /**
     * Inserts value into the list at position index.
     * index must be non-negative and less than or equal to the 
     * number of elements in the list.  If index equals the number
     * of items in the list, then value is appended to the end.

     * @param index Position to put element in the array
     * @param item The object to put in List
     */
    insert(index: number, item: T) : void;

    /**
     * Removes the item at position index.
     * @param index Removes the item at position index.
     */
    removeAt(index: number): void;
}