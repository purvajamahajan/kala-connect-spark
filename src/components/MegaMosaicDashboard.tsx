import { useState } from "react";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { CulturalTimeline } from "@/components/cultural/CulturalTimeline";
import { FestivalMode } from "@/components/festival/FestivalMode";
import { CollaborationHub } from "@/components/collaboration/CollaborationHub";
import { CulturalButton } from "@/components/ui/cultural-button";
import { CulturalCard, CulturalCardContent, CulturalCardDescription, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Calendar, 
  Users, 
  Palette, 
  Sparkles, 
  Upload, 
  Star,
  MapPin,
  Heart,
  BookOpen,
  Gift
} from "lucide-react";

interface ArtistProfile {
  language: string;
  artForm: string;
  name: string;
}

type ActiveTab = "dashboard" | "timeline" | "festival" | "collaboration" | "upload";

export function MegaMosaicDashboard() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [artistProfile, setArtistProfile] = useState<ArtistProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isFestivalMode, setIsFestivalMode] = useState(false);

  const handleOnboardingComplete = (profile: ArtistProfile) => {
    setArtistProfile(profile);
    setIsOnboarded(true);
  };

  const getGreeting = () => {
    if (!artistProfile) return "Welcome";
    const artForm = artistProfile.artForm.charAt(0).toUpperCase() + artistProfile.artForm.slice(1);
    return `Welcome ${artistProfile.name}`;
  };

  const getArtFormEmoji = (artForm: string) => {
    const emojiMap: Record<string, string> = {
      warli: "🎨",
      baul: "🎵", 
      bidriware: "⚱️",
      pattachitra: "🖼️",
      kalamkari: "🌸",
      madhubani: "🦚"
    };
    return emojiMap[artForm] || "🎨";
  };

  if (!isOnboarded) {
    return <WelcomeScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-heritage">
      {/* Navigation Header */}
      <header className="bg-card shadow-heritage border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary animate-heritage-glow" />
                <h1 className="text-2xl font-cultural text-primary">MegaMosaic</h1>
              </div>
              {artistProfile && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getArtFormEmoji(artistProfile.artForm)}</span>
                  <div>
                    <p className="font-semibold text-foreground">{getGreeting()}</p>
                    <p className="text-sm text-muted-foreground">
                      {artistProfile.artForm.charAt(0).toUpperCase() + artistProfile.artForm.slice(1)} Artist
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="animate-heritage-glow">
                <Star className="w-3 h-3 mr-1" />
                Level 1 Artisan
              </Badge>
              {isFestivalMode && (
                <Badge variant="outline" className="animate-festival-pulse">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Festival Mode
                </Badge>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-2 overflow-x-auto">
            <CulturalButton
              variant={activeTab === "dashboard" ? "heritage" : "cultural"}
              size="sm"
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </CulturalButton>
            <CulturalButton
              variant={activeTab === "timeline" ? "heritage" : "cultural"}
              size="sm" 
              onClick={() => setActiveTab("timeline")}
            >
              <BookOpen className="w-4 h-4" />
              Cultural Timeline
            </CulturalButton>
            <CulturalButton
              variant={activeTab === "festival" ? "heritage" : "cultural"}
              size="sm"
              onClick={() => setActiveTab("festival")}
            >
              <Gift className="w-4 h-4" />
              Festival Mode
            </CulturalButton>
            <CulturalButton
              variant={activeTab === "collaboration" ? "heritage" : "cultural"}
              size="sm"
              onClick={() => setActiveTab("collaboration")}
            >
              <Users className="w-4 h-4" />
              Collaborate
            </CulturalButton>
            <CulturalButton
              variant={activeTab === "upload" ? "heritage" : "cultural"}
              size="sm"
              onClick={() => setActiveTab("upload")}
            >
              <Upload className="w-4 h-4" />
              Upload Art
            </CulturalButton>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && (
          <div className="animate-cultural-fade space-y-8">
            {/* Welcome Message */}
            <CulturalCard variant="heritage">
              <CulturalCardHeader>
                <CulturalCardTitle className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-primary animate-heritage-glow" />
                  Welcome to Your Artisan Dashboard
                  <span className="text-2xl">{getArtFormEmoji(artistProfile!.artForm)}</span>
                </CulturalCardTitle>
                <CulturalCardDescription>
                  Your digital space to showcase, collaborate, and celebrate traditional Indian arts. 
                  Start your journey by exploring the cultural timeline or uploading your first creation.
                </CulturalCardDescription>
              </CulturalCardHeader>
            </CulturalCard>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CulturalCard variant="artisan" className="text-center hover:shadow-cultural transition-all cursor-pointer"
                onClick={() => setActiveTab("upload")}>
                <CulturalCardContent className="p-6">
                  <Upload className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="font-semibold mb-2">Upload Your Art</h3>
                  <p className="text-sm text-muted-foreground">Share your latest creations with the community</p>
                </CulturalCardContent>
              </CulturalCard>

              <CulturalCard variant="artisan" className="text-center hover:shadow-cultural transition-all cursor-pointer"
                onClick={() => setActiveTab("timeline")}>
                <CulturalCardContent className="p-6">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="font-semibold mb-2">Explore Timeline</h3>
                  <p className="text-sm text-muted-foreground">Journey through 5000 years of Indian art history</p>
                </CulturalCardContent>
              </CulturalCard>

              <CulturalCard variant="artisan" className="text-center hover:shadow-cultural transition-all cursor-pointer"
                onClick={() => setActiveTab("collaboration")}>
                <CulturalCardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="font-semibold mb-2">Find Collaborators</h3>
                  <p className="text-sm text-muted-foreground">Connect with artisans for fusion projects</p>
                </CulturalCardContent>
              </CulturalCard>

              <CulturalCard variant="artisan" className="text-center hover:shadow-cultural transition-all cursor-pointer"
                onClick={() => setActiveTab("festival")}>
                <CulturalCardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="font-semibold mb-2">Festival Collections</h3>
                  <p className="text-sm text-muted-foreground">Discover themed products for celebrations</p>
                </CulturalCardContent>
              </CulturalCard>
            </div>

            {/* Recent Activity */}
            <CulturalCard variant="timeline">
              <CulturalCardHeader>
                <CulturalCardTitle>Recent Community Activity</CulturalCardTitle>
              </CulturalCardHeader>
              <CulturalCardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-heritage rounded-lg">
                    <span className="text-2xl">🎨</span>
                    <div className="flex-1">
                      <p className="text-sm"><strong>Priya Sharma</strong> uploaded a new Warli painting</p>
                      <p className="text-xs text-muted-foreground">2 hours ago • Maharashtra</p>
                    </div>
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-heritage rounded-lg">
                    <span className="text-2xl">⚱️</span>
                    <div className="flex-1">
                      <p className="text-sm"><strong>Rajesh Kumar</strong> started a collaboration project</p>
                      <p className="text-xs text-muted-foreground">1 day ago • Karnataka</p>
                    </div>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CulturalCardContent>
            </CulturalCard>
          </div>
        )}

        {activeTab === "timeline" && <CulturalTimeline />}
        
        {activeTab === "festival" && (
          <FestivalMode isActive={isFestivalMode} onToggle={setIsFestivalMode} />
        )}
        
        {activeTab === "collaboration" && <CollaborationHub />}
        
        {activeTab === "upload" && (
          <div className="animate-cultural-fade">
            <CulturalCard variant="heritage">
              <CulturalCardHeader className="text-center">
                <CulturalCardTitle className="flex items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-primary" />
                  Upload Your Artwork
                </CulturalCardTitle>
                <CulturalCardDescription>
                  Share your traditional art with the world. Our AI will help categorize and add cultural context.
                </CulturalCardDescription>
              </CulturalCardHeader>
              <CulturalCardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Palette className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="text-lg font-semibold mb-2">Drag & Drop Your Art</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload photos, videos, or audio of your work. AI will automatically add descriptions and cultural context.
                  </p>
                  <CulturalButton variant="festival" size="lg">
                    <Upload className="w-5 h-5" />
                    Choose Files
                  </CulturalButton>
                </div>
              </CulturalCardContent>
            </CulturalCard>
          </div>
        )}
      </main>
    </div>
  );
}