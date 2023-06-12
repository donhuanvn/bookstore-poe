import React from "react";
import Highlighter from "react-highlight-words";
import classes from './BookItem.module.css'

type BookItemProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  titleSearchMatch?: { index: number; length: number };
  onChoose: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = (props) => {
  const chooseBookHandler = () => {
    props.onChoose(props.id)
  }

  return (
    <div className={classes.container} onClick={chooseBookHandler}>
      <h1>
        {!props.titleSearchMatch ? props.title :
          <Highlighter
            highlightClassName={classes['highlight-search-match']}
            searchWords={[
              props.title.slice(
                props.titleSearchMatch.index,
                props.titleSearchMatch.index + props.titleSearchMatch.length
              )
            ]}
            autoEscape={true}
            textToHighlight={props.title}
          />}
      </h1>
      <img src={props.image} alt="Book Image" />
      <h1>${props.price}</h1>
    </div>
  )
}

export default BookItem
