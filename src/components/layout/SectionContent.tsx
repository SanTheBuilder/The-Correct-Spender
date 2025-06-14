
import { Button } from "@/components/ui/button";
import FinancialHealthAssessment from "../FinancialHealthAssessment";
import BudgetingTools from "../BudgetingTools";
import EnhancedAIChat from "../EnhancedAIChat";
import AccessibilitySettings from "../AccessibilitySettings";
import AppSettings from "../AppSettings";
import { useAccessibility } from "../AccessibilityProvider";
import { useAuth } from "../AuthProvider";

interface SectionContentProps {
  activeSection: string;
  onBack: () => void;
}

const SectionContent = ({ activeSection, onBack }: SectionContentProps) => {
  const { simpleMode, t } = useAccessibility();
  const { user, isGuest } = useAuth();

  const getSectionComponent = () => {
    switch (activeSection) {
      case "assessment":
        return <FinancialHealthAssessment />;
      case "budgeting":
        return <BudgetingTools />;
      case "chat":
        return <EnhancedAIChat />;
      case "accessibility":
        return <AccessibilitySettings />;
      case "app-settings":
        return user && !isGuest ? <AppSettings /> : null;
      default:
        return null;
    }
  };

  const component = getSectionComponent();
  if (!component) return null;

  return (
    <div>
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6"
        aria-label={simpleMode ? t("back") : t("backToOverview")}
      >
        ← {simpleMode ? t("back") : t("backToOverview")}
      </Button>
      {component}
    </div>
  );
};

export default SectionContent;
