import React from "react";
import styled from "@emotion/styled";

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ isCustomer }) =>
    isCustomer ? "flex-start" : "flex-end"};
  margin-bottom: 16px;
`;

const MessageAuthor = styled.small`
  position: absolute;
  top: -3px;
`;

const MessageText = styled.p`
  padding: 1rem;
  background: ${({ isCustomer, theme }) =>
    isCustomer ? theme.secondary : theme.primary};
  color: ${({ isCustomer }) => (isCustomer ? "black" : "white")};
  border-radius: 10px;
`;

const MessageDate = styled.small`
  color: gray;
  position: absolute;
  bottom: -3px;
`;

function formatDate(date) {
  const createdAt = new Date(date);
  const hrs = `${createdAt.getHours() < 10 ? `0${createdAt.getHours()}` : createdAt.getHours()}`;
  return `${hrs}:${createdAt.getMinutes()}`;
}

const Message = ({ message, user }) => {
  const userName = user?.name || "";
  const isCustomer = user?.type === "customer";

  return (
    <MessageWrapper isCustomer={isCustomer}>
      <MessageAuthor>{userName}</MessageAuthor>
      <MessageText isCustomer={isCustomer}>{message.text}</MessageText>
      <MessageDate>{formatDate(message.created_at)}</MessageDate>
    </MessageWrapper>
  );
};

export default Message;
