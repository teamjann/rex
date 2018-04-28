import React from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';

// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

// import { Icon } from 'semantic-ui-react';

// const NavBar = () => (
//   <header id="header">
//     <h1>
//       <Link to="/home">
//         <a>Rex</a>
//       </Link>
//     </h1>

const NavBar = () => (
  <header id="header">
    <h1 className="nav-title">
      <Link to="/home">Rex</Link>
    </h1>
    <span className="nav-item">
      <Link to="/browse">My Recommendations</Link>
    </span>
    <nav id="nav">
      <ul>
        <li className="login">
          <span>
            <a href="/auth/logout">Logout</a>
          </span>
        </li>
      </ul>
    </nav>
  </header>
);

export default NavBar;

/* {<Navbar.Collapse>
      <Nav>
        <NavItem eventKey={2} href="#">
          Profile
        </NavItem>
        <NavDropdown eventKey={3} title="My List" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>
            <Link to="/browse">Books </Link>
          </MenuItem>
          <MenuItem eventKey={3.2}>
            <Link to="/browse">Food</Link>
          </MenuItem>
          <MenuItem eventKey={3.3}>
            <Link to="/browse"> Movies</Link>
          </MenuItem>
          <MenuItem eventKey={3.3}>
            <Link to="/browse">Music </Link>
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/entry">
            <Icon name="plus" size="large" />
          </Link>
        </NavItem>
        <NavItem eventKey={1.2}>Log out</NavItem>
      </Nav>
    </Navbar.Collapse>} */
