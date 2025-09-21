import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CulturalCard, CulturalCardContent, CulturalCardHeader, CulturalCardTitle, CulturalCardDescription } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";

interface AuthScreenProps {
  userType: 'customer' | 'seller';
  onSuccess: () => void;
  onBack: () => void;
}

export function AuthScreen({ userType, onSuccess, onBack }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name,
              role: userType,
            },
          },
        });
        if (error) throw error;
        toast.success("Registration successful! Please check your email to verify your account.");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const userTypeTitle = userType === 'seller' ? 'Artisan' : 'Customer';
  const userTypeDescription = userType === 'seller' 
    ? 'Join our community of traditional artisans and share your heritage with the world'
    : 'Discover authentic handcrafted treasures and connect with master artisans';

  return (
    <div className="min-h-screen bg-gradient-heritage flex items-center justify-center p-6">
      <CulturalCard variant="heritage" className="w-full max-w-md">
        <CulturalCardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CulturalButton 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </CulturalButton>
            <span className="text-4xl">
              {userType === 'seller' ? '🎨' : '🛍️'}
            </span>
          </div>
          <CulturalCardTitle className="text-2xl">
            {isLogin ? 'Welcome Back' : 'Join Us'} {userTypeTitle}
          </CulturalCardTitle>
          <CulturalCardDescription>
            {userTypeDescription}
          </CulturalCardDescription>
        </CulturalCardHeader>
        
        <CulturalCardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <CulturalButton 
              type="submit" 
              variant="heritage" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </CulturalButton>
          </form>
          
          <div className="mt-6 text-center">
            <CulturalButton
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </CulturalButton>
          </div>
        </CulturalCardContent>
      </CulturalCard>
    </div>
  );
}