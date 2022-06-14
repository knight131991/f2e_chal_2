import React, { useCallback, useEffect, useState, useMemo } from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../component/FlexBox";
import cityList from "../../constant/cityList";
import GMap from "../../component/gMap/GMap";
import useGetBikeStopInfo from "../../hooks/useGetBikeStopInfo";
import Marker from "../../component/gMap/Marker";
import getPos from "../../utils/getPos";
import FlexSpin from "../../component/FlexSpin";
import EmptyResultHint from "../../component/EmptyResultHint";
import styled from "styled-components";
import PageContainer from "../../component/PageContainer";
import Toolbar from "../../component/toolbar/Toolbar";
import ModeSelector from "../planPage/ModeSelector";
import youbikeList from "../../constant/youbikeList";
import Divider from "../../component/toolbar/Divider";
import CollapsibleToolbarLayout from "../../component/toolbar/CollapsibleToolbarLayout";
import fitGMapBounds from "../../utils/fitGMapBounds";
import ToolbarComponent from "./ToolbarComponent";
import useRWD from "../../hooks/useRWD";
import screenEnum from "../../constant/screenEnum";
import SubToolbar from "../../component/toolbar/SubToolbar";
import StyleParams from "../../constant/styleParams";

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;
function BikeSpot(props) {
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo();
  const [city, setCity] = useState(cityList[0].value);
  const [youbikeVer, setYoubikeVer] = useState(youbikeList[0].value);
  const [curMode, setCurMode] = useState("rent");
  const [searchKey, setSearchKey] = useState("");
  const [searchKeyVal, setSearchKeyVal] = useState("");
  const [selectedStop, setSelectedStop] = useState();
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [noData, setNodata] = useState();
  const { screen } = useRWD();

  useEffect(() => {
    getBikeStopInfo({
      city,
      top: 60,
      search: searchKey,
      youbikeVer,
      noSearchResultCB: (flag) => setNodata(flag),
    });
    setSelectedStop();
  }, [city, getBikeStopInfo, searchKey, youbikeVer]);

  useEffect(() => {
    fitGMapBounds(
      map,
      maps,
      data.map((item) => getPos(item))
    );
  }, [data, map, maps]);

  const toolbarComponent = useCallback(
    (render) => (
      <ToolbarComponent
        city={city}
        onCityChange={setCity}
        youbikeVer={youbikeVer}
        onYoubikeChange={setYoubikeVer}
        searchKey={searchKeyVal}
        onSearch={setSearchKey}
        onSearchChange={setSearchKeyVal}
        render={render}
      />
    ),
    [city, setCity, youbikeVer, setYoubikeVer, searchKeyVal, setSearchKey]
  );

  const { screengatherthanlg } = useMemo(
    () => ({
      screengatherthanlg: screen >= screenEnum.lg,
      screengatherthanmd: screen >= screenEnum.md,
    }),
    [screen]
  );

  return (
    <PageContainer>
      <CollapsibleToolbarLayout
        toolbar={
          <>
            <Toolbar>
              <ModeSelector
                value={curMode}
                onChange={setCurMode}
                items={[
                  { value: "rent", label: "租借 Youbike" },
                  { value: "return", label: "歸還 Youbike" },
                ]}
              />
              {screengatherthanlg && (
                <>
                  <Divider />
                  <FlexBox flex row justify="space-between">
                    {toolbarComponent()}
                  </FlexBox>
                </>
              )}
            </Toolbar>
            {!screengatherthanlg &&
              toolbarComponent((selector, search) => (
                <SubToolbar>
                  {selector} {search}
                </SubToolbar>
              ))}
          </>
        }
        content={
          <FlexSpin spinning={loading}>
            <GMap
              onMount={(_map, _maps) => {
                setMap(_map);
                setMaps(_maps);
              }}
            >
              {noData ? (
                <StyledEmptyResultHint />
              ) : (
                data.map((item, id) => {
                  const { lat, lng } = getPos(item);
                  const {
                    AvailableRentBikes,
                    AvailableReturnBikes,
                    StationAddress,
                    StationName,
                  } = item;
                  const name = StationName.Zh_tw;
                  const address = StationAddress.Zh_tw;
                  return (
                    <Marker
                      key={id}
                      lat={lat}
                      lng={lng}
                      num={
                        curMode === "rent"
                          ? AvailableRentBikes
                          : AvailableReturnBikes
                      }
                      avaRent={AvailableRentBikes}
                      avaReturn={AvailableReturnBikes}
                      name={name}
                      showAvaInfo
                      showInfoCard={selectedStop === id}
                      address={address}
                      onClick={() => setSelectedStop(id)}
                      onCloseInfoCard={() => setSelectedStop()}
                    />
                  );
                })
              )}
            </GMap>
          </FlexSpin>
        }
        contentOffset={!screengatherthanlg && StyleParams.secondToolbarHeight}
      />
    </PageContainer>
  );
}

BikeSpot.propTypes = {};

export default BikeSpot;
