'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Globe, MessageCircle, Sparkles, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: BookOpen, text: 'Personalized Lessons' },
  { icon: Globe, text: '24/7 Availability' },
  { icon: MessageCircle, text: 'Native-like Conversations' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 overflow-hidden relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Master English with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI-Powered Tutoring
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Fluent.ai uses advanced AI to provide personalized English lessons, real-time feedback, and natural conversations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Sparkles className="mr-2 h-5 w-5" /> Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-300 hover:bg-gray-700">
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <feature.icon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image and Card Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-1 w-full max-w-md"
          >
            <Link href="/chatbot">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <Image
                        src="/images/home/teacher.png?height=64&width=64"
                        alt="AI Tutor"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">AI English Tutor</h3>
                      <p className="text-gray-400">Always here to help</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-6"
                  >
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Start Chatting
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
    </section>
  );
};

export default HeroSection;

