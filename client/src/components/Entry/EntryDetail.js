import React from 'react';

import BookDetail from './BookDetail';
import RecommendationEntry from './RecommendationEntry';
import NavBar from '../NavBar';

const EntryDetail = (props) => {
  const target = props.location.state.result;
  console.log('entry detail fired', target)
  return (
    <div>
      <NavBar />
      <div>
        <BookDetail result={target} />
      </div>
      <div>
        <RecommendationEntry entry={target} />
      </div>
    </div>
  );
};

export default EntryDetail;
