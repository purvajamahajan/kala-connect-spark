import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CulturalCard, CulturalCardContent, CulturalCardHeader, CulturalCardTitle, CulturalCardDescription } from "@/components/ui/cultural-card";
import { CulturalButton } from "@/components/ui/cultural-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, MapPin, Palette, Phone, Mic, MicOff, Plus } from "lucide-react";

interface SellerRegistrationProps {
  onComplete: () => void;
}

interface Artform {
  id: string;
  name: string;
  description: string;
  region: string;
}

export function SellerRegistration({ onComplete }: SellerRegistrationProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [artforms, setArtforms] = useState<Artform[]>([]);
  
  // Form data
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [selectedArtform, setSelectedArtform] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [customArtform, setCustomArtform] = useState("");
  const [showCustomArtform, setShowCustomArtform] = useState(false);

  const regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  useEffect(() => {
    fetchArtforms();
  }, []);

  const fetchArtforms = async () => {
    try {
      const { data, error } = await supabase
        .from('artforms')
        .select('id, name, description, region')
        .eq('status', 'approved');
      
      if (error) throw error;
      setArtforms(data || []);
    } catch (error: any) {
      toast.error("Failed to load artforms");
    }
  };

  const startVoiceInput = (field: 'name' | 'bio') => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice input not supported in this browser");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (field === 'name') {
        setName(transcript);
      } else if (field === 'bio') {
        setBio(transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice input failed. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const createCustomArtform = async () => {
    if (!customArtform.trim()) return null;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', (await supabase.auth.getSession()).data.session?.user.id)
        .single();

      const { data, error } = await supabase
        .from('artforms')
        .insert({
          name: customArtform,
          description: `Custom artform created by artisan`,
          region: region,
          status: 'pending',
          created_by: profile?.id
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Custom artform created! It will be reviewed and added to our collection.");
      return data.id;
    } catch (error: any) {
      toast.error("Failed to create custom artform");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) throw new Error("Not authenticated");

      let finalArtformId = selectedArtform;
      
      if (showCustomArtform && customArtform) {
        const customId = await createCustomArtform();
        if (customId) finalArtformId = customId;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          region,
          phone,
          bio,
          role: 'seller'
        })
        .eq('user_id', session.data.session.user.id);

      if (error) throw error;

      toast.success("Registration complete! Welcome to MegaMosaic!");
      onComplete();
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return name.trim() !== "";
      case 2: return region !== "";
      case 3: return selectedArtform !== "" || (showCustomArtform && customArtform.trim() !== "");
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-heritage flex items-center justify-center p-6">
      <CulturalCard variant="heritage" className="w-full max-w-2xl">
        <CulturalCardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl">🎨</span>
          </div>
          <CulturalCardTitle className="text-3xl">Welcome, Master Artisan!</CulturalCardTitle>
          <CulturalCardDescription>
            Let's complete your journey to join our community of traditional craftspeople
          </CulturalCardDescription>
          <div className="flex justify-center mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-2 mx-1 rounded-full ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CulturalCardHeader>

        <CulturalCardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Tell us your name</h3>
                <p className="text-muted-foreground">You can speak or type your name</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Full Name
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="flex-1"
                  />
                  <CulturalButton
                    type="button"
                    variant={isListening ? "festival" : "cultural"}
                    size="icon"
                    onClick={() => startVoiceInput('name')}
                    disabled={isListening}
                  >
                    {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
                  </CulturalButton>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Tell us about your craft (Optional)
                </Label>
                <div className="flex gap-2">
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share your story, experience, and passion for your craft..."
                    className="flex-1 min-h-[100px]"
                  />
                  <CulturalButton
                    type="button"
                    variant={isListening ? "festival" : "cultural"}
                    size="icon"
                    onClick={() => startVoiceInput('bio')}
                    disabled={isListening}
                    className="self-start"
                  >
                    {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
                  </CulturalButton>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Where are you from?</h3>
                <p className="text-muted-foreground">Select your region to connect with local artisan communities</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Your Region/State
                  </Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state/region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">What is your artform?</h3>
                <p className="text-muted-foreground">Choose from our collection or create a new category</p>
              </div>
              
              {!showCustomArtform ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {artforms.map((artform) => (
                      <CulturalCard
                        key={artform.id}
                        variant={selectedArtform === artform.id ? "heritage" : "artisan"}
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedArtform(artform.id)}
                      >
                        <CulturalCardContent className="p-4">
                          <h4 className="font-semibold">{artform.name}</h4>
                          <p className="text-sm text-muted-foreground">{artform.region}</p>
                          <p className="text-xs mt-1">{artform.description}</p>
                        </CulturalCardContent>
                      </CulturalCard>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <CulturalButton
                      variant="cultural"
                      onClick={() => setShowCustomArtform(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      My artform isn't listed
                    </CulturalButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-artform">
                      Create Your Artform Category
                    </Label>
                    <Input
                      id="custom-artform"
                      value={customArtform}
                      onChange={(e) => setCustomArtform(e.target.value)}
                      placeholder="e.g., Bamboo Weaving, Stone Carving, etc."
                    />
                  </div>
                  
                  <CulturalButton
                    variant="ghost"
                    onClick={() => setShowCustomArtform(false)}
                    size="sm"
                  >
                    ← Back to existing artforms
                  </CulturalButton>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <CulturalButton
                variant="ghost"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </CulturalButton>
            )}
            
            <CulturalButton
              variant="heritage"
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="ml-auto"
            >
              {loading ? "Please wait..." : (step === 3 ? "Complete Registration" : "Next")}
            </CulturalButton>
          </div>
        </CulturalCardContent>
      </CulturalCard>
    </div>
  );
}