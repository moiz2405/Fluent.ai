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
    <section className="w-full h-[calc(100vh-64px)] pt-16 py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background to-secondary/20 overflow-hidden relative">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              >
                Master English with{' '}
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  AI-Powered Tutoring
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Fluent.ai uses advanced AI to provide personalized English lessons, real-time feedback, and natural conversations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="mr-2 h-4 w-4" /> Get Started Free
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" /> Watch Demo
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image and Card Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Link href="/chatbot">
              <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-foreground flex items-center justify-center">
                      <Image
                        src="/images/home/teacher?height=48&width=48"
                        alt="AI Tutor"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">AI English Tutor</h3>
                      <p className="text-sm text-muted-foreground">Always here to help</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="mt-4"
                  >
                    <Button className="w-full" variant="secondary">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-1/2 translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default HeroSection;
