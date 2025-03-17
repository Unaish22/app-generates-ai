"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Bot, User, Send, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [copied, setCopied] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">AI App Generator</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-sm text-gray-500 mb-4">Describe your app idea in detail. Include information about:</p>
          <ul className="list-disc pl-5 text-sm text-gray-500 mb-4 space-y-1">
            <li>The purpose of your app</li>
            <li>Key features you want to include</li>
            <li>Target audience</li>
            <li>Any specific technologies you prefer</li>
            <li>UI/UX preferences</li>
          </ul>
          <p className="text-sm text-gray-500">The more details you provide, the better guidance our AI can offer.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col h-[600px]">
          <ScrollArea className="flex-1 p-4 rounded-t-lg border bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center">
                <div className="max-w-md space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Start by describing your app idea, and I'll help you build it step by step.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] md:max-w-[70%] ${
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                          message.role === "user" ? "bg-primary ml-2" : "bg-gray-200 dark:bg-gray-700 mr-2"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        )}
                      </div>
                      <div>
                        {message.content.split("```").map((part, index) => {
                          if (index % 2 === 0) {
                            return (
                              <div
                                key={index}
                                className={`rounded-lg px-4 py-2 ${
                                  message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{part}</p>
                              </div>
                            )
                          } else {
                            const codeId = `${message.id}-code-${index}`
                            return (
                              <div key={index} className="mt-2 mb-2 relative">
                                <div className="absolute right-2 top-2">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(part, codeId)}
                                    className="h-6 w-6"
                                  >
                                    {copied === codeId ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                  </Button>
                                </div>
                                <pre className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
                                  <code className="text-gray-100 text-sm">{part}</code>
                                </pre>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border rounded-b-lg bg-background">
            <Textarea
              placeholder="Describe your app idea..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 min-h-[80px]"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}