-- Create enum types for user roles and artform categories
CREATE TYPE public.user_role AS ENUM ('customer', 'seller', 'admin');
CREATE TYPE public.artform_status AS ENUM ('approved', 'pending', 'featured');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'customer',
  name TEXT NOT NULL,
  region TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  languages TEXT[] DEFAULT ARRAY['hindi', 'english'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create artforms table for craft categories
CREATE TABLE public.artforms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  cultural_significance TEXT,
  region TEXT,
  history TEXT,
  heritage_story TEXT,
  status artform_status DEFAULT 'approved',
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for artisan listings
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  artform_id UUID NOT NULL REFERENCES public.artforms(id),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  audio_url TEXT,
  video_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_festival_special BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for artforms
CREATE POLICY "Everyone can view approved artforms" ON public.artforms FOR SELECT USING (status = 'approved' OR status = 'featured');
CREATE POLICY "Sellers can create artforms" ON public.artforms FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'seller')
);
CREATE POLICY "Creators can update their artforms" ON public.artforms FOR UPDATE USING (
  created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Create RLS policies for products
CREATE POLICY "Everyone can view active products" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Sellers can create products" ON public.products FOR INSERT WITH CHECK (
  seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'seller')
);
CREATE POLICY "Sellers can update their own products" ON public.products FOR UPDATE USING (
  seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Sellers can delete their own products" ON public.products FOR DELETE USING (
  seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_artforms_updated_at BEFORE UPDATE ON public.artforms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default artforms
INSERT INTO public.artforms (name, description, cultural_significance, region, history, heritage_story, status, image_url) VALUES
('Madhubani Painting', 'Traditional folk art from Bihar featuring geometric patterns and vibrant colors', 'Ancient art form passed down through generations of women in Mithila region', 'Bihar', 'Originated in the Mithila region during the time of Ramayana', 'Legend says it began when King Janaka commissioned artists to create paintings for his daughter Sita''s wedding', 'featured', '/api/placeholder/400/300'),
('Warli Art', 'Tribal art form using simple geometric shapes to depict daily life', 'Sacred art form of the Warli tribe expressing their connection with nature', 'Maharashtra', 'Dating back to 10th century AD, created by Warli tribe', 'Created on mud walls to celebrate harvests and special occasions', 'featured', '/api/placeholder/400/300'),
('Block Printing', 'Hand-carved wooden blocks used to print intricate patterns on fabric', 'Traditional textile art form representing regional cultural identity', 'Rajasthan', 'Developed in 12th century in Sanganer and Bagru regions', 'Masters would pass down carved blocks through generations as family heirlooms', 'featured', '/api/placeholder/400/300'),
('Pottery', 'Hand-molded clay vessels and decorative items', 'Essential craft for daily life and ceremonial purposes across India', 'Pan-India', 'One of the oldest human crafts, dating back to Indus Valley Civilization', 'Each region developed unique styles influenced by local clay and cultural needs', 'approved', '/api/placeholder/400/300'),
('Embroidery', 'Decorative needlework with intricate patterns and motifs', 'Regional embroidery styles reflect local traditions and stories', 'Pan-India', 'Ancient craft mentioned in Indian epics and scriptures', 'Different regions developed distinct styles like Chikankari, Phulkari, Kantha', 'approved', '/api/placeholder/400/300');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();