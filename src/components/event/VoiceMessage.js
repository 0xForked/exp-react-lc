import React from "react";
import styled from "@emotion/styled";

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ isCustomer }) =>
    isCustomer ? "flex-start" : "flex-end"};
  margin-bottom: 46px;
  margin-top: 46px;
`;

const MessageAuthor = styled.small`
  position: absolute;
  top: -24px;
`;

const MessageDate = styled.small`
  color: gray;
  margin-left: 3px;
`;

// message Voice Style

function formatDate(date) {
  const createdAt = new Date(date);
  const hrs = `${createdAt.getHours() < 10 ? `0${createdAt.getHours()}` : createdAt.getHours()}`;
  return `${hrs}:${createdAt.getMinutes()}`;
}

const VoiceMessage = ({ message, user }) => {
    const userName = user?.name || "";
    const isCustomer = user?.type === "customer";
    const voice = message.content.data

    return <MessageWrapper isCustomer={isCustomer}>
        <MessageAuthor>
            {userName} on 
            <MessageDate>{formatDate(message.created_at)}</MessageDate> 
        </MessageAuthor>

        <audio controls>
          <source src={voice} type="audio/wav" />
        </audio>
    </MessageWrapper>
}

export default VoiceMessage;
