
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calculator, MessageCircle, Activity } from "lucide-react";
import FinancialHealthAssessment from "@/components/FinancialHealthAssessment";
import BudgetingTools from "@/components/BudgetingTools";
import AIChat from "@/components/AIChat";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const features = [
    {
      id: "assessment",
      title: "Financial Health Assessment",
      description: "Evaluate your current financial situation and get personalized insights",
      icon: Activity,
      color: "text-green-600"
    },
    {
      id: "budgeting",
      title: "Budgeting Tools",
      description: "Create and manage budgets that work for your lifestyle",
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      id: "chat",
      title: "AI Financial Advisor",
      description: "Get instant advice and feedback on your financial decisions",
      icon: MessageCircle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">The Correct Spender</h1>
              <p className="text-muted-foreground">Your accessible financial wellness companion</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {activeSection === "overview" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Take Control of Your Financial Future</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're new to managing money or looking to improve your financial health, 
                we're here to help you make informed decisions without the need for expensive advisors.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <feature.icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveSection(feature.id)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats or Tips */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Did You Know?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-muted-foreground">
                  • 64% of Americans can't afford a $1,000 emergency expense
                </p>
                <p className="text-muted-foreground">
                  • The average American spends $18,000 more than they earn each year
                </p>
                <p className="text-muted-foreground">
                  • Simple budgeting can help save 10-20% of your income
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "assessment" && (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection("overview")}
              className="mb-6"
            >
              ← Back to Overview
            </Button>
            <FinancialHealthAssessment />
          </div>
        )}

        {activeSection === "budgeting" && (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection("overview")}
              className="mb-6"
            >
              ← Back to Overview
            </Button>
            <BudgetingTools />
          </div>
        )}

        {activeSection === "chat" && (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection("overview")}
              className="mb-6"
            >
              ← Back to Overview
            </Button>
            <AIChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
