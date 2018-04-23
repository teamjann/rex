import moment from "moment";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import BookDetail from "./Entry/BookDetail";
import "./BookItem.css";

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
      <BookItemContainer>
        <span className="recommender">
          Recommenders: {props.recommendations.length}
        </span>
        <div className="book-image-container">
          <img className="book-image" src={`${thumbnail_url}`} alt="" />
        </div>
        <div className="book-detail-container">
          <div className="book-title-container">
            <h2 className="book-title" onClick={props.handleClick}>
              <Link to={{ pathname: `/browse/${props.id}`, query: props }}>
                {title}
              </Link>
            </h2>
            <p className="book-description">{description}</p>
          </div>
          <div className="book-recommender-container">
            <span className="book-recommender-name">Recommended By:</span>{" "}
            {firstRecommender.recommender_name}{" "}
            <span className="book-recommended-date">Date:</span>{" "}
            {moment(firstRecommender.date_added).format("L")}
          </div>
        </div>
        <div className="book-action-container">
          <Icon name="check" size="big" />
          <Icon name="trash" size="big" />
        </div>
      </BookItemContainer>
    </li>
  );
};

export default BookItem;
