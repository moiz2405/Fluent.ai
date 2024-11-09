'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Send, Volume2, Loader2, X, ChevronDown } from "lucide-react"

export default function Component() {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! I'm your AI tutor. How can I help you today?",
      timestamp: new Date()  // Add this
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState<string>('Google UK English Female')
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 10000) // 10 second timeout
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input, timestamp: new Date() }])
      setInput('')
      setIsLoading(true)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: `I am: ${input}`,
          timestamp: new Date()  // Add this
        }])
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleTextToSpeech = (text: string) => {
    try {
      const speech = new SpeechSynthesisUtterance(text)

      const getVoicesAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices()
        const selected = voices.find(voice => voice.name === selectedVoice)

        if (selected) {
          speech.voice = selected
        } else {
          console.log(`${selectedVoice} not found, using default.`)
        }

        window.speechSynthesis.speak(speech)
      }

      if (window.speechSynthesis.getVoices().length > 0) {
        getVoicesAndSpeak()
      } else {
        window.speechSynthesis.onvoiceschanged = getVoicesAndSpeak
      }
    } catch (error) {
      console.error('Text-to-speech failed:', error)
    }
  }


  const wordSuggestions = [
    "Perhaps",
    "Moreover",
    "Additionally",
    "However",
    "Consequently",
  ]

  const betterSentence = "Your previous sentence could be improved by using more precise language and adding supporting details."

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Tutor Chat"
      >
        Open AI Tutor
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-xl z-[9999]">
      <div className="flex justify-between items-center p-4 border-b bg-primary/10">
        <div className="flex items-center gap-2">
          {/* Profile Picture with Voice Selection Dropdown */}
          <div className="relative">
            <img
              src="images/home/teacher" // Replace with your AI tutor profile picture URL
              alt="AI Tutor"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
            />
            {isVoiceMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
                <ul className="py-2">
                  {["Google UK English Female", "Google US English Female", "Google UK English Male", "Google US English Male"].map(voice => (
                    <li
                      key={voice}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedVoice(voice)
                        setIsVoiceMenuOpen(false)
                      }}
                    >
                      {voice}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
        </div>
        <div className="flex items-center gap-2">  {/* Add this wrapper */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMessages([{
                role: 'bot',
                content: "Hello! I'm your AI tutor. How can I help you today?",
                timestamp: new Date()
              }])
            }}
          >
            Clear Chat
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            {message.role === 'bot' && (
              <div className="flex items-center gap-2">
                {/* Profile Picture for Bot */}
                <img
                  src="images/home/teacher" // Replace with your AI tutor profile picture URL
                  alt="AI Tutor"
                  className="w-10 h-10 rounded-full"
                />
                <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <CardContent className="p-3 text-sm">
                    <p>{message.content}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {message.role === 'user' && (
              <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <CardContent className="p-3 text-sm">
                  <p>{message.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </div>
                </CardContent>
              </Card>
            )}
            {message.role === 'bot' && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => handleTextToSpeech(message.content)}
                aria-label="Read message aloud"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <Card className="bg-secondary">
              <CardContent className="p-3 text-sm rounded-lg hover:bg-opacity-90 transition-colors">
                <Loader2 className="h-4 w-4 animate-spin" />
              </CardContent>
            </Card>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 bg-background border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            maxLength={500}
            className="flex-grow"
          />
          <div className="absolute bottom-20 right-6 text-xs text-muted-foreground">
            {input.length}/500
          </div>
          <Button onClick={handleSend} disabled={isLoading} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
