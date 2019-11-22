import { IList } from "../interface/list.interface";
import { IEnumerable } from "../interface/enumerable.interface";
import { NullArgumentException } from "../expection/null.argument.exception";
import { IEnumerator } from "../interface/enumerator.interface";
import { ArgumentOutOfRangeException } from "../expection/argument.out.of.range.exception";
import { ListEnumerator } from "./list.enumerator";
import { uint } from "../utils";
import {EnumeratorIterator} from "../enumerator.iterator";
import {AbstractCollection} from "../abstract-collection";

export class List<T> extends AbstractCollection<T> implements IList<T>, Iterable<T>{

    private _array: T[];
    private _size: number = 0;
    private _version: number = 0;
    

    constructor(public collection?: IEnumerable<T>)
    {
        super();
        this._array = [];

        if(!collection){
            
        }else{
            let en = collection.enumerator();
            while (en.moveNext()){
                this.add(en.current());
            }
            en.reset();
        }
    }

    public static fromArray<T>(array: T[]): List<T>{
        let list = new List<T>();
        for(let i = 0; i < array.length; i++){
            list.add(array[i]);
        }
        return list;
    }

    

    get version(){
        return this._version;
    }

    size(){
        return this._size;
    }

    isEmpty(): boolean {
        return this._size == 0;
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
    
    /**
     * Sets the element at the given index. Do not confuse with {@link IList.Insert}.
     * @param index The index to set the item.
     * @param value The value to set.
     */
    set(index: number, value: T){
        if(index < 0 || index >= this._size){
            throw new ArgumentOutOfRangeException();
        }

        this._array[index] = value;
        this._version++;
    }

    /**
     * Adds the given object to the end of this list. The size of the list is
     * increased by one
     * @param value 
     */
    add(value: T): boolean{
        this._version++;
        this._array[this._size] = value;
        this._size++;
        return true;
    }


    /**
     * Adds the elements of the given collection to the end of this list. If
     * required, the capacity of the list is increased to twice the previous
     * capacity or the new size, whichever is larger.
     * @param collection 
     */
    addRange(collection: IEnumerable<T>){
        this.insertRange(this._size, collection);
    }


    /**
     * Returns the index of the first occurrence of a given value in a range of
     * this list. The list is searched forwards from beginning to end.
     * The elements of the list are compared to the given value using the
     * Object.Equals method. This method uses the Array.indexOf method to perform the search.
     */
    indexOf(item: T, index = 0, count?:number): number {
        if(!count){
            count = this._size;
        }

        if(index < 0 || index > this._size){
            throw new ArgumentOutOfRangeException();
        }

        if(count < 0 || index > this._size - count){
            throw new ArgumentOutOfRangeException();
        }

        
        
        return this._array.slice(index, index+count).indexOf(item, index);
    }


    /** 
     * Inserts an element into this list at a given index. The size of the list
     * is increased by one. If required, the capacity of the list is doubled
     * before inserting the new element.
     */
    insert(index: number, item: T): void {
        if(uint(index) > this._size){
            throw new ArgumentOutOfRangeException();
        }
        let temp: T[] = [];
        this.copyTo(temp, index);
        this._array[index] = item;

        for(let i = 0; i < temp.length; i++){
            this._array[index + i + 1] = temp[i];
        } 

        this._version++;
        this._size++;
    }

    /**
     * Inserts the elements of the given collection at a given index. If
     * required, the capacity of the list is increased to twice the previous
     * capacity or the new size, whichever is larger.  Ranges may be added
     * to the end of the list by setting index to the List's size.
     * @param index 
     * @param collection 
     */
    insertRange(index: number = 0, collection: IEnumerable<T>){
        if(collection == null){
            throw new NullArgumentException("The collection argument is null");
        }

        if(uint(index) > uint(this._size)){
            throw new ArgumentOutOfRangeException();
        }

        let temp: T[] = [];
        this.copyTo(temp, index);

        let enumerator = collection.enumerator();
        let lastIndex = index;
        while(enumerator.moveNext()){
            this._array[lastIndex] = enumerator.current();
            lastIndex++;
            this._version++;
            this._size++;
        }
        for(let i = 0, j=lastIndex; i < temp.length; i++, j++){
            this._array[j] = temp[i];

        } 
    }

    /**
     * Returns the index of the last occurrence of a given value in a range of
     * this list. The list is searched backwards, starting at index
     * index and upto count elements. The elements of
     * the list are compared to the given value using the Object.Equals method.

     * This method uses the Array.LastIndexOf method to perform the search.

     * @param item 
     * @param index 
     * @param count 
     */
    lastIndexOf(item: T, index = 0, count = this._size){
        
        if(index < 0 || count < 0){
            throw new ArgumentOutOfRangeException("You cannot require a negative index of list");
        }

        if(this._size == 0){
            return -1;
        }

        if(index >= this._size){
            throw new ArgumentOutOfRangeException("The required index is greater or equals than the list size");
        }

        if(index + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        return this._array.lastIndexOf(item, index + count);
    }

    /**
     * Removes the element which is equals to {@link @param item}.
     * The size of the list is decreased by one.
     * @param item  item to remove
     * @returns true if the item has found and removed
     */
    remove(item: T): boolean {
        if(item == null){
            throw new NullArgumentException("Cannot remove null value from list");
        }

        let index = this.indexOf(item);
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

    /**
     * Removes a range of elements from this list.
     * @param index Starting index 
     * @param count Number of items to remove
     */
    removeRange(index: number, count: number): void{
        if(index < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(index + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        //for(let i = index; i+count < this._array.length; i++){
        //    this._array[i] = this._array[i + count];
        //}
        // for(let i = 0; i+count < count; i++){
        //    this._array[i] = this._array[i + count];
        //    this._size--;
        //    this._array.pop();
        // }

        this._array.splice(index, count);
        this._size -= count;
        this._version++;
    }

    reverse(): void{
        this._array.reverse();
        this._version++;
    }

    /**
     * Reverses the elements in a range of this list. Following a call to this
     * method, an element in the range given by start and count
     * which was previously located at index i will now be located at
     * index index + (index + count - i - 1).
     * @param start 
     * @param count 
     */
    reverseRange(start: number, count: number): void{
        if(start < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(start + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }


        let rangeToReverse = this._array.slice(start, start + count);
        let remainingArray = this._array.slice(start + count+1);
        this._array.splice(start);

        this._array = this._array
        .concat(rangeToReverse.reverse())
        .concat(remainingArray);

        this._version++;
    }

    /**
     * Sorts the elements in this list.  Uses Array.sort with the
     * provided comparer. function
     * @param compareFn The comparer function
     * @default compareFn The default ASCII character comparer
     */
    sort(compareFn?: (a: T, b: T) => number): void{
        this._array = this._array.sort(compareFn);
        this._version++;
    }

    /**
     * Sorts the elements in a given range of a list.  Uses Array.sort with the
     * provided comparer. function
     * @param compareFn The comparer function
     * @default compareFn The default ASCII character comparer
     * @param start first index of a range
     * @param count Number of element to include in a range
     */
    sortRange(start: number, count: number, compareFn?: (a: T, b: T) => number): void{

        if(start < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(start + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        let rangeToSort = this._array.slice(start, start + count);
        let remainingArray = this._array.slice(start + count+1);
        this._array.splice(start);

        this._array = this._array
        .concat(rangeToSort.sort(compareFn))
        .concat(remainingArray);

        this._version++;
    }


    /**
     * Convert all element in the list to the Toutput type
     * @param converterFn The converter function
     */
    public convertAll<TOutput>(converterFn:(item:T) => TOutput): List<TOutput> {
        if(converterFn == null){
            throw new NullArgumentException("The converter function must be a non null.");
        }

        let output = new List<TOutput>();
        for(let i = 0; i < this._array.length; i++){
            output._array[i] = converterFn(this._array[i]);
        }
        output._size = this._size;

        return output;
    }


    public exists(matcherFn:(item: T) => boolean){
        return this.findIndex(matcherFn) != -1;
    }
    /**
     * find and return the first item that match the given function
     * @param matcherFn The matcher function
     */
    public find(matcherFn:(item: T) => boolean): T | null {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }
        for(let i = 0; i < this._array.length; i++){
            if(matcherFn(this._array[i])){
                return this._array[i];
            }
        }
        return null;
    }
    

     /**
     * find and return a list that contains all item that match the given function
     * @param matcherFn The matcher function
     */
    public findAll(matcherFn:(item: T) => boolean): List<T> {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        let list = new List<T>();
        for(let i = 0; i < this._array.length; i++){
            if(matcherFn(this._array[i])){
                list.add(this._array[i]);
            }
        }
        return list;
    }

    /**
     * find the index of a first item that match the given function.
     * @param matcherFn The comparer function
     * @default compareFn The default ASCII character comparer
     * @param startIndex first index of a range
     * @param count Number of element to include in a range
     */
    public findIndex(matcherFn: (item: T) => boolean, startIndex: number = 0, count: number = this._size): number
    {
            if(startIndex < 0){
                throw new ArgumentOutOfRangeException("The index must not be a negative number");
            }
    
            if(count < 0){
                throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
            }
    
            if(startIndex + count > this._size){
                throw new ArgumentOutOfRangeException("The startIndex + count is greater or equals than the list size");
            }

            if(matcherFn == null){
                throw new NullArgumentException("The matcher function must be a non null.");
            }

            let endIndex = startIndex + count;
            for (let i = startIndex; i < endIndex; i++)
            {
                if (matcherFn(this._array[i])) return i;
            }
            return -1;
    }


    /**
     * find and return the last item that match the given function
     * @param matcherFn The matcher function
     */
    public findLast(matcherFn: (item: T) => boolean):T | null
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        for (let i = this._size - 1; i >= 0; i--)
        {
            if (matcherFn(this._array[i]))
            {
                return this._array[i];
            }
        }
        return null;
    }

    public findLastIndex(startIndex: number, count:number, matcherFn: (item: T) => boolean): number
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        if (this._size == 0)
        {
            // Special case for 0 length List
            if (startIndex != -1)
            {
                throw new ArgumentOutOfRangeException();
            }
        }
        else
        {
            // Make sure we're not out of range
            if (uint(startIndex) >= uint(this._size))
            {
                throw new ArgumentOutOfRangeException();
            }
        }

        // 2nd have of this also catches when startIndex == MAXINT, so MAXINT - 0 + 1 == -1, which is < 0.
        if (count < 0 || startIndex - count + 1 < 0)
        {
            throw new ArgumentOutOfRangeException();
        }

        let endIndex = startIndex - count;
        for (let i = startIndex; i > endIndex; i--)
        {
            if (matcherFn(this._array[i]))
            {
                return i;
            }
        }
        return -1;
    }
    
    public forEach(callbackFn: (item: T, index: number, stopper: Stopper) => void){
        if(callbackFn == null){
            throw new NullArgumentException("The callback function must be a non null.");
        }

        let version = this._version;
        let stp = new Stopper();
        for (let i = 0; i < this._size; i++)
        {
            // Don't edit list during the loop
            
            if (version != this._version)
            {
                break;
            }
            callbackFn(this._array[i], i, stp);
            if(stp.IsStopped){
                break;
            }
        }
    }


    /**
     * Check that the given function matchs all the item of the list
     * @param matcherFn 
     */
    public trueForAll(matcherFn: (item: T) => boolean): boolean
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        for (let i = 0; i < this._size; i++)
        {
            if (!matcherFn(this._array[i]))
            {
                return false;
            }
        }
        return true;
    }

    /**
     * This method removes all items which matches the predicate.
     * @param matcherFn
     */
    public removeIf(matcherFn: (item: T) => boolean): number {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        let freeIndex = 0;

        // find the first item which needs to be removed.
        while (freeIndex < this._size && !matcherFn(this._array[freeIndex])) freeIndex++;
        if (freeIndex >= this._size) return 0;

        let current = freeIndex + 1;

        while (current < this._size)
        {
            // find the first item which needs to be kept.
            while (current < this._size && matcherFn(this._array[current])) current++;

            if (current < this._size)
            {
                // copy item to the free slot.
                this._array[freeIndex++] = this._array[current++];
            }
        }

        // clear the elements so that the gc can reclaim the references.
        for(let i = this._size - 1; i > this._size - freeIndex; i--){
            this._array.pop();
        }

        let result = this._size - freeIndex;
        this._size = freeIndex;
        this._version++;
        return result;
    }

    
    /**
     * Clears the contents of List.
     */
    clear(): void {
        this._version++;
        for(let i = 0; i < this._array.length; i++){
            this._array.shift();
        }
        this._size = 0;
    }


    /**
     * contains returns true if the specified element is in the List.
     */
    contains(item: T): boolean {
        return this._size != 0 && this.indexOf(item) > -1;
    }




    /**
     * Copy all items of the list into a array
     * @param array Array that must receive the items of the list
     * @param startingIndex 
     */
    copyTo(array: T[], startingIndex = 0): void {
        if(!array){
            throw new NullArgumentException("The copy require a non null array");
        }
        for(let i = startingIndex, j = 0; i < this._size; i++, j++){
            array[j] = this.get(i);
        }
    }

    /**
     * Returns an enumerator for this list with the given
     * permission for removal of elements. If modifications made to the list 
     * while an enumeration is in progress, the moveNext and
     * GetObject methods of the enumerator will throw an exception.
     */
    enumerator(): IEnumerator<T> {
        return new ListEnumerator(this);
    }


    /**
     * Returns a collection containing the items beginning at {@link @param index}
     * and contains the {@link @param count} next item.
     * @param index The starting index. {@link @default 0}.
     * @param count The number of item to insert in range. {@link @default list.size-index}.
     */
    public getRange(index: number=0, count= this.size()-index){
        if(index < 0){
            throw new ArgumentOutOfRangeException();
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The cannot required a negative number of items");
        }

        if(this._size - index < count){
            throw new ArgumentOutOfRangeException("The list don't have the number of items that your require after the index");
        }

        let copy = new List<T>();

        for(let i = index; i <= count; i++){
            copy.add(this.get(i));
        }

        return copy;
    }

    /**
     * Returns a new List<T> with same element.
     * @deprecated Use {@link getRange()} instead.
     */
    clone():List<T>{
        const clone = new List<T>();
        this.forEach(v => clone.add(v));
        return clone;
    }

    
    /**
     * toArray returns an array containing the contents of the List.
     * This requires copying the List
     * @returns An array that contains all items of a list
     */
    toArray(): T[] {
        let copy: T[] = [];
        return copy.concat(this._array);
    }

    /**
     * Iterator to support a for..of operator.
     */
    [Symbol.iterator](): EnumeratorIterator<any> {
        return new EnumeratorIterator(this.enumerator());
    }

    public toString(){
        let value = "[ ";
        for (let i = 0; i < this._size - 1; i++){
            value += this.get(i) + ", ";
        }

        value += this.get(this._size - 1) + " ]";
        return value;
    }


}

class Stopper {
    private _isStopped = false;

    public Stop(){
        this._isStopped = true;
    }

    get IsStopped(){
        return this._isStopped;
    }
}