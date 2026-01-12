import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealingPaceIndicator } from '@/components/sanctuary/HealingPaceIndicator';
import { GentleNoteComposer } from '@/components/sanctuary/GentleNoteComposer';
import { formatDate } from '@/lib/timeMode';
import { LogOut, Heart, Calendar, Eye, EyeOff, Moon, Sun, Sparkles } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
type WriterSettings = Database['public']['Tables']['writer_settings']['Row'];

const moodEmojis: Record<string, string> = {
  happy: '🌸',
  tired: '🌙',
  overthinking: '💭',
  hurt: '💔',
  hopeful: '🌈',
  quiet: '😶',
};

const helpLabels: Record<string, string> = {
  just_needed_to_write: 'Just needed to write',
  maybe_later: 'Maybe later',
  yes_need_help: 'May need help',
};

const ReaderDashboard = () => {
  const { user, isReader, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [writerSettings, setWriterSettings] = useState<WriterSettings | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [streak, setStreak] = useState({ current: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
    if (!authLoading && user && !isReader) {
      navigate('/');
    }
  }, [user, isReader, authLoading, navigate]);

  useEffect(() => {
    if (user && isReader) {
      loadData();
    }
  }, [user, isReader]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load journal entries (RLS will filter to shared ones + no_words_today)
      const { data: entriesData } = await supabase
        .from('journal_entries')
        .select('*')
        .order('entry_date', { ascending: false })
        .limit(30);

      if (entriesData) setEntries(entriesData);

      // Load writer settings
      const { data: settingsData } = await supabase
        .from('writer_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (settingsData) setWriterSettings(settingsData);

      // Load streak
      const { data: streakData } = await supabase
        .from('activity_streaks')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (streakData) setStreak({ current: streakData.current_streak, total: streakData.total_days });
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen sanctuary-gradient flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <span className="text-4xl">🌸</span>
        </motion.div>
      </div>
    );
  }

  // Check if writer is taking space
  if (writerSettings?.taking_space_until) {
    const spaceUntil = new Date(writerSettings.taking_space_until);
    if (spaceUntil > new Date()) {
      return (
        <div className="min-h-screen sanctuary-gradient flex flex-col">
          <header className="p-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Reader View</p>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8"
            >
              <span className="text-6xl mb-6 block">🌿</span>
              <h2 className="text-2xl font-display mb-4 text-foreground/80">She's taking space.</h2>
              <p className="text-muted-foreground">And that's okay.</p>
            </motion.div>
          </main>
        </div>
      );
    }
  }

  const todayEntry = entries.find(e => e.entry_date === new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen sanctuary-gradient">
      <header className="p-4 flex items-center justify-between border-b border-lavender/20">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-blush" />
          <p className="text-sm font-medium">Gentle View</p>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4" />
        </Button>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Today's Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Sun className="w-5 h-5 text-gold-soft" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayEntry ? (
                <div className="space-y-4">
                  {todayEntry.no_words_today ? (
                    <p className="text-muted-foreground italic">She chose to rest today. 🌿</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        {todayEntry.mood && (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{moodEmojis[todayEntry.mood]}</span>
                            <span className="text-sm capitalize text-muted-foreground">{todayEntry.mood}</span>
                          </div>
                        )}
                        {todayEntry.help_request && (
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            todayEntry.help_request === 'yes_need_help' 
                              ? 'bg-blush/30 text-blush-deep' 
                              : 'bg-lavender/30 text-lavender-deep'
                          }`}>
                            {helpLabels[todayEntry.help_request]}
                          </span>
                        )}
                      </div>
                      {todayEntry.allow_reader_access ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEntry(todayEntry)}
                          className="text-lavender hover:text-lavender-deep"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Read today's entry
                        </Button>
                      ) : (
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <EyeOff className="w-4 h-4" />
                          Entry kept private
                        </p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No entry yet today</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Streak */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-gold-soft" />
                  <span className="text-muted-foreground">She's shown up for herself</span>
                </div>
                <span className="text-2xl font-display text-lavender-deep">{streak.current} days</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Healing Pace Indicator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <HealingPaceIndicator entries={entries} />
        </motion.div>

        {/* Gentle Note */}
        {writerSettings?.allow_gentle_notes && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GentleNoteComposer />
          </motion.div>
        )}

        {/* Recent Entries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lavender" />
                Recent Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entries.slice(0, 7).map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{entry.mood ? moodEmojis[entry.mood] : '🌿'}</span>
                      <div>
                        <p className="text-sm font-medium">{formatDate(new Date(entry.entry_date))}</p>
                        {entry.no_words_today && (
                          <p className="text-xs text-muted-foreground">Resting day</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.help_request === 'yes_need_help' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blush/30 text-blush-deep">
                          May need help
                        </span>
                      )}
                      {entry.allow_reader_access && !entry.no_words_today && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Entry Detail Modal */}
        {selectedEntry && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display">{formatDate(new Date(selectedEntry.entry_date))}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEntry(null)}>
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {selectedEntry.mood && (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{moodEmojis[selectedEntry.mood]}</span>
                    <span className="capitalize text-lg">{selectedEntry.mood}</span>
                    {selectedEntry.mood_intensity && (
                      <span className="text-sm text-muted-foreground">
                        (intensity: {selectedEntry.mood_intensity}/10)
                      </span>
                    )}
                  </div>
                )}

                {selectedEntry.thoughts_on_mind && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">What's on her mind</h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">{selectedEntry.thoughts_on_mind}</p>
                  </div>
                )}

                {selectedEntry.sweet_moments && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Sweet moments 🤍</h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">{selectedEntry.sweet_moments}</p>
                  </div>
                )}

                {selectedEntry.things_that_hurt && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Things that hurt</h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">{selectedEntry.things_that_hurt}</p>
                  </div>
                )}

                {selectedEntry.night_reflection && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Night reflection
                    </h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">{selectedEntry.night_reflection}</p>
                  </div>
                )}

                {selectedEntry.bookmark && (
                  <div className="pt-4 border-t border-lavender/20">
                    <span className="text-sm px-3 py-1 rounded-full bg-lavender/20 text-lavender-deep">
                      {selectedEntry.bookmark === 'mattered' && '🤍 This day mattered'}
                      {selectedEntry.bookmark === 'heavy' && '🌙 This was heavy'}
                      {selectedEntry.bookmark === 'gentle' && '🌸 This was gentle'}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ReaderDashboard;
