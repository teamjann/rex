import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import BookDetail from "./Entry/BookDetail";
import moment from "moment";
import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";

const BookItemContainer = styled.div`
  display: flex;
  height: auto;
  border: 1px solid grey;
  border-width: hairline;
  border-radius: 5px;
  padding: 15px;
  overflow: hidden;
`;

const BookItem = props => {
  console.log("bookItem Id", props.id);
  const { title, description, thumbnail_url } = props.book;
  const firstRecommender = props.recommendations[0];

  return (
    <li>
      <BookItemContainer style={{ marginBottom: "10px" }}>
        <span style={{ width: "15%" }}>
          Recommenders: {props.recommendations.length}
        </span>
        <div
          style={{
            width: "12%",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src={`${thumbnail_url}`}
            alt=""
            style={{
              height: "120px",
              borderRadius: "20px",
              marginRight: "100px"
            }}
          />
        </div>
        <div style={{ width: "58%", display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "100%" }}>
            <h2
              style={{ marginTop: "20px" }}
              onClick={() => props.handleClick(props)}
            >
              <Link to={{ pathname: `/browse/${props.id}`, query: props }}>
                {" "}
                {title}{" "}
              </Link>
            </h2>
            <p style={{ marginTop: "20px" }}>{description}</p>
          </div>
          <div
            style={{ width: "100%", alignSelf: "flex-end", marginTop: "20px" }}
          >
            <span style={{ fontWeight: "bold" }}>Recommended By:</span>{" "}
            {firstRecommender.recommender_name}{" "}
            <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Date:
            </span>{" "}
            {moment(firstRecommender.date_added).format("L")}
          </div>
        </div>
        <div
          style={{
            width: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="check" size="big" />
          <Icon name="trash" size="big" />
        </div>
      </BookItemContainer>
    </li>
  );
};

export default BookItem;
