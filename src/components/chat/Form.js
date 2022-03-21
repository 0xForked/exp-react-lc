import React, { useState, useContext } from "react";
import { Form, InputField, Button, Badge } from "@livechat/design-system";
import { ChatContext } from '../../context/chat';
import styled from "@emotion/styled";

const AgentListToTransfer = styled.div`
  display: ${({ isDisplay }) =>
  isDisplay ? "block" : "none"};
  width: 98%;
  height: auto;
  height: 150px;
  border: 1px solid grey;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  margin-right: 12px;
`;

const ChatForm = () => {
  const { 
    sendMessage, 
    activeChat, 
    setDeactivateChat, 
    getActiveChats, 
    getAgentList,
    getFromQueue
  } = useContext(ChatContext)

  const [isDisplayAgentContainer, setIsDisplayAgentContainer] = useState("");
  const [agentList, setAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = ({ target }) => setInputValue(target.value);

  const sendChatMessage = e => {
    e.preventDefault();
    sendMessage(activeChat?.id, inputValue);
    setInputValue("");
  };

  const archiveChat = e => {
    setDeactivateChat(activeChat?.id)
    getActiveChats()
  }

  const listAgentToTransfer = () => {
    setIsDisplayAgentContainer(!isDisplayAgentContainer)
    getAgentList(activeChat?.id).then((response) => {
      setAgentList(response)
    })
  }

  const setSelectAgent = (agent) => setSelectedAgent(agent)

  const transferChatToActiveAgent = e => {
    const isAgentOnTheList = activeChat.users.filter((user) => user.id === selectedAgent)[0]

    if (isAgentOnTheList.id === selectedAgent) {
      alert("cant transfer to the same agent!")
      return
    }
  
    getFromQueue(activeChat?.id, selectedAgent)
    getActiveChats()
  }


  return (
    <div>
       <AgentListToTransfer isDisplay={isDisplayAgentContainer}>
        {agentList?.map(agent => <div key={agent?.agent_id} onClick={() => setSelectAgent(agent?.agent_id)}>
          <Button kind={agent?.agent_id === selectedAgent ? 'primary' : 'secondary'}>
            {agent?.agent_id}
            <Badge style={{ marginLeft: '4px' }}>{agent?.total_active_chats}</Badge>
          </Button>
        </div>)}

        <Button style={{ 
          position: 'absolute', 
          bottom: '31%', 
          width: '640px' 
        }} onClick={transferChatToActiveAgent} disabled={!selectedAgent}>
          Transfer to Selected Agent
        </Button>
      </AgentListToTransfer>

      <div style={{ 
        display: 'flex', 
        flexFlow: 'row no-wrap', 
        justifyContent: 'space-between', 
        marginTop: "20px"
      }}>
        <div style={{ display: 'flex', flexDirection: 'row',  flexBasis: '18%'}}>
          <Button 
            kind="primary" 
            iconPosition="left" 
            onClick={archiveChat}
            style={{ height: '23px' }}
          >
            Archive
          </Button>
          <Button 
            kind="primary" 
            iconPosition="left" 
            onClick={listAgentToTransfer}
            style={{ marginLeft: '4px', height: '23px', marginRight: '4px' }}
          >
            Transfer
          </Button>
        </div>
        <div style={{ flexBasis: '78%' }}>
          <Form onSubmit={sendChatMessage} style={{ width: "100%" }}>
            <InputField
              disabled={!activeChat}
              value={inputValue}
              id="chat-message"
              placeholder="Write message..."
              onChange={handleInputChange}
              style={{ width: "100%", marginTop: "auto" }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
