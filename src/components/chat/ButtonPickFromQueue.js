import React, { useContext } from "react";
import { Button } from "@livechat/design-system";
import { ChatContext } from '../../context/chat';

const ButtonPickFromQueue = () => {
  const { /* pickFromQueue */ agentDetails, activeChat } = useContext(ChatContext)

  const action = async () => {
    const chat = activeChat
    const agent = agentDetails.my_profile;
    // const event = await pickFromQueue(chat?.id, agent?.id, agent.type)

    console.log('chat_data', chat)
    console.log('agent_data', agent)
    console.log('token_data', sessionStorage.getItem('access_token'))
  }

  return (
    <Button kind="primary" iconPosition="left" onClick={action}>Pick from Queue</Button>
  );
};

export default ButtonPickFromQueue;
