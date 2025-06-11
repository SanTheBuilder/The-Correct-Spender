
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

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
}

const FinancialHealthAssessment = () => {
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
    let score = 0;
    const maxScore = 100;

    // Income vs Expenses (30 points)
    const savingsRate = ((data.monthlyIncome - data.monthlyExpenses) / data.monthlyIncome) * 100;
    if (savingsRate >= 20) score += 30;
    else if (savingsRate >= 10) score += 20;
    else if (savingsRate >= 0) score += 10;

    // Emergency Fund (25 points)
    const emergencyMonths = data.emergencyFund / data.monthlyExpenses;
    if (emergencyMonths >= 6) score += 25;
    else if (emergencyMonths >= 3) score += 15;
    else if (emergencyMonths >= 1) score += 10;

    // Debt to Income Ratio (25 points)
    const debtToIncome = (data.debt / (data.monthlyIncome * 12)) * 100;
    if (debtToIncome <= 20) score += 25;
    else if (debtToIncome <= 40) score += 15;
    else if (debtToIncome <= 60) score += 10;

    // Savings (20 points)
    const savingsToIncome = (data.savings / (data.monthlyIncome * 12)) * 100;
    if (savingsToIncome >= 50) score += 20;
    else if (savingsToIncome >= 25) score += 15;
    else if (savingsToIncome >= 10) score += 10;

    return Math.round((score / maxScore) * 100);
  };

  const generateRecommendations = (data: FinancialData, score: number) => {
    const recommendations = [];
    
    const savingsRate = ((data.monthlyIncome - data.monthlyExpenses) / data.monthlyIncome) * 100;
    const emergencyMonths = data.emergencyFund / data.monthlyExpenses;
    const debtToIncome = (data.debt / (data.monthlyIncome * 12)) * 100;

    // Savings rate recommendations
    if (savingsRate < 5) {
      recommendations.push("Start with saving just $1 per day - even small amounts build habits");
      recommendations.push("Review your subscriptions and cancel unused services");
    } else if (savingsRate < 10) {
      recommendations.push("Great start! Try to gradually increase your savings rate to 10-15%");
      recommendations.push("Consider automating your savings to make it effortless");
    } else if (savingsRate < 20) {
      recommendations.push("You're doing well! Consider increasing savings when you get raises or bonuses");
    }

    // Emergency fund recommendations
    if (emergencyMonths < 1) {
      recommendations.push("Start with a mini emergency fund of $500-$1000");
      recommendations.push("Keep emergency funds in a separate, easily accessible savings account");
    } else if (emergencyMonths < 3) {
      recommendations.push("Work toward 3 months of expenses in your emergency fund");
      recommendations.push("Consider a high-yield savings account for your emergency fund");
    } else if (emergencyMonths < 6) {
      recommendations.push("Excellent progress! Aim for 6 months of expenses for full security");
    }

    // Debt recommendations
    if (debtToIncome > 60) {
      recommendations.push("Consider debt consolidation or speaking with a credit counselor");
      recommendations.push("Focus on paying minimums on all debts, then extra on the highest interest rate debt");
    } else if (debtToIncome > 40) {
      recommendations.push("Try the debt avalanche method: pay minimums on all debts, extra on highest interest");
      recommendations.push("Consider increasing your income through side work or skills development");
    } else if (debtToIncome > 20) {
      recommendations.push("You're managing debt well - consider paying a bit extra on principal when possible");
    }

    // Additional general recommendations based on score
    if (score < 40) {
      recommendations.push("Focus on one financial goal at a time to avoid overwhelm");
      recommendations.push("Track your spending for a week to identify patterns");
    } else if (score < 60) {
      recommendations.push("Consider learning about investing basics for long-term wealth building");
      recommendations.push("Review and optimize your insurance coverage");
    } else if (score >= 80) {
      recommendations.push("Excellent financial health! Consider advanced strategies like tax optimization");
      recommendations.push("You might be ready to explore additional investment opportunities");
    }

    if (recommendations.length === 0) {
      recommendations.push("Outstanding financial management! Keep up the excellent work");
    }

    return recommendations;
  };

  const getAdditionalAdvice = (data: FinancialData) => {
    return [
      "Create a written budget and review it monthly",
      "Set up automatic transfers to savings accounts",
      "Negotiate bills like insurance, phone, and internet annually",
      "Use the 24-hour rule before making non-essential purchases over $100",
      "Consider meal planning to reduce food waste and costs",
      "Look into free financial education resources from your bank or credit union",
      "Track your net worth quarterly to monitor progress",
      "Consider increasing retirement contributions with each raise"
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.monthlyIncome <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid monthly income",
        variant: "destructive"
      });
      return;
    }

    const score = calculateHealthScore(formData);
    const recommendations = generateRecommendations(formData, score);
    
    setAssessment({
      score,
      recommendations,
      savingsRate: ((formData.monthlyIncome - formData.monthlyExpenses) / formData.monthlyIncome) * 100,
      emergencyMonths: formData.emergencyFund / formData.monthlyExpenses,
      debtToIncome: (formData.debt / (formData.monthlyIncome * 12)) * 100
    });

    setShowAdditionalAdvice(false);

    toast({
      title: "Assessment Complete!",
      description: `Your financial health score is ${score}/100`
    });
  };

  const handleFeedback = (helpful: boolean) => {
    if (helpful) {
      toast({
        title: "Thank you!",
        description: "We're glad the advice was helpful"
      });
    } else {
      setShowAdditionalAdvice(true);
      toast({
        title: "More advice coming up!",
        description: "Here are additional tips that might help"
      });
    }
  };

  const handleGoToAI = () => {
    // This would navigate to AI chat - for now we'll show a message
    toast({
      title: "AI Helper",
      description: "Navigate to the AI Chat section for personalized assistance"
    });
  };

  const updateFormData = (field: keyof FinancialData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Health Assessment</CardTitle>
          <CardDescription>
            Enter your financial information to get a personalized health score and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income">Monthly Income ($)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="5000"
                  onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="3500"
                  onChange={(e) => updateFormData('monthlyExpenses', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="savings">Total Savings ($)</Label>
                <Input
                  id="savings"
                  type="number"
                  placeholder="15000"
                  onChange={(e) => updateFormData('savings', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="debt">Total Debt ($)</Label>
                <Input
                  id="debt"
                  type="number"
                  placeholder="25000"
                  onChange={(e) => updateFormData('debt', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="emergency">Emergency Fund ($)</Label>
                <Input
                  id="emergency"
                  type="number"
                  placeholder="10000"
                  onChange={(e) => updateFormData('emergencyFund', e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Calculate My Financial Health Score
            </Button>
          </form>
        </CardContent>
      </Card>

      {assessment && (
        <Card>
          <CardHeader>
            <CardTitle>Your Financial Health Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {assessment.score}/100
              </div>
              <Progress value={assessment.score} className="w-full" />
              <p className="text-muted-foreground mt-2">
                {assessment.score >= 80 ? "Excellent" : 
                 assessment.score >= 60 ? "Good" : 
                 assessment.score >= 40 ? "Fair" : "Needs Improvement"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.savingsRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Savings Rate</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.emergencyMonths.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Emergency Months</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-semibold">
                  {assessment.debtToIncome.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Debt to Income</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Personalized Recommendations:</h3>
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
                <h3 className="font-semibold mb-3">Additional Tips:</h3>
                <ul className="space-y-2">
                  {getAdditionalAdvice(formData).map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-3">Was this advice helpful?</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeedback(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeedback(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Not Helpful
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleGoToAI}
                  className="flex items-center gap-2 ml-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get AI Help
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
