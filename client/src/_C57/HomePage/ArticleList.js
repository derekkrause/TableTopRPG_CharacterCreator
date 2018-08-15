import React from "react";
import CardHeader from "./Cells/CardHeader";
import ArticleCell from "./Cells/ArticleCell";

const ArticleList = props => {
  return (
    <div className="jr-card jr-card-full-height">
      <CardHeader cardTitle={props.cardTitle} cardSubTitle={props.cardSubTitle} />
      <ArticleCell />
      <ArticleCell />
    </div>
  );
};

export default ArticleList;
