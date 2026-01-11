-- Create roles enum for user types
CREATE TYPE public.user_role AS ENUM ('writer', 'reader', 'admin');

-- Create mood enum
CREATE TYPE public.mood_type AS ENUM ('happy', 'tired', 'overthinking', 'hurt', 'hopeful', 'quiet');

-- Create bookmark type enum
CREATE TYPE public.bookmark_type AS ENUM ('mattered', 'heavy', 'gentle');

-- Create help request enum
CREATE TYPE public.help_request_type AS ENUM ('just_needed_to_write', 'maybe_later', 'yes_need_help');

-- User roles table (security best practice)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL DEFAULT 'reader',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table for user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Morning messages (admin can set daily messages)
CREATE TABLE public.morning_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (date)
);

ALTER TABLE public.morning_messages ENABLE ROW LEVEL SECURITY;

-- Journal entries (the core content)
CREATE TABLE public.journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Mood selection (optional)
    mood mood_type,
    mood_intensity SMALLINT CHECK (mood_intensity >= 1 AND mood_intensity <= 10),
    
    -- Writing sections (nullable - she might not fill all)
    thoughts_on_mind TEXT,
    sweet_moments TEXT,
    things_that_hurt TEXT,
    
    -- Night reflection (only after 9pm)
    night_reflection TEXT,
    
    -- Private letter to self (never shared)
    letter_to_self TEXT,
    
    -- "No words today" mode
    no_words_today BOOLEAN NOT NULL DEFAULT false,
    
    -- Help request
    help_request help_request_type,
    
    -- Consent-based sharing
    allow_reader_access BOOLEAN NOT NULL DEFAULT false,
    
    -- Emotional bookmark
    bookmark bookmark_type,
    
    -- Taking space mode
    taking_space BOOLEAN NOT NULL DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    UNIQUE (user_id, entry_date)
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Gentle notes from reader to writer (max once per week)
CREATE TABLE public.gentle_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) <= 200),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gentle_notes ENABLE ROW LEVEL SECURITY;

-- Activity streak tracking
CREATE TABLE public.activity_streaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE,
    total_days INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_streaks ENABLE ROW LEVEL SECURITY;

-- Princess affirmations (curated messages)
CREATE TABLE public.affirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.affirmations ENABLE ROW LEVEL SECURITY;

-- Settings for the writer (e.g., disable gentle notes)
CREATE TABLE public.writer_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    allow_gentle_notes BOOLEAN NOT NULL DEFAULT true,
    taking_space_until DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.writer_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is writer
CREATE OR REPLACE FUNCTION public.is_writer(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'writer')
$$;

-- Function to check if user is reader
CREATE OR REPLACE FUNCTION public.is_reader(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'reader')
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activity_streaks_updated_at
    BEFORE UPDATE ON public.activity_streaks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_writer_settings_updated_at
    BEFORE UPDATE ON public.writer_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- User roles: users can see their own roles
CREATE POLICY "Users can view own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

-- Profiles: users can manage their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Morning messages: everyone can read, only admin can write
CREATE POLICY "Anyone can read morning messages"
    ON public.morning_messages FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin can insert morning messages"
    ON public.morning_messages FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update morning messages"
    ON public.morning_messages FOR UPDATE
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Journal entries: writer can CRUD own entries
CREATE POLICY "Writer can view own entries"
    ON public.journal_entries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Writer can insert own entries"
    ON public.journal_entries FOR INSERT
    WITH CHECK (auth.uid() = user_id AND public.is_writer(auth.uid()));

CREATE POLICY "Writer can update own entries"
    ON public.journal_entries FOR UPDATE
    USING (auth.uid() = user_id AND public.is_writer(auth.uid()));

CREATE POLICY "Writer can delete own entries"
    ON public.journal_entries FOR DELETE
    USING (auth.uid() = user_id AND public.is_writer(auth.uid()));

-- Reader can view limited info from shared entries
CREATE POLICY "Reader can view shared entries limited"
    ON public.journal_entries FOR SELECT
    TO authenticated
    USING (
        public.is_reader(auth.uid()) 
        AND (
            allow_reader_access = true 
            OR no_words_today = true
        )
    );

-- Gentle notes policies
CREATE POLICY "Users can view notes sent to them"
    ON public.gentle_notes FOR SELECT
    USING (auth.uid() = to_user_id);

CREATE POLICY "Reader can send notes"
    ON public.gentle_notes FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = from_user_id 
        AND public.is_reader(auth.uid())
    );

-- Activity streaks: users can manage their own
CREATE POLICY "Users can view own streaks"
    ON public.activity_streaks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
    ON public.activity_streaks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
    ON public.activity_streaks FOR UPDATE
    USING (auth.uid() = user_id);

-- Reader can view writer's streak
CREATE POLICY "Reader can view writer streaks"
    ON public.activity_streaks FOR SELECT
    TO authenticated
    USING (public.is_reader(auth.uid()));

-- Affirmations: everyone can read
CREATE POLICY "Anyone can read affirmations"
    ON public.affirmations FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admin can manage affirmations"
    ON public.affirmations FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Writer settings
CREATE POLICY "Writer can manage own settings"
    ON public.writer_settings FOR ALL
    USING (auth.uid() = user_id AND public.is_writer(auth.uid()));

-- Reader can view writer settings (to check if notes allowed)
CREATE POLICY "Reader can view writer settings"
    ON public.writer_settings FOR SELECT
    TO authenticated
    USING (public.is_reader(auth.uid()));

-- Insert some default affirmations
INSERT INTO public.affirmations (message, category) VALUES
    ('You are allowed to take up space.', 'self-worth'),
    ('Your feelings are valid, even the quiet ones.', 'emotions'),
    ('Rest is also a form of healing.', 'rest'),
    ('You don''t owe anyone an explanation for your boundaries.', 'boundaries'),
    ('Being gentle with yourself is an act of courage.', 'self-care'),
    ('You are worthy of the love you give to others.', 'self-love'),
    ('It''s okay to not be okay right now.', 'acceptance'),
    ('Your presence alone is enough.', 'presence'),
    ('Healing isn''t linear, and that''s perfectly fine.', 'healing'),
    ('You are the author of your own story.', 'empowerment');