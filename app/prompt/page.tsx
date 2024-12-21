import React from 'react'
import ChatBox from '@/components/chrome-apis/ChatBox'

const promptGenerator = () => {
    return (
        <main className="flex flex-col h-h-[calc(100vh-90px)] bg-gray-800/70 ">
            {/* Navbar - 64px height */}
            {/* <header className="h-16 bg-gray-900 flex items-center justify-center text-white shadow-lg">
                <h1 className="text-2xl font-bold">Fluent-AI</h1>
            </header> */}

            {/* Chatbox Section */}
            <div className="flex-1 overflow-hidden p-4">
                <div className="flex-1 overflow-auto max-h-[calc(100vh-64px)] rounded-lg bg-gray-900">
                    <ChatBox />
                </div>
            </div>
        </main>
    )
}

export default promptGenerator
