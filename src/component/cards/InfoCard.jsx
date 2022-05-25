import React from "react";
// import PropTypes from 'prop-types'
import Button from "../Button";
import Card from "./Card";
// import styled from "styled-components";
import FlexBox from "../FlexBox";
// import { ReactComponent as Like } from "../../images/Like/Outlined.svg";
import styled from "styled-components";
import BlodBlockText from "../texts/BlodBlockText";

const StyledBtn = styled(Button)`
  padding: 12px 32px;
`;

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
  hideBtn,
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
        {!hideBtn && (
          <StyledBtn
            onClick={(e) => {
              onClickBtn();
              e.stopPropagation();
            }}
          >
            {btnName}
          </StyledBtn>
        )}
      </FlexBox>
    </Card>
  );
}

InfoCard.propTypes = {};

export default styled(InfoCard)`
  cursor: pointer;
`;
