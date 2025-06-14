
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, DollarSign, PiggyBank, TrendingDown } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

interface BudgetingHelpProps {
  onClose: () => void;
}

const BudgetingHelp = ({ onClose }: BudgetingHelpProps) => {
  const { t, language, simpleMode } = useAccessibility();

  const getBudgetingTips = () => {
    const tips = {
      en: [
        {
          title: "50/30/20 Rule",
          description: "Spend 50% on needs (rent, food), 30% on wants (entertainment), 20% on savings and debt payment.",
          icon: DollarSign
        },
        {
          title: "Track Your Expenses",
          description: "Write down every purchase for a week to see where your money really goes.",
          icon: TrendingDown
        },
        {
          title: "Start Small",
          description: "Begin with saving just $25-50 per month. Small amounts add up over time!",
          icon: PiggyBank
        },
        {
          title: "Emergency Fund First",
          description: "Save $500-1000 for emergencies before focusing on other goals.",
          icon: Lightbulb
        }
      ],
      es: [
        {
          title: "Regla 50/30/20",
          description: "Gasta 50% en necesidades (alquiler, comida), 30% en deseos (entretenimiento), 20% en ahorros y pago de deudas.",
          icon: DollarSign
        },
        {
          title: "Rastrea Tus Gastos",
          description: "Anota cada compra durante una semana para ver a dónde va realmente tu dinero.",
          icon: TrendingDown
        },
        {
          title: "Comienza Pequeño",
          description: "Empieza ahorrando solo $25-50 por mes. ¡Las pequeñas cantidades se suman con el tiempo!",
          icon: PiggyBank
        },
        {
          title: "Fondo de Emergencia Primero",
          description: "Ahorra $500-1000 para emergencias antes de enfocarte en otras metas.",
          icon: Lightbulb
        }
      ],
      fr: [
        {
          title: "Règle 50/30/20",
          description: "Dépensez 50% pour les besoins (loyer, nourriture), 30% pour les envies (divertissement), 20% pour l'épargne et le remboursement de dettes.",
          icon: DollarSign
        },
        {
          title: "Suivez Vos Dépenses",
          description: "Notez chaque achat pendant une semaine pour voir où va vraiment votre argent.",
          icon: TrendingDown
        },
        {
          title: "Commencez Petit",
          description: "Commencez par économiser seulement 25-50$ par mois. Les petits montants s'accumulent avec le temps!",
          icon: PiggyBank
        },
        {
          title: "Fonds d'Urgence d'Abord",
          description: "Économisez 500-1000$ pour les urgences avant de vous concentrer sur d'autres objectifs.",
          icon: Lightbulb
        }
      ]
    };
    
    return tips[language as keyof typeof tips] || tips.en;
  };

  const budgetingTips = getBudgetingTips();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          {simpleMode ? "How to Budget" : "Budgeting Help & Tips"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {budgetingTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <tip.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            {simpleMode ? "Quick Start" : "Getting Started Tip"}
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {language === 'es' ? 
              "¡No te preocupes por hacer todo perfecto! Empieza con un presupuesto simple y ajústalo cada mes." :
            language === 'fr' ?
              "Ne vous inquiétez pas de tout faire parfaitement! Commencez par un budget simple et ajustez-le chaque mois." :
              "Don't worry about making everything perfect! Start with a simple budget and adjust it each month."
            }
          </p>
        </div>
        
        <Button onClick={onClose} className="w-full">
          {simpleMode ? "Got it!" : "Close Help"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetingHelp;
