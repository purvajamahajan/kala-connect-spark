import { useState } from "react";
import { CulturalCard, CulturalCardContent, CulturalCardHeader, CulturalCardTitle, CulturalCardDescription } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Sparkles, Palette, ShoppingBag, Users, Star, MapPin } from "lucide-react";

interface HomeScreenProps {
  onCustomerLogin: () => void;
  onSellerLogin: () => void;
}

export function HomeScreen({ onCustomerLogin, onSellerLogin }: HomeScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<'customer' | 'seller' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-heritage relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-heritage rounded-full animate-heritage-glow"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-accent rounded-full animate-festival-pulse"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-secondary rounded-full animate-float"></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10 text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl animate-heritage-glow">🎨</span>
            <h1 className="text-5xl md:text-7xl font-cultural text-primary animate-cultural-fade">
              MegaMosaic
            </h1>
            <span className="text-6xl animate-heritage-glow">🏺</span>
          </div>
          
          <p className="text-xl md:text-2xl text-heritage-foreground mb-4 font-medium">
            Where Tradition Meets Technology
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An AI-powered artisan marketplace bridging 5000 years of Indian heritage 
            with modern commerce. Every click celebrates a story, every scroll preserves a legacy.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>1000+ Artisans</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>50+ Art Forms</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>28+ States</span>
            </div>
          </div>
        </div>
      </header>

      {/* Login Path Selection */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-cultural text-primary mb-4">Choose Your Journey</h2>
          <p className="text-muted-foreground">
            Whether you're here to discover treasures or share your craft, 
            your story begins here
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer Path */}
          <CulturalCard 
            variant="heritage"
            className={`cursor-pointer transition-all duration-500 transform hover:scale-105 ${
              hoveredCard === 'customer' ? 'shadow-cultural ring-2 ring-primary' : 'hover:shadow-heritage'
            }`}
            onMouseEnter={() => setHoveredCard('customer')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={onCustomerLogin}
          >
            <CulturalCardHeader className="text-center pb-8">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto flex items-center justify-center mb-4 animate-heritage-glow">
                  <ShoppingBag className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-heritage text-heritage-foreground rounded-full p-2">
                  <span className="text-2xl">🛍️</span>
                </div>
              </div>
              
              <CulturalCardTitle className="text-2xl mb-3">
                Enter as Customer
              </CulturalCardTitle>
              
              <CulturalCardDescription className="text-base leading-relaxed">
                Discover authentic handcrafted treasures from master artisans. 
                Experience India's rich cultural heritage through beautiful products 
                with stories that span generations.
              </CulturalCardDescription>
            </CulturalCardHeader>
            
            <CulturalCardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Curated Collections</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Festival Specials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Meet Artisans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <span>Cultural Stories</span>
                </div>
              </div>
              
              <CulturalButton 
                variant="festival" 
                size="lg" 
                className="w-full mt-6 group"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Shopping
              </CulturalButton>
            </CulturalCardContent>
          </CulturalCard>

          {/* Seller Path */}
          <CulturalCard 
            variant="artisan"
            className={`cursor-pointer transition-all duration-500 transform hover:scale-105 ${
              hoveredCard === 'seller' ? 'shadow-cultural ring-2 ring-primary' : 'hover:shadow-heritage'
            }`}
            onMouseEnter={() => setHoveredCard('seller')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={onSellerLogin}
          >
            <CulturalCardHeader className="text-center pb-8">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-secondary rounded-full mx-auto flex items-center justify-center mb-4 animate-heritage-glow">
                  <Palette className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-heritage text-heritage-foreground rounded-full p-2">
                  <span className="text-2xl">🎨</span>
                </div>
              </div>
              
              <CulturalCardTitle className="text-2xl mb-3">
                Join as Artisan
              </CulturalCardTitle>
              
              <CulturalCardDescription className="text-base leading-relaxed">
                Share your traditional craft with the world. Connect with customers 
                who appreciate authentic handmade art and preserve your heritage 
                for future generations.
              </CulturalCardDescription>
            </CulturalCardHeader>
            
            <CulturalCardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>AI-Assisted Listing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Direct Customer Connect</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Heritage Storytelling</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Regional Recognition</span>
                </div>
              </div>
              
              <CulturalButton 
                variant="heritage" 
                size="lg" 
                className="w-full mt-6 group"
              >
                <Palette className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Begin Your Journey
              </CulturalButton>
            </CulturalCardContent>
          </CulturalCard>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-cultural text-primary mb-8">
            Experience the Magic of MegaMosaic
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-heritage-glow" />
              </div>
              <h4 className="font-semibold text-lg mb-2">AI-Powered Discovery</h4>
              <p className="text-sm text-muted-foreground">
                Intelligent recommendations and cultural storytelling powered by advanced AI
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white animate-heritage-glow" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Connect Cultures</h4>
              <p className="text-sm text-muted-foreground">
                Bridge traditional artisans with modern customers across the globe
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-heritage rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white animate-heritage-glow" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Preserve Heritage</h4>
              <p className="text-sm text-muted-foreground">
                Every purchase supports traditional crafts and cultural preservation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}