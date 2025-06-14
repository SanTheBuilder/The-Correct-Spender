
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "../AccessibilityProvider";

interface FinancialFactSectionProps {
  currentFact: string;
  onNewFact: () => void;
}

const FinancialFactSection = ({ currentFact, onNewFact }: FinancialFactSectionProps) => {
  const { t } = useAccessibility();

  return (
    <section aria-labelledby="facts-heading">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle id="facts-heading" className="text-center">
            {t("didYouKnow")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">{currentFact}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNewFact}
            className="mt-3"
          >
            {t("showAnotherFact")}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default FinancialFactSection;
