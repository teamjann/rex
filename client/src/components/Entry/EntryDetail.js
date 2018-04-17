import React from "react";
import BookDetail from "./BookDetail";
import RecommendationEntry from "./RecommendationEntry";
import { Container } from "semantic-ui-react";

const EntryDetail = props => (
  <div>
    <div>
      <BookDetail result={props.result} />
    </div>
    <div>
      <RecommendationEntry entry={props.result} />
    </div>
  </div>
);

export default EntryDetail;
