import React, { createContext } from 'react'
import { useAgentDetails } from '../hooks/use-agent-details'
import { useChatMessages } from '../hooks/use-chat-messages'
import { getChatsList, getArchives, listAgentToTransfer } from '../utils/chat-sdk'

export const ChatContext = createContext({})

const ChatProvider = ({ children }) => {
  const { agentDetails } = useAgentDetails();

  const {
    fetchMessages,
    messages,
    sendMessage,
    getFromQueue,
    chatList,
    setChatList,
    activeChat,
    setDeactivateChat
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

      setChatList(queueChats);

      if (queueChats?.length) {
        await fetchMessages(queueChats[0]);
      }
    } catch (error) {
      console.error(`Unable to fetch agent chats: `, error)
    }
  }

  const getAgentList = async (chat_id) => {
    try {
      return await listAgentToTransfer(chat_id)
    } catch (error) {
      console.error(`Unable to fetch agent list: `, error)
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
      getFromQueue,
      activeChat,
      fetchMessages,
      agentDetails,
      getActiveChats,
      getQueueChats,
      getArchivedChats,
      setDeactivateChat,
      getAgentList
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
