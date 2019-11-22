import { IEnumerable } from "./enumerable.interface";
import {ICollection} from "./collections.interface";

export interface ISet<T> extends ICollection<T>{
    /**
     * add item to the set, return true if added, false if duplicate
    */
   insert(item: T): boolean;

   /**
    * add ITEM to the set.
    * throw a new DuplicationException if duplicate
   */
  tryAdd(item: T): void;

   /**
    * Transform this set into its union with the other: IEnumerable<T>
    * @param other enumerable with items to add.
    */
    unionWith(other: IEnumerable<T>): void;


    /**
     * Transform this set into its intersection with the other: IEnumerable<T>
     */
    intersectWith(other:IEnumerable<T>):void ;

    /**
     * Transform this set so it contains no elements that are also in other
     */
    exceptWith(other: IEnumerable<T>): void;

    /**
     * Transform this set so it contains elements initially in this or in other, but not both
     * @param other 
     */
    symmetricExceptWith(other: IEnumerable<T>): void ;

    /**
     * Check if this set is a subset of other
     * @param other 
     */
    isSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a superset of other
     * @param other 
     */
    isSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a subset of other, but not the same as it
     * @param other 
     */
    isProperSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a superset of other, but not the same as it
     * @param other 
     */
    isProperSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set has any elements in common with other
     * @param other 
     */
    overlaps(other: IEnumerable<T>): boolean;

    /**
     * Check if this set contains the same and only the same elements as other
     * @param other 
     */
    setEquals(other: IEnumerable<T>): boolean;
    
}