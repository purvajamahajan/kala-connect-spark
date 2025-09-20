import { useState } from "react";
import { CulturalCard, CulturalCardContent, CulturalCardDescription, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Volume2, BookOpen, ExternalLink } from "lucide-react";
import timelineBg from "@/assets/cultural-timeline-bg.jpg";

const timelineData = [
  {
    id: "ancient",
    period: "3000 BCE - 600 CE",
    title: "Ancient Foundations",
    description: "The birth of Indian artistic traditions in the Indus Valley Civilization",
    artForms: ["Cave Paintings", "Terracotta Sculptures", "Bronze Casting"],
    keyFeatures: [
      "Harappan seals and pottery",
      "Ajanta and Ellora cave paintings", 
      "Buddhist and Jain artistic traditions"
    ],
    culturalSignificance: "These early art forms laid the foundation for India's rich artistic heritage, establishing themes of spirituality and nature that continue today.",
    audioNarration: "Listen to the story of how our ancestors first expressed their creativity through cave walls and clay..."
  },
  {
    id: "classical",
    period: "600 CE - 1200 CE",
    title: "Classical Golden Age",
    description: "Flourishing of regional art styles under various dynasties",
    artForms: ["Temple Sculptures", "Pattachitra", "Classical Dance Forms"],
    keyFeatures: [
      "Chola bronze sculptures",
      "Odisha's Pattachitra tradition begins",
      "Development of classical dance mudras"
    ],
    culturalSignificance: "This era saw the codification of artistic principles and the integration of spirituality with aesthetic beauty.",
    audioNarration: "Discover how temple architecture became a canvas for storytelling and devotion..."
  },
  {
    id: "medieval",
    period: "1200 CE - 1700 CE", 
    title: "Medieval Synthesis",
    description: "Fusion of Indo-Islamic styles creating unique artistic expressions",
    artForms: ["Miniature Paintings", "Bidriware", "Textile Arts"],
    keyFeatures: [
      "Mughal miniature painting schools",
      "Deccan Bidriware metalwork",
      "Kalamkari textile printing techniques"
    ],
    culturalSignificance: "The meeting of different cultures created entirely new art forms that celebrated both traditions.",
    audioNarration: "Experience the beautiful fusion that emerged when different artistic traditions met..."
  },
  {
    id: "colonial",
    period: "1700 CE - 1947 CE",
    title: "Colonial Adaptations", 
    description: "Traditional arts adapting and evolving under colonial influence",
    artForms: ["Company Paintings", "Bengal School", "Folk Revival"],
    keyFeatures: [
      "Company paintings for British patrons",
      "Bengal School's nationalist art movement", 
      "Warli and Madhubani gain recognition"
    ],
    culturalSignificance: "Artists found ways to preserve their traditions while adapting to changing patronage and markets.",
    audioNarration: "Learn how our artists kept their traditions alive during challenging times..."
  },
  {
    id: "modern",
    period: "1947 CE - Present",
    title: "Contemporary Renaissance",
    description: "Revival and global recognition of traditional Indian arts",
    artForms: ["Contemporary Interpretations", "Digital Art", "Global Fusion"],
    keyFeatures: [
      "Government initiatives for craft preservation",
      "International markets and exhibitions",
      "Digital platforms connecting artisans globally"
    ],
    culturalSignificance: "Today's artisans are both preserving ancient techniques and finding new ways to share their art with the world.",
    audioNarration: "Celebrate how traditional arts are thriving in our digital age..."
  }
];

export function CulturalTimeline() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = (audioText: string) => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000);
    
    // In a real implementation, you would use speech synthesis or audio files
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioText);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-cultural-heading text-primary mb-4">
          Interactive Cultural Timeline | सांस्कृतिक समयरेखा
        </h2>
        <p className="text-heritage max-w-2xl mx-auto">
          Journey through 5000 years of Indian artistic heritage. Click on any period to explore its stories, listen to narrations, and discover the evolution of our craft traditions.
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="relative mb-12">
        <div
          className="absolute inset-0 opacity-10 rounded-lg"
          style={{ backgroundImage: `url(${timelineBg})` }}
        />
        <div className="relative z-10 flex flex-wrap justify-center gap-4 p-6">
          {timelineData.map((period, index) => (
            <CulturalButton
              key={period.id}
              variant={selectedPeriod === period.id ? "heritage" : "cultural"}
              size="lg"
              onClick={() => setSelectedPeriod(period.id)}
              className="flex-col h-auto p-4 min-w-40"
            >
              <Calendar className="w-5 h-5 mb-2" />
              <div className="text-xs font-medium">{period.period}</div>
              <div className="text-sm font-semibold">{period.title}</div>
            </CulturalButton>
          ))}
        </div>
      </div>

      {/* Selected Period Details */}
      {selectedPeriod && (
        <div className="animate-cultural-fade">
          {timelineData
            .filter(period => period.id === selectedPeriod)
            .map(period => (
              <CulturalCard key={period.id} variant="timeline" className="mb-8">
                <CulturalCardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CulturalCardTitle className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-primary" />
                      {period.title}
                      <Badge variant="secondary">{period.period}</Badge>
                    </CulturalCardTitle>
                    <CulturalButton
                      variant={isPlaying ? "festival" : "heritage"}
                      size="sm"
                      onClick={() => handlePlayAudio(period.audioNarration)}
                      disabled={isPlaying}
                    >
                      <Volume2 className="w-4 h-4" />
                      {isPlaying ? "Playing..." : "Listen"}
                    </CulturalButton>
                  </div>
                  <CulturalCardDescription className="text-lg">
                    {period.description}
                  </CulturalCardDescription>
                </CulturalCardHeader>

                <CulturalCardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Art Forms */}
                    <div>
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Key Art Forms
                      </h4>
                      <div className="space-y-2">
                        {period.artForms.map((art, index) => (
                          <Badge key={index} variant="outline" className="mr-2 mb-2">
                            {art}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold text-primary mb-3">
                        Historical Highlights
                      </h4>
                      <ul className="space-y-2">
                        {period.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cultural Significance */}
                  <div className="mt-6 p-4 bg-heritage rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      Cultural Significance
                    </h4>
                    <p className="text-heritage-foreground text-sm leading-relaxed">
                      {period.culturalSignificance}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <CulturalButton variant="cultural" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      Explore Artisans from this Era
                    </CulturalButton>
                    <CulturalButton variant="outline" size="sm">
                      View Gallery
                    </CulturalButton>
                    <CulturalButton variant="outline" size="sm">
                      Read More Stories
                    </CulturalButton>
                  </div>
                </CulturalCardContent>
              </CulturalCard>
            ))}
        </div>
      )}

      {!selectedPeriod && (
        <CulturalCard variant="artisan" className="text-center">
          <CulturalCardContent>
            <div className="py-12">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-cultural text-primary mb-2">
                Discover Our Rich Heritage
              </h3>
              <p className="text-heritage">
                Select any period above to explore the fascinating evolution of Indian arts and crafts through time.
              </p>
            </div>
          </CulturalCardContent>
        </CulturalCard>
      )}
    </div>
  );
}