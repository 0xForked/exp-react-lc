import React from "react";
import styled from '@emotion/styled'

const MessageText = styled.small`
  display: block;
  margin: 10px;
  color: darkgray;
  text-align: center;
`;

const SystemMessage = ({ message }) => (
  <MessageText>{message.text}</MessageText>
);

export default SystemMessage;
