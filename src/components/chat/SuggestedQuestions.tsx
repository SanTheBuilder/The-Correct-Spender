
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, DollarSign, PiggyBank } from "lucide-react";

interface Question {
  text: string;
  category: string;
  icon: string;
}

interface SuggestedQuestionsProps {
  questions: Question[];
  onQuestionSelect: (question: string) => void;
  title: string;
}

const SuggestedQuestions = ({ questions, onQuestionSelect, title }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {questions.map((question, index) => {
          const IconComponent = question.icon === 'DollarSign' ? DollarSign :
                             question.icon === 'PiggyBank' ? PiggyBank :
                             question.icon === 'TrendingUp' ? TrendingUp : Lightbulb;
          
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start h-auto p-3 text-left"
              onClick={() => onQuestionSelect(question.text)}
            >
              <IconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{question.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
