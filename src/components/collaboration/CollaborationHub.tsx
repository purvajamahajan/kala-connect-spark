import { useState } from "react";
import { CulturalCard, CulturalCardContent, CulturalCardDescription, CulturalCardHeader, CulturalCardTitle } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Sparkles, MapPin, Star, Video, Trophy, Plus } from "lucide-react";

const artisans = [
  {
    id: "1",
    name: "Priya Sharma",
    artForm: "Warli Painting",
    region: "Maharashtra", 
    speciality: "Traditional Stories",
    rating: 4.8,
    collaborations: 12,
    avatar: "👩‍🎨",
    style: "Minimalist tribal patterns with modern interpretations"
  },
  {
    id: "2", 
    name: "Rajesh Kumar",
    artForm: "Bidriware",
    region: "Karnataka",
    speciality: "Metal Inlay Work",
    rating: 4.9,
    collaborations: 8,
    avatar: "👨‍🔧",
    style: "Intricate silver inlay on blackened metal"
  },
  {
    id: "3",
    name: "Meera Patel",
    artForm: "Kalamkari",
    region: "Andhra Pradesh", 
    speciality: "Natural Dyes",
    rating: 4.7,
    collaborations: 15,
    avatar: "👩‍🎭",
    style: "Hand-painted mythological narratives"
  },
  {
    id: "4",
    name: "Ganesh Kumbhar", 
    artForm: "Pottery",
    region: "Maharashtra",
    speciality: "Eco-friendly Crafts",
    rating: 4.6,
    collaborations: 6,
    avatar: "👨‍🏭",
    style: "Sustainable clay work with traditional forms"
  }
];

const collaborationProjects = [
  {
    id: "1",
    name: "Warli-Bidri Fusion Vase",
    artists: ["Priya Sharma", "Rajesh Kumar"],
    regions: ["Maharashtra", "Karnataka"],
    artForms: ["Warli Painting", "Bidriware"],
    description: "A unique vase combining Warli tribal patterns with Bidriware metal inlay techniques",
    status: "In Progress",
    likes: 234,
    phase: "Design Finalization"
  },
  {
    id: "2", 
    name: "Kalamkari-Pottery Story Plates",
    artists: ["Meera Patel", "Ganesh Kumbhar"],
    regions: ["Andhra Pradesh", "Maharashtra"],
    artForms: ["Kalamkari", "Pottery"],
    description: "Eco-friendly plates with hand-painted mythological stories using natural dyes",
    status: "Completed",
    likes: 456,
    phase: "Available for Order"
  }
];

const matchingSuggestions = [
  {
    artist1: "Priya Sharma",
    artist2: "Meera Patel", 
    compatibility: 92,
    reason: "Both specialize in storytelling through art - Warli tribal narratives can beautifully complement Kalamkari mythological themes",
    suggestedProject: "Cross-cultural storytelling textile collection"
  },
  {
    artist1: "Rajesh Kumar",
    artist2: "Ganesh Kumbhar",
    compatibility: 87,
    reason: "Metal and clay fusion has great potential - Bidriware techniques can enhance pottery with elegant inlay work",
    suggestedProject: "Premium home decor fusion line"
  }
];

export function CollaborationHub() {
  const [activeTab, setActiveTab] = useState<"find" | "projects" | "leaderboard">("find");
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);

  const handleConnect = (artistId: string) => {
    setSelectedArtisan(artistId);
    // In a real app, this would initiate a collaboration request
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-cultural-heading text-primary mb-4 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 animate-heritage-glow" />
          Artisan Collaboration Hub
          <Users className="w-8 h-8 animate-heritage-glow" />
        </h2>
        <p className="text-heritage max-w-3xl mx-auto">
          Connect with fellow artisans across India to create unique fusion products. 
          Share techniques, blend traditions, and reach new markets together.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <CulturalButton
          variant={activeTab === "find" ? "heritage" : "cultural"}
          onClick={() => setActiveTab("find")}
        >
          <Users className="w-5 h-5" />
          Find Partners
        </CulturalButton>
        <CulturalButton
          variant={activeTab === "projects" ? "heritage" : "cultural"}
          onClick={() => setActiveTab("projects")}
        >
          <Sparkles className="w-5 h-5" />
          Active Projects
        </CulturalButton>
        <CulturalButton
          variant={activeTab === "leaderboard" ? "heritage" : "cultural"}
          onClick={() => setActiveTab("leaderboard")}
        >
          <Trophy className="w-5 h-5" />
          Leaderboard
        </CulturalButton>
      </div>

      {/* Find Partners Tab */}
      {activeTab === "find" && (
        <div className="space-y-6 animate-cultural-fade">
          {/* AI Matching Suggestions */}
          <CulturalCard variant="collaboration">
            <CulturalCardHeader>
              <CulturalCardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary-glow" />
                AI-Powered Collaboration Matches
              </CulturalCardTitle>
              <CulturalCardDescription>
                Based on your style and regional techniques, here are perfect collaboration opportunities
              </CulturalCardDescription>
            </CulturalCardHeader>
            <CulturalCardContent>
              <div className="space-y-4">
                {matchingSuggestions.map((match, index) => (
                  <div key={index} className="p-4 bg-heritage rounded-lg border-l-4 border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{match.artist1}</span>
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{match.artist2}</span>
                      </div>
                      <Badge variant="secondary" className="animate-heritage-glow">
                        {match.compatibility}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-heritage-foreground mb-2">{match.reason}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">💡 {match.suggestedProject}</p>
                      <CulturalButton variant="festival" size="sm">
                        <Plus className="w-4 h-4" />
                        Start Collaboration
                      </CulturalButton>
                    </div>
                  </div>
                ))}
              </div>
            </CulturalCardContent>
          </CulturalCard>

          {/* Artisan Directory */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {artisans.map((artisan) => (
              <CulturalCard key={artisan.id} variant="artisan" className="hover:shadow-cultural transition-all">
                <CulturalCardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">{artisan.avatar}</div>
                  <h4 className="font-semibold text-primary mb-1">{artisan.name}</h4>
                  <Badge variant="outline" className="mb-2 text-xs">
                    {artisan.artForm}
                  </Badge>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {artisan.region}
                  </p>
                  <p className="text-xs text-heritage mb-3">{artisan.speciality}</p>
                  
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-current" />
                      {artisan.rating}
                    </div>
                    <div className="text-muted-foreground">
                      {artisan.collaborations} collaborations
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-4 italic">
                    "{artisan.style}"
                  </p>
                  
                  <div className="flex gap-2">
                    <CulturalButton variant="heritage" size="sm" className="flex-1">
                      View Profile
                    </CulturalButton>
                    <CulturalButton 
                      variant="festival" 
                      size="sm" 
                      onClick={() => handleConnect(artisan.id)}
                    >
                      Connect
                    </CulturalButton>
                  </div>
                </CulturalCardContent>
              </CulturalCard>
            ))}
          </div>
        </div>
      )}

      {/* Active Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-6 animate-cultural-fade">
          {collaborationProjects.map((project) => (
            <CulturalCard key={project.id} variant="timeline" className="overflow-hidden">
              <CulturalCardContent className="p-0">
                {/* Split Screen Design */}
                <div className="grid md:grid-cols-2">
                  {/* Left Side - First Artist */}
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">👩‍🎨</div>
                      <div>
                        <h5 className="font-semibold">{project.artists[0]}</h5>
                        <p className="text-sm text-muted-foreground">{project.artForms[0]} • {project.regions[0]}</p>
                      </div>
                    </div>
                    <div className="text-xs text-heritage-foreground">
                      Bringing traditional {project.artForms[0].toLowerCase()} techniques to the fusion
                    </div>
                  </div>

                  {/* Right Side - Second Artist */}
                  <div className="p-6 bg-gradient-to-l from-secondary/5 to-transparent">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">👨‍🔧</div>
                      <div>
                        <h5 className="font-semibold">{project.artists[1]}</h5>
                        <p className="text-sm text-muted-foreground">{project.artForms[1]} • {project.regions[1]}</p>
                      </div>
                    </div>
                    <div className="text-xs text-heritage-foreground">
                      Contributing {project.artForms[1].toLowerCase()} expertise and craftsmanship
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-cultural text-lg text-primary">{project.name}</h4>
                    <Badge 
                      variant={project.status === "Completed" ? "secondary" : "outline"}
                      className="animate-heritage-glow"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-heritage mb-4">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-primary" />
                        {project.likes}
                      </div>
                      <div>Phase: {project.phase}</div>
                    </div>
                    <div className="flex gap-2">
                      <CulturalButton variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                        Watch Progress
                      </CulturalButton>
                      <CulturalButton variant="heritage" size="sm">
                        View Details
                      </CulturalButton>
                    </div>
                  </div>
                </div>
              </CulturalCardContent>
            </CulturalCard>
          ))}

          {/* Empty State */}
          <CulturalCard variant="artisan" className="text-center">
            <CulturalCardContent className="py-8">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
              <p className="text-heritage mb-4">Start your first collaboration project!</p>
              <CulturalButton variant="festival">
                <Plus className="w-4 h-4" />
                Create New Project
              </CulturalButton>
            </CulturalCardContent>
          </CulturalCard>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <div className="animate-cultural-fade">
          <CulturalCard variant="heritage">
            <CulturalCardHeader className="text-center">
              <CulturalCardTitle className="flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-accent animate-heritage-glow" />
                Top Collaborating Artisans
              </CulturalCardTitle>
              <CulturalCardDescription>
                Celebrating our most active community members who bring traditions together
              </CulturalCardDescription>
            </CulturalCardHeader>
            <CulturalCardContent>
              <div className="space-y-4">
                {artisans
                  .sort((a, b) => b.collaborations - a.collaborations)
                  .map((artisan, index) => (
                    <div key={artisan.id} className="flex items-center gap-4 p-4 bg-heritage rounded-lg">
                      <div className="text-2xl font-bold text-primary w-8 text-center">
                        #{index + 1}
                      </div>
                      <div className="text-3xl">{artisan.avatar}</div>
                      <div className="flex-1">
                        <h5 className="font-semibold">{artisan.name}</h5>
                        <p className="text-sm text-muted-foreground">{artisan.artForm} • {artisan.region}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{artisan.collaborations}</div>
                        <div className="text-xs text-muted-foreground">collaborations</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-sm">{artisan.rating}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CulturalCardContent>
          </CulturalCard>
        </div>
      )}
    </div>
  );
}