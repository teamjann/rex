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
  <div className="bookDetail">
    <div className="bookTitle">Harry Porter</div>
    <div className="bookImage">
      <GridImage />
    </div>
    <div className="bookRating">
      <Ratings />
    </div>
    <div className="bookIntro">
      <p>It is a good book!</p>
    </div>
  </div>
);

export default BookDetail;
