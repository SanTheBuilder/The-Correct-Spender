
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FinancialData {
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  debt: number;
  emergencyFund: number;
}

const FinancialHealthAssessment = () => {
  const [formData, setFormData] = useState<FinancialData>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    debt: 0,
    emergencyFund: 0
  });
  
  const [assessment, setAssessment] = useState<any>(null);
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
    if (savingsRate < 10) {
      recommendations.push("Try to reduce expenses and aim to save at least 10% of your income");
    }

    const emergencyMonths = data.emergencyFund / data.monthlyExpenses;
    if (emergencyMonths < 3) {
      recommendations.push("Build an emergency fund covering 3-6 months of expenses");
    }

    const debtToIncome = (data.debt / (data.monthlyIncome * 12)) * 100;
    if (debtToIncome > 40) {
      recommendations.push("Focus on paying down debt to improve your debt-to-income ratio");
    }

    if (recommendations.length === 0) {
      recommendations.push("Great job! Keep maintaining your healthy financial habits");
    }

    return recommendations;
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

    toast({
      title: "Assessment Complete!",
      description: `Your financial health score is ${score}/100`
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
              <h3 className="font-semibold mb-3">Recommendations:</h3>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialHealthAssessment;
