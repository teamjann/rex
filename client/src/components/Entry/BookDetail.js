import React from 'react';
import { Rating, Header, Container, Image } from 'semantic-ui-react';

const BookDetail = (props) => {
  const {
    title, authors, rating, imageUrl, description, yearPublished, link,
  } = props.result;
  return (
    <div>
      <Container>
        <h1>{title}</h1>
        <Header size="small">{authors}</Header>
        <Rating defaultRating={rating} icon="star" disabled maxRating={5} />
        <span className="rating-span">{rating} / 5</span>
        <Image as="a" href={link} src={imageUrl} size="small" floated="left" />
        {description.map(paragraph => <p>{paragraph}</p>)}
        <p>Year Published: {yearPublished}</p>
      </Container>
    </div>
  );
};

export default BookDetail;
