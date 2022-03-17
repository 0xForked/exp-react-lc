import { useState, useEffect, useCallback } from "react";
import { ChatSDK, getChat, /* addUserToChat */ } from "../utils/chat-sdk";

const getLastMessages = async (chatInfo) => {
  try {
    const chatId = chatInfo?.id;
    const chatLastThreadId =
      chatInfo?.thread?.id ||
      chatInfo?.last_thread_summary?.id;

    const { thread, id } = await getChat(chatId, chatLastThreadId)

    if (id === chatId && thread) {
      return thread.events;
    } else {
      return []
    }
  } catch (error) {
    console.error(`Unable to fetch last messages from chat - ${chatInfo?.id}`)
  }
}

/**
 * Handle chat messages related to provided chatId
 * @param {*} chatId 
 */
export function useChatMessages() {
  const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const sendMessage = (chatId, value) => {
    ChatSDK.sendMessage(chatId, value);
  }

  const clearMessages = () => setMessages([])

  const fetchMessages = useCallback(async (chatInfo) => {
    clearMessages()
    setActiveChat(chatInfo)

    const events = await getLastMessages(chatInfo)
    setMessages(events);
  }, [setActiveChat])

  // const pickFromQueue = async (chat_id, user_id, user_type) => {
  //   try {
  //     const cb = await addUserToChat(chat_id, user_id, user_type)
  //     console.log('callback add user')
  //     console.log(cb)
  //   } catch(error) {
  //     console.log(`unable to add user to the chat`)
  //     console.log(error)
  //   }
  // }

  /**
   * Handle events related to chat list
   */
  useEffect(() => {
    const handleIncomingChats = ({ payload }) => {
      const incomingChat = payload?.chat;

      if (!chatList.some(({ id }) => id === incomingChat.id)) {
        if (!chatList.length) {
          setActiveChat(incomingChat);
          fetchMessages(incomingChat);
        }

        setChatList([...chatList, incomingChat]);
      }
    };

    const handleClosingThread = ({ payload }) => {
      const closedChat = payload?.chat_id;
      const updatedChatList = chatList.filter(({ id }) => id !== closedChat);

      setChatList(updatedChatList);
      setActiveChat(null)
    };

    // Listen to incoming chats
    ChatSDK.on("incoming_chat", handleIncomingChats);
    // Listen to closing chats
    ChatSDK.on("chat_deactivated", handleClosingThread);

    return () => {
      ChatSDK.off("incoming_chat", handleIncomingChats);
      ChatSDK.off("chat_deactivated", handleClosingThread);
    };
  }, [chatList, fetchMessages]);

/**
 * Handle messaging events
 */
  useEffect(() => {
    const handleThreads = ({ payload }) => {
      if (
        payload?.chat?.id === activeChat?.id &&
        (payload?.chat?.threads?.length ||
          payload?.chat?.thread)
      ) {
        const msgs = payload?.chat?.threads[0]?.events || payload?.chat?.thread?.events;
        setMessages(msgs);
      }
    };

    const handleNewMessages = ({ payload }) => {
      if (payload.chat_id === activeChat?.id) {
        const msgs = [...messages, payload.event];
        setMessages(msgs);
      }
    };

    // Listen to incoming messages
    ChatSDK.on("incoming_event", handleNewMessages);
    // Listen to event sent after fetch chat threads
    ChatSDK.on("incoming_chat", handleThreads);

    return () => {
      ChatSDK.off("incoming_chat", handleThreads);
      ChatSDK.off("incoming_event", handleNewMessages);
    };
  }, [activeChat?.id, messages]);

  return {
    sendMessage,
    // pickFromQueue,
    clearMessages,
    setMessages,
    messages,
    fetchMessages,
    chatList,
    setChatList,
    activeChat,
  };
}

