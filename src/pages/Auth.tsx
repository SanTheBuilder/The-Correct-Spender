
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Mail, Lock, User, UserCheck } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useAccessibility } from "@/components/AccessibilityProvider";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  
  const { signIn, signUp, signInAsGuest } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, simpleMode } = useAccessibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let error;
      if (isLogin) {
        ({ error } = await signIn(email, password));
      } else {
        ({ error } = await signUp(email, password, firstName, lastName));
      }

      if (error) {
        let errorMessage = error.message;
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = simpleMode ? "Wrong email or password" : "Invalid email or password. Please check your credentials.";
        } else if (error.message.includes('User already registered')) {
          errorMessage = simpleMode ? "Email already used" : "An account with this email already exists. Please sign in instead.";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = simpleMode ? "Check your email first" : "Please check your email and confirm your account before signing in.";
        }
        
        toast({
          title: simpleMode ? "Problem signing in" : "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        if (isLogin) {
          navigate("/");
        } else {
          toast({
            title: simpleMode ? "Account created!" : "Account created successfully",
            description: simpleMode 
              ? "Check your email to verify your account before signing in" 
              : "Please check your email to verify your account before signing in. The verification email may take a few minutes to arrive.",
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setGuestLoading(true);
    try {
      const { error } = await signInAsGuest();
      if (error) {
        toast({
          title: "Guest Sign-in Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: "Failed to sign in as guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="h-10 w-10 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-foreground">{t("appTitle")}</h1>
          </div>
          <p className="text-muted-foreground">{t("appSubtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin 
                ? (simpleMode ? t("signIn") : t("welcomeBack")) 
                : (simpleMode ? t("createAccount") : t("createAccount"))
              }
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? (simpleMode ? t("enterDetails") : t("enterCredentials"))
                : (simpleMode ? t("fillDetails") : t("joinFinancialJourney"))
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      <User className="h-4 w-4 inline mr-2" aria-hidden="true" />
                      {t("firstName")}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      <User className="h-4 w-4 inline mr-2" aria-hidden="true" />
                      {t("lastName")}
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" aria-hidden="true" />
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="h-4 w-4 inline mr-2" aria-hidden="true" />
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? (isLogin ? t("signingIn") : t("creatingAccount"))
                  : (isLogin ? t("signIn") : t("createAccount"))
                }
              </Button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue as
                  </span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={handleGuestSignIn}
                disabled={guestLoading}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                {guestLoading ? t("signingIn") : t("continueAsGuest")}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
              >
                {isLogin 
                  ? (simpleMode ? t("needAccount") : t("needAccount"))
                  : (simpleMode ? t("haveAccount") : t("haveAccount"))
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
