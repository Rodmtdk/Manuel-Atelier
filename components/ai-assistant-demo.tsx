"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function AIAssistantDemo() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant IA AtelierConnect. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      } else {
        response =
          "Je comprends votre demande. Pour vous aider plus efficacement, pourriez-vous me donner plus de détails sur votre projet d'usinage ? Je peux vous conseiller sur les stratégies d'usinage, les matériaux, les temps de production ou générer un devis."
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: new Date() }])

      setIsTyping(false)
    }, 1500)
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

  return (
    <div className="flex flex-col h-[400px] border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">Assistant IA</span>
        </div>
        <div className="text-xs text-muted-foreground">Connecté</div>
      </div>

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
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

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
            <div className="voice-indicator mx-auto"></div>
            <p className="text-xs text-muted-foreground mt-1">Écoute en cours...</p>
          </div>
        )}
      </div>
    </div>
  )
}
