
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'budgeting' | 'investment' | 'savings' | 'debt' | 'general';
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-3 ${
        message.isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className={`p-2 rounded-full ${
        message.isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted'
      }`}>
        {message.isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className={`flex-1 space-y-2 ${
        message.isUser ? 'text-right' : 'text-left'
      }`}>
        <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
          message.isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'bg-muted'
        }`}>
          <div className="whitespace-pre-wrap text-sm">
            {message.content}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
