import React, { useState, useContext } from "react";
import { Form, InputField, Button } from "@livechat/design-system";
import { ChatContext } from '../../context/chat';

const ChatForm = () => {
  const { sendMessage, activeChat } = useContext(ChatContext)

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = ({ target }) => setInputValue(target.value);

  const sendChatMessage = e => {
    e.preventDefault();
    sendMessage(activeChat?.id, inputValue);
    setInputValue("");
  };

  const sendRichMessage = e => {
    console.log('test')
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexFlow: 'row no-wrap', 
      justifyContent: 'space-between', 
      marginTop: "20px"
    }}>
      <div style={{ flexBasis: '8%'}}>
        <Button kind="primary" iconPosition="left" onClick={sendRichMessage}>+</Button>
      </div>
      <div style={{ flexBasis: '92%'}}>
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
  );
};

export default ChatForm;
