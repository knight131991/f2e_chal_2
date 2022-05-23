import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "../FlexBox";
import NoDataHint from "../NoDataHint";

const Container = styled(FlexBox)`
  overflow: auto;
  margin-top: 16px;
  padding-right: 2px;
  & > * {
    margin-bottom: 16px;
  }
`;

function ListContainer({ data }) {
  return <Container>{data.length ? data : <NoDataHint />}</Container>;
}

ListContainer.propTypes = { data: [] };
ListContainer.propTypes = { data: PropTypes.array };

export default ListContainer;
