import React from "react";
// import PropTypes from 'prop-types'
import Button from "../Button";
import Card from "./Card";
// import styled from "styled-components";
import FlexBox from "../FlexBox";
// import { ReactComponent as Like } from "../../images/Like/Outlined.svg";
import styled from "styled-components";
import BlodBlockText from "../texts/BlodBlockText";

function InfoCard({
  title,
  content,
  btnName,
  onClickBtn,
  onClickLike,
  checked,
  className,
  extraTitle,
  onClick,
}) {
  return (
    <Card
      row
      justify="space-between"
      className={className}
      onClick={onClick}
      checked={checked}
    >
      <FlexBox>
        <FlexBox row flex align="center">
          <BlodBlockText>{title}</BlodBlockText>
          {extraTitle}
        </FlexBox>
        {content}
      </FlexBox>
      <FlexBox justify="flex-end" align="flex-end">
        {/* <Like onClick={onClickLike} /> */}
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
