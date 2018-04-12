import React, { Component } from "react";
import { Route, Link, Router, Switch } from "react-router-dom";
import "./App.css";

// import components
import Home from "./Home";
import BookInfoEntry from "./Entry/BookInfoEntry";
import BrowseDetail from "./Browse/BrowseDetail";

// // Styled component example
// const HomeSection = styled.section`
//   padding: 10px;
//   margin: 20px 50px;
//   width: 100%;
//   max-width: 800px;
//   height: 800px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: blue;
//   border: 1px solid black;
//   border-radius: 50px;
// `;

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/bookentry" component={BookInfoEntry} />
          <Route exact path="/bookbrowse" component={BrowseDetail} />
        </Router>
      </div>
    );
  }
}

export default App;

/* <div onClick={() => this.setState({ clicked: this.state.clicked + 1 })}>
        {this.state.clicked === 0 && <Home />}
        {this.state.clicked === 1 && <BookInfoEntry />}
        {this.state.clicked === 2 && <BrowseDetail />}
      </div> */
