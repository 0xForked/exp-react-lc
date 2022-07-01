import { useState, useEffect, useCallback } from "react";
import { ChatSDK, getChat, pickFromQueue, deactivateChat} from "../utils/chat-sdk";

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

  const getFromQueue = (chat_id, agent_id) => pickFromQueue(chat_id, agent_id)

  const setDeactivateChat = (chat_id) => deactivateChat(chat_id)

  const sendMessage = (chatId, value) => ChatSDK.sendMessage(chatId, value);

  const clearMessages = () => setMessages([])

  const fetchMessages = useCallback(async (chatInfo) => {
    clearMessages()
    setActiveChat(chatInfo)

    const events = await getLastMessages(chatInfo)
    setMessages(events);
  }, [setActiveChat])

  /**
   * Handle events related to chat list
   */
  useEffect(() => {
    const handleIncomingChats = ({ payload }) => {
      const incomingChat = payload?.chat;

      if (incomingChat?.thread?.queue) {
        return;
      }

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

    // Listen to chattransferred
    ChatSDK.on("chat_transferred", () => console.log('chat_success_transfer'));
    // Listen to incoming chats
    ChatSDK.on("incoming_chat", handleIncomingChats);
    // Listen to closing chats
    ChatSDK.on("chat_deactivated", handleClosingThread);

    return () => {
      ChatSDK.off("chat_transferred", () => console.log('chat_success_transfer'));
      ChatSDK.off("incoming_chat", handleIncomingChats);
      ChatSDK.off("chat_deactivated", handleClosingThread);
    };
  }, [chatList, fetchMessages]);

/**
 * Handle messaging events
 */
  useEffect(() => {
    const handleThreads = ({ payload }) => {
      console.log('from_halde_thread', payload)
      if (payload?.chat?.thread?.queue) {
        return;
      }

      if (payload?.transferred_from) {
        return;
      }

      if (
        payload?.chat?.id === activeChat?.id &&
        (payload?.chat?.threads?.length ||
          payload?.chat?.thread)
      ) {
        const msgs = payload?.chat?.threads?.length ? payload?.chat?.threads[0]?.events : payload?.chat?.thread?.events;
       
        setMessages(msgs);
      }
    };

    const handleNewMessages = ({ payload }) => {
      if (payload?.thread?.queue) {
        return;
      }

      if (payload?.transferred_from) {
        return;
      }

      if (payload.chat_id === activeChat?.id) {
        const msgs = [...messages, payload.event];
        setMessages(msgs);
      }
    };

    // Listen to chattransferred
    ChatSDK.on("chat_transferred", () => console.log('chat_success_transfer'));
    // Listen to incoming chats
    ChatSDK.on("incoming_event", handleNewMessages);
    // Listen to event sent after fetch chat threads
    ChatSDK.on("incoming_chat", handleThreads);

    return () => {
      ChatSDK.off("chat_transferred", () => console.log('chat_success_transfer'));
      ChatSDK.off("incoming_chat", handleThreads);
      ChatSDK.off("incoming_event", handleNewMessages);
    };
  }, [activeChat?.id, messages]);

  return {
    sendMessage,
    getFromQueue,
    clearMessages,
    setMessages,
    messages,
    fetchMessages,
    chatList,
    setChatList,
    activeChat,
    setDeactivateChat,
  };
}

