import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import BookDetail from './Entry/BookDetail';

const BookItemContainer = styled.div`
  display: flex;
  height: auto;
  border: 1px solid grey;
  border-width: hairline;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
`;

const BookItem = ({
  id,
  book,
  recommendations,
  markCompleted,
  deleteBook,
  category,
  handleClick
}) => {
  const { title, description, thumbnail_url } = book;
  const firstRecommender = recommendations[0];

  return (
    <li>
      <BookItemContainer>
        <div style={{ width: '20%' }}>
          Recommenders: {recommendations.length}
        </div>
        <div
          style={{
            width: '12%',
            padding: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={`${thumbnail_url}`}
            alt=""
            style={{ height: '100px', borderRadius: '20px' }}
          />
        </div>
        <div style={{ width: '58%', display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '100%' }}>
            <h1 onClick={() => handleClick({ book, recommendations, id })}>
              {title}
            </h1>
            {description}
          </div>
          <div style={{ width: '100%', alignSelf: 'flex-end' }}>
            <span style={{ fontWeight: 'bold' }}>Recommended By:</span>{' '}
            {firstRecommender.recommender_name}{' '}
            <span style={{ fontWeight: 'bold' }}>Date:</span>{' '}
            {firstRecommender.date_added}
          </div>
        </div>
        <div
          style={{
            width: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon
            name="check"
            onClick={() => markCompleted({ category, id })}
            size="big"
          />
          <Icon
            name="trash"
            onClick={() => deleteBook({ category, id })}
            size="big"
          />
        </div>
      </BookItemContainer>
    </li>
  );
};

export default BookItem;
