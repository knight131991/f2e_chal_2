import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import GMap from "../../../component/gMap/GMap";
import { Steps } from "antd";
import styled from "styled-components";
import BikeMarker from "../../../component/gMap/BikeMarker";
import useRWD from "../../../hooks/useRWD";
import BlodBlockText from "../../../component/texts/BlodBlockText";
import Card from "../../../component/cards/Card";
import HDivider from "../../../component/HDivider";
import StateLabel from "../../../component/StateLabel";
import styleParams from "../../../constant/styleParams";
import { ReactComponent as Ellipse } from "../../../images/icon/Ellipse.svg";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import RouteStartMarker from "../../../component/gMap/RouteStartMark";
import RouteEndMarker from "../../../component/gMap/RouteEndMark";
import SwitchableMainContentLayout from "../../../component/SwitchableMainContentLayout";
import screenEnum from "../../../constant/screenEnum";
import Button from "../../../component/Button";

const Description = styled(BlodBlockText)`
  margin-bottom: 16px;
`;

const Label = styled.div`
  color: #757575;
  margin-bottom: 8px;
  font-size: 16px;
`;

const AddressWrapper = styled.div`
  margin: 8px 0 16px;
  color: ${styleParams.text};
  font-weight: 400;
`;

const StepText = styled.span`
  font-size: 16;
  font-weight: 400;
  color: ${styleParams.text};
`;

const LenInfoWrapper = styled(FlexBox)`
  font-size: 14px;
  color: #757575;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const LenInfo = styled.span`
  font-size: 16px;
  font-weight: 700;
  color ${styleParams.grayText};
`;

const RouteInfoWrapper = styled(FlexBox)`
  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

const StyledSteps = styled(Steps)`
  margin: 16px 0 8px;
  & > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail {
    padding: 0;
    top: 14px;
    left: 15px;

    &:after {
      width: 3px;
    }
  }
`;

const StyleLink = styled(Button)`
  color: #df9300;

  &:hover {
    color: #df9300;
  }
`;

function FinishPage({
  stopInfo,
  routeInfo: {
    name: routeName,
    start,
    end,
    length: routeLen,
    direction,
    geometry,
  },
}) {
  const { screen } = useRWD();

  const [map, setMap] = useState();
  const [maps, setMaps] = useState();

  useEffect(() => {
    const { lat, lng } = stopInfo;
    fitGMapBounds(map, maps, [...geometry, { lat, lng }]);
  }, [geometry, stopInfo, map, maps]);

  return (
    <SwitchableMainContentLayout
      switchMode={screen <= screenEnum.md}
      hideBtn
      leftContent={
        <>
          <Description>規劃完成，您的挑戰資訊如下</Description>
          <Card>
            <Label>挑戰名稱</Label>
            <BlodBlockText>{routeName}</BlodBlockText>
            <HDivider />
            <FlexBox row flex justify="space-between" align="center">
              <FlexBox>
                <Label>起點資訊</Label>
                <BlodBlockText>{stopInfo.name}</BlodBlockText>
                <AddressWrapper>{stopInfo.address}</AddressWrapper>
              </FlexBox>
              <StyleLink
                type="link"
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&destination=${stopInfo.lat},${stopInfo.lng}`}
              >
                導航至起點
              </StyleLink>
            </FlexBox>
            <Label>路線資訊</Label>
            <RouteInfoWrapper row align="center">
              <BlodBlockText>{routeName}</BlodBlockText>
              <StateLabel label={direction} />
            </RouteInfoWrapper>
            <StyledSteps direction="vertical">
              <Steps.Step
                icon={<Ellipse />}
                title={<StepText> {start}</StepText>}
                status="wait"
              />
              <Steps.Step
                icon={<Ellipse />}
                title={<StepText>{end}</StepText>}
              />
            </StyledSteps>
            <LenInfoWrapper row align="center">
              <span>總長</span> <LenInfo>{routeLen}公里</LenInfo>
            </LenInfoWrapper>
          </Card>
        </>
      }
      rightContent={
        <GMap
          steps={geometry}
          onMount={(_map, _maps) => {
            setMap(_map);
            setMaps(_maps);
          }}
        >
          <BikeMarker lat={stopInfo.lat} lng={stopInfo.lng} />
          {[
            { ...geometry[0], Component: RouteStartMarker },
            { ...geometry[geometry.length - 1], Component: RouteEndMarker },
          ].map(({ lat, lng, Component }, id) => (
            <Component lat={lat} lng={lng} key={id} />
          ))}
        </GMap>
      }
    />
  );
}

FinishPage.defaultProps = {
  stopInfo: {},
  routeInfo: {},
};
FinishPage.propTypes = {
  stopInfo: PropTypes.objectOf(PropTypes.any),
  routeInfo: PropTypes.objectOf(PropTypes.any),
};

export default FinishPage;
