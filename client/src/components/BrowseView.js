import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Header, Icon, Menu } from 'semantic-ui-react';

const BookList = styled.ul`
  width: 100%;
  padding: 5px;
  list-style: none;
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
`;

const BookItem = styled.div`
  display: flex;
  height: auto;
  border: 1px solid grey;
  border-width: hairline;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
`;

class BrowseView extends Component {
  state = { activeItem: 'Recommendations' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="book" circular />
          <Header.Content>Books</Header.Content>
        </Header>

        <MenuBar>
          <Menu text>
            <Menu.Item header>Sort By</Menu.Item>
            <Menu.Item
              name="Recommendations"
              active={activeItem === 'Recommendations'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Oldest"
              active={activeItem === 'Oldest'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Newest"
              active={activeItem === 'Newest'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </MenuBar>

        <BookList>
          <li>
            <BookItem>
              <div style={{ width: '20%' }}>Recommenders: 5</div>
              <div
                style={{
                  width: '12%',
                  padding: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src="https://images.gr-assets.com/books/1392528568l/12067.jpg"
                  alt=""
                  style={{ height: '100px', borderRadius: '20px' }}
                />
              </div>
              <div style={{ width: '58%', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '100%' }}>
                  <h1>Title</h1>
                  Description
                </div>
                <div style={{ width: '100%', alignSelf: 'flex-end' }}>
                  <span style={{ fontWeight: 'bold' }}>Recommended By:</span> Mike{' '}
                  <span style={{ fontWeight: 'bold' }}>Date:</span> 1/1/10
                </div>
              </div>
              <div
                style={{
                  width: '10%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="check" size="big" />
                <Icon name="trash" size="big" />
              </div>
            </BookItem>
          </li>
        </BookList>
      </Container>
    );
  }
}

export default BrowseView;
