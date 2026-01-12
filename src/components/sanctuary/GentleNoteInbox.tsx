import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, X, Heart } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type GentleNote = Database['public']['Tables']['gentle_notes']['Row'];

export function GentleNoteInbox() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<GentleNote[]>([]);
  const [showNote, setShowNote] = useState<GentleNote | null>(null);

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('gentle_notes')
      .select('*')
      .eq('to_user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) setNotes(data);
  };

  // Get most recent unread note (within last 24 hours)
  useEffect(() => {
    if (notes.length > 0) {
      const recentNote = notes[0];
      const noteDate = new Date(recentNote.created_at);
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      
      if (noteDate > dayAgo) {
        // Show the note after a short delay
        const timer = setTimeout(() => setShowNote(recentNote), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [notes]);

  if (!showNote) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
        onClick={() => setShowNote(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <Card className="max-w-md bg-gradient-to-br from-blush/20 to-lavender/20 border-blush/30 backdrop-blur-lg">
            <CardContent className="pt-6 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setShowNote(null)}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-12 h-12 text-blush mx-auto" />
                </motion.div>

                <p className="text-sm text-muted-foreground">A gentle note for you</p>

                <p className="text-lg font-display italic text-foreground/90 py-4">
                  "{showNote.message}"
                </p>

                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/70">
                  <Heart className="w-3 h-3" />
                  <span>No reply needed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
