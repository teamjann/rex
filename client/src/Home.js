import React from 'react';
import { Button } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';

const options = [{ key: 1, text: 'Books', value: 1 }, { key: 2, text: 'Movies', value: 2 }];

const Category = () => (
  <Menu compact>
    <Dropdown text="Dropdown" options={options} simple item />
  </Menu>
);

const FindRec = () => (
  <Button>
    Find Something from <Category />
  </Button>
);
const NewRec = () => <Button>Enter New Recommendation </Button>;
const Home = () => (
  <div>
    <h1>Rex</h1>
    <div>
      <div>
        <NewRec />
      </div>
      <div>
        <FindRec />
      </div>
    </div>
  </div>
);

export default Home;
