import React, { Component } from 'react';
import './Home.css';
import book from '../images/book.png';
import music from '../images/music.png';
import movie from '../images/movie.png';
import food from '../images/food.png';
import NavBar from './NavBar';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import BookDetail from './Entry/BookDetail';

const NewRecommendationButton = props => (
  <div className="rec-button">
    <Link to={{ pathname: '/entry', state: { userId: props.userId } }}>
      <button className="button special big">Add Recommendation</button>
    </Link>
  </div>
);

class Home extends Component {
  state = {
    category: '',
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="welcome">
          <h2>
            Welcome <span>{this.props.firstName}!</span>
          </h2>
        </div>
        <NewRecommendationButton userId={this.props.userId} />
        <div className="icon-list">
          <div className="half">
            <div className="image">
              <Link
                to={{
                  pathname: '/browse',
                  state: { userId: this.props.userId, category: 'foods' },
                }}
              >
                <img className="home-image" src="images/food.jpg" alt="" />
                <h3 className="top-left">
                  <span>My Food</span>
                </h3>
              </Link>
            </div>
            <div className="image">
              <Link
                to={{
                  pathname: '/browse',
                  state: { userId: this.props.userId, category: 'books' },
                }}
              >
                <img className="home-image" src="images/books.jpg" alt="" />
                <h3 className="top-left">
                  <span>My Books</span>
                </h3>
              </Link>
            </div>
          </div>
          <div className="half">
            <div className="image top">
              <Link
                to={{
                  pathname: '/browse',
                  state: { userId: this.props.userId, category: 'songs' },
                }}
              >
                <img className="home-image" src="images/music.jpg" alt="" />
                <h3 className="top-left">
                  <span>My Music</span>
                </h3>
              </Link>
            </div>
            <div className="image bottom">
              <Link
                to={{
                  pathname: '/browse',
                  state: { userId: this.props.userId, category: 'movies' },
                }}
              >
                <img className="home-image" src="images/tv.jpg" alt="" />
                <h3 className="top-left">
                  <span>My Movies</span>
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

// class FindRecommendationButton extends Component {
//   state = {
//     category: '',
//   };

//   render() {
//     return (
//       <div>
//         <Menu vertical>
//           <Dropdown text="Find Something from" pointing="left" className="link item">
//             <Dropdown.Menu>
//               <Dropdown.Item
//                 onClick={() => {
//                   this.setState({ category: 'books' });
//                   //<Redirect to="/browse" />;
//                   //redirect is like component
//                 }}
//               >
//                 <Link to="/browse">Books</Link>
//               </Dropdown.Item>
//               <Dropdown.Item>Movies</Dropdown.Item>
//               <Dropdown.Item>Restaurants</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Menu>
//       </div>
//     );
//   }
// }

export default Home;
