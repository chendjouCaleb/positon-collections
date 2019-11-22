import { ICollection } from "../interface/collections.interface";
import { ArrayHelpers } from "../helpers/array-helpers";
import {EnumeratorIterator} from "../enumerator.iterator";
import {IEnumerable} from "../interface/enumerable.interface";
import {EnumerableHelpers} from "../helpers/enumerable-helpers";
import {AssertHelpers} from "../helpers/assert-helpers";
import {ArgumentOutOfRangeException} from "../expection/argument.out.of.range.exception";
import {InvalidOperationException} from "../expection/invalid.operation.exception";
import {IQueue} from "../interface/queue.interface";


/**
 * @class Queue
 * @description Represents a first-in, first-out collection of objects.
 * A simple Queue of objects.  Internally it is implemented as a circular
 * buffer, so Enqueue can be O(n).  Dequeue is O(1).
 * @version 1
 * @author Chendjou Caleb deGrace.
 */
export class Queue<T> implements IQueue<T> {

    private _array: T[] = [];

    // First valid element in the queue.
    private _head: number = 0;

    // Last valid element in the queue.
    private _tail: number = 0;
    
    // Number of elements.
    private _size: number = 0;

    // The version of the queue; To increment for all mutation of the queue.
    private _version: number = 0;

    constructor(collection?: IEnumerable<T>){
        if(collection != null){
            this._array = EnumerableHelpers.toArray(collection);
        }
        this._size = this._array.length;
        this._tail = this._size;

    }

    size(): number {
        return this._size;
    }    


    add(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * Remove all elements from the queue.
     */
    clear(): void {
        ArrayHelpers.clear(this._array);
        this._version++;
        this._head = 0;
        this._tail = 0;
    }

    /**
     * Adds item to the tail of the queue.
     * @param item item to add.
     */
    enqueue(item: T): boolean{
        this._array[this._tail] = item;

        this._tail++;
        this._size++;
        this._version++;
        return true;
    }


    /**
     * Removes the object at the head of the queue and returns it.
     * @throws InvalidOperationException If the queue is empty.
     * @return The element at the head of the queue.
     */
    dequeue(): T {

        if(this._size == 0){
            throw new InvalidOperationException("Cannot dequeue an empty queue");
        }
        let removed = this._array[this._head];
        this._size--;
        this._version++;
        this._head++;
        return removed;
    }

    /**
     * Removes the object at the head of the queue and returns it.
     * This method dont throw exception if the queue is empty.
     * @return The element at the head of the queue.
     */
    tryDequeue(): T | null {
        try {
            return this.dequeue();
        }catch (e) {
            return null;
        }
    }



    /**
     * Retrieves, but does not remove, the head of this queue,
     * @throws InvalidOperationException If the queue is empty.
     *
     * @return the head of this queue.
     */
    peek(): T {
        if(this._size == 0){
            throw new InvalidOperationException("Cannot dequeue an empty queue");
        }
        return this._array[this._head];
    }

    /**
     * Retrieves, but does not remove, the head of this queue,
     * or returns {@code null} if this queue is empty.
     *
     * @return the head of this queue, or {@code null} if this queue is empty
     */
    tryPeek(): T | null {
        if(this._size == 0){
            return null;
        }
        return this._array[this._head];
    }

    contains(item: T): boolean  {
        if(this._size == 0){
            return false;
        }

        if(this._head < this._tail){
            return ArrayHelpers.containsInRange(this._array, item, this._head, this._tail);
        }
        return false;
    }


    /**
     * CopyTo copies a collection into an Array, starting at a particular index into the array.
     * @param array The destination array.
     * @param arrayIndex The starting index in the destination array.
     */
    copyTo(array: T[], arrayIndex: number): void {
        AssertHelpers.isNotNull(array, "Cannot in null array");

        if(arrayIndex < 0){
            throw new ArgumentOutOfRangeException("The array index must be upper or equals to 0");
        }

        if(arrayIndex > array.length) {
            throw new ArgumentOutOfRangeException("The array index must be lower than a array length")
        }

        for(let i = 0; i < this._size; i++){
            array[arrayIndex + i] = this._array[i];
        }
    }

    remove(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    toArray(): T[] {
        if(this._size == 0){
            return [];
        }
        const array: T[] = [];

        if(this._head < this._tail){
            for(let i = this._head, j = 0; i < this._tail; i++, j++) {
                array[j] = this._array[i]
            }
            return array;
        }
        return [];
    }
    enumerator(): import("..").IEnumerator<T> {
        throw new Error("Method not implemented.");
    }

    [Symbol.iterator](): EnumeratorIterator<T> {
        throw Error("Not implemented");
    }

    addAll(item: IEnumerable<T>): boolean {
        return false;
    }

    containsAll(c: IEnumerable<T>): boolean {
        return false;
    }

    containsIf(filter: (item: T) => boolean): boolean {
        return false;
    }

    find(filter:  (item: T) => boolean): T {
        throw Error();
    }

    findAll(filter: (item: T) => boolean): IEnumerable<T> {
        throw Error();
    }

    isEmpty(): boolean {
        return false;
    }

    removeAll(items: IEnumerable<T>): number {
        return 0;
    }

    removeIf(filter: (item: T) => boolean): number {
        return 0;
    }


}