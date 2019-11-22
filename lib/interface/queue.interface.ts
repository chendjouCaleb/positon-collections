import {ICollection} from "./collections.interface";

/**
 * A collection designed for holding elements prior to processing.
 * Besides basic {@link ICollection} operations,
 * queues provide additional insertion, extraction, and inspection
 * operations.
 *
 * @param <T> the type of elements held in this collection
 */
export interface IQueue<T> extends ICollection<T>{
    /**
     * Inserts the specified element into this queue if it is possible to do so
     * immediately without violating capacity restrictions, returning
     * {@code true} upon success and throwing an {@code IllegalStateException}
     * if no space is currently available.
     *
     * @param e the element to add
     * @return {@code true} (as specified by {@link ICollection#add})
     * @throws IllegalStateException if the element cannot be added at this
     *         time due to capacity restrictions
     *
     * @throws NullPointerException if the specified element is null and
     *         this queue does not permit null elements
     * @throws IllegalArgumentException if some property of this element
     *         prevents it from being added to this queue
     */
    add(e: T): boolean;


    /**
     * Inserts the specified element at the tail of this queue.
     * {@code true} upon success and throwing an {@code IllegalStateException}
     * if no space is currently available.
     *
     * @param item the element to add
     * @return {@code true} (as specified by {@link ICollection#add})
     * @throws IllegalStateException if the element cannot be added at this
     *         time due to capacity restrictions
     *
     * @throws {@link NullPointerException} if the specified element is null and
     *         this queue does not permit null elements
     * @throws IllegalArgumentException if some property of this element
     *         prevents it from being added to this queue
     */
    enqueue(item: T): boolean;

    /**
     * Removes the object at the head of the queue and returns it.
     * @throws InvalidOperationException If the queue is empty.
     * @return The element at the head of the queue.
     */
    dequeue(): T


    /**
     * Retrieves, but does not remove, the head of this queue,
     * @throws InvalidOperationException If the queue is empty.
     *
     * @return the head of this queue.
     */
    peek(): T

}