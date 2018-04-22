import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import {
  List,
  Item,
  Icon,
  Container,
  Button,
  Confirm
} from "semantic-ui-react";
import { METHODS } from "http";

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  margin-left: 15%;
`;
const RecommendationListItem = props => (
  <MenuBar>
    <div>
      <Icon size="large" name="user circle" />
    </div>

    <div style={{ fontWeight: "bold" }}>
      <div>
        Recommender Name:{" "}
        {
          <span style={{ fontWeight: "normal" }}>
            {props.recommendation.recommender_name}
          </span>
        }{" "}
      </div>
      <div>
        Date:{" "}
        {
          <span
            style={{
              fontWeight: "normal"
            }}
          >
            {moment(props.recommendation.date_added).format("L")}
          </span>
        }{" "}
      </div>
      <div>
        Comments:{" "}
        <span style={{ fontWeight: "normal" }}>
          {" "}
          {props.recommendation.comment}
        </span>
      </div>
    </div>
  </MenuBar>

  // <div>
  //   <List horizontal>
  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Date</List.Header>
  //         {moment(props.recommendation.date_added).format("L")}
  //       </List.Content>
  //     </List.Item>

  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Recommender</List.Header>
  //         {props.recommendation.recommender_name}
  //       </List.Content>
  //     </List.Item>

  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Comments</List.Header>
  //         {props.recommendation.comment}
  //       </List.Content>
  //     </List.Item>
  //   </List>
  // </div>
);

export default RecommendationListItem;
