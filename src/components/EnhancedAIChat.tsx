import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";
import { useAuth } from "./AuthProvider";
import { generateEnhancedFinancialResponse, getPersonalizedSuggestions } from "@/utils/aiFinancialResponses";

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

  const getSuggestedQuestions = () => {
    const questions = {
      en: [
        { text: "How do I create a budget?", category: "budgeting", icon: DollarSign },
        { text: "What are good investment options for beginners?", category: "investment", icon: TrendingUp },
        { text: "How much should I save for emergencies?", category: "savings", icon: PiggyBank },
        { text: "How can I pay off debt faster?", category: "debt", icon: Lightbulb },
      ],
      es: [
        { text: "¿Cómo creo un presupuesto?", category: "budgeting", icon: DollarSign },
        { text: "¿Cuáles son buenas opciones de inversión para principiantes?", category: "investment", icon: TrendingUp },
        { text: "¿Cuánto debo ahorrar para emergencias?", category: "savings", icon: PiggyBank },
        { text: "¿Cómo puedo pagar la deuda más rápido?", category: "debt", icon: Lightbulb },
      ],
      fr: [
        { text: "Comment créer un budget?", category: "budgeting", icon: DollarSign },
        { text: "Quelles sont les bonnes options d'investissement pour les débutants?", category: "investment", icon: TrendingUp },
        { text: "Combien dois-je économiser pour les urgences?", category: "savings", icon: PiggyBank },
        { text: "Comment puis-je rembourser la dette plus rapidement?", category: "debt", icon: Lightbulb },
      ]
    };
    
    return questions[language as keyof typeof questions] || questions.en;
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
          {/* Enhanced Suggested Questions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              {simpleMode ? t("quickQuestions") : "Expert Financial Guidance"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getPersonalizedSuggestions(isGuest, language).map((question, index) => {
                const IconComponent = question.icon === 'DollarSign' ? DollarSign :
                                   question.icon === 'PiggyBank' ? PiggyBank :
                                   question.icon === 'TrendingUp' ? TrendingUp : Lightbulb;
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleSuggestedQuestion(question.text)}
                  >
                    <IconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question.text}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`flex-1 space-y-2 ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Message Input */}
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={simpleMode ? t("askAboutMoney") : "Ask about budgeting, investing, debt payoff, credit building, retirement planning, or any financial question..."}
              className="min-h-[60px] resize-none"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isTyping}
              size="icon"
              className="h-[60px] w-[60px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

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
