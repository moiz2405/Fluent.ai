'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Clipboard, Send } from 'lucide-react'

// const STOP_SEQUENCES = ['world']

export default function ChatBot() {
    const [inputText, setInputText] = useState('')
    const [messages, setMessages] = useState([])
    const [isStreaming, setIsStreaming] = useState(false)
    const [session, setSession] = useState(null)
    const [isAvailable, setIsAvailable] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        const initializeSession = async () => {
            if (typeof ai !== 'undefined' && ai.languageModel) {
                const { available } = await ai.languageModel.capabilities()
                if (available !== 'no') {
                    const newSession = await ai.languageModel.create({
                        systemPrompt: 'You are an English teacher. Keep your responses short and concise.',
                        // systemPrompt: 'You are an coding model',
                    })
                    setSession(newSession)
                    setIsAvailable(true)
                } else {
                    console.warn('AI model is not available on this device or browser.')
                }
            }
        }
        initializeSession()
    }, [])

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSendMessage = async () => {
        if (!inputText.trim() || !session) return

        const userMessage = { role: 'user', content: inputText.trim() }
        setMessages((prev) => [...prev, userMessage])
        setInputText('')

        setIsStreaming(true)

        const abortController = new AbortController()
        const signal = abortController.signal
        let assistantMessage = { role: 'assistant', content: '' }

        setMessages((prev) => [...prev, assistantMessage])

        const stream = await session.promptStreaming(userMessage.content, { signal })

        let previousLength = 0
        try {
            for await (const chunk of stream) {
                const newContent = chunk.slice(previousLength)
                assistantMessage.content += newContent

                setMessages((prev) =>
                    prev.map((msg, index) => (index === prev.length - 1 ? assistantMessage : msg))
                )

                previousLength = chunk.length

                for (const stopSequence of STOP_SEQUENCES) {
                    if (newContent.toLowerCase().includes(stopSequence.toLowerCase())) {
                        console.log(`Stop sequence "${stopSequence}" found. Aborting.`)
                        abortController.abort()
                        setIsStreaming(false)
                        return
                    }
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Streaming aborted.')
            }
        }
        setIsStreaming(false)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            // Optionally, you can show a toast notification here
        }).catch(err => console.error('Failed to copy: ', err))
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-[#202020] p-4">
            <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
                {/* Chat messages container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <Card
                            key={index}
                            className={`max-w-[80%] rounded-lg shadow-md ${msg.role === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-100'
                                }`}
                        >
                            <CardContent className="p-3">
                                <div className="flex justify-between items-start">
                                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                    {msg.role === 'assistant' && (
                                        <Button variant="ghost" size="icon" onClick={() => handleCopy(msg.content)} className="ml-2">
                                            <Clipboard className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input and Send button */}
                {isAvailable ? (
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                            <Textarea
                                value={inputText}
                                onChange={handleInputChange}
                                placeholder="Type a message..."
                                className="flex-1 min-h-[60px] border border-gray-300 rounded-lg p-2"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={isStreaming}
                                className="flex items-center bg-blue-500 text-white rounded-lg py-2 px-4"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                {isStreaming ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center bg-red-100 text-red-600">
                        AI language model is not available on this device or browser.
                    </div>
                )}
            </div>
        </div>
    )
}

