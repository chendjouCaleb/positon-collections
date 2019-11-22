import {ISet} from "../interface/set.interface";
import {IEnumerable} from "../interface/enumerable.interface";
import {IEnumerator} from "../interface/enumerator.interface";
import {ArrayHelpers} from "..";
import {NullArgumentException} from "../expection/null.argument.exception";
import {ArgumentOutOfRangeException} from "../expection/argument.out.of.range.exception";
import {uint} from "../utils";
import {EnumeratorIterator} from "../enumerator.iterator";

/**
 * The {@link ISet} implementation based on a native array.
 * @author Chendjou
 * @version 1
 */
export class ArraySet<T> implements ISet<T>{
    private _array: T[] = [];
    private _version = 0;
    private _size = 0;

    add(value: T): void {
        this.insert(value);
    }

    insert(item: T): boolean {
        if(this.contains(item)){
            return false;
        }
        this._version++;
        this._array[this._size] = item;
        this._size++;

        return true;
    }

    /**
     * Gets the element at the given index.
     * @param index The position of element to get.
     */
    get(index: number): T {
        if(index < 0 || index >= this._size){
            throw new ArgumentOutOfRangeException();
        }
        return this._array[index];
    }

    clear(): void {
        this._version++;
        ArrayHelpers.clear(this._array);
        this._size = 0;
    }

    contains(item: T): boolean {
        return ArrayHelpers.contains(this._array, item);
    }

    copyTo(array: T[], startingIndex: number): void {
        if(!array){
            throw new NullArgumentException("The copy require a non null array");
        }
        for(let i = startingIndex, j = 0; i < this._size; i++, j++){
            array[j] = this.get(i);
        }
    }

    count(): number {
        return this._size;
    }

    exceptWith(other: IEnumerable<T>): void {
        if(other == null){
            throw new NullArgumentException("The collection argument is null");
        }

        if(this._size == 0){
            return;
        }

        if(other == this){
            this.clear();
            return;
        }

        for(let element of other){
            this.remove(element);
        }
    }

    getExceptWith(other: IEnumerable<T>): ArraySet<T> {
        if(other == null){
            throw new NullArgumentException("The collection argument is null");
        }

        const expect = new ArraySet<T>();
        expect.insertRange(this);
        expect.exceptWith(other);
        return expect;
    }



    enumerator(): IEnumerator<T> {
        throw Error();
    }

    /**
     * Takes the intersection of this set with other. Modifies this set.
     * @param other
     */
    intersectWith(other: IEnumerable<T>): void {
        if(this._size == 0) {
            return;
        }

        if(other == this){
            return;
        }

        const intersection = this.intersectionWith(other);
        this.clear();

        this.insertRange(intersection);

    }

    intersectionWith(other: IEnumerable<T>): ArraySet<T> {
        const intersection = new ArraySet<T>();

        for(let item of other) {
            if(this.contains(item)){
                intersection.insert(item);
            }
        }
        return intersection;
    }

    isProperSubsetOf(other: IEnumerable<T>): boolean {
        return false;
    }

    isProperSupersetOf(other: IEnumerable<T>): boolean {
        return false;
    }

    isReadOnly(): boolean {
        return false;
    }

    isSubsetOf(other: IEnumerable<T>): boolean {
        return false;
    }

    isSupersetOf(other: IEnumerable<T>): boolean {
        return false;
    }

    overlaps(other: IEnumerable<T>): boolean {
        if(other == null){
            throw new NullArgumentException("The collection argument is null");
        }
        const enumerator = other.enumerator();
        while (enumerator.hasMore()){
            enumerator.moveNext();
            if(this.contains(enumerator.current()))
                return true;
        }
        return false;
    }

    remove(item: T): boolean {
        if(item == null){
            throw new NullArgumentException("Cannot remove null value from list");
        }

        let index = this._array.indexOf(item);
        if(index >= 0){
            this.removeAt(index);
            return true;
        }
        return false;
    }

    /**
     * Removes the element at the given index. The size of the list is
     * decreased by one.
     * @param index
     */
    removeAt(index: number): void {
        if(uint(index) >= uint(this._size)){
            throw new ArgumentOutOfRangeException();
        }

        for(let i = index; i < this._array.length - 1; i++){
            this._array[i] = this._array[1 + i];
        }
        this._size--;
        this._array.pop();
        this._version++;
    }

    setEquals(other: IEnumerable<T>): boolean {
        return false;
    }

    symmetricExceptWith(other: IEnumerable<T>): void {
    }

    toArray(): T[] {
        let copy: T[] = [];
        return copy.concat(this._array);
    }

    tryAdd(item: T): void {
    }

    unionWith(other: IEnumerable<T>): void {
        for (let item of other) {
            this.insert(item);
        }
    }

    /**
     * Returns a new ArraySet which is union of this arraySet and other enumerable.
     * @param collection The other enumerable of the union.
     */
    getUnionWith(collection: IEnumerable<T>): ArraySet<T>{
        const set = new ArraySet<T>();

        set.unionWith(this);
        set.unionWith(collection);

        return set;
    }

    /**
     * Inserts the elements of the given collection at a given index.
     * @param collection The collection that contains element to add.
     */
    insertRange(collection: IEnumerable<T>){
        if(collection == null){
            throw new NullArgumentException("The collection argument is null");
        }

        for(let item of collection){
            this.insert(item);
        }
    }

    [Symbol.iterator](): EnumeratorIterator<T> {
        return new EnumeratorIterator(this.enumerator());
    }
}