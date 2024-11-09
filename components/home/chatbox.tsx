'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Send, Volume2, Loader2, X } from "lucide-react"


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
      window.speechSynthesis.speak(speech)
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
       <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
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
          {/* Existing close button */}
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
            <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              <CardContent className="p-3 text-sm">
               <p>{message.content}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </CardContent>
            </Card>
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
          <Button onClick={handleSend} aria-label="Send message" size="icon">
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="outline" aria-label="Voice input" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 bg-muted">
        <h3 className="font-semibold mb-2 text-sm">Word Suggestions</h3>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Word suggestions">
          {wordSuggestions.map((word, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => setInput(input + ' ' + word)}
              aria-label={`Add "${word}" to your message`}
            >
              {word}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-sm">Improvement Suggestion</h3>
          <p className="text-xs text-muted-foreground">{betterSentence}</p>
        </div>
      </div>
    </Card>
  )
}
