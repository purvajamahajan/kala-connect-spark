import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HomeScreen } from "@/components/home/HomeScreen";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { SellerRegistration } from "@/components/seller/SellerRegistration";
import { CustomerMarketplace } from "@/components/customer/CustomerMarketplace";
import { ProductDetail } from "@/components/product/ProductDetail";
import { CulturalButton } from "@/components/ui/cultural-button";
import { toast } from "sonner";
import { LogOut, Calendar } from "lucide-react";

type AppState = 'home' | 'customer-auth' | 'seller-auth' | 'seller-registration' | 'customer-marketplace' | 'product-detail';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  is_featured: boolean;
  is_festival_special: boolean;
  profiles: {
    name: string;
    region: string;
    phone: string;
  };
  artforms: {
    name: string;
    description: string;
    region: string;
    cultural_significance: string;
    history: string;
    heritage_story: string;
  };
}

export function MegaMosaicDashboard() {
  const [appState, setAppState] = useState<AppState>('home');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFestivalMode, setIsFestivalMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setAppState('home');
      }
    });

    checkSession();
    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      
      setUserProfile(data);
      
      // Navigate based on user role and profile completeness
      if (data.role === 'seller' && (!data.name || !data.region)) {
        setAppState('seller-registration');
      } else if (data.role === 'customer') {
        setAppState('customer-marketplace');
      } else if (data.role === 'seller') {
        setAppState('customer-marketplace'); // Sellers can also browse
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-heritage flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl animate-heritage-glow">🎨</span>
          <h1 className="text-2xl font-cultural text-primary mt-4">Loading MegaMosaic...</h1>
        </div>
      </div>
    );
  }

  // Show appropriate screen based on state
  if (appState === 'home') {
    return (
      <HomeScreen
        onCustomerLogin={() => setAppState('customer-auth')}
        onSellerLogin={() => setAppState('seller-auth')}
      />
    );
  }

  if (appState === 'customer-auth') {
    return (
      <AuthScreen
        userType="customer"
        onSuccess={() => {}} // Will be handled by auth state change
        onBack={() => setAppState('home')}
      />
    );
  }

  if (appState === 'seller-auth') {
    return (
      <AuthScreen
        userType="seller"
        onSuccess={() => {}} // Will be handled by auth state change
        onBack={() => setAppState('home')}
      />
    );
  }

  if (appState === 'seller-registration') {
    return (
      <SellerRegistration
        onComplete={() => {
          toast.success("Welcome to MegaMosaic!");
          setAppState('customer-marketplace');
        }}
      />
    );
  }

  if (appState === 'product-detail' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => {
          setAppState('customer-marketplace');
          setSelectedProduct(null);
        }}
      />
    );
  }

  if (appState === 'customer-marketplace') {
    return (
      <div>
        {/* Top Navigation */}
        {user && (
          <div className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎨</span>
                <span className="font-cultural text-primary">MegaMosaic</span>
                {userProfile && (
                  <span className="text-sm text-muted-foreground">
                    Welcome, {userProfile.name}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <CulturalButton
                  variant={isFestivalMode ? "festival" : "cultural"}
                  size="sm"
                  onClick={() => setIsFestivalMode(!isFestivalMode)}
                  className="gap-2"
                >
                  <Calendar className="w-3 h-3" />
                  {isFestivalMode ? "Exit Festival Mode" : "Festival Mode"}
                </CulturalButton>
                
                <CulturalButton
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-3 h-3" />
                  Logout
                </CulturalButton>
              </div>
            </div>
          </div>
        )}
        
        <CustomerMarketplace
          isFestivalMode={isFestivalMode}
          onProductSelect={(product) => {
            setSelectedProduct(product);
            setAppState('product-detail');
          }}
        />
      </div>
    );
  }

  // Fallback
  return (
    <HomeScreen
      onCustomerLogin={() => setAppState('customer-auth')}
      onSellerLogin={() => setAppState('seller-auth')}
    />
  );
}