import React from "react";
import styled from "styled-components";
import Button from "../Button";
// import PropTypes from "prop-types";
import InfoCard from "./InfoCard";

const LengthWrapper = styled.div`
  color: #9e9e9e;
  margin-top: 8px;
  font-size: 14px;
`;

const StyledBtn = styled(Button)`
  padding: 12px 32px;
  font-size: 16px;
  margin-top: 16px;
  width: 128px;
`;

const AddressWrapper = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

function StopInfoCard({
  title,
  onClick,
  onClickBtn,
  checked,
  address,
  distance,
}) {
  return (
    <InfoCard
      title={title}
      // btnName="選擇站點"
      //   onClickBtn={onClickBtn}
      onClick={onClick}
      hideBtn
      checked={checked}
      content={
        <>
          <AddressWrapper>{address}</AddressWrapper>
          <LengthWrapper>
            距離 {(Math.round(distance * 100) / 100).toFixed(2)} 公里
          </LengthWrapper>
          <StyledBtn onClick={onClickBtn}>選擇站點</StyledBtn>
        </>
      }
    />
  );
}

StopInfoCard.propTypes = {};

export default StopInfoCard;
