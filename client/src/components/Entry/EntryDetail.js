import React from "react";
import BookDetail from "./BookDetail";
import RecommendationEntry from "./RecommendationEntry";
import { Container } from "semantic-ui-react";
import NavBar from "../NavBar";
const EntryDetail = props => {
  console.log("props", props);
  const target = props.location.state.result;
  return (
    <div>
      <NavBar />
      <div>
        <BookDetail result={target} />
      </div>
      <div>
        <RecommendationEntry entry={target} />
      </div>
    </div>
  );
};

export default EntryDetail;
