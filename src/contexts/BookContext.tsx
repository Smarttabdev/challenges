import {createContext} from 'react';
export type BookType = {
    id: number,
    title: string,
    author: string,
}
type BookContextType = {
    list: Array<BookType>,
    push: (msg: Array<BookType>, isReset: boolean) => void
};

const BookContextDefaultValues: BookContextType = {
    list: [],
    push: (books: Array<BookType>, isReset: boolean) => {}
}
export const BookContext = createContext<BookContextType>(BookContextDefaultValues);