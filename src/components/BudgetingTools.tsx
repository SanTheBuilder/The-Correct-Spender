
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

const BudgetingTools = () => {
  const [income, setIncome] = useState<number>(0);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Housing', budgeted: 0, spent: 0, color: 'bg-blue-500' },
    { id: '2', name: 'Food', budgeted: 0, spent: 0, color: 'bg-green-500' },
    { id: '3', name: 'Transportation', budgeted: 0, spent: 0, color: 'bg-yellow-500' },
    { id: '4', name: 'Entertainment', budgeted: 0, spent: 0, color: 'bg-purple-500' },
    { id: '5', name: 'Savings', budgeted: 0, spent: 0, color: 'bg-red-500' },
  ]);
  
  const { toast } = useToast();

  const updateCategoryBudget = (id: string, budgeted: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, budgeted } : cat
    ));
  };

  const updateCategorySpent = (id: string, spent: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, spent } : cat
    ));
  };

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingIncome = income - totalBudgeted;

  const apply50302010Rule = () => {
    if (income <= 0) {
      toast({
        title: "Set Your Income First",
        description: "Please enter your monthly income to apply the 50-30-20-10 rule",
        variant: "destructive"
      });
      return;
    }

    const newCategories = [...categories];
    newCategories[0].budgeted = income * 0.50; // Housing (50%)
    newCategories[1].budgeted = income * 0.15; // Food (15%)
    newCategories[2].budgeted = income * 0.15; // Transportation (15%)
    newCategories[3].budgeted = income * 0.10; // Entertainment (10%)
    newCategories[4].budgeted = income * 0.10; // Savings (10%)

    setCategories(newCategories);
    
    toast({
      title: "Budget Applied!",
      description: "Applied the 50-30-20-10 budgeting rule to your categories"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Planner</CardTitle>
          <CardDescription>
            Create and track your monthly budget with our easy-to-use tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthly-income">Monthly Income ($)</Label>
              <Input
                id="monthly-income"
                type="number"
                placeholder="5000"
                value={income || ''}
                onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={apply50302010Rule} className="w-full">
                Apply 50-30-20-10 Rule
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">${income.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Monthly Income</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${totalBudgeted.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Total Budgeted</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${remainingIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remainingIncome.toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>
            Set budgets for each category and track your spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0;
              const isOverBudget = category.spent > category.budgeted;
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{category.name}</h3>
                    <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-muted-foreground'}`}>
                      ${category.spent.toFixed(0)} / ${category.budgeted.toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`budget-${category.id}`} className="text-xs">Budget Amount</Label>
                      <Input
                        id={`budget-${category.id}`}
                        type="number"
                        placeholder="0"
                        value={category.budgeted || ''}
                        onChange={(e) => updateCategoryBudget(category.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`spent-${category.id}`} className="text-xs">Amount Spent</Label>
                      <Input
                        id={`spent-${category.id}`}
                        type="number"
                        placeholder="0"
                        value={category.spent || ''}
                        onChange={(e) => updateCategorySpent(category.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isOverBudget ? '[&>*]:bg-red-500' : ''}`}
                    />
                    <div className="text-xs text-muted-foreground">
                      {percentage.toFixed(1)}% of budget used
                      {isOverBudget && (
                        <span className="text-red-600 ml-2">
                          (${(category.spent - category.budgeted).toFixed(0)} over budget)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetingTools;
