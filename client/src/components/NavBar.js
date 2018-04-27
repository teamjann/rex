import React from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';

const NavBar = () => (
  <header id="header">
    <h1>
      <a>Rex</a>
    </h1>
    <nav id="nav">
      <ul />
    </nav>
    {/* {<NavItem eventKey={2} href="#">
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
        </nav>
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/entry">
              <Icon name="plus" size="large" />
            </Link>
          </NavItem>
          <NavItem eventKey={1.2}>Log out</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>} */}
  </header>
);

export default NavBar;
