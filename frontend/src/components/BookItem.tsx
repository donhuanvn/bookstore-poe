import React from "react";

import classes from './BookItem.module.css'

type Book = {
  id: string;
  title: string;
  price: string;
  image: string;
}

const BookItem: React.FC<Book> = (props) => {
  return (
    <div className={classes.container}>
      <h1>{props.title}</h1>
      <img src={props.image} alt="Book Image"/>
      <h1>${props.price}</h1>
    </div>
  )
}

export default BookItem
