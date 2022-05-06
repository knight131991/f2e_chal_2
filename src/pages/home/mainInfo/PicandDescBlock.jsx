import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import { Col, Row } from "antd";
import pic_col1 from "../../../images/pictures/unsplash_zn2aUVfbUrk.jpg";
import pic_col2 from "../../../images/pictures/unsplash_HjSdOirGJu8.jpg";
import pic_col3 from "../../../images/pictures/unsplash_BNry1F5aHAU.jpg";
import pic_col4 from "../../../images/pictures/unsplash_x5nZzttn2_k.jpg";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";

const Container = styled(FlexBox)`
  padding: 24px;
`;

const Picture = ({ src, alt }) => (
  <img src={src} alt={alt} width="100%" height="auto" />
);

const TextBlock = styled(({ title, content, textAlign, ...rest }) => (
  <FlexBox {...rest}>
    <div>{title}</div>
    <div>{content}</div>
  </FlexBox>
))`
  padding-top: 88px;
  font-size: 20px;
  text-align: ${({ textAlign }) => textAlign};

  div:first-child {
    font-size: 24px;
    font-weight: bold;
  }
`;

function PicandDescBlock() {
  const items = useMemo(
    () => [
      [
        {
          span: 12,
          component: <Picture src={pic_col1} alt="picture1" />,
        },
        {
          span: 12,
          component: (
            <TextBlock
              title="說走就走的小旅行"
              content="整合全台灣的 Youbike 站點及自行車地圖，讓您方便規劃行程。"
            />
          ),
        },
      ],
      [
        {
          span: 12,
          component: (
            <TextBlock
              align="flex-end"
              title="簡單三步驟即可完成"
              content="照著流程即可快速完成規劃。"
            />
          ),
        },
        { span: 12, component: <Picture src={pic_col2} alt="picture2" /> },
      ],
      [
        {
          span: 12,
          component: <Picture src={pic_col3} alt="picture3" />,
        },
        {
          span: 12,
          component: (
            <TextBlock
              title="紀錄您的歷程紀錄"
              content="加入會員即可記錄您的挑戰紀錄。"
            />
          ),
        },
      ],
      [
        {
          span: 12,
          component: (
            <TextBlock
              align="flex-end"
              title="成就點數增加挑戰的樂趣"
              textAlign="end"
              content="除了自行車的挑戰成就，我們也精心構想一些成就等您發掘。"
            />
          ),
        },
        { span: 12, component: <Picture src={pic_col4} alt="picture4" /> },
      ],
    ],
    []
  );
  return (
    <Container gap="48px">
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
