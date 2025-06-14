
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Mail, Lock, User, UserCheck, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { cleanupAuthState } from "@/utils/authCleanup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  
  const { signIn, signUp, signInAsGuest } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, simpleMode } = useAccessibility();

  // Check for email confirmation on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    const verified = urlParams.get('verified');
    
    if (error) {
      console.error('Auth URL error:', error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was an error with email verification. Please try again.",
        variant: "destructive",
      });
      
      // Clean up the URL
      window.history.replaceState({}, document.title, '/auth');
    }

    // Check if we're coming back from email verification
    if (verified === 'true') {
      toast({
        title: "Email Verified!",
        description: "Your email has been verified. You can now sign in.",
        variant: "default",
      });
      setIsLogin(true);
      
      // Clean up the URL
      window.history.replaceState({}, document.title, '/auth');
    }

    // Check for hash fragments (Supabase sometimes uses these)
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      if (accessToken && type === 'signup') {
        toast({
          title: "Email Verified!",
          description: "Your email has been verified successfully. Redirecting...",
          variant: "default",
        });
        
        // Clean up and redirect
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    }
  }, [location, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: simpleMode ? "Fill all fields" : "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let error;
      if (isLogin) {
        console.log('Attempting login for:', email);
        ({ error } = await signIn(email, password));
      } else {
        console.log('Attempting signup for:', email);
        ({ error } = await signUp(email, password, firstName, lastName));
      }

      if (error) {
        console.error('Auth error:', error);
        let errorMessage = error.message;
        
        // Provide user-friendly error messages
        if (error.message?.includes('Invalid login credentials') || 
            error.message?.includes('invalid_credentials')) {
          errorMessage = simpleMode ? "Wrong email or password" : "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message?.includes('User already registered')) {
          errorMessage = simpleMode ? "Email already used" : "An account with this email already exists. Please sign in instead.";
          setIsLogin(true);
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = simpleMode ? "Check your email first" : "Please check your email and click the verification link before signing in.";
        } else if (error.message?.includes('check your email')) {
          errorMessage = "Please check your email and click the verification link before signing in.";
        } else if (error.message?.includes('signup_disabled')) {
          errorMessage = "New signups are currently disabled. Please contact support.";
        } else if (error.message?.includes('email_address_invalid')) {
          errorMessage = "Please enter a valid email address.";
        } else if (error.message?.includes('password')) {
          errorMessage = "Password must be at least 6 characters long.";
        }
        
        toast({
          title: simpleMode ? "Problem" : "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        if (isLogin) {
          console.log('Login successful, navigating to home');
          // Navigation handled in AuthProvider after successful login
        } else {
          console.log('Signup successful, showing verification message');
          setShowVerificationMessage(true);
          toast({
            title: simpleMode ? "Account created!" : "Account created successfully",
            description: simpleMode 
              ? "Check your email to verify your account" 
              : "Please check your email and click the verification link to complete your registration.",
          });
          
          // Reset form
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          
          // Switch to login after 5 seconds
          setTimeout(() => {
            setIsLogin(true);
            setShowVerificationMessage(false);
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Unexpected auth error:', error);
      toast({
        title: t("error"),
        description: "An unexpected error occurred. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setGuestLoading(true);
    try {
      console.log('Attempting guest sign in');
      const { error } = await signInAsGuest();
      if (error) {
        console.error('Guest sign in error:', error);
        toast({
          title: "Guest Sign-in Error",
          description: error.message || "Failed to sign in as guest. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Guest sign in successful, navigating to home');
        navigate("/");
      }
    } catch (error) {
      console.error('Guest sign in catch error:', error);
      toast({
        title: t("error"),
        description: "Failed to sign in as guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGuestLoading(false);
    }
  };

  if (showVerificationMessage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to <strong>{email}</strong>. 
              Click the link in the email to verify your account and then return here to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                The email may take a few minutes to arrive. Check your spam folder if you don't see it.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowVerificationMessage(false);
                  setIsLogin(true);
                }}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  minLength={6}
                />
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long
                  </p>
                )}
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
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowVerificationMessage(false);
                }}
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
