"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send, User, Bot } from 'lucide-react';
import { formatDate } from "../../utils/formatDate";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ApiResponse {
  status: string;
  message?: string;
  data: {
    response: string;
  };
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm FluentAI. How can I help you today?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const handleSend = useCallback(async () => {
    if (input.trim()) {
      const userMessage: Message = { role: "user", content: input, timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chatbox", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch from API.`);
        }

        const data: ApiResponse = await res.json();
        const botMessage: Message = { role: "bot", content: data.data.response, timestamp: new Date() };
        setMessages((prev) => [...prev, botMessage]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Sorry, I encountered an error. Please try again.", timestamp: new Date() },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={scrollAreaRef}
        style={{ maxHeight: "calc(100% - 80px)" }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex flex-col max-w-[80%]">
              <Card className={`${message.role === "user" ? "bg-blue-600" : "bg-gray-800"
                } border-none shadow-md`}>
                <CardContent className="p-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2">
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-gray-300" />
                      ) : (
                        <Bot className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold text-gray-200">
                        {message.role === "user" ? "You" : "FluentAI"}
                      </p>
                      <p className="mt-1 text-sm text-gray-100 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <span className="mt-1 text-xs text-gray-500 self-end">
                {formatDate(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 rounded-2xl w-full max-w-[calc(100vw-50px)]">
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => console.log("Speech Recognition")}
            className="p-2 text-gray-300 rounded-full hover:bg-gray-700 border-gray-600"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 text-gray-100 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 text-white rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>


    </div>
  );
}

