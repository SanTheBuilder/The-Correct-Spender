
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";
import { useAuth } from "./AuthProvider";
import { generateEnhancedFinancialResponse, getPersonalizedSuggestions } from "@/utils/aiFinancialResponses";
import ChatMessage from "./chat/ChatMessage";
import SuggestedQuestions from "./chat/SuggestedQuestions";
import MessageInput from "./chat/MessageInput";
import TypingIndicator from "./chat/TypingIndicator";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'budgeting' | 'investment' | 'savings' | 'debt' | 'general';
}

const EnhancedAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { simpleMode, t, language } = useAccessibility();
  const { isGuest } = useAuth();

  // Initialize with enhanced welcome message
  useEffect(() => {
    const welcomeMessage = generateEnhancedFinancialResponse("welcome", isGuest, language);
    
    setMessages([{
      id: '1',
      content: welcomeMessage,
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    }]);
  }, [isGuest, language]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage("");
    setIsTyping(true);

    // Enhanced AI response with more realistic delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateEnhancedFinancialResponse(currentMessage, isGuest, language),
        isUser: false,
        timestamp: new Date(),
        category: 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {simpleMode ? "Money Helper" : t("aiChatTitle")}
                <Badge variant="secondary">Enhanced</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {isGuest 
                  ? (language === 'es' ? "Consejos financieros expertos para invitados" :
                     language === 'fr' ? "Conseils financiers d'experts pour les invités" :
                     "Expert financial advice for guests")
                  : "Comprehensive financial guidance with detailed strategies"
                }
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SuggestedQuestions
            questions={getPersonalizedSuggestions(isGuest, language)}
            onQuestionSelect={handleSuggestedQuestion}
            title={simpleMode ? t("quickQuestions") : "Expert Financial Guidance"}
          />

          <Separator />

          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <MessageInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSendMessage}
            onKeyPress={handleKeyPress}
            placeholder={simpleMode ? t("askAboutMoney") : "Ask about budgeting, investing, debt payoff, credit building, retirement planning, or any financial question..."}
            disabled={isTyping}
          />

          {isGuest && (
            <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded border-l-4 border-blue-200">
              💡 {language === 'es' ? 'Modo invitado: Consejos financieros expertos sin necesidad de cuenta. ¡Regístrate para funciones personalizadas!' : 
                  language === 'fr' ? 'Mode invité: Conseils financiers d\'experts sans compte requis. Inscrivez-vous pour des fonctionnalités personnalisées!' :
                  'Guest mode: Expert financial advice without needing an account. Sign up for personalized features!'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAIChat;
