import React, { useState } from "react";
import styled from "styled-components";
import { Form, Select, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { withUserAgent } from "react-useragent";
import queryString from "query-string";

import { PGS, METHODS_FOR_KCP } from "./constants";
import { getMethods } from "./utils";

const { Item } = Form;
const { Option } = Select;

function Payment({ history, form, ua }) {
  const [methods, setMethods] = useState(METHODS_FOR_KCP);
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  function handleSubmit(e) {
    e.preventDefault();

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        /* 가맹점 식별코드 */
        const userCode = "imp19424728";
        /* 결제 데이터 */
        const {
          pg,
          pay_method,
          merchant_uid,
          name,
          amount,
          buyer_name,
          buyer_tel,
          buyer_email,
        } = values;

        const data = {
          pg,
          pay_method,
          merchant_uid,
          name,
          amount,
          buyer_name,
          buyer_tel,
          buyer_email,
        };

        if (isReactNative()) {
          /* 리액트 네이티브 환경일때 */
          const params = {
            userCode,
            data,
            type: "payment", // 결제와 본인인증을 구분하기 위한 필드
          };
          const paramsToString = JSON.stringify(params);
          window.ReactNativeWebView.postMessage(paramsToString);
        } else {
          /* 웹 환경일때 */
          const { IMP } = window;
          IMP.init(userCode);
          IMP.request_pay(data, callback);
        }
      }
    });
  }

  function callback(response) {
    const query = queryString.stringify(response);
    history.push(`/payment/result?${query}`);
  }

  function onChangePg(value) {
    /* 결제수단 */
    const methods = getMethods(value);
    setMethods(methods);
  }

  function onChangePayMethod(value) {
    switch (value) {
      case "card": {
        break;
      }
      default:
        break;
    }
  }

  function isReactNative() {
    /*
      리액트 네이티브 환경인지 여부를 판단해
      리액트 네이티브의 경우 IMP.payment()를 호출하는 대신
      iamport-react-native 모듈로 post message를 보낸다

      아래 예시는 모든 모바일 환경을 리액트 네이티브로 인식한 것으로
      실제로는 user agent에 값을 추가해 정확히 판단해야 한다
    */
    if (ua.mobile) return true;
    return false;
  }

  return (
    <Wrapper>
      <Header>아임포트 결제 테스트</Header>
      <FormContainer onSubmit={handleSubmit}>
        <Item label="PG사">
          {getFieldDecorator("pg", {
            initialValue: "kcp",
          })(
            <Select
              size="large"
              onChange={onChangePg}
              suffixIcon={<Icon type="caret-down" />}
            >
              {PGS.map((pg) => {
                const { value, label } = pg;
                return (
                  <Option value={value} key={value}>
                    {label}
                  </Option>
                );
              })}
            </Select>
          )}
        </Item>
        <Item label="결제수단">
          {getFieldDecorator("pay_method", {
            initialValue: "card",
          })(
            <Select
              size="large"
              onChange={onChangePayMethod}
              suffixIcon={<Icon type="caret-down" />}
            >
              {methods.map((method) => {
                const { value, label } = method;
                return (
                  <Option value={value} key={value}>
                    {label}
                  </Option>
                );
              })}
            </Select>
          )}
        </Item>
        <Item>
          {getFieldDecorator("name", {
            initialValue: "아임포트 결제 데이터 분석",
            rules: [{ required: true, message: "주문명은 필수입력입니다" }],
          })(<Input size="large" addonBefore="주문명" />)}
        </Item>
        <Item>
          {getFieldDecorator("amount", {
            initialValue: "39000",
            rules: [{ required: true, message: "결제금액은 필수입력입니다" }],
          })(<Input size="large" type="number" addonBefore="결제금액" />)}
        </Item>
        <Item>
          {getFieldDecorator("merchant_uid", {
            initialValue: `min_${new Date().getTime()}`,
            rules: [{ required: true, message: "주문번호는 필수입력입니다" }],
          })(<Input size="large" addonBefore="주문번호" />)}
        </Item>
        <Item>
          {getFieldDecorator("buyer_name", {
            initialValue: "홍길동",
            rules: [
              { required: true, message: "구매자 이름은 필수입력입니다" },
            ],
          })(<Input size="large" addonBefore="이름" />)}
        </Item>
        <Item>
          {getFieldDecorator("buyer_tel", {
            initialValue: "01012341234",
            rules: [
              { required: true, message: "구매자 전화번호는 필수입력입니다" },
            ],
          })(<Input size="large" type="number" addonBefore="전화번호" />)}
        </Item>
        <Item>
          {getFieldDecorator("buyer_email", {
            initialValue: "example@example.com",
            rules: [
              { required: true, message: "구매자 이메일은 필수입력입니다" },
            ],
          })(<Input size="large" addonBefore="이메일" />)}
        </Item>
        <Button type="primary" htmlType="submit" size="large">
          결제하기
        </Button>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

const FormContainer = styled(Form)`
  width: 350px;
  border-radius: 3px;

  .ant-row {
    margin-bottom: 1rem;
  }
  .ant-form-item {
    display: flex;
    align-items: center;
  }
  .ant-col.ant-form-item-label {
    padding: 0 11px;
    width: 9rem;
    text-align: left;
    label {
      color: #888;
      font-size: 1.2rem;
    }
    & + .ant-col.ant-form-item-control-wrapper {
      width: 26rem;
      .ant-form-item-control {
        line-height: inherit;
      }
    }
  }
  .ant-col.ant-form-item-label > label::after {
    display: none;
  }
  .ant-row.ant-form-item.toggle-container .ant-form-item-control {
    padding: 0 11px;
    height: 4rem;
    display: flex;
    align-items: center;
    .ant-switch {
      margin: 0;
    }
  }

  .ant-form-explain {
    margin-top: 0.5rem;
    margin-left: 9rem;
  }

  .ant-input-group-addon:first-child {
    width: 9rem;
    text-align: left;
    color: #888;
    font-size: 1.2rem;
    border: none;
    background-color: inherit;
  }
  .ant-input-group > .ant-input:last-child {
    border-radius: 4px;
  }

  .ant-col {
    width: 100%;
  }

  button[type="submit"] {
    width: 100%;
    height: 5rem;
    font-size: 1.6rem;
    margin-top: 2rem;
  }
`;

const PaymentForm = Form.create({ name: "payment" })(Payment);

export default withUserAgent(withRouter(PaymentForm));
