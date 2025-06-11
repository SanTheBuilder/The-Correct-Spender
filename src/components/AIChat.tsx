import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your personal financial advisor. I can help you with budgeting, saving strategies, debt management, and general financial advice. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Budget-related responses
    if (lowerMessage.includes('budget') || lowerMessage.includes('budgeting')) {
      return "Great question about budgeting! Here are some key tips:\n\n1. Start with the 50-30-20 rule: 50% for needs, 30% for wants, 20% for savings\n2. Track all your expenses for at least a month\n3. Use the envelope method for discretionary spending\n4. Review and adjust your budget monthly\n\nWould you like me to help you create a specific budget category?";
    }
    
    // Emergency fund responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('fund')) {
      return "Emergency funds are crucial for financial security! Here's what I recommend:\n\n• Start with $1,000 as your initial goal\n• Gradually build to 3-6 months of expenses\n• Keep it in a high-yield savings account\n• Only use for true emergencies (job loss, medical bills, major repairs)\n\nHow much do you currently have saved for emergencies?";
    }
    
    // Debt-related responses
    if (lowerMessage.includes('debt') || lowerMessage.includes('pay off')) {
      return "Let's tackle your debt strategically! Here are two popular methods:\n\n**Debt Snowball:** Pay minimums on all debts, then put extra money toward the smallest debt first. Great for motivation!\n\n**Debt Avalanche:** Pay minimums on all debts, then put extra money toward the highest interest rate debt. Saves more money long-term.\n\nDo you have multiple debts you're working on?";
    }
    
    // Saving responses
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return "Saving money is a fantastic habit! Here are some effective strategies:\n\n• Automate your savings - pay yourself first\n• Try the 52-week challenge (save $1 week 1, $2 week 2, etc.)\n• Use the 'round up' method - save your spare change\n• Cut one small expense and redirect that money to savings\n\nWhat's your current savings goal?";
    }
    
    // Investment responses
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return "Investing is key for long-term wealth building! As a beginner, consider:\n\n• Start with low-cost index funds\n• Take advantage of employer 401(k) matching\n• Consider a Roth IRA for tax-free growth\n• Don't try to time the market - be consistent\n• Only invest money you won't need for 5+ years\n\n⚠️ Remember: This is general information, not personalized advice. Consider consulting a financial advisor for your specific situation.";
    }
    
    // Credit responses
    if (lowerMessage.includes('credit') || lowerMessage.includes('score')) {
      return "Building good credit is important for your financial future! Here's how:\n\n• Pay all bills on time (35% of your score)\n• Keep credit utilization below 30% (30% of your score)\n• Don't close old credit cards\n• Only apply for credit when necessary\n• Check your credit report annually for errors\n\nYour credit score affects loan rates, so it's worth maintaining!";
    }
    
    // General helpful response
    return "That's a great question! While I can provide general financial guidance, remember that everyone's situation is unique. Here are some general principles that help most people:\n\n• Live below your means\n• Build an emergency fund\n• Pay off high-interest debt\n• Start investing early\n• Educate yourself about money\n\nCould you be more specific about what aspect of finances you'd like help with? I can provide more targeted advice on budgeting, saving, debt, or investing.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            AI Financial Advisor
          </CardTitle>
          <CardDescription>
            Get personalized financial advice and answers to your money questions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-4 p-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm break-words">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 opacity-70`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <div className="flex gap-2 mt-4 flex-shrink-0">
            <Input
              placeholder="Ask me about budgeting, saving, debt, or any financial question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {[
              "How do I create my first budget?",
              "What's the best way to pay off debt?",
              "How much should I save for emergencies?",
              "When should I start investing?",
              "How can I improve my credit score?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-3"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
