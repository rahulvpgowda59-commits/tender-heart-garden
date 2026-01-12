import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, Sparkles, Calendar, Wand2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type MorningMessage = Database['public']['Tables']['morning_messages']['Row'];
type Affirmation = Database['public']['Tables']['affirmations']['Row'];

const AdminPanel = () => {
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MorningMessage[]>([]);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [newMessage, setNewMessage] = useState({ date: '', message: '' });
  const [newAffirmation, setNewAffirmation] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
    if (!authLoading && user && !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadData();
    }
  }, [user, isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: messagesData } = await supabase
        .from('morning_messages')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (messagesData) setMessages(messagesData);

      const { data: affirmationsData } = await supabase
        .from('affirmations')
        .select('*')
        .order('created_at', { ascending: false });

      if (affirmationsData) setAffirmations(affirmationsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveMessage = async () => {
    if (!newMessage.date || !newMessage.message) {
      toast.error('Please fill in date and message');
      return;
    }

    try {
      const { error } = await supabase.from('morning_messages').upsert({
        date: newMessage.date,
        message: newMessage.message,
        created_by: user?.id,
      }, { onConflict: 'date' });

      if (error) throw error;
      toast.success('Message saved 🌸');
      setNewMessage({ date: '', message: '' });
      loadData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save message');
    }
  };

  const generateAIMessage = async () => {
    setGeneratingAI(true);
    try {
      const response = await supabase.functions.invoke('generate-morning-message');
      if (response.error) throw response.error;
      
      setNewMessage(prev => ({ ...prev, message: response.data.message }));
      toast.success('AI message generated ✨');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate message');
    } finally {
      setGeneratingAI(false);
    }
  };

  const addAffirmation = async () => {
    if (!newAffirmation.trim()) return;

    try {
      const { error } = await supabase.from('affirmations').insert({
        message: newAffirmation,
        category: 'general',
      });

      if (error) throw error;
      toast.success('Affirmation added 🌸');
      setNewAffirmation('');
      loadData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add affirmation');
    }
  };

  const deleteAffirmation = async (id: string) => {
    try {
      const { error } = await supabase.from('affirmations').delete().eq('id', id);
      if (error) throw error;
      toast.success('Affirmation removed');
      loadData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete');
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

  return (
    <div className="min-h-screen sanctuary-gradient">
      <header className="p-4 flex items-center justify-between border-b border-lavender/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-soft" />
          <p className="text-sm font-medium">Admin Panel</p>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4" />
        </Button>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Morning Messages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-soft" />
                Morning Messages
              </CardTitle>
              <CardDescription>
                Create gentle morning messages for each day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMessage.date}
                    onChange={e => setNewMessage(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newMessage.message}
                    onChange={e => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Good morning, gentle soul..."
                    className="min-h-[120px] bg-background/50 font-display text-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={generateAIMessage} 
                    variant="outline"
                    disabled={generatingAI}
                    className="flex-1"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {generatingAI ? 'Generating...' : 'Generate with AI'}
                  </Button>
                  <Button 
                    onClick={saveMessage}
                    className="flex-1 bg-lavender hover:bg-lavender-deep text-primary-foreground"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Message
                  </Button>
                </div>
              </div>

              {/* Existing Messages */}
              <div className="pt-6 border-t border-lavender/20">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Recent Messages</h4>
                <div className="space-y-3">
                  {messages.map(msg => (
                    <div 
                      key={msg.id}
                      className="p-4 rounded-lg bg-background/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{msg.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Affirmations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blush" />
                Princess Affirmations
              </CardTitle>
              <CardDescription>
                Gentle affirmations shown occasionally to the writer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  value={newAffirmation}
                  onChange={e => setNewAffirmation(e.target.value)}
                  placeholder="You are allowed to take up space..."
                  className="bg-background/50"
                />
                <Button onClick={addAffirmation} className="bg-blush hover:bg-blush-deep text-primary-foreground">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {affirmations.map(aff => (
                  <div 
                    key={aff.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                  >
                    <p className="text-sm">{aff.message}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteAffirmation(aff.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPanel;
