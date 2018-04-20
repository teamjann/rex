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
  activeItem,
  showCompleted,
  handleItemClick,
  handleCompletedClick
}) => {
  return (
    <MenuBar>
      <Menu text>
        <Menu.Item header>Sort By</Menu.Item>
        <Menu.Item
          name="Recommendations"
          active={activeItem === 'Recommendations'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Oldest"
          active={activeItem === 'Oldest'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Newest"
          active={activeItem === 'Newest'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Show Completed"
          className="completedOption"
          active={showCompleted}
          onClick={handleCompletedClick}
        />
      </Menu>
    </MenuBar>
  );
};

export default SortMenu;
