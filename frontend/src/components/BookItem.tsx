import React from "react";

import classes from './BookItem.module.css'

type BookItemProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  onChoose: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = (props) => {
  const chooseBookHandler = () => {
    props.onChoose(props.id)
  }
  return (
    <div className={classes.container} onClick={chooseBookHandler}>
      <h1>{props.title}</h1>
      <img src={props.image} alt="Book Image"/>
      <h1>${props.price}</h1>
    </div>
  )
}

export default BookItem
