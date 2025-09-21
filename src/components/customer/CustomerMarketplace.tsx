import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CulturalCard, CulturalCardContent, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Heart, MapPin, User, Sparkles, Calendar, Filter } from "lucide-react";

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

interface CustomerMarketplaceProps {
  isFestivalMode: boolean;
  onProductSelect: (product: Product) => void;
}

export function CustomerMarketplace({ isFestivalMode, onProductSelect }: CustomerMarketplaceProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'festival'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:seller_id (name, region, phone),
          artforms:artform_id (name, description, region, cultural_significance, history, heritage_story)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artforms.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.profiles.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'featured' && product.is_featured) ||
                         (selectedFilter === 'festival' && product.is_festival_special);
    
    return matchesSearch && matchesFilter;
  });

  const getArtformEmoji = (artformName: string) => {
    const emojiMap: Record<string, string> = {
      'madhubani painting': '🎨',
      'warli art': '🏺',
      'block printing': '🧵',
      'pottery': '⚱️',
      'embroidery': '🪡',
    };
    return emojiMap[artformName.toLowerCase()] || '🎨';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-heritage flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-primary animate-heritage-glow mx-auto mb-4" />
          <p className="text-lg">Loading beautiful crafts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isFestivalMode ? 'bg-gradient-saffron' : 'bg-gradient-heritage'} transition-all duration-1000`}>
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-md shadow-cultural border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🛍️</span>
              <div>
                <h1 className="text-2xl font-cultural text-primary">MegaMosaic Marketplace</h1>
                <p className="text-sm text-muted-foreground">Discover authentic handcrafted treasures</p>
              </div>
            </div>
            
            {isFestivalMode && (
              <div className="flex items-center gap-2 animate-festival-pulse">
                <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Festival Mode Active
                </Badge>
                <span className="text-2xl animate-bounce">🪔</span>
              </div>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search artforms, regions, or artisans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <CulturalButton
                variant={selectedFilter === 'all' ? 'heritage' : 'cultural'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </CulturalButton>
              <CulturalButton
                variant={selectedFilter === 'featured' ? 'heritage' : 'cultural'}
                size="sm"
                onClick={() => setSelectedFilter('featured')}
              >
                Featured
              </CulturalButton>
              <CulturalButton
                variant={selectedFilter === 'festival' ? 'heritage' : 'cultural'}
                size="sm"
                onClick={() => setSelectedFilter('festival')}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Festival
              </CulturalButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {isFestivalMode && (
          <div className="mb-8 text-center animate-cultural-fade">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-4xl animate-bounce">🪔</span>
              <h2 className="text-3xl font-cultural text-orange-600">Festival Collection</h2>
              <span className="text-4xl animate-bounce">🪔</span>
            </div>
            <p className="text-orange-700 max-w-2xl mx-auto">
              Celebrate the season with our special collection of festival-themed crafts, 
              perfect for decorating your home and gifting loved ones.
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <CulturalCard
              key={product.id}
              variant={product.is_featured ? "heritage" : "artisan"}
              className="cursor-pointer hover:shadow-cultural transition-all duration-300 transform hover:scale-105"
              onClick={() => onProductSelect(product)}
            >
              <div className="relative">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.is_featured && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {product.is_festival_special && (
                    <Badge variant="outline" className="text-xs border-orange-300 text-orange-600 bg-orange-50">
                      Festival Special
                    </Badge>
                  )}
                </div>

                {/* Artform Emoji */}
                <div className="absolute top-2 right-2">
                  <span className="text-2xl bg-white/80 rounded-full p-1">
                    {getArtformEmoji(product.artforms.name)}
                  </span>
                </div>
              </div>

              <CulturalCardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{getArtformEmoji(product.artforms.name)}</span>
                    <span className="font-medium">{product.artforms.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{product.profiles.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{product.profiles.region}</span>
                  </div>
                  
                  {product.price && (
                    <div className="text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2">
                    <CulturalButton variant="cultural" size="sm">
                      View Details
                    </CulturalButton>
                    <CulturalButton variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </CulturalButton>
                  </div>
                </div>
              </CulturalCardContent>
            </CulturalCard>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}