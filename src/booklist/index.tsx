import React, {useRef, FC, useLayoutEffect } from 'react'
import multiply from '../assets/images/multiply.png'
import { BookContext, BookType } from '../contexts/BookContext';
import BookApi from '../services/Book';

const Booklist  = () => {
    // context
    const bookContext = React.useContext(BookContext);

    // state
    const [title, setTitle] = React.useState<string>('');
    const [author, setAuthor] = React.useState<string>('');
    const [isValidTitle, setIsValidTitle] = React.useState<boolean>(true);
    const [isValidAuthor, setIsValidAuthor] = React.useState<boolean>(true);

    //useRef
    const titleEl = useRef<HTMLInputElement>(null);
    const authorEl = useRef<HTMLInputElement>(null);

    //book list data
    const listData = bookContext.list;
    if (
        titleEl &&
        titleEl.current 
    ){ console.log("current accessed")}

    // onchange input
    const onChangeInput = (value:string, setValue: (value: string)=>void, setValid: (valid: boolean)=>void) => {
        if ( value.trim() )
            setValid(true);
        else
            setValid(false);
        
        setValue(value);
    }

    // create book handler
    const onClickCreate = () => {

        if ( !title.trim() )
        {
            setIsValidTitle(false);
            titleEl.current?.focus();
            return;
        }

        if ( !author.trim() )
        {
            setIsValidAuthor(false);
            authorEl.current?.focus();
            return;
        }
    
        BookApi.create((savedBook: any)=>{
            bookContext.push([savedBook], false);
        }, {
            title,
            author,
        });
    }

    // delete book handler
    const onClickDelete = (id: number) => {
        BookApi.remove((res: any)=>{
            bookContext.push(
                [...bookContext.list.filter((book) =>book.id != id)], true
            );
        }, [id]);
    }


    //book list component
    const listComponent = (title: string, authorName: string, id: number) => {
        return (
                <div className='book-list' key={id}>
                    <div className='book-title'>{title}</div>
                    <div className='book-author'>{authorName}</div>
                    <div className='delete-icon' onClick={(e)=>onClickDelete(id)}>
                        <img src={multiply} alt="" />
                    </div>
                </div>
            )
        }

    return (
        <div className='container'>
            <div className='header'>
                <h4>My Reading List </h4>
            </div>
            <div className='wrap'>
                {listData.length ? null : <div className='text-notify'>There is no any book.<br/>Please create new book at here.</div>}
                {
                    listData.map((el, ind) => (
                        listComponent(el.title, el.author, el.id)
                    ))
                }
                <div className='form'>
                    <input  ref={titleEl} autoFocus value={title} onChange={(e)=>{onChangeInput(e.target.value, setTitle, setIsValidTitle)}} type="text" className={`form-control ${isValidTitle||'invalid'}`} placeholder='Book Title'/>
                    <p className={`${!isValidTitle||'invisible'} text-error`}>
                        Please provide book title.
                    </p>
                    <input type="text" value={author} onChange={(e)=>{onChangeInput(e.target.value, setAuthor, setIsValidAuthor)}} className={`form-control ${isValidAuthor||'invalid'}`} placeholder='Author' ref={authorEl}/>
                    <p className={`${!isValidAuthor||'invisible'} text-error`}>
                        Please provide book author.
                    </p>
                    <button className='create' onClick={onClickCreate}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Booklist