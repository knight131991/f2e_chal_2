import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import { Col, Row } from "antd";
import pic_col1 from "../../../compressed-images/unsplash_zn2aUVfbUrk.webp";
import pic_col2 from "../../../compressed-images/unsplash_HjSdOirGJu8.webp";
import pic_col3 from "../../../compressed-images/unsplash_BNry1F5aHAU.webp";
import pic_col4 from "../../../compressed-images/unsplash_x5nZzttn2_k.webp";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";

const Container = styled(({ gap, ...rest }) => <FlexBox {...rest} />)`
  padding: 24px;
  & > *:not(:last-child) {
    margin-bottom: ${({ gap }) => gap};
  }
`;

const Picture = ({ src, alt }) => (
  <img src={src} alt={alt} width="100%" height="auto" />
);

const TextBlock = styled(
  ({ title, content, textAlign, align, isSmScreen, ...rest }) => (
    <FlexBox {...rest} align={isSmScreen ? "center" : align}>
      <div>{title}</div>
      <div>{content}</div>
    </FlexBox>
  )
)`
  padding-top: ${({ isSmScreen }) => (isSmScreen ? "24px" : "88px")};
  font-size: 20px;
  text-align: ${({ textAlign, isSmScreen }) =>
    isSmScreen ? "center" : textAlign};

  div:first-child {
    font-size: 24px;
    font-weight: bold;
  }
`;

function PicandDescBlock() {
  const { pictureSpan, textSpan, screen } = useRWD(
    { pictureSpan: 12, textSpan: 12 },
    {
      l: { pictureSpan: 15, textSpan: 9 },
      s: { pictureSpan: 24, textSpan: 24 },
    }
  );

  const isSmScreen = useMemo(() => screen <= screenEnum.sm, [screen]);

  const items = useMemo(() => {
    const item = [
      [
        {
          span: pictureSpan,
          component: <Picture src={pic_col1} alt="picture1" />,
        },
        {
          span: textSpan,
          component: (
            <TextBlock
              isSmScreen={isSmScreen}
              title="說走就走的小旅行"
              content="整合全台灣的 Youbike 站點及自行車地圖，讓您方便規劃行程。"
            />
          ),
        },
      ],
      [
        {
          span: textSpan,
          component: (
            <TextBlock
              isSmScreen={isSmScreen}
              align="flex-end"
              textAlign="end"
              title="簡單三步驟即可完成"
              content="照著流程即可快速完成規劃。"
            />
          ),
        },
        {
          span: pictureSpan,
          component: <Picture src={pic_col2} alt="picture2" />,
        },
      ],
      [
        {
          span: pictureSpan,
          component: <Picture src={pic_col3} alt="picture3" />,
        },
        {
          span: textSpan,
          component: (
            <TextBlock
              isSmScreen={isSmScreen}
              title="紀錄您的歷程紀錄"
              content="加入會員即可記錄您的挑戰紀錄。"
            />
          ),
        },
      ],
      [
        {
          span: textSpan,
          component: (
            <TextBlock
              isSmScreen={isSmScreen}
              align="flex-end"
              title="成就點數增加挑戰的樂趣"
              textAlign="end"
              content="除了自行車的挑戰成就，我們也精心構想一些成就等您發掘。"
            />
          ),
        },
        {
          span: pictureSpan,
          component: <Picture src={pic_col4} alt="picture4" />,
        },
      ],
    ];

    if (isSmScreen)
      item.filter((ele, id) => id % 2 === 1).forEach((ele) => ele.reverse());
    return item;
  }, [pictureSpan, textSpan, isSmScreen]);

  return (
    <Container gap={isSmScreen ? "32px" : "48px"}>
      {items.map((subItems, index) => (
        <Row key={index} gutter={[24]}>
          {subItems.map(({ span, component }, id) => (
            <Col key={id} span={span}>
              {component}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}

PicandDescBlock.propTypes = {};

export default PicandDescBlock;
