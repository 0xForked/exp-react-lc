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

const MessageOrder = styled.div`
  width: auto;
  height: 100px;
  background: #FFFF;
  border: 2px solid #D1FAF8;
  border-radius: 16px 16px 16px 0;
  display: flex;
  flex-direction: row;
`;

const MessageOrderImageContainer = styled.div`
  margin: 16px;
`;

const MessageOrderImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
`;

const MessageOrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
  margin-top:5px;
  margin-bottom:5px;
`;

const MessageOrderDetailStatus = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  color: #3B4F5B;
  background: #FDE078;
  border-radius: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 3px;
  width: 85px;
`;

const MessageOrderDetailInvoice = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(59, 79, 91, 0.6);
  margin-top: 5px;
`;

const MessageOrderDetailPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #28DAD1;
`;


function formatDate(date) {
  const createdAt = new Date(date);
  const hrs = `${createdAt.getHours() < 10 ? `0${createdAt.getHours()}` : createdAt.getHours()}`;
  return `${hrs}:${createdAt.getMinutes()}`;
}

const OrderMessage = ({ message, user }) => {
  const userName = user?.name || "";
  const isCustomer = user?.type === "customer";
  const data = message;
  const order = data.content.data
  
  return (
    <MessageWrapper isCustomer={isCustomer}>
      <MessageAuthor>
        {userName} on 
        <MessageDate>{formatDate(message.created_at)}</MessageDate> 
      </MessageAuthor>
      <MessageOrder>
        <MessageOrderImageContainer>
          <MessageOrderImage src={order.image} alt="img-alt" />
        </MessageOrderImageContainer>
        <MessageOrderDetailContainer>
          <MessageOrderDetailStatus>{order.status}</MessageOrderDetailStatus>
          <MessageOrderDetailInvoice>{order.invoice} item sold</MessageOrderDetailInvoice>
          <MessageOrderDetailPrice>RM{order.price}</MessageOrderDetailPrice>
        </MessageOrderDetailContainer>
      </MessageOrder>
    </MessageWrapper>
  );
};

export default OrderMessage;
