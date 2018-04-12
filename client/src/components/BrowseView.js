import React, { Component } from 'react';
import { Container, Header, Icon, Menu } from 'semantic-ui-react';

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
      </Container>
    );
  }
}

export default BrowseView;
