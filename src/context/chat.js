import React, { createContext } from 'react'
import { useAgentDetails } from '../hooks/use-agent-details'
import { useChatMessages } from '../hooks/use-chat-messages'
import { getChatsList, getArchives } from '../utils/chat-sdk'

export const ChatContext = createContext({})

const ChatProvider = ({ children }) => {
  const { agentDetails } = useAgentDetails();
  const {
    fetchMessages,
    messages,
    sendMessage,
    // pickFromQueue,
    chatList,
    setChatList,
    activeChat,
  } = useChatMessages();

  const getActiveChats = async () => {
    try {
      const { chats_summary } = await getChatsList()
      const activeChats = chats_summary.filter(chat => chat?.last_thread_summary?.active && !chat?.last_thread_summary?.queue)

      setChatList(activeChats);

      if (activeChats?.length) {
        await fetchMessages(activeChats[0]);
      }
    } catch (error) {
      console.error(`Unable to fetch agent chats: `, error)
    }
  }

  const getQueueChats = async () => {
    try {
      const { chats_summary } = await getChatsList()
      const queueChats = chats_summary.filter(chat => chat?.last_thread_summary?.active && chat?.last_thread_summary?.queue)
      console.log('list_chat_active', queueChats)

      setChatList(queueChats);

      if (queueChats?.length) {
        await fetchMessages(queueChats[0]);
      }
    } catch (error) {
      console.error(`Unable to fetch agent chats: `, error)
    }
  }

  const getArchivedChats = async () => {
    try {
      const { chats } = await getArchives()
      setChatList(chats);

      if (chats?.length) {
        await fetchMessages(chats[0]);
      }
    } catch (error) {
      console.error(`Unable to fetch archived chats: `, error)
    }
  }

  return (
    <ChatContext.Provider value={{
      chatList,
      setChatList,
      messages,
      sendMessage,
      // pickFromQueue,
      activeChat,
      fetchMessages,
      agentDetails,
      getActiveChats,
      getQueueChats,
      getArchivedChats,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
