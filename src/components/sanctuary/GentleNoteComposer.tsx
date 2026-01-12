import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Heart, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function GentleNoteComposer() {
  const { user } = useAuth();
  const [note, setNote] = useState('');
  const [canSend, setCanSend] = useState(true);
  const [lastSentDate, setLastSentDate] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user) {
      checkLastNote();
    }
  }, [user]);

  const checkLastNote = async () => {
    if (!user) return;

    // Check when the last note was sent
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data } = await supabase
      .from('gentle_notes')
      .select('created_at')
      .eq('from_user_id', user.id)
      .gte('created_at', oneWeekAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setCanSend(false);
      setLastSentDate(data.created_at);
    }
  };

  const sendNote = async () => {
    if (!user || !note.trim() || !canSend) return;

    setSending(true);
    try {
      // Find the writer user
      const { data: writerRole } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'writer')
        .limit(1)
        .maybeSingle();

      if (!writerRole) {
        toast.error('Could not find writer');
        return;
      }

      const { error } = await supabase.from('gentle_notes').insert({
        from_user_id: user.id,
        to_user_id: writerRole.user_id,
        message: note.trim(),
      });

      if (error) throw error;

      toast.success('Note sent with love 💌');
      setNote('');
      setCanSend(false);
      setLastSentDate(new Date().toISOString());
    } catch (err) {
      console.error(err);
      toast.error('Failed to send note');
    } finally {
      setSending(false);
    }
  };

  const daysUntilNextNote = () => {
    if (!lastSentDate) return 0;
    const sent = new Date(lastSentDate);
    const nextAllowed = new Date(sent);
    nextAllowed.setDate(nextAllowed.getDate() + 7);
    const now = new Date();
    const diff = Math.ceil((nextAllowed.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-blush/30">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Heart className="w-5 h-5 text-blush" />
          Send a Gentle Note
        </CardTitle>
        <CardDescription>
          One short message, once per week. No reply expected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {canSend ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Textarea
              value={note}
              onChange={e => setNote(e.target.value.slice(0, 200))}
              placeholder="Thinking of you. No need to reply..."
              className="min-h-[100px] bg-background/50 resize-none"
              maxLength={200}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{note.length}/200</span>
              <Button
                onClick={sendNote}
                disabled={!note.trim() || sending}
                className="bg-blush hover:bg-blush-deep text-primary-foreground"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? 'Sending...' : 'Send with love'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Note sent 💌
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              You can send another in {daysUntilNextNote()} days
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
