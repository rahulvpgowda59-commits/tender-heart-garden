import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MorningMode } from '@/components/sanctuary/MorningMode';
import { MoodSelector, MoodType } from '@/components/sanctuary/MoodSelector';
import { NoWordsMode } from '@/components/sanctuary/NoWordsMode';
import { JournalEditor } from '@/components/sanctuary/JournalEditor';
import { HelpRequest, HelpRequestType } from '@/components/sanctuary/HelpRequest';
import { ConsentToggle } from '@/components/sanctuary/ConsentToggle';
import { BookmarkSelector, BookmarkType } from '@/components/sanctuary/BookmarkSelector';
import { StreakDisplay } from '@/components/sanctuary/StreakDisplay';
import { TakingSpaceButton } from '@/components/sanctuary/TakingSpaceButton';
import { getCurrentTimeMode, formatDate, getTodayDate } from '@/lib/timeMode';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, LogOut } from 'lucide-react';
import { toast } from 'sonner';

type Step = 'mood' | 'nowords' | 'journal' | 'help' | 'consent' | 'complete';

const Index = () => {
  const { user, isWriter, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [timeMode, setTimeMode] = useState(getCurrentTimeMode());
  const [step, setStep] = useState<Step>('mood');
  const [mood, setMood] = useState<MoodType | null>(null);
  const [noWordsToday, setNoWordsToday] = useState(false);
  const [helpRequest, setHelpRequest] = useState<HelpRequestType | null>(null);
  const [allowAccess, setAllowAccess] = useState(false);
  const [bookmark, setBookmark] = useState<BookmarkType>(null);
  const [takingSpace, setTakingSpace] = useState(false);
  const [streak, setStreak] = useState({ current: 0, total: 0 });
  const [entry, setEntry] = useState({
    thoughts_on_mind: '',
    sweet_moments: '',
    things_that_hurt: '',
    night_reflection: '',
    letter_to_self: '',
    mood_intensity: null as number | null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeMode(getCurrentTimeMode());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      supabase.from('activity_streaks').select('*').eq('user_id', user.id).maybeSingle()
        .then(({ data }) => {
          if (data) setStreak({ current: data.current_streak, total: data.total_days });
        });
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen sanctuary-gradient flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <span className="text-4xl">🌸</span>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (timeMode === 'morning') {
    return <MorningMode />;
  }

  if (noWordsToday) {
    return (
      <div className="min-h-screen sanctuary-gradient relative">
        <NoWordsMode 
          onClose={() => { setNoWordsToday(false); navigate('/'); }}
          onComeBackLater={() => setNoWordsToday(false)}
        />
      </div>
    );
  }

  const saveEntry = async () => {
    if (!user) return;
    try {
      const { error } = await supabase.from('journal_entries').upsert({
        user_id: user.id,
        entry_date: getTodayDate(),
        mood,
        mood_intensity: entry.mood_intensity,
        thoughts_on_mind: entry.thoughts_on_mind || null,
        sweet_moments: entry.sweet_moments || null,
        things_that_hurt: entry.things_that_hurt || null,
        night_reflection: entry.night_reflection || null,
        letter_to_self: entry.letter_to_self || null,
        no_words_today: noWordsToday,
        help_request: helpRequest,
        allow_reader_access: allowAccess,
        bookmark,
        taking_space: takingSpace,
      }, { onConflict: 'user_id,entry_date' });
      if (error) throw error;
      toast.success('Entry saved 🌸');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save');
    }
  };

  const handleNext = () => {
    const steps: Step[] = ['mood', 'journal', 'help', 'consent', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      if (step === 'consent') saveEntry();
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['mood', 'journal', 'help', 'consent', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  return (
    <div className="min-h-screen sanctuary-gradient">
      <header className="p-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{formatDate(new Date())}</p>
        <div className="flex items-center gap-2">
          <TakingSpaceButton isActive={takingSpace} onToggle={setTakingSpace} />
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4" /></Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {step === 'mood' && (
          <div className="space-y-8">
            <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
            <div className="flex flex-col items-center gap-4">
              <Button onClick={handleNext} className="bg-lavender hover:bg-lavender-deep text-primary-foreground px-8">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="ghost" onClick={() => { setNoWordsToday(true); saveEntry(); }} className="text-muted-foreground">
                I don't have words today
              </Button>
            </div>
            <StreakDisplay currentStreak={streak.current} totalDays={streak.total} />
          </div>
        )}

        {step === 'journal' && (
          <div className="space-y-8">
            <JournalEditor entry={entry} mood={mood} onChange={setEntry} onAutoSave={saveEntry} />
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button onClick={handleNext} className="bg-lavender hover:bg-lavender-deep text-primary-foreground">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'help' && (
          <div className="space-y-8">
            <HelpRequest selected={helpRequest} onSelect={setHelpRequest} />
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button onClick={handleNext} className="bg-lavender hover:bg-lavender-deep text-primary-foreground">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'consent' && (
          <div className="space-y-8">
            <ConsentToggle allowAccess={allowAccess} onToggle={setAllowAccess} />
            <BookmarkSelector selected={bookmark} onSelect={setBookmark} />
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button onClick={handleNext} className="bg-blush hover:bg-blush-deep text-primary-foreground">
                Save Entry <Check className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <span className="text-6xl mb-6 block">🌸</span>
            <h2 className="text-3xl font-display mb-4">You showed up today</h2>
            <p className="text-muted-foreground mb-8">That's more than enough.</p>
            <Button onClick={() => setStep('mood')} variant="ghost">Start fresh</Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
