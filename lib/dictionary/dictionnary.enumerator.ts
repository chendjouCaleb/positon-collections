
import {ListEnumerator} from "..";
import {IDictionaryEnumerator, KeyPairValue} from "../interface/dictionary.interface";



export class ListDictionaryEnumerator<TKey, TValue> extends ListEnumerator<KeyPairValue<TKey, TValue>>
    implements IDictionaryEnumerator<TKey, TValue> {
}


export class DictionaryEnumerator<TKey, TValue> implements IDictionaryEnumerator<TKey, TValue> {
    current(): KeyPairValue<TKey, TValue> {
        return undefined;
    }

    done(): boolean {
        return false;
    }

    hasMore(): boolean {
        return false;
    }

    moveNext(): boolean {
        return false;
    }

    reset(): void {
    }
}