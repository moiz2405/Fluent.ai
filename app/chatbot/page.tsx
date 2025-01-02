import React from 'react'
// import LanguageModelComponent from '@/components/chatbox/LanguageModel'
import ChatInterface from '@/components/chatbox/ChatInterface'

const page = () => {
  return (
    <div
      className=" p-5 overflow-hidden bg-gray-900"
      style={{ height: 'calc(100vh - 60px)', overflow: 'hidden' }}
    >
      <ChatInterface />
    </div>
  )
}

export default page
