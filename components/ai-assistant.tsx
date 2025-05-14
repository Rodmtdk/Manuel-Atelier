"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, Bot, User, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

export function AIAssistant() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant IA AtelierConnect Ultra. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Suggestions for quick responses
  const suggestions = [
    "Analyse cette pièce pour moi",
    "Quelle stratégie d'usinage recommandes-tu ?",
    "Génère un devis pour 10 pièces",
    "Optimise pour l'aluminium 7075",
    "Lance la série Z27",
  ]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input, timestamp: new Date() }])

    // Clear input
    setInput("")

    // Simulate AI thinking
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("stratégie") || input.toLowerCase().includes("usinage")) {
        response =
          "Pour cette pièce, je recommande une stratégie d'usinage en 3 étapes : d'abord un ébauche avec une fraise Ø12mm, puis une semi-finition avec une fraise Ø8mm, et enfin une finition avec une fraise Ø6mm pour les détails. Cela optimisera le temps d'usinage tout en garantissant une bonne qualité de surface."
      } else if (input.toLowerCase().includes("matériau") || input.toLowerCase().includes("matière")) {
        response =
          "Basé sur l'analyse de votre pièce, je recommande l'aluminium 6061-T6 pour un bon compromis entre usinabilité et résistance mécanique. Si vous avez besoin de plus de résistance, l'aluminium 7075-T6 serait une alternative, mais avec un coût plus élevé et une usinabilité légèrement réduite."
      } else if (input.toLowerCase().includes("temps") || input.toLowerCase().includes("durée")) {
        response =
          "J'estime le temps d'usinage de cette pièce à environ 45-60 minutes, en fonction de la machine et des paramètres de coupe. Cela inclut environ 20 minutes pour l'ébauche, 15 minutes pour la semi-finition et 15-25 minutes pour la finition."
      } else if (
        input.toLowerCase().includes("prix") ||
        input.toLowerCase().includes("coût") ||
        input.toLowerCase().includes("devis")
      ) {
        response =
          "Le coût estimé pour cette pièce en aluminium 6061 serait d'environ 120-150€ pour un exemplaire unique, incluant la matière première, le temps machine et la main d'œuvre. Pour une série de 10 pièces, le coût unitaire pourrait descendre à 80-100€ par pièce."
      } else if (input.toLowerCase().includes("lance") || input.toLowerCase().includes("série")) {
        response =
          "Je vais lancer la série Z27 pour vous. La production démarrera dans 15 minutes sur la machine CNC #3. Voulez-vous que je vous notifie lorsque la production sera terminée ?"
      } else if (input.toLowerCase().includes("analyse")) {
        response =
          "J'ai analysé votre pièce et détecté 12 perçages, 3 poches, et 2 contours extérieurs. La pièce mesure 120x80x25mm avec un volume de 156cm³. Je recommande une approche d'usinage en 2 posages pour accéder à toutes les caractéristiques. Souhaitez-vous que je génère une stratégie d'usinage détaillée ?"
      } else {
        response =
          "Je comprends votre demande. Pour vous aider plus efficacement, pourriez-vous me donner plus de détails sur votre projet d'usinage ? Je peux vous conseiller sur les stratégies d'usinage, les matériaux, les temps de production ou générer un devis."
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: new Date() }])

      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const toggleListening = () => {
    setIsListening(!isListening)

    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInput("Quelle stratégie d'usinage recommandes-tu pour cette pièce ?")
        setIsListening(false)
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    setIsMinimized(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    setIsExpanded(false)
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={toggleMinimize}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed z-50 transition-all duration-300",
          isExpanded ? "inset-4 md:inset-10 lg:inset-20" : "bottom-4 right-4 w-[380px]",
        )}
      >
        <Card className="flex flex-col h-full border-primary/20 shadow-xl overflow-hidden bg-background/95 backdrop-blur-sm">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 gap-2">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-5 w-5 text-primary" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <CardTitle className="text-sm font-medium">Assistant IA</CardTitle>
              <Badge variant="outline" className="text-xs font-normal">
                Ultra
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Minimiser</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleExpand}>
                      {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isExpanded ? "Réduire" : "Agrandir"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      <span className="text-xs font-medium">{message.role === "user" ? "Vous" : "Assistant"}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">Assistant</span>
                    </div>
                    <div className="flex space-x-1 items-center h-5">
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!isTyping && (
              <div className="p-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <div className="flex space-x-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs whitespace-nowrap"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  onClick={toggleListening}
                  className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  ref={inputRef}
                  placeholder="Posez une question ou donnez une commande..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <div className="mt-2 text-center">
                  <div className="flex justify-center items-center space-x-1">
                    <div className="w-1 h-3 bg-primary/60 animate-pulse" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1 h-5 bg-primary/80 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-1 h-7 bg-primary animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-1 h-4 bg-primary/70 animate-pulse" style={{ animationDelay: "450ms" }}></div>
                    <div className="w-1 h-2 bg-primary/50 animate-pulse" style={{ animationDelay: "600ms" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Écoute en cours...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
