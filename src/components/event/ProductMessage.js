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

function formatDate(date) {
  const createdAt = new Date(date);
  const hrs = `${createdAt.getHours() < 10 ? `0${createdAt.getHours()}` : createdAt.getHours()}`;
  return `${hrs}:${createdAt.getMinutes()}`;
}

const ProductMessage = ({ message, user }) => {
  const userName = user?.name || "";
  const isCustomer = user?.type === "customer";
  const data = message;
  const products = data.content.data

  return (
    <MessageWrapper isCustomer={isCustomer}>
      <MessageAuthor>
        {userName} on
        <MessageDate>{formatDate(data.created_at)}</MessageDate> 
      </MessageAuthor>

      <MessageProductContainer>
        {products?.map(
          product =>
          <MessageProductItem key={product.id}>
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
    </MessageWrapper>
  );
};

export default ProductMessage;
