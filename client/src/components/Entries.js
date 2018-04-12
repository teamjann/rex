import React from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import './Entries.css';


export default function Entries() {
  let results = [];
  const data = [
    {
      title: 'Good Omens',
      // thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51NtyVHtAmL._SX307_BO1,204,203,200_.jpg',
      // description: 'Lowemg awgm asd adgwetio AGwf gjoijdfa. asfegjo asdgojijwe. asdgweg agoijtj Awegoij Awef a asdgoj.',
      // rating: 4,
    },
    {
      title: 'Harry Potter and the Sorcer\'s Stone',
      // thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg',
      // description: 'Lowemg awgm asd adgwetio AGwf gjoijdfa. asfegjo asdgojijwe. asdgweg agoijtj Awegoij Awef a asdgoj.',
      // rating: 5,
    },
  ];
  const handleSearchChange = (e, { value }) => {
    const newResults = data.filter(book => book.title.includes(value));
    results = newResults;
  };

  return (
    <div>
      <div className="page-title">
        <h1>Add Recommendations</h1>
      </div>
      <Dropdown placeholder="Select Category" selection options={COMMON.categories} />
      <Search onSearchChange={handleSearchChange} results={data} />
    </div>
  );
}
