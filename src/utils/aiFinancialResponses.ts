
export const generateEnhancedFinancialResponse = (userMessage: string, isGuest: boolean, language: string = 'en'): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Enhanced multilingual responses with more detailed advice
  const responses = {
    en: {
      budget: `${isGuest ? "Great question! Even as a guest, I can help you master budgeting! " : ""}Creating an effective budget is your financial foundation! Here's my comprehensive approach:

**📊 The Smart Budget Framework:**
1. **Calculate your true income** - After taxes, not before
2. **Track expenses for 2 weeks** - Use apps like Mint or YNAB, or simply write them down
3. **Apply the 50/30/20 rule** (or modify based on your situation):
   • 50% Needs (rent, utilities, groceries, minimum debt payments)
   • 30% Wants (dining out, entertainment, hobbies)
   • 20% Savings & extra debt payments

**💡 Pro Tips:**
• Start with ONE expense category to optimize
• Use the "envelope method" for discretionary spending
• Review and adjust monthly - budgets are living documents
• Automate your savings so you "pay yourself first"

**🚨 Common Budget Mistakes to Avoid:**
• Setting unrealistic expectations
• Forgetting irregular expenses (car maintenance, gifts)
• Not having a buffer for overspending

${isGuest ? "Try our budgeting calculator to practice these concepts! " : ""}Would you like help creating a budget for a specific income level or expense category?`,

      investment: `${isGuest ? "Smart thinking about investing! Let me share proven strategies: " : ""}Investing is how you build long-term wealth! Here's my step-by-step investment roadmap:

**🏗️ Investment Foundation (Do These First):**
1. **Emergency fund** - 3-6 months of expenses in high-yield savings
2. **Pay off high-interest debt** - Credit cards (18%+ interest) before investing
3. **Get employer 401(k) match** - It's free money!

**📈 Beginner Investment Strategy:**
• **Start with target-date funds** - Automatically diversified and rebalanced
• **Then add broad market index funds** - Like VTSAX or VTI (low 0.03% fees)
• **Dollar-cost averaging** - Invest the same amount monthly, regardless of market
• **Time horizon matters** - Only invest money you won't need for 5+ years

**🎯 Investment Account Priority:**
1. 401(k) up to company match
2. Roth IRA ($7,000/year limit for 2024)
3. Max out 401(k) ($23,000/year limit)
4. Taxable investment account

**⚠️ Avoid These Beginner Mistakes:**
• Trying to time the market
• Picking individual stocks without research
• Panic selling during market drops
• High-fee investment products

${isGuest ? "Even without an account, you can start learning about these concepts! " : ""}What's your timeline and risk tolerance for investing?`,

      savings: `${isGuest ? "Emergency savings are crucial for everyone - great question! " : ""}Building an emergency fund is your financial safety net! Here's my proven strategy:

**💰 Emergency Fund Targets:**
• **Starter goal:** $1,000 (covers 80% of emergencies)
• **Full goal:** 3-6 months of essential expenses
• **Extended goal:** 6-12 months if you're self-employed

**🏦 Where to Keep Emergency Savings:**
• **High-yield savings account** (4-5% APY currently)
• **Money market accounts** - Slightly higher rates
• **Short-term CDs** - For portion you won't touch

**⚡ Quick-Start Savings Plan:**
1. **Week 1:** Open high-yield savings account
2. **Week 2:** Set up automatic transfer ($25-100/week)
3. **Month 1:** Save windfalls (tax refunds, bonuses)
4. **Month 3:** Review and increase if possible

**🎯 Savings Hacks:**
• Round up purchases and save the change
• Use the 52-week challenge ($1 week 1, $2 week 2, etc.)
• Save one small expense daily (coffee, subscription)
• Direct deposit portion of paycheck to savings

**📊 Savings Rate Targets:**
• Minimum: 10% of income
• Good: 15-20% of income
• Excellent: 25%+ of income

${isGuest ? "You can practice these strategies regardless of account status! " : ""}What's your current monthly income? I can help calculate specific savings targets!`,

      debt: `${isGuest ? "Debt payoff is possible for everyone - let's create your strategy! " : ""}Let's eliminate that debt strategically! Here are the proven methods:

**⚡ Debt Avalanche vs. Snowball:**

**🏔️ Debt Avalanche (Mathematical Winner):**
• List debts by interest rate (highest first)
• Pay minimums on all, extra on highest rate
• Saves most money long-term
• Best for: Disciplined people, high-interest debt

**❄️ Debt Snowball (Psychological Winner):**
• List debts by balance (smallest first)
• Pay minimums on all, extra on smallest balance
• Quick wins build momentum
• Best for: Motivation-driven people

**💪 Supercharge Your Debt Payoff:**
1. **Negotiate with creditors** - Ask for lower rates
2. **Balance transfer** - 0% APR cards for 12-21 months
3. **Debt consolidation loan** - Lower rate than credit cards
4. **Side hustle income** - Direct 100% to debt

**🚫 Stop Digging Deeper:**
• Cut up credit cards (keep accounts open)
• Remove cards from online accounts
• Use cash/debit only
• Avoid new debt at all costs

**📱 Helpful Tools:**
• Debt payoff calculators
• Apps like Debt Payoff Planner
• Spreadsheet tracking

**🎯 Debt Payoff Timeline:**
With extra $200/month on a $5,000 credit card (18% APR):
• Minimum payments: 34 months
• With extra payment: 22 months
• You save: $1,400 in interest!

${isGuest ? "Try our debt calculator to see your payoff timeline! " : ""}What's your total debt amount and highest interest rate? I can help create your specific plan!`,

      credit: `${isGuest ? "Building credit is important for everyone - great question! " : ""}Your credit score affects everything from loans to insurance! Here's how to build excellent credit:

**📊 Credit Score Breakdown:**
• 35% Payment history (NEVER miss payments)
• 30% Credit utilization (keep below 10% of limits)
• 15% Length of credit history (don't close old cards)
• 10% Types of credit (mix of cards, loans)
• 10% New credit (limit hard inquiries)

**🚀 Credit Building Strategy:**
1. **Pay all bills on time** - Set up autopay for minimums
2. **Keep utilization low** - Use less than 10% of credit limits
3. **Don't close old cards** - They help your average account age
4. **Consider authorized user status** - On family member's good account
5. **Monitor your credit** - Free reports from annualcreditreport.com

**💳 Credit Card Strategy:**
• Start with secured card if needed
• Graduate to rewards cards
• Pay in full every month
• Use cards regularly but lightly

**⚠️ Credit Killers to Avoid:**
• Late payments (even by 1 day)
• Maxing out credit cards
• Closing old accounts
• Applying for too much credit quickly

**🎯 Credit Score Targets:**
• 580-669: Fair (improve needed)
• 670-739: Good (decent rates)
• 740-799: Very Good (great rates)
• 800+: Excellent (best rates available)

${isGuest ? "You can start building credit fundamentals now! " : ""}What's your current credit score range? I can provide targeted advice!`,

      retirement: `${isGuest ? "Retirement planning is crucial for everyone - smart question! " : ""}Retirement planning is about compound growth over time! Here's your roadmap:

**🏁 Retirement Savings Targets by Age:**
• Age 30: 1x annual salary saved
• Age 40: 3x annual salary saved
• Age 50: 6x annual salary saved
• Age 60: 8x annual salary saved
• Age 67: 10x annual salary saved

**📈 Account Priority Order:**
1. **401(k) to company match** - Free money first!
2. **Roth IRA** - Tax-free growth ($7,000/year)
3. **Max 401(k)** - Up to $23,000/year
4. **Backdoor Roth** - If income limits apply

**💰 Contribution Strategies:**
• Start with 10% of income minimum
• Increase by 1% each year
• Max out catch-up contributions after 50
• Automate everything

**🎯 The Magic of Starting Early:**
Investing $200/month starting at:
• Age 25: $878,570 at 65 (7% return)
• Age 35: $367,332 at 65 (7% return)
• Age 45: $131,900 at 65 (7% return)

**🏠 Don't Forget:**
• Social Security (but don't rely on it alone)
• Healthcare costs in retirement
• Inflation impacts

${isGuest ? "Time is your biggest asset in retirement planning! " : ""}What's your age and current retirement savings? I can help calculate your needed contributions!`
    },
    es: {
      budget: `${isGuest ? "¡Excelente pregunta! Incluso como invitado, puedo ayudarte a dominar el presupuesto! " : ""}¡Crear un presupuesto efectivo es tu base financiera! Aquí está mi enfoque integral:

**📊 Marco de Presupuesto Inteligente:**
1. **Calcula tu ingreso real** - Después de impuestos, no antes
2. **Rastrea gastos por 2 semanas** - Usa apps como Mint o simplemente escríbelos
3. **Aplica la regla 50/30/20** (o modifica según tu situación):
   • 50% Necesidades (alquiler, servicios, comida, pagos mínimos de deuda)
   • 30% Deseos (salir a cenar, entretenimiento, pasatiempos)
   • 20% Ahorros y pagos extra de deuda

**💡 Consejos Pro:**
• Comienza optimizando UNA categoría de gastos
• Usa el "método de sobres" para gastos discrecionales
• Revisa y ajusta mensualmente - los presupuestos son documentos vivos
• Automatiza tus ahorros para "pagarte primero"

${isGuest ? "¡Prueba nuestra calculadora de presupuesto para practicar estos conceptos! " : ""}¿Te gustaría ayuda creando un presupuesto para un nivel específico de ingresos?`,
      
      // Add other Spanish translations...
      investment: `${isGuest ? "¡Pensamiento inteligente sobre inversiones! Déjame compartir estrategias probadas: " : ""}¡Invertir es cómo construyes riqueza a largo plazo! Aquí está mi hoja de ruta de inversión paso a paso: [continued...]`,
      savings: `${isGuest ? "¡Los ahorros de emergencia son cruciales para todos - excelente pregunta! " : ""}¡Construir un fondo de emergencia es tu red de seguridad financiera! [continued...]`,
      debt: `${isGuest ? "¡El pago de deudas es posible para todos - creemos tu estrategia! " : ""}¡Eliminemos esa deuda estratégicamente! [continued...]`,
      credit: `${isGuest ? "¡Construir crédito es importante para todos - gran pregunta! " : ""}¡Tu puntaje crediticio afecta todo! [continued...]`,
      retirement: `${isGuest ? "¡La planificación de jubilación es crucial para todos - pregunta inteligente! " : ""}¡La planificación de jubilación se trata de crecimiento compuesto! [continued...]`
    },
    fr: {
      budget: `${isGuest ? "Excellente question! Même en tant qu'invité, je peux vous aider à maîtriser la budgétisation! " : ""}Créer un budget efficace est votre fondation financière! Voici mon approche complète: [continued...]`,
      investment: `${isGuest ? "Réflexion intelligente sur l'investissement! Laissez-moi partager des stratégies éprouvées: " : ""}L'investissement est la façon de construire la richesse à long terme! [continued...]`,
      savings: `${isGuest ? "Les économies d'urgence sont cruciales pour tous - excellente question! " : ""}Construire un fonds d'urgence est votre filet de sécurité financier! [continued...]`,
      debt: `${isGuest ? "Le remboursement de dette est possible pour tous - créons votre stratégie! " : ""}Éliminons cette dette stratégiquement! [continued...]`,
      credit: `${isGuest ? "Construire le crédit est important pour tous - grande question! " : ""}Votre score de crédit affecte tout! [continued...]`,
      retirement: `${isGuest ? "La planification de retraite est cruciale pour tous - question intelligente! " : ""}La planification de retraite concerne la croissance composée! [continued...]`
    }
  };

  const currentLangResponses = responses[language as keyof typeof responses] || responses.en;
  
  // Enhanced keyword detection
  if (lowerMessage.includes('budget') || lowerMessage.includes('presupuesto') || lowerMessage.includes('budget')) {
    return currentLangResponses.budget;
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('investment') || lowerMessage.includes('inversión') || lowerMessage.includes('investissement') || lowerMessage.includes('stock') || lowerMessage.includes('401k') || lowerMessage.includes('roth') || lowerMessage.includes('portfolio')) {
    return currentLangResponses.investment;
  }
  
  if (lowerMessage.includes('save') || lowerMessage.includes('saving') || lowerMessage.includes('emergency') || lowerMessage.includes('ahorr') || lowerMessage.includes('urgence') || lowerMessage.includes('fund')) {
    return currentLangResponses.savings;
  }
  
  if (lowerMessage.includes('debt') || lowerMessage.includes('deuda') || lowerMessage.includes('dette') || lowerMessage.includes('loan') || lowerMessage.includes('credit card') || lowerMessage.includes('pay off')) {
    return currentLangResponses.debt;
  }
  
  if (lowerMessage.includes('credit') || lowerMessage.includes('score') || lowerMessage.includes('crédito') || lowerMessage.includes('crédit') || lowerMessage.includes('fico')) {
    return currentLangResponses.credit;
  }
  
  if (lowerMessage.includes('retire') || lowerMessage.includes('retirement') || lowerMessage.includes('jubilación') || lowerMessage.includes('retraite') || lowerMessage.includes('pension')) {
    return currentLangResponses.retirement;
  }
  
  // Enhanced default response
  const defaultResponses = {
    en: `${isGuest ? "I'm here to provide real financial wisdom, even in guest mode! " : ""}I'm your comprehensive financial advisor! I can help with:

🏦 **Budgeting & Cash Flow** - Create sustainable spending plans
💰 **Emergency Savings** - Build your financial safety net  
📈 **Investment Strategy** - Grow wealth for the long term
💳 **Debt Management** - Strategic payoff plans
🏡 **Credit Building** - Improve your financial reputation
🎯 **Retirement Planning** - Secure your future

**Popular questions I excel at:**
• "How much should I save each month?"
• "What's the best way to pay off $X in credit card debt?"
• "Should I invest or pay off debt first?"
• "How do I improve my credit score from X to Y?"

${isGuest ? "All advice works whether you have an account or not! " : ""}What specific financial goal would you like to tackle first?`,
    
    es: `${isGuest ? "¡Estoy aquí para proporcionar sabiduría financiera real, incluso en modo invitado! " : ""}¡Soy tu asesor financiero integral! Puedo ayudar con: [continued...]`,
    
    fr: `${isGuest ? "Je suis là pour fournir une vraie sagesse financière, même en mode invité! " : ""}Je suis votre conseiller financier complet! Je peux aider avec: [continued...]`
  };
  
  return defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.en;
};

export const getPersonalizedSuggestions = (isGuest: boolean, language: string = 'en') => {
  const suggestions = {
    en: [
      { text: "Create my first budget with the 50/30/20 rule", category: "budgeting", icon: "DollarSign" },
      { text: "Emergency fund: How much and where to save?", category: "savings", icon: "PiggyBank" },
      { text: "Debt snowball vs avalanche - which is better?", category: "debt", icon: "Lightbulb" },
      { text: "Investment basics: Index funds vs target-date funds", category: "investment", icon: "TrendingUp" },
      { text: "Improve credit score from 650 to 750+", category: "credit", icon: "DollarSign" },
      { text: "Retirement planning: How much do I need?", category: "retirement", icon: "PiggyBank" }
    ],
    es: [
      { text: "Crear mi primer presupuesto con la regla 50/30/20", category: "budgeting", icon: "DollarSign" },
      { text: "Fondo de emergencia: ¿Cuánto y dónde ahorrar?", category: "savings", icon: "PiggyBank" },
      { text: "Bola de nieve vs avalancha de deuda - ¿cuál es mejor?", category: "debt", icon: "Lightbulb" },
      { text: "Conceptos básicos de inversión: Fondos índice vs fondos de fecha objetivo", category: "investment", icon: "TrendingUp" }
    ],
    fr: [
      { text: "Créer mon premier budget avec la règle 50/30/20", category: "budgeting", icon: "DollarSign" },
      { text: "Fonds d'urgence: Combien et où économiser?", category: "savings", icon: "PiggyBank" },
      { text: "Boule de neige vs avalanche de dette - lequel est mieux?", category: "debt", icon: "Lightbulb" },
      { text: "Bases d'investissement: Fonds indiciels vs fonds à date cible", category: "investment", icon: "TrendingUp" }
    ]
  };
  
  return suggestions[language as keyof typeof suggestions] || suggestions.en;
};
