import { Search, Dropdown } from "semantic-ui-react";
import React, { Component } from "react";
const axios = require("axios");
const { parseString } = require("xml2js");
class EntryView extends Component {
  state = {
    searchInput: "",
    apiList: [],
    dbList: []
  };
  apiCall(name) {
    axios.get("");
    const axios = require("axios");
    const { parseString } = require("xml2js");

    axios
      .get("https://www.goodreads.com/search/index.xml", {
        params: { q: "Harry Potter", key: "KB2ywbcnLjNO8pokkBVgg" }
      })
      .then(res => {
        parseString(res.data, (err, result) => {
          if (err) {
            return console.log(err);
          }
          books = result.GoodreadsResponse.search[0].results[0].work.map(
            book => {
              const rating = Number(book.average_rating[0]);
              const otherInfo = book.best_book[0];

              return {
                title: otherInfo.title[0],
                rating: rating,
                id: Number(otherInfo.id[0]._),
                author: otherInfo.author[0].name[0],
                imageUrl: otherInfo.small_image_url[0]
              };
            }
          );
          console.log(JSON.stringify(books[0]));
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <div className="page-title">
          <h1>Add Recommendations</h1>
        </div>
        <Search />
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchInput}
          onChange={e => this.setState({ searchInput: e.target.value })}
        />
        <button onClick={() => this.apiCall(this.state.searchInput)}>
          {" "}
          search{" "}
        </button>
      </div>
    );
  }
}

export default EntryView;
