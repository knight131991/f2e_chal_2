import React from "react";
// import PropTypes from 'prop-types'
// import { Button } from "antd";
import Button from "./Button";
import Card from "./Card";
// import styled from "styled-components";
import FlexBox from "./FlexBox";
import { ReactComponent as Like } from "../images/Like/Outlined.svg";

function InfoCard({ title, content, btnName, onClickBtn, onClickLike }) {
  return (
    <Card row justify="space-between">
      <FlexBox>
        <FlexBox>{title}</FlexBox>
        {content}
      </FlexBox>
      <FlexBox justify="space-between" align="flex-end">
        <Like onClick={onClickLike} />
        <Button onClick={onClickBtn}>{btnName}</Button>
      </FlexBox>
    </Card>
  );
}

InfoCard.propTypes = {};

export default InfoCard;
