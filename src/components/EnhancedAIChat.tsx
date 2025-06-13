
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

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'budgeting' | 'investment' | 'savings' | 'debt' | 'general';
}

const EnhancedAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your personal financial advisor. I can help you with budgeting, investment strategies, debt management, and savings goals. What would you like to discuss today?",
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { simpleMode } = useAccessibility();
  const { isGuest } = useAuth();

  const suggestedQuestions = [
    { text: "How do I create a budget?", category: "budgeting", icon: DollarSign },
    { text: "What are good investment options for beginners?", category: "investment", icon: TrendingUp },
    { text: "How much should I save for emergencies?", category: "savings", icon: PiggyBank },
    { text: "How can I pay off debt faster?", category: "debt", icon: Lightbulb },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget')) {
      return "Creating a budget is essential for financial health! Here's a simple approach:\n\n1. **Track your income** - List all money coming in\n2. **List your expenses** - Fixed (rent, utilities) and variable (food, entertainment)\n3. **Use the 50/30/20 rule** - 50% needs, 30% wants, 20% savings\n4. **Review monthly** - Adjust as needed\n\nWould you like help setting up a specific budget category?";
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return "Great question about investing! For beginners, I recommend:\n\n1. **Start with an emergency fund** - 3-6 months of expenses\n2. **Consider index funds** - Low cost, diversified\n3. **Use retirement accounts** - 401(k) with employer match, then IRA\n4. **Dollar-cost averaging** - Invest regularly regardless of market conditions\n5. **Educate yourself** - Understand what you're investing in\n\nRemember: Start small, be consistent, and think long-term!";
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('emergency')) {
      return "Emergency savings are crucial! Here's my advice:\n\n**Emergency Fund Size:**\n• 3-6 months of essential expenses\n• Start with $1,000 if that feels overwhelming\n\n**Where to keep it:**\n• High-yield savings account\n• Money market account\n• Keep it separate from checking\n\n**How to build it:**\n• Automate transfers\n• Save tax refunds/bonuses\n• Start with small amounts ($25-50/month)\n\nEven $500 can prevent most financial emergencies!";
    }
    
    if (lowerMessage.includes('debt') || lowerMessage.includes('pay off')) {
      return "Let's tackle that debt! Here are proven strategies:\n\n**Debt Snowball Method:**\n• Pay minimums on all debts\n• Put extra money toward smallest debt\n• Build momentum with quick wins\n\n**Debt Avalanche Method:**\n• Pay minimums on all debts\n• Focus extra payments on highest interest rate\n• Saves more money over time\n\n**Additional tips:**\n• Negotiate with creditors\n• Consider debt consolidation\n• Stop using credit cards\n• Find extra income sources\n\nWhich method sounds better for your situation?";
    }
    
    if (lowerMessage.includes('credit score') || lowerMessage.includes('credit')) {
      return "Credit scores are important! Here's how to improve yours:\n\n**Key factors:**\n• Payment history (35%) - Never miss payments\n• Credit utilization (30%) - Keep below 30%, ideally under 10%\n• Length of credit history (15%) - Keep old accounts open\n• Credit mix (10%) - Different types of credit\n• New credit (10%) - Limit hard inquiries\n\n**Quick improvements:**\n• Pay down balances\n• Become an authorized user\n• Dispute errors on credit reports\n• Consider a secured credit card\n\nCheck your credit report free at annualcreditreport.com!";
    }
    
    return "I understand you're looking for financial advice! I can help with budgeting, investing, saving, debt management, and more. Could you be more specific about what you'd like to know? For example:\n\n• How to start budgeting\n• Investment strategies for your age/situation\n• Saving for specific goals\n• Debt repayment strategies\n• Building credit\n• Retirement planning\n\nWhat's your main financial concern right now?";
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage),
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
                {simpleMode ? "Money Helper" : "AI Financial Advisor"}
                <Badge variant="secondary">Enhanced</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {isGuest 
                  ? "Get personalized financial advice (Guest mode - limited features)"
                  : "Get personalized financial advice and insights"
                }
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Suggested Questions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              {simpleMode ? "Quick Questions" : "Popular Topics"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleSuggestedQuestion(question.text)}
                >
                  <question.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{question.text}</span>
                </Button>
              ))}
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

          {/* Message Input */}
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={simpleMode ? "Ask about money..." : "Ask me anything about personal finance..."}
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
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
              💡 Guest mode: Responses are pre-written. Sign up for personalized AI advice!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAIChat;
