import React from "react";
// import PropTypes from 'prop-types'
// import { Button } from "antd";
import Button from "./Button";
import Card from "./Card";
// import styled from "styled-components";
import FlexBox from "./FlexBox";
import { ReactComponent as Like } from "../images/Like/Outlined.svg";
import styled from "styled-components";

function InfoCard({
  title,
  content,
  btnName,
  onClickBtn,
  onClickLike,
  className,
  onClick,
}) {
  return (
    <Card row justify="space-between" className={className} onClick={onClick}>
      <FlexBox>
        <FlexBox>{title}</FlexBox>
        {content}
      </FlexBox>
      <FlexBox justify="space-between" align="flex-end">
        <Like onClick={onClickLike} />
        <Button
          onClick={(e) => {
            onClickBtn();
            e.stopPropagation();
          }}
        >
          {btnName}
        </Button>
      </FlexBox>
    </Card>
  );
}

InfoCard.propTypes = {};

export default styled(InfoCard)`
  cursor: pointer;
`;
