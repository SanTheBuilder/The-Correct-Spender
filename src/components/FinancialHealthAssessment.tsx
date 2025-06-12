
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

interface FinancialData {
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  debt: number;
  emergencyFund: number;
}

interface Assessment {
  score: number;
  recommendations: string[];
  savingsRate: number;
  emergencyMonths: number;
  debtToIncome: number;
  breakdown: {
    incomeExpenseScore: number;
    emergencyFundScore: number;
    debtScore: number;
    savingsScore: number;
  };
}

const FinancialHealthAssessment = () => {
  const { t, simpleMode } = useAccessibility();
  const [formData, setFormData] = useState<FinancialData>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    debt: 0,
    emergencyFund: 0
  });
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [showAdditionalAdvice, setShowAdditionalAdvice] = useState(false);
  const { toast } = useToast();

  const calculateHealthScore = (data: FinancialData) => {
    let totalScore = 0;
    const breakdown = {
      incomeExpenseScore: 0,
      emergencyFundScore: 0,
      debtScore: 0,
      savingsScore: 0
    };

    // Income vs Expenses (30 points) - More granular scoring
    const monthlySavings = data.monthlyIncome - data.monthlyExpenses;
    const savingsRate = data.monthlyIncome > 0 ? (monthlySavings / data.monthlyIncome) * 100 : 0;
    
    if (savingsRate >= 30) breakdown.incomeExpenseScore = 30;
    else if (savingsRate >= 20) breakdown.incomeExpenseScore = 28;
    else if (savingsRate >= 15) breakdown.incomeExpenseScore = 25;
    else if (savingsRate >= 10) breakdown.incomeExpenseScore = 20;
    else if (savingsRate >= 5) breakdown.incomeExpenseScore = 15;
    else if (savingsRate >= 0) breakdown.incomeExpenseScore = 10;
    else if (savingsRate >= -5) breakdown.incomeExpenseScore = 5;
    else breakdown.incomeExpenseScore = 0;

    // Emergency Fund (25 points) - More precise calculation
    const emergencyMonths = data.monthlyExpenses > 0 ? data.emergencyFund / data.monthlyExpenses : 0;
    
    if (emergencyMonths >= 6) breakdown.emergencyFundScore = 25;
    else if (emergencyMonths >= 4) breakdown.emergencyFundScore = 20;
    else if (emergencyMonths >= 3) breakdown.emergencyFundScore = 15;
    else if (emergencyMonths >= 2) breakdown.emergencyFundScore = 12;
    else if (emergencyMonths >= 1) breakdown.emergencyFundScore = 8;
    else if (emergencyMonths >= 0.5) breakdown.emergencyFundScore = 5;
    else breakdown.emergencyFundScore = 0;

    // Debt to Income Ratio (25 points) - More accurate debt assessment
    const annualIncome = data.monthlyIncome * 12;
    const debtToIncome = annualIncome > 0 ? (data.debt / annualIncome) * 100 : 0;
    
    if (debtToIncome <= 10) breakdown.debtScore = 25;
    else if (debtToIncome <= 20) breakdown.debtScore = 22;
    else if (debtToIncome <= 30) breakdown.debtScore = 18;
    else if (debtToIncome <= 40) breakdown.debtScore = 15;
    else if (debtToIncome <= 50) breakdown.debtScore = 12;
    else if (debtToIncome <= 60) breakdown.debtScore = 8;
    else if (debtToIncome <= 80) breakdown.debtScore = 5;
    else breakdown.debtScore = 0;

    // Savings to Income Ratio (20 points) - Better savings evaluation
    const savingsToIncome = annualIncome > 0 ? (data.savings / annualIncome) * 100 : 0;
    
    if (savingsToIncome >= 100) breakdown.savingsScore = 20;
    else if (savingsToIncome >= 75) breakdown.savingsScore = 18;
    else if (savingsToIncome >= 50) breakdown.savingsScore = 16;
    else if (savingsToIncome >= 30) breakdown.savingsScore = 14;
    else if (savingsToIncome >= 20) breakdown.savingsScore = 12;
    else if (savingsToIncome >= 10) breakdown.savingsScore = 8;
    else if (savingsToIncome >= 5) breakdown.savingsScore = 5;
    else breakdown.savingsScore = 0;

    totalScore = breakdown.incomeExpenseScore + breakdown.emergencyFundScore + breakdown.debtScore + breakdown.savingsScore;

    return {
      score: Math.round(totalScore),
      breakdown
    };
  };

  const generateRecommendations = (data: FinancialData, score: number) => {
    const recommendations = [];
    
    const savingsRate = data.monthlyIncome > 0 ? ((data.monthlyIncome - data.monthlyExpenses) / data.monthlyIncome) * 100 : 0;
    const emergencyMonths = data.monthlyExpenses > 0 ? data.emergencyFund / data.monthlyExpenses : 0;
    const debtToIncome = data.monthlyIncome > 0 ? (data.debt / (data.monthlyIncome * 12)) * 100 : 0;

    // More targeted recommendations based on specific issues
    if (savingsRate < 0) {
      recommendations.push("🚨 You're spending more than you earn - this needs immediate attention");
      recommendations.push("📝 Track every expense for one week to identify where money is going");
      recommendations.push("✂️ Cut non-essential expenses immediately (subscriptions, dining out, entertainment)");
    } else if (savingsRate < 5) {
      recommendations.push("💡 Start with micro-savings: save just $1-2 per day to build the habit");
      recommendations.push("🔍 Use the 24-hour rule before any non-essential purchase over $50");
      recommendations.push("📱 Cancel unused subscriptions and memberships");
    } else if (savingsRate < 10) {
      recommendations.push("📈 Great start! Try to gradually increase your savings rate to 10-15%");
      recommendations.push("🤖 Set up automatic transfers to savings accounts");
      recommendations.push("💰 Save any windfalls (tax refunds, bonuses) instead of spending them");
    } else if (savingsRate < 20) {
      recommendations.push("👍 You're doing well! Consider increasing savings when you get raises");
      recommendations.push("📊 Start investing your excess savings for long-term growth");
    }

    // Emergency fund specific advice
    if (emergencyMonths < 0.5) {
      recommendations.push("🚨 Start with a $500 starter emergency fund before anything else");
      recommendations.push("🏦 Open a separate savings account specifically for emergencies");
    } else if (emergencyMonths < 1) {
      recommendations.push("💪 Build your emergency fund to $1,000 as quickly as possible");
      recommendations.push("🎯 Aim for one month of expenses as your next milestone");
    } else if (emergencyMonths < 3) {
      recommendations.push("⬆️ Work toward 3 months of expenses in your emergency fund");
      recommendations.push("💳 Consider a high-yield savings account for better returns");
    } else if (emergencyMonths < 6) {
      recommendations.push("🏆 Excellent progress! Aim for 6 months for complete security");
      recommendations.push("💎 Consider money market accounts or CDs for better interest");
    }

    // Debt-specific recommendations
    if (debtToIncome > 80) {
      recommendations.push("🆘 Your debt level is critical - consider credit counseling immediately");
      recommendations.push("📞 Contact creditors to discuss payment plans or hardship programs");
      recommendations.push("⚖️ Look into debt consolidation options");
    } else if (debtToIncome > 60) {
      recommendations.push("❄️ Use the debt avalanche: minimum payments on all, extra on highest interest");
      recommendations.push("💼 Consider increasing income through side work or skill development");
      recommendations.push("🔄 Look into balance transfer options for high-interest credit cards");
    } else if (debtToIncome > 40) {
      recommendations.push("⚡ Focus on paying extra principal on your highest interest debt");
      recommendations.push("📉 Avoid taking on any new debt while paying down existing balances");
    } else if (debtToIncome > 20) {
      recommendations.push("✅ Good debt management! Pay a bit extra on principal when possible");
      recommendations.push("🎯 Set a target date to be debt-free and track progress");
    }

    // Score-based general advice
    if (score < 30) {
      recommendations.push("🎯 Focus on one financial goal at a time to avoid overwhelm");
      recommendations.push("📚 Consider free financial education resources from your bank");
      recommendations.push("👥 Find an accountability partner for your financial goals");
    } else if (score < 50) {
      recommendations.push("📖 Learn about basic investing principles for future wealth building");
      recommendations.push("🛡️ Review your insurance coverage to protect your progress");
    } else if (score < 70) {
      recommendations.push("🚀 Consider advanced strategies like tax-advantaged retirement accounts");
      recommendations.push("🏠 If renting, start researching homeownership if that's a goal");
    } else if (score >= 80) {
      recommendations.push("🌟 Outstanding! Consider tax optimization and estate planning");
      recommendations.push("💎 Explore advanced investment options like index funds or ETFs");
      recommendations.push("🎓 You might be ready to help others with their financial journey");
    }

    return recommendations.slice(0, 6); // Limit to 6 most relevant recommendations
  };

  const getAdditionalAdvice = () => {
    return [
      "📅 Create a written monthly budget and review it weekly",
      "🔄 Automate bill payments to avoid late fees",
      "📞 Negotiate bills (insurance, phone, internet) annually",
      "🛒 Use the envelope method for discretionary spending categories",
      "🍽️ Plan meals weekly to reduce food waste and costs",
      "📈 Track your net worth monthly to see overall progress",
      "🎯 Set SMART financial goals (Specific, Measurable, Achievable, Relevant, Time-bound)",
      "📚 Read one financial book or article per month",
      "💡 Increase retirement contributions with each raise (at least 1%)",
      "🏪 Use cashback apps and compare prices before major purchases"
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.monthlyIncome <= 0) {
      toast({
        title: t("invalidInput"),
        description: t("enterValidIncome"),
        variant: "destructive"
      });
      return;
    }

    const { score, breakdown } = calculateHealthScore(formData);
    const recommendations = generateRecommendations(formData, score);
    
    setAssessment({
      score,
      recommendations,
      savingsRate: formData.monthlyIncome > 0 ? ((formData.monthlyIncome - formData.monthlyExpenses) / formData.monthlyIncome) * 100 : 0,
      emergencyMonths: formData.monthlyExpenses > 0 ? formData.emergencyFund / formData.monthlyExpenses : 0,
      debtToIncome: formData.monthlyIncome > 0 ? (formData.debt / (formData.monthlyIncome * 12)) * 100 : 0,
      breakdown
    });

    setShowAdditionalAdvice(false);

    toast({
      title: t("assessmentComplete"),
      description: `${t("scoreMessage")} ${score}/100`
    });
  };

  const handleFeedback = (helpful: boolean) => {
    if (helpful) {
      toast({
        title: t("thankYou"),
        description: t("adviceHelpful")
      });
    } else {
      setShowAdditionalAdvice(true);
      toast({
        title: t("moreAdvice"),
        description: t("additionalTipsDesc")
      });
    }
  };

  const handleGoToAI = () => {
    toast({
      title: t("aiHelper"),
      description: t("navigateToAI")
    });
  };

  const updateFormData = (field: keyof FinancialData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("excellent");
    if (score >= 60) return t("good");
    if (score >= 40) return t("fair");
    return t("needsImprovement");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("financialHealthAssessment")}</CardTitle>
          <CardDescription>
            {t("financialHealthDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income">{t("monthlyIncome")}</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="5000"
                  onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expenses">{t("monthlyExpenses")}</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="3500"
                  onChange={(e) => updateFormData('monthlyExpenses', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="savings">{t("totalSavings")}</Label>
                <Input
                  id="savings"
                  type="number"
                  placeholder="15000"
                  onChange={(e) => updateFormData('savings', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="debt">{t("totalDebt")}</Label>
                <Input
                  id="debt"
                  type="number"
                  placeholder="25000"
                  onChange={(e) => updateFormData('debt', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="emergency">{t("emergencyFund")}</Label>
                <Input
                  id="emergency"
                  type="number"
                  placeholder="10000"
                  onChange={(e) => updateFormData('emergencyFund', e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t("calculateScore")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {assessment && (
        <Card>
          <CardHeader>
            <CardTitle>{t("yourScore")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(assessment.score)}`}>
                {assessment.score}/100
              </div>
              <Progress value={assessment.score} className="w-full" />
              <p className="text-muted-foreground mt-2">
                {getScoreLabel(assessment.score)}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.savingsRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">{t("savingsRate")}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.emergencyMonths.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">{t("emergencyMonths")}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.debtToIncome.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">{t("debtToIncome")}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">{t("recommendations")}</h3>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {showAdditionalAdvice && (
              <div>
                <h3 className="font-semibold mb-3">{t("additionalTips")}</h3>
                <ul className="space-y-2">
                  {getAdditionalAdvice().map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-3">{t("wasHelpful")}</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeedback(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {t("helpful")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeedback(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  {t("notHelpful")}
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleGoToAI}
                  className="flex items-center gap-2 ml-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("getAIHelp")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialHealthAssessment;
