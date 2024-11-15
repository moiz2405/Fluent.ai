import { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Volume2, Loader2, X } from "lucide-react";
import Image from 'next/image';

export default function Component() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! I'm your AI tutor. How can I help you today?",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false);
  const scrollAreaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setIsTyping(true);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: input, timestamp: new Date() }
      ]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/distilgpt2',
          { inputs: input },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            },
          }
        );

        const botMessage = response.data?.generated_text || "I'm sorry, I couldn't process that.";
        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'bot',
            content: botMessage,
            timestamp: new Date()
          }
        ]);
      }  finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Tutor Chat"
      >
        Open AI Tutor
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-xl z-[9999] rounded-2xl border-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-t-2xl">
        <div className="flex items-center gap-2 ">
          <Image
            src="/images/home/teacher.png"
            alt="AI Tutor"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
          />
          <h2 className="text-lg font-semibold text-white">AI Tutor Chat</h2>
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
                <Image src="/images/home/teacher.png" alt="AI Tutor" width={40} height={40} className="w-10 h-10 rounded-full" />
                <Card className="max-w-[80%] bg-blue-50 dark:bg-gray-800 shadow-sm rounded-2xl border-0">
                  <CardContent className="p-3 text-sm">
                    <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {/* {formatTime(message.timestamp)} */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {message.role === 'user' && (
              <Card className="max-w-[80%] bg-blue-500 text-white rounded-2xl border-0">
                <CardContent className="p-3 text-sm">
                  <p>{message.content}</p>
                  <div className="text-xs text-blue-100 mt-1">
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
                aria-label="Read message aloud"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 p-2 mb-4">
            <Image 
              src="/images/home/teacher.png" 
              alt="AI Tutor" 
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </ScrollArea>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t rounded-b-2xl">
        <div className="flex space-x-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            maxLength={500}
            className="flex-grow rounded-full border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button onClick={handleSend} disabled={isLoading} aria-label="Send message"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <Send className="h-4 w-4 rounded-full" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
