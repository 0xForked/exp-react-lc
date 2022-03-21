import React, { useContext } from "react";
import { Button } from "@livechat/design-system";
import { ChatContext } from '../../context/chat';

const ButtonPickFromQueue = () => {
  const { 
    sendMessage, 
    getFromQueue, 
    agentDetails, 
    activeChat, 
    getQueueChats 
  } = useContext(ChatContext)

  const action = async () => {
    const chat = activeChat
    const agent = agentDetails.my_profile;

    getFromQueue(chat?.id, agent?.id)

    setTimeout(() => {
      sendMessage(activeChat?.id, `Hello, ${agent?.id} here can I help you?`);
    }, 3000)

    getQueueChats()
  }

  return (
    <Button kind="primary" iconPosition="left" onClick={action}>Pick from Queue</Button>
  );
};

export default ButtonPickFromQueue;
