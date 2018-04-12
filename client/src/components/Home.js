import React from 'react';
import { Button } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';

const Category = () => {
  const options = [{ key: 1, text: 'Books', value: 1 }, { key: 2, text: 'Movies', value: 2 }];
  return (
    <Menu compact>
      <Dropdown text="Category" options={options} simple item />
    </Menu>
  );
};

const FindRecommendationButton = () => (
  <Button>
    Find Something from <Category />
  </Button>
);

const NewRecommendationButton = () => <Button>Enter New Recommendation </Button>;

const Home = () => (
  <div>
    <h1>Rex</h1>
    <div className="new-recommendation-button">
      <NewRecommendationButton />
    </div>
    <div className="find-recommendation-button">
      <FindRecommendationButton />
    </div>
  </div>
);

export default Home;
