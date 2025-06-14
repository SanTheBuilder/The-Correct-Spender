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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { simpleMode, t, language } = useAccessibility();
  const { isGuest } = useAuth();

  // Initialize with personalized welcome message
  useEffect(() => {
    const getWelcomeMessage = () => {
      if (isGuest) {
        const guestWelcomes = {
          en: "Hello there! I'm your personal financial advisor. Even though you're exploring as a guest, I'm here to give you the same quality financial advice! I can help with budgeting, saving money, investment basics, and debt management. What would you like to learn about today?",
          es: "¡Hola! Soy tu asesor financiero personal. Aunque estés explorando como invitado, ¡estoy aquí para darte los mismos consejos financieros de calidad! Puedo ayudar con presupuestos, ahorrar dinero, conceptos básicos de inversión y gestión de deudas. ¿Sobre qué te gustaría aprender hoy?",
          fr: "Salut! Je suis votre conseiller financier personnel. Même si vous explorez en tant qu'invité, je suis là pour vous donner les mêmes conseils financiers de qualité! Je peux aider avec la budgétisation, économiser de l'argent, les bases de l'investissement et la gestion des dettes. Sur quoi aimeriez-vous apprendre aujourd'hui?"
        };
        return guestWelcomes[language as keyof typeof guestWelcomes] || guestWelcomes.en;
      } else {
        const userWelcomes = {
          en: "Hello! I'm your personal financial advisor. I can help you with budgeting, investment strategies, debt management, and savings goals. As a registered user, I can provide more personalized advice. What would you like to discuss today?",
          es: "¡Hola! Soy tu asesor financiero personal. Puedo ayudarte con presupuestos, estrategias de inversión, gestión de deudas y metas de ahorro. Como usuario registrado, puedo proporcionar consejos más personalizados. ¿De qué te gustaría hablar hoy?",
          fr: "Salut! Je suis votre conseiller financier personnel. Je peux vous aider avec la budgétisation, les stratégies d'investissement, la gestion des dettes et les objectifs d'épargne. En tant qu'utilisateur enregistré, je peux fournir des conseils plus personnalisés. De quoi aimeriez-vous parler aujourd'hui?"
        };
        return userWelcomes[language as keyof typeof userWelcomes] || userWelcomes.en;
      }
    };

    setMessages([{
      id: '1',
      content: getWelcomeMessage(),
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    }]);
  }, [isGuest, language]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced multilingual responses with guest-specific content
    const responses = {
      en: {
        budget: `${isGuest ? "Great question! Even without saving your data, " : ""}Creating a budget is essential for financial health! Here's a simple approach:\n\n1. **Track your income** - List all money coming in\n2. **List your expenses** - Fixed (rent, utilities) and variable (food, entertainment)\n3. **Use the 50/30/20 rule** - 50% needs, 30% wants, 20% savings\n4. **Review monthly** - Adjust as needed\n\n${isGuest ? "As a guest, you can try our budgeting tools to practice! " : ""}Would you like help setting up a specific budget category?`,
        
        investment: `${isGuest ? "Excellent question! Let me share some beginner-friendly advice: " : ""}Great question about investing! For beginners, I recommend:\n\n1. **Start with an emergency fund** - 3-6 months of expenses\n2. **Consider index funds** - Low cost, diversified\n3. **Use retirement accounts** - 401(k) with employer match, then IRA\n4. **Dollar-cost averaging** - Invest regularly regardless of market conditions\n5. **Educate yourself** - Understand what you're investing in\n\n${isGuest ? "Even as a guest, you can explore investment concepts! " : ""}Remember: Start small, be consistent, and think long-term!`,
        
        savings: `${isGuest ? "Smart thinking about emergency savings! " : ""}Emergency savings are crucial! Here's my advice:\n\n**Emergency Fund Size:**\n• 3-6 months of essential expenses\n• Start with $1,000 if that feels overwhelming\n\n**Where to keep it:**\n• High-yield savings account\n• Money market account\n• Keep it separate from checking\n\n**How to build it:**\n• Automate transfers\n• Save tax refunds/bonuses\n• Start with small amounts ($25-50/month)\n\n${isGuest ? "You can practice these strategies even without an account! " : ""}Even $500 can prevent most financial emergencies!`,
        
        debt: `${isGuest ? "Let's tackle debt together! These strategies work for everyone: " : ""}Let's tackle that debt! Here are proven strategies:\n\n**Debt Snowball Method:**\n• Pay minimums on all debts\n• Put extra money toward smallest debt\n• Build momentum with quick wins\n\n**Debt Avalanche Method:**\n• Pay minimums on all debts\n• Focus extra payments on highest interest rate\n• Saves more money over time\n\n**Additional tips:**\n• Negotiate with creditors\n• Consider debt consolidation\n• Stop using credit cards\n• Find extra income sources\n\n${isGuest ? "Try our tools to see which method works better for your situation! " : ""}Which method sounds better for your situation?`
      },
      es: {
        budget: `${isGuest ? "¡Excelente pregunta! Aunque no guardes tus datos, " : ""}¡Crear un presupuesto es esencial para la salud financiera! Aquí tienes un enfoque simple:\n\n1. **Rastrea tus ingresos** - Lista todo el dinero que entra\n2. **Lista tus gastos** - Fijos (alquiler, servicios) y variables (comida, entretenimiento)\n3. **Usa la regla 50/30/20** - 50% necesidades, 30% deseos, 20% ahorros\n4. **Revisa mensualmente** - Ajusta según sea necesario\n\n${isGuest ? "Como invitado, ¡puedes probar nuestras herramientas de presupuesto para practicar! " : ""}¿Te gustaría ayuda configurando una categoría específica de presupuesto?`,
        
        investment: `${isGuest ? "¡Excelente pregunta! Déjame compartir algunos consejos para principiantes: " : ""}¡Excelente pregunta sobre inversiones! Para principiantes, recomiendo:\n\n1. **Comienza con un fondo de emergencia** - 3-6 meses de gastos\n2. **Considera fondos índice** - Bajo costo, diversificados\n3. **Usa cuentas de jubilación** - 401(k) con matching del empleador, luego IRA\n4. **Promedio de costo en dólares** - Invierte regularmente sin importar las condiciones del mercado\n5. **Edúcate** - Entiende en qué estás invirtiendo\n\n${isGuest ? "¡Incluso como invitado, puedes explorar conceptos de inversión! " : ""}¡Recuerda: Comienza pequeño, sé consistente y piensa a largo plazo!`,
        
        savings: `${isGuest ? "¡Pensamiento inteligente sobre ahorros de emergencia! " : ""}¡Los ahorros de emergencia son cruciales! Aquí tienes mi consejo:\n\n**Tamaño del Fondo de Emergencia:**\n• 3-6 meses de gastos esenciales\n• Comienza con $1,000 si eso se siente abrumador\n\n**Dónde mantenerlo:**\n• Cuenta de ahorros de alto rendimiento\n• Cuenta del mercado monetario\n• Mantenlo separado de la cuenta corriente\n\n**Cómo construirlo:**\n• Automatiza transferencias\n• Ahorra reembolsos de impuestos/bonos\n• Comienza con cantidades pequeñas ($25-50/mes)\n\n${isGuest ? "¡Puedes practicar estas estrategias incluso sin una cuenta! " : ""}¡Incluso $500 puede prevenir la mayoría de emergencias financieras!`,
        
        debt: `${isGuest ? "¡Ataquemos la deuda juntos! Estas estrategias funcionan para todos: " : ""}¡Ataquemos esa deuda! Aquí tienes estrategias probadas:\n\n**Método Bola de Nieve de Deuda:**\n• Paga mínimos en todas las deudas\n• Pon dinero extra hacia la deuda más pequeña\n• Construye impulso con victorias rápidas\n\n**Método Avalancha de Deuda:**\n• Paga mínimos en todas las deudas\n• Enfoca pagos extra en la tasa de interés más alta\n• Ahorra más dinero a largo plazo\n\n**Consejos adicionales:**\n• Negocia con acreedores\n• Considera consolidación de deuda\n• Deja de usar tarjetas de crédito\n• Encuentra fuentes de ingresos extra\n\n${isGuest ? "¡Prueba nuestras herramientas para ver qué método funciona mejor para tu situación! " : ""}¿Qué método suena mejor para tu situación?`
      },
      fr: {
        budget: `${isGuest ? "Excellente question! Même sans sauvegarder vos données, " : ""}Créer un budget est essentiel pour la santé financière! Voici une approche simple:\n\n1. **Suivez vos revenus** - Listez tout l'argent qui entre\n2. **Listez vos dépenses** - Fixes (loyer, services) et variables (nourriture, divertissement)\n3. **Utilisez la règle 50/30/20** - 50% besoins, 30% envies, 20% économies\n4. **Révisez mensuellement** - Ajustez au besoin\n\n${isGuest ? "En tant qu'invité, vous pouvez essayer nos outils de budgétisation pour pratiquer! " : ""}Aimeriez-vous de l'aide pour configurer une catégorie de budget spécifique?`,
        
        investment: `${isGuest ? "Excellente question! Laissez-moi partager quelques conseils pour débutants: " : ""}Excellente question sur l'investissement! Pour les débutants, je recommande:\n\n1. **Commencez par un fonds d'urgence** - 3-6 mois de dépenses\n2. **Considérez les fonds indiciels** - Faible coût, diversifiés\n3. **Utilisez les comptes de retraite** - 401(k) avec correspondance employeur, puis IRA\n4. **Moyenne des coûts en dollars** - Investissez régulièrement peu importe les conditions du marché\n5. **Éduquez-vous** - Comprenez dans quoi vous investissez\n\n${isGuest ? "Même en tant qu'invité, vous pouvez explorer les concepts d'investissement! " : ""}Rappelez-vous: Commencez petit, soyez cohérent et pensez à long terme!`,
        
        savings: `${isGuest ? "Réflexion intelligente sur les économies d'urgence! " : ""}Les économies d'urgence sont cruciales! Voici mon conseil:\n\n**Taille du Fonds d'Urgence:**\n• 3-6 mois de dépenses essentielles\n• Commencez par 1000$ si cela semble accablant\n\n**Où le garder:**\n• Compte d'épargne à haut rendement\n• Compte du marché monétaire\n• Gardez-le séparé du compte courant\n\n**Comment le construire:**\n• Automatisez les transferts\n• Économisez les remboursements d'impôts/bonus\n• Commencez par de petits montants (25-50$/mois)\n\n${isGuest ? "Vous pouvez pratiquer ces stratégies même sans compte! " : ""}Même 500$ peut prévenir la plupart des urgences financières!`,
        
        debt: `${isGuest ? "Attaquons la dette ensemble! Ces stratégies fonctionnent pour tout le monde: " : ""}Attaquons cette dette! Voici des stratégies éprouvées:\n\n**Méthode Boule de Neige de Dette:**\n• Payez les minimums sur toutes les dettes\n• Mettez l'argent supplémentaire vers la plus petite dette\n• Construisez l'élan avec des victoires rapides\n\n**Méthode Avalanche de Dette:**\n• Payez les minimums sur toutes les dettes\n• Concentrez les paiements supplémentaires sur le taux d'intérêt le plus élevé\n• Économise plus d'argent à long terme\n\n**Conseils supplémentaires:**\n• Négociez avec les créanciers\n• Considérez la consolidation de dette\n• Arrêtez d'utiliser les cartes de crédit\n• Trouvez des sources de revenus supplémentaires\n\n${isGuest ? "Essayez nos outils pour voir quelle méthode fonctionne le mieux pour votre situation! " : ""}Quelle méthode semble mieux pour votre situation?`
      }
    };

    const currentLangResponses = responses[language as keyof typeof responses] || responses.en;
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('presupuesto') || lowerMessage.includes('budget')) {
      return currentLangResponses.budget;
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment') || lowerMessage.includes('inversión') || lowerMessage.includes('investissement')) {
      return currentLangResponses.investment;
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('emergency') || lowerMessage.includes('ahorr') || lowerMessage.includes('urgence')) {
      return currentLangResponses.savings;
    }
    
    if (lowerMessage.includes('debt') || lowerMessage.includes('deuda') || lowerMessage.includes('dette')) {
      return currentLangResponses.debt;
    }
    
    // Default personalized response based on language and guest status
    const defaultResponses = {
      en: `${isGuest ? "I'm here to help you learn about finances, even in guest mode! " : ""}I understand you're looking for financial advice! I can help with budgeting, investing, saving, debt management, and more. Could you be more specific about what you'd like to know?`,
      es: `${isGuest ? "¡Estoy aquí para ayudarte a aprender sobre finanzas, incluso en modo invitado! " : ""}¡Entiendo que buscas consejo financiero! Puedo ayudar con presupuestos, inversiones, ahorros, gestión de deuda y más. ¿Podrías ser más específico sobre lo que te gustaría saber?`,
      fr: `${isGuest ? "Je suis là pour vous aider à apprendre les finances, même en mode invité! " : ""}Je comprends que vous cherchez des conseils financiers! Je peux aider avec la budgétisation, l'investissement, l'épargne, la gestion de la dette et plus. Pourriez-vous être plus spécifique sur ce que vous aimeriez savoir?`
    };
    
    return defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.en;
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
                  ? (language === 'es' ? "Consejos financieros personalizados para invitados" :
                     language === 'fr' ? "Conseils financiers personnalisés pour les invités" :
                     "Personalized financial advice for guests")
                  : t("aiChatSubtitle")
                }
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Suggested Questions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              {simpleMode ? t("quickQuestions") : t("popularTopics")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getSuggestedQuestions().map((question, index) => (
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
              placeholder={simpleMode ? t("askAboutMoney") : `${t("askAboutMoney")}...`}
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
              💡 {language === 'es' ? 'Modo invitado: Consejos reales personalizados sin necesidad de cuenta de correo. ¡Regístrate para guardar tu progreso!' : 
                  language === 'fr' ? 'Mode invité: Conseils réels personnalisés sans compte email requis. Inscrivez-vous pour sauvegarder vos progrès!' :
                  'Guest mode: Real personalized advice without needing an email account. Sign up to save your progress!'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAIChat;
