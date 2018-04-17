import React, { Component } from 'react';
import { Dropdown, Menu, Button, Container, Header } from 'semantic-ui-react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

import book from '../images/book.gif';
import movie from '../images/movie.gif';
import hiking from '../images/hiking.gif';
import food from '../images/food.gif';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div className="background">
          <div className="transbox">
            <h1 className="title">Rex: Friends' recommendation is alwasy better</h1>
          </div>
        </div>
        <div className="row">
          <div className="logo">
            <div> BOOKS</div>
            <Link to="/entry">
              <img src={book} width="280px" height="250px" />
            </Link>
          </div>
          <div className="logo">
            <div> MOVIES</div>
            <img src={movie} width="280px" height="250px" />
          </div>
          <div className="logo">
            <div> HIKING ROUTS</div>
            <img src={hiking} width="280px" height="250px" />
          </div>
          <div className="logo">
            <div> RESTAURANTS</div>
            <img src={food} width="280px" height="250px" />
          </div>
        </div>
      </Container>
    );
  }
}

// const Category = () => {
//   const options = [{ key: 1, text: 'Books', value: 1 }, { key: 2, text: 'Movies', value: 2 }];
//   return (
//     <Menu compact>
//       <Dropdown text="Category" options={options} simple item />
//     </Menu>
//   );
// };

// const FindRecommendationButton = () => (
//   <Link to="/browse">
//     <Button>
//       Find Something from <Category />
//     </Button>
//   </Link>
// );

// const NewRecommendationButton = () => (
//   <Container>
//     <Link to="/entry">
//       <Button>Enter New Recommendation </Button>{' '}
//     </Link>
//   </Container>
// );

// const Home = () => (
//   <Container>
//     <div className="new-recommendation-button">
//       <NewRecommendationButton />
//     </div>
//     <div className="find-recommendation-button">
//       <FindRecommendationButton />
//     </div>
//   </Container>
// );

// export default Home;
