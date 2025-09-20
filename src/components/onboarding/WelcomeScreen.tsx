import { useState } from "react";
import { CulturalButton } from "@/components/ui/cultural-button";
import { CulturalCard, CulturalCardContent, CulturalCardDescription, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { Badge } from "@/components/ui/badge";
import { Heart, Palette, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-artisan.jpg";

const languages = [
  { code: "hi", name: "हिंदी", english: "Hindi" },
  { code: "en", name: "English", english: "English" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
];

const artForms = [
  { id: "warli", name: "Warli Painting", region: "Maharashtra", icon: "🎨" },
  { id: "baul", name: "Baul Folk Art", region: "West Bengal", icon: "🎵" },
  { id: "bidriware", name: "Bidriware", region: "Karnataka", icon: "⚱️" },
  { id: "pattachitra", name: "Pattachitra", region: "Odisha", icon: "🖼️" },
  { id: "kalamkari", name: "Kalamkari", region: "Andhra Pradesh", icon: "🌸" },
  { id: "madhubani", name: "Madhubani", region: "Bihar", icon: "🦚" },
];

interface WelcomeScreenProps {
  onComplete: (data: { language: string; artForm: string; name: string }) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedArtForm, setSelectedArtForm] = useState("");
  const [artistName, setArtistName] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (selectedLanguage && selectedArtForm && artistName) {
      onComplete({
        language: selectedLanguage,
        artForm: selectedArtForm,
        name: artistName,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-heritage pattern-heritage">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 px-6 pt-20 pb-16 text-center">
          <div className="animate-cultural-fade">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-primary animate-heritage-glow" />
              <h1 className="text-4xl md:text-6xl font-cultural text-primary">
                MegaMosaic
              </h1>
              <Sparkles className="w-8 h-8 text-accent animate-heritage-glow" />
            </div>
            <p className="text-xl md:text-2xl text-heritage mb-4">
              भारत की कलाओं का डिजिटल संसार
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to India's Cultural Digital Ecosystem - Where Traditional Arts Meet Modern Technology
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <CulturalCard variant="heritage" className="animate-cultural-fade">
            <CulturalCardHeader className="text-center">
              <CulturalCardTitle className="flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Choose Your Language | अपनी भाषा चुनें
              </CulturalCardTitle>
              <CulturalCardDescription>
                Select your preferred language for the best experience
              </CulturalCardDescription>
            </CulturalCardHeader>
            <CulturalCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {languages.map((lang) => (
                  <CulturalButton
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "heritage" : "cultural"}
                    className="h-16 text-lg justify-start"
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{lang.name}</div>
                      <div className="text-sm opacity-75">{lang.english}</div>
                    </div>
                  </CulturalButton>
                ))}
              </div>
              <div className="flex justify-center">
                <CulturalButton
                  variant="festival"
                  size="lg"
                  disabled={!selectedLanguage}
                  onClick={() => setStep(2)}
                >
                  Next Step | आगे बढ़ें
                </CulturalButton>
              </div>
            </CulturalCardContent>
          </CulturalCard>
        )}

        {step === 2 && (
          <CulturalCard variant="artisan" className="animate-cultural-fade">
            <CulturalCardHeader className="text-center">
              <CulturalCardTitle className="flex items-center justify-center gap-2">
                <Palette className="w-6 h-6 text-primary" />
                Select Your Art Form | अपनी कला चुनें
              </CulturalCardTitle>
              <CulturalCardDescription>
                Choose the traditional art form you specialize in
              </CulturalCardDescription>
            </CulturalCardHeader>
            <CulturalCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {artForms.map((art) => (
                  <CulturalButton
                    key={art.id}
                    variant={selectedArtForm === art.id ? "heritage" : "cultural"}
                    className="h-20 flex-col"
                    onClick={() => setSelectedArtForm(art.id)}
                  >
                    <div className="text-2xl mb-1">{art.icon}</div>
                    <div className="font-semibold">{art.name}</div>
                    <Badge variant="secondary" className="text-xs">
                      {art.region}
                    </Badge>
                  </CulturalButton>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <CulturalButton
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(1)}
                >
                  Back | वापस
                </CulturalButton>
                <CulturalButton
                  variant="festival"
                  size="lg"
                  disabled={!selectedArtForm}
                  onClick={() => setStep(3)}
                >
                  Next Step | आगे बढ़ें
                </CulturalButton>
              </div>
            </CulturalCardContent>
          </CulturalCard>
        )}

        {step === 3 && (
          <CulturalCard variant="heritage" className="animate-cultural-fade">
            <CulturalCardHeader className="text-center">
              <CulturalCardTitle>
                Welcome to Your Artisan Journey | कलाकार यात्रा में आपका स्वागत है
              </CulturalCardTitle>
              <CulturalCardDescription>
                Tell us your name to personalize your experience
              </CulturalCardDescription>
            </CulturalCardHeader>
            <CulturalCardContent>
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name | आपका नाम
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {artistName && (
                  <div className="p-4 bg-heritage rounded-lg animate-cultural-fade">
                    <p className="text-heritage text-center">
                      Namaste {artistName}! Welcome to the MegaMosaic family. 
                      Let's celebrate and share your beautiful {artForms.find(a => a.id === selectedArtForm)?.name} art with the world.
                    </p>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <CulturalButton
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Back | वापस
                  </CulturalButton>
                  <CulturalButton
                    variant="festival"
                    size="lg"
                    disabled={!artistName.trim()}
                    onClick={handleSubmit}
                    className="animate-festival-pulse"
                  >
                    Enter MegaMosaic | MegaMosaic में प्रवेश करें
                  </CulturalButton>
                </div>
              </div>
            </CulturalCardContent>
          </CulturalCard>
        )}
      </div>
    </div>
  );
}