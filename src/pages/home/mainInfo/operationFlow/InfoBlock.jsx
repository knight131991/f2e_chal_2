import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../../component/FlexBox";
import styled from "styled-components";
import PText from "../../../../component/texts/PText";

const Container = styled(FlexBox)`
  max-width: 340px;
`;

const OrderIcon = styled(FlexBox)`
  position: relative;
`;

const StyledOrder = styled(PText)`
  position: absolute;
  left: -18px;
  font-size: 32px;
  font-weight: 700;
  line-height: 0.8;
  margin-right: 16px;
  transform: translateX(-100%);
`;

const StyledContent = styled(FlexBox)`
  text-align: center;
`;

function InfoBlock({ icon, order, title, content }) {
  return (
    <Container align="center">
      <OrderIcon row>
        <StyledOrder>{order}</StyledOrder>
        {icon}
      </OrderIcon>
      <FlexBox>{title}</FlexBox>
      <StyledContent>{content}</StyledContent>
    </Container>
  );
}

InfoBlock.defaultProps = { icon: null, order: 0, title: "", content: "" };
InfoBlock.propTypes = {
  icon: PropTypes.node,
  order: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default InfoBlock;
