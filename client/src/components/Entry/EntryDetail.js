import React from 'react';

import BookDetail from './BookDetail';
import RecommendationEntry from './RecommendationEntry';
import NavBar from '../NavBar';

const EntryDetail = (props) => {
  const target = props.location.state.result;
  return (
    <div>
      <NavBar />
      <div className="detail-container">
        <BookDetail result={target} />
        <RecommendationEntry entry={target} userId={props.location.state.result.userId} />
      </div>
    </div>
  );
};

export default EntryDetail;
