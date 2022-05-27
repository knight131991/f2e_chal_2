import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListContainer from "../list/ListContainer";
import RouteInfoCard from "../cards/RouteInfoCard";

const ListTitle = styled.span`
  font-size: 16px;
`;

function RouteInfoListGroup({
  routInfos,
  refEle,
  selectedRouteId,
  onClickCard,
  onClickCardBtn,
  hideCardBtn,
}) {
  return (
    <>
      <ListTitle>共 {routInfos.length} 條路線</ListTitle>
      <ListContainer
        data={routInfos.map(
          (
            {
              RouteName,
              CyclingLength,
              RoadSectionStart,
              RoadSectionEnd,
              Geometry,
              Direction,
            },
            id
          ) => (
            <div key={RouteName} ref={(ele) => (refEle.current.list[id] = ele)}>
              <RouteInfoCard
                key={RouteName}
                title={RouteName}
                direction={Direction}
                hideBtn={hideCardBtn}
                onClick={() => onClickCard(Geometry, id)}
                onClickBtn={() =>
                  onClickCardBtn({
                    name: RouteName,
                    start: RoadSectionStart,
                    end: RoadSectionEnd,
                    length: CyclingLength,
                    direction: Direction,
                    geometry: Geometry,
                  })
                }
                length={CyclingLength}
                checked={selectedRouteId === id}
                start={RoadSectionStart}
                end={RoadSectionEnd}
              />
            </div>
          )
        )}
      />
    </>
  );
}

RouteInfoListGroup.defaultProps = {
  routInfos: [],
  refEle: null,
  selectedRouteId: undefined,
  onClickCard: () => {},
  onClickCardBtn: () => {},
  hideCardBtn: false,
};
RouteInfoListGroup.propTypes = {
  routInfos: PropTypes.array,
  refEle: PropTypes.object,
  selectedRouteId: PropTypes.number,
  onClickCard: PropTypes.func,
  onClickCardBtn: PropTypes.func,
  hideCardBtn: PropTypes.bool,
};

export default RouteInfoListGroup;
