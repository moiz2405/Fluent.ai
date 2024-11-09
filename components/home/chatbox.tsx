import { useState, useRef,} from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import {  Send, Volume2, Loader2, X, } from "lucide-react"

export default function Component() {
//   const formatTime = () => new Intl.DateTimeFormat('en', {
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format()

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! I'm your AI tutor. How can I help you today?",
      timestamp: new Date()
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
//   const [selectedVoice] = useState<string>('Google UK English Female')
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false)
  const scrollAreaRef = useRef(null)


  const handleSend = async () => {
    if (input.trim()) {
      // Add user message
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: input, timestamp: new Date() }
      ])
      setInput('') // Clear input field
      setIsLoading(true)

      try {
        console.log("Sending input to Hugging Face:", input)

        // Send request to Hugging Face model
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/distilgpt2',
          { inputs: input },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // Ensure API key is correct
            },
          }
        )

        console.log("Hugging Face response:", response.data)

        // Check if response contains 'generated_text'
        const botMessage = response.data?.generated_text || "I'm sorry, I couldn't process that."

        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'bot',
            content: botMessage,
            timestamp: new Date()
          }
        ])
      } catch (error) {
        console.error("Error during Hugging Face request:", error)

        // Enhanced error handling
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("Response data:", error.response?.data)
            console.error("Response status:", error.response?.status)
          } else if (error.request) {
            console.error("Request data:", error.request)
          } else {
            console.error("Error message:", error.message)
          }
        } else {
          console.error("Unexpected error:", error)
        }

        // Fallback message in case of error
        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'bot',
            content: "I'm sorry, something went wrong. Please try again.",
            timestamp: new Date()
          }
        ])
      } finally {
        // Ensure loading state is reset
        setIsLoading(false)
      }
    } else {
      console.log("Empty input, skipping send.")
    }
  }


//   const handleTextToSpeech = () => {
//     const speech = new SpeechSynthesisUtterance()

//     // Ensure voices are available before using them
//     const voices = window.speechSynthesis.getVoices()
//     if (voices.length === 0) {
//       setTimeout(() => handleTextToSpeech(), 1000)  // Retry after 1 second if voices are empty
//       return
//     }

//     const selected = voices.find(voice => voice.name === selectedVoice)
//     if (selected) speech.voice = selected

//     window.speechSynthesis.speak(speech)
//   }

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
          <img
            src="images/home/teacher"
            alt="AI Tutor"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
          />
          <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMessages([{
            role: 'bot',
            content: "Hello! I'm your AI tutor. How can I help you today?",
            timestamp: new Date()
          }])}
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
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            {message.role === 'bot' && (
              <div className="flex items-center gap-2">
                <img src="images/home/teacher" alt="AI Tutor" className="w-10 h-10 rounded-full" />
                <Card className="max-w-[80%] bg-secondary">
                  <CardContent className="p-3 text-sm">
                    <p>{message.content}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {/* {formatTime(message.timestamp)} */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {message.role === 'user' && (
              <Card className="max-w-[80%] bg-primary text-primary-foreground">
                <CardContent className="p-3 text-sm">
                  <p>{message.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {/* {formatTime(message.timestamp)} */}
                  </div>
                </CardContent>
              </Card>
            )}
            {message.role === 'bot' && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                // onClick={() => handleTextToSpeech(message.content)}
                aria-label="Read message aloud"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
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
          <Button onClick={handleSend} disabled={isLoading} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
