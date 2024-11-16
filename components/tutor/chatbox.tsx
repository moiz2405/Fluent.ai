import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! I'm your AI tutor. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setIsTyping(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: input, timestamp: new Date() },
      ]);
      setInput(''); // Clear the input field
      setIsLoading(true);

      try {
        // Log input to check
        console.log('Sending message:', input);

        // Ensure the API URL is correct and working
        const response = await axios.post('/api/chat', { message: input });

        if (response && response.data) {
          const botMessage = response.data?.data || "I'm sorry, I couldn't process that.";

          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'bot', content: botMessage, timestamp: new Date() },
          ]);
        } else {
          throw new Error('No response data received.');
        }
      } catch (error) {
        console.error('Error during API call:', error);

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'bot', content: "Sorry, something went wrong. Please try again later.", timestamp: new Date() },
        ]);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    } else {
      // If the input is invalid, show a message
      console.log('Input is empty or invalid');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); // Update input value
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-xl rounded-2xl border-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
      </div>
      <ScrollArea className="flex-grow p-4" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <Card className={message.role === 'bot' ? 'bg-blue-50' : 'bg-blue-500 text-white'}>
              <CardContent className="p-3 text-sm">
                <p>{message.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 p-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t rounded-b-2xl">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="flex-grow rounded-full border-gray-200 dark:border-gray-700"
          />
          <Button onClick={handleSend} disabled={isLoading} className="rounded-full bg-blue-500 text-white">
            {isLoading ? 'Sending...' : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}
