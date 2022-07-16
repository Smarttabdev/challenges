import React from 'react'
import './App.css'
import Booklist from '../src/booklist'
import { BookContext, BookType } from './contexts/BookContext';
import BookApi from './services/Book';

function App() {
  const [books, setBooks] = React.useState<Array<BookType>>([]);
  const pushBooks = (newBooks: Array<BookType>, isReset: boolean) => {
      if ( isReset )
          setBooks(newBooks);
      else
          setBooks([...books, ...newBooks]);
  };

  React.useEffect(() => {
    BookApi.getList((res: any) => {
      setBooks(res);
    })
  }, []);

  return (
    <BookContext.Provider value={{list: books, push: pushBooks}}>
      <Booklist></Booklist>
    </BookContext.Provider>
  )
}

export default App
