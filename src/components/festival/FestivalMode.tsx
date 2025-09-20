import { useState, useEffect } from "react";
import { CulturalCard, CulturalCardContent, CulturalCardDescription, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gift, Star, Calendar } from "lucide-react";
import diwaliElements from "@/assets/diwali-elements.jpg";
import holiElements from "@/assets/holi-elements.jpg";
import ganeshElements from "@/assets/ganesh-elements.jpg";

const festivals = [
  {
    id: "diwali",
    name: "Diwali",
    nameHindi: "दिवाली",
    description: "Festival of Lights - Celebrate prosperity and joy",
    colors: { primary: "#FF9933", accent: "#FFD700", background: "#FFF8DC" },
    elements: ["Diyas", "Rangoli", "Marigolds", "Golden Decorations"],
    artForms: ["Rangoli Art", "Diya Painting", "Torans", "Brass Work"],
    duration: "October - November",
    culturalStory: "Diwali celebrates the victory of light over darkness and good over evil. Artisans create beautiful diyas, rangoli patterns, and decorative items that illuminate homes and hearts during this auspicious time."
  },
  {
    id: "holi",
    name: "Holi", 
    nameHindi: "होली",
    description: "Festival of Colors - Celebrate love and spring",
    colors: { primary: "#E91E63", accent: "#00BCD4", background: "#FFF3E0" },
    elements: ["Gulal", "Water Colors", "Folk Dance", "Traditional Sweets"],
    artForms: ["Natural Dye Making", "Color Powder Art", "Folk Paintings", "Dance Masks"],
    duration: "March",
    culturalStory: "Holi marks the arrival of spring and celebrates the eternal love of Radha Krishna. Artists create natural colors and vibrant decorations that bring communities together in joyous celebration."
  },
  {
    id: "ganeshotsav",
    name: "Ganesh Chaturthi",
    nameHindi: "गणेश चतुर्थी", 
    description: "Lord Ganesha's Festival - Celebrate new beginnings",
    colors: { primary: "#FF5722", accent: "#FFC107", background: "#FFF8E1" },
    elements: ["Ganesha Idols", "Modak", "Decorative Umbrellas", "Flowers"],
    artForms: ["Clay Sculpture", "Eco-friendly Idols", "Decorative Arts", "Traditional Sweets"],
    duration: "August - September",
    culturalStory: "Ganesh Chaturthi honors Lord Ganesha, the remover of obstacles. Skilled artisans craft beautiful eco-friendly idols and decorations that embody devotion and artistic excellence."
  }
];

const festivalProducts = {
  diwali: [
    { name: "Hand-painted Diyas Set", price: "₹499", artisan: "Priya Sharma", region: "Uttar Pradesh" },
    { name: "Brass Rangoli Stencils", price: "₹799", artisan: "Mukesh Patel", region: "Rajasthan" },
    { name: "Golden Toran with Bells", price: "₹1299", artisan: "Anita Devi", region: "Gujarat" },
    { name: "Decorative Candle Set", price: "₹699", artisan: "Raj Kumar", region: "Karnataka" }
  ],
  holi: [
    { name: "Natural Color Powder Set", price: "₹399", artisan: "Maya Gupta", region: "Madhya Pradesh" },
    { name: "Holi Water Guns (Pichkari)", price: "₹299", artisan: "Arjun Singh", region: "Punjab" },
    { name: "Folk Dance Accessories", price: "₹899", artisan: "Sunita Rani", region: "Haryana" },
    { name: "Traditional Gujiya Molds", price: "₹199", artisan: "Ravi Das", region: "Bihar" }
  ],
  ganeshotsav: [
    { name: "Eco-friendly Ganesha Idol", price: "₹1999", artisan: "Ganesh Kumbhar", region: "Maharashtra" },
    { name: "Decorative Umbrella Set", price: "₹599", artisan: "Lalita Jadhav", region: "Maharashtra" },
    { name: "Modak Serving Set", price: "₹449", artisan: "Suresh Patil", region: "Karnataka" },
    { name: "Festival Decoration Kit", price: "₹999", artisan: "Meera Iyer", region: "Tamil Nadu" }
  ]
};

interface FestivalModeProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export function FestivalMode({ isActive, onToggle }: FestivalModeProps) {
  const [selectedFestival, setSelectedFestival] = useState("diwali");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, selectedFestival]);

  const currentFestival = festivals.find(f => f.id === selectedFestival)!;

  const festivalStyles = isActive ? {
    '--primary': currentFestival.colors.primary,
    '--accent': currentFestival.colors.accent,
    '--festival-bg': currentFestival.colors.background,
  } as React.CSSProperties : {};

  return (
    <div className="w-full max-w-6xl mx-auto p-6" style={festivalStyles}>
      {/* Festival Mode Toggle */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <CulturalButton
            variant={isActive ? "festival" : "heritage"}
            size="lg"
            onClick={() => onToggle(!isActive)}
            className={isAnimating ? "animate-festival-pulse" : ""}
          >
            <Sparkles className="w-5 h-5" />
            {isActive ? "Festival Mode ON" : "Activate Festival Mode"}
            <Sparkles className="w-5 h-5" />
          </CulturalButton>
        </div>
        {isActive && (
          <p className="text-foreground animate-cultural-fade font-medium">
            🎉 Experience MegaMosaic in festive colors! Festival-ready products are highlighted.
          </p>
        )}
      </div>

      {isActive && (
        <div className="animate-cultural-fade">
          {/* Festival Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {festivals.map((festival) => (
              <CulturalButton
                key={festival.id}
                variant={selectedFestival === festival.id ? "festival" : "cultural"}
                onClick={() => setSelectedFestival(festival.id)}
                className="flex-col h-auto p-4"
              >
                <Calendar className="w-5 h-5 mb-2" />
                <div className="font-semibold">{festival.name}</div>
                <div className="text-xs">{festival.nameHindi}</div>
              </CulturalButton>
            ))}
          </div>

          {/* Festival Header with Background */}
          <CulturalCard variant="festival" className="mb-8 relative overflow-hidden">
            {selectedFestival === "diwali" && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${diwaliElements})` }}
              />
            )}
            {selectedFestival === "holi" && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${holiElements})` }}
              />
            )}
            {selectedFestival === "ganeshotsav" && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${ganeshElements})` }}
              />
            )}
            <div className="relative z-10">
              <CulturalCardHeader className="text-center">
                <CulturalCardTitle className="flex items-center justify-center gap-3 text-3xl">
                  <Star className="w-8 h-8 animate-heritage-glow" />
                  {currentFestival.name} Collection
                  <Star className="w-8 h-8 animate-heritage-glow" />
                </CulturalCardTitle>
                <CulturalCardDescription className="text-lg">
                  {currentFestival.description}
                </CulturalCardDescription>
                <Badge variant="secondary" className="mx-auto mt-2">
                  {currentFestival.duration}
                </Badge>
              </CulturalCardHeader>

              <CulturalCardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Festival Elements */}
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Festival Elements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentFestival.elements.map((element, index) => (
                        <Badge key={index} variant="outline" className="animate-heritage-glow">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Related Art Forms */}
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Featured Art Forms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentFestival.artForms.map((art, index) => (
                        <Badge key={index} variant="secondary" className="animate-heritage-glow">
                          {art}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cultural Story */}
                <div className="p-4 bg-heritage rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">
                    Cultural Significance
                  </h4>
                  <p className="text-heritage-foreground text-sm leading-relaxed">
                    {currentFestival.culturalStory}
                  </p>
                </div>
              </CulturalCardContent>
            </div>
          </CulturalCard>

          {/* Festival Products */}
          <div className="mb-8">
            <h3 className="text-cultural-heading text-center mb-6 flex items-center justify-center gap-2">
              <Gift className="w-6 h-6 text-primary" />
              Festival-Ready Collection
            </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {festivalProducts[selectedFestival as keyof typeof festivalProducts].map((product, index) => (
                <CulturalCard key={index} variant="artisan" className="animate-cultural-fade hover:shadow-festival transition-all">
                  <CulturalCardContent className="p-4">
                    <div className="aspect-square bg-heritage rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                      {selectedFestival === "diwali" && (
                        <img src={diwaliElements} alt="Diwali elements" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      )}
                      {selectedFestival === "holi" && (
                        <img src={holiElements} alt="Holi elements" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      )}
                      {selectedFestival === "ganeshotsav" && (
                        <img src={ganeshElements} alt="Ganesh elements" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      )}
                      <Gift className="w-8 h-8 text-primary animate-float relative z-10" />
                    </div>
                    <h5 className="font-semibold text-sm mb-2">{product.name}</h5>
                    <p className="text-xs text-muted-foreground mb-1">
                      by {product.artisan}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {product.region}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        Festival Ready
                      </Badge>
                    </div>
                    <CulturalButton variant="festival" size="sm" className="w-full mt-3">
                      Add to Cart
                    </CulturalButton>
                  </CulturalCardContent>
                </CulturalCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isActive && (
        <CulturalCard variant="artisan" className="text-center">
          <CulturalCardContent className="py-12">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-xl font-cultural text-primary mb-2">
              Celebrate with Traditional Arts
            </h3>
            <p className="text-heritage mb-6">
              Activate Festival Mode to discover curated collections for Indian festivals, 
              with themed products and cultural stories from our artisan community.
            </p>
            <CulturalButton variant="heritage" size="lg" onClick={() => onToggle(true)}>
              Explore Festival Collections
            </CulturalButton>
          </CulturalCardContent>
        </CulturalCard>
      )}
    </div>
  );
}