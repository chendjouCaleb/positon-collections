export class ArrayHelpers {

    /**
     * Remove all the elements in {@param array}.
     * @param array Array to clear.
     */
    public static clear(array: any[]) {
        for(let i = 0; i < array.length; i++){
            array.pop();
        }
    }

    /**
     * contains returns true if the specified element is in the specified array.
     */
    static contains(array: any[], item: any): boolean {
        return array.length != 0 && array.indexOf(item) > -1;
    }

    /**
     * Removes an element in a given array.
     * @param array The target array.
     * @param item Item to remove.
     */
    static remove(array: any[], item: any) {
        const tempArray = array.filter(t => t !== item);
        array.splice(0, array.length);
        tempArray.forEach(t => array.push(t));
    }

    /**
     * Removes the items which match the given matcher function.
     * @param array The array to update.
     * @param matcherFn The matcher function.
     */
    static removeWhere(array: any[], matcherFn: (item: any) => boolean) {
        const tempArray = array.filter(t => !matcherFn(t));
        array.splice(0, array.length);
        tempArray.forEach(t => array.push(t));
    }

    /**
     * Filter array items and retains only items which math the given matcher function.
     * @param array The array to update.
     * @param matcherFn The matcher function.
     */
    static retainWhere(array: any[], matcherFn: (item: any) => boolean) {
        const tempArray = array.filter(t => matcherFn(t));
        array.splice(0, array.length);
        tempArray.forEach(t => array.push(t));
    }

    static clone<T>(array: T[]) {
        if(array == null){
            return null;
        }
        return array.map(x => x);
    }

    static indexOf<T>(array: T[], element: T, startIndex: number = 0, endIndex: number = array.length): number {
        return array.slice(startIndex, endIndex).indexOf(element);
    }


    static containsInRange<T>(array: T[], element: T, startIndex: number = 0, endIndex: number = array.length): boolean {
        return ArrayHelpers.indexOf(array, element, startIndex, endIndex) > -1;
    }

    static copy<T>(source: T[], dest: T[], sourceStart: number = 0, destStart: number = 0){
        for(let i = sourceStart; i < source.length; i++){
            dest[destStart + i] = source[i];
        }
    }
}