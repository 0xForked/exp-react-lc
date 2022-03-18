import React from "react";
import styled from "@emotion/styled";

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ isCustomer }) =>
    isCustomer ? "flex-start" : "flex-end"};
  margin-bottom: ${({ isText }) =>
  isText ? "26px" : "36px"};
  margin-top: ${({ isText }) =>
  isText ? "26px" : "36px"};
`;

const MessageAuthor = styled.small`
  position: absolute;
  top: ${({ isText }) =>
  isText ? "-3px" : "-18px"};
`;

const MessageDate = styled.small`
  color: gray;
  position: absolute;
  bottom: ${({ isText }) =>
  isText ? "-3px" : "-18px"};
`;

const MessageText = styled.p`
  padding: 1rem;
  background: ${({ isCustomer, theme }) =>
    isCustomer ? theme.secondary : theme.primary};
  color: ${({ isCustomer }) => (isCustomer ? "black" : "white")};
  border-radius: 10px;
`;

const MessageProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MessageProductItem = styled.div`
  width: 135px;
  box-shadow: none;
  box-sizing: border-box;
  margin-right: 14px;
  &:last-child { margin-right: 0;}
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  text-align: left;
  background: transparent !important;
`;

const MessageProductItemImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
`;
const MessageProductItemDetail = styled.div``;
const MessageProductItemName = styled.div`
  word-break: break-word;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: black;
  margin: 5px 0;
`;
const MessageProductItemSold = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(59, 79, 91, 0.6);
`;
const MessageProductItemPrice = styled.div`
  margin-top: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #28DAD1;
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

const parseJsonData = (data) => JSON.parse(data);

const MessageData = ({type, data, isCustomer}) => {
  if (type === 'product') {
    return (
      <MessageProductContainer>
        {data?.map(
          product =>
          <MessageProductItem key={product.name}>
            <MessageProductItemImage src={product.image} alt="img-alt" />
            <MessageProductItemDetail>
              <MessageProductItemName>{product.name}</MessageProductItemName>
              <MessageProductItemSold>{product.sold} item sold</MessageProductItemSold>
              <MessageProductItemPrice>RM{product.price}</MessageProductItemPrice>
            </MessageProductItemDetail>
          </MessageProductItem>
          )
        }
        
      </MessageProductContainer>
    );
  }

  if (type === 'order') {
    return (
      <MessageOrder>
        <MessageOrderImageContainer>
          <MessageOrderImage src="https://i.kym-cdn.com/entries/icons/original/000/037/689/article23-1.jpeg" alt="img-alt" />
        </MessageOrderImageContainer>
        <MessageOrderDetailContainer>
          <MessageOrderDetailStatus>{data.status}</MessageOrderDetailStatus>
          <MessageOrderDetailInvoice>{data.invoice} item sold</MessageOrderDetailInvoice>
          <MessageOrderDetailPrice>RM{data.price}</MessageOrderDetailPrice>
        </MessageOrderDetailContainer>
      </MessageOrder>
    );
  }
  
  return (
    <MessageText isCustomer={isCustomer}>
      {data}
    </MessageText>
  );
  
}

const CustomMessage = ({ message, user }) => {
  const userName = user?.name || "";
  const isCustomer = user?.type === "customer";
  const customMessage = parseJsonData(message.text);
  
  return (
    <MessageWrapper isCustomer={isCustomer} isText={customMessage.type === 'text'}>
      <MessageAuthor isText={customMessage.type === 'text'}>{userName}</MessageAuthor>
      <MessageData type={customMessage.type} data={customMessage.data} isCustomer={isCustomer} />
      <MessageDate isText={customMessage.type === 'text'}>{formatDate(message.created_at)}</MessageDate> 
    </MessageWrapper>
  );
};

export default CustomMessage;
