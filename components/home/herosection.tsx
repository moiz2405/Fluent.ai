'use client'

import React from 'react'
import Image from "next/image"
import { useRouter } from "next/navigation" // Import useRouter hook
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, MessageCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const StylishHeroSection: React.FC = () => {
  const router = useRouter() // Initialize the router

  const features = [
    { icon: BookOpen, text: "Personalized Lessons" },
    { icon: Globe, text: "24/7 Availability" },
    { icon: MessageCircle, text: "Native-like Conversations" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:grid-cols-2 lg:gap-12"
        >
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Master English with AI-Powered Tutoring
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
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
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                <Sparkles className="mr-2 h-4 w-4" /> Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                Watch Demo
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-800">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Card
              className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl cursor-pointer"
              onClick={() => router.push('/tutor')} // Add onClick handler
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <Image
                      src="/images/home/teacher?height=48&width=48"
                      alt="AI Tutor"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">AI English Tutor</h3>
                    <p className="text-sm text-gray-500">Always here to help</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/2 translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  )
}

export default StylishHeroSection
