import React from 'react';
import { Grid, Image, Rating } from 'semantic-ui-react';

const GridImage = () => (
  <Grid>
    <Grid.Column width={6}>
      <Image src="/assets/images/wireframe/image.png" />
    </Grid.Column>
  </Grid>
);

const Ratings = () => <Rating defaultRating={3} maxRating={5} disabled />;

const BookDetail = () => (
  <div className="book-detail">
    <h1 className="book-title">Harry Porter</h1>
    <div className="book-image">
      <GridImage />
    </div>
    <div className="book-rating">
      <Ratings />
    </div>
    <div className="book-description">
      <h3>It is a good book!</h3>
    </div>
  </div>
);

export default BookDetail;
