import React from 'react';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
`;

const SortMenu = ({
  activeItem, showCompleted, handleItemClick, handleCompletedClick,
}) => (
  <MenuBar>
    <Menu text className="browse-menu">
      <Menu.Item header>Sort By</Menu.Item>
      <div className="browse-menu-items">
        <Menu.Item
          name="Recommendations"
          active={activeItem === 'Recommendations'}
          onClick={handleItemClick}
        />
        <Menu.Item name="Oldest" active={activeItem === 'Oldest'} onClick={handleItemClick} />
        <Menu.Item name="Newest" active={activeItem === 'Newest'} onClick={handleItemClick} />
        <Menu.Item
          name="Show Completed"
          className="completedOption"
          active={showCompleted}
          onClick={handleCompletedClick}
        />
      </div>
    </Menu>
  </MenuBar>
);

export default SortMenu;
