import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ListItem from './ListItem';
import BookDetail from '../Entry/BookDetail';

const CheckOut = () => <Button>Checkout</Button>;

const MarkAsComplete = () => <Button>Mark as done</Button>;

const RemoveFromList = () => <Button>Remove from list</Button>;

const AddRecommender = () => <Button>Add Recommender</Button>;

class List extends Component {
  state = {
    books: [
      { date: '2/10/2018', recommender: 'Mike', comments: 'Like the story a lot!' },
      { date: '3/02/2018', recommender: 'Shu', comments: 'Fun to read!' },
      { date: '4/10/2018', recommender: 'Evan', comments: 'Interesting book!' },
    ],
  };

  render() {
    return (
      <div>
        <BookDetail />
        <ul>{this.state.books.map(book => <ListItem book={book} />)}</ul>

        <CheckOut />

        <MarkAsComplete />

        <RemoveFromList />

        <AddRecommender />
      </div>
    );
  }
}

export default List;
