import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = isSignUp 
      ? await signUp(email, password, 'writer')
      : await signIn(email, password);
    
    setLoading(false);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isSignUp ? 'Welcome to your sanctuary 🌸' : 'Welcome back 🌸');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen sanctuary-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-floating w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-5xl block mb-4"
          >
            🌸
          </motion.span>
          <h1 className="text-3xl font-display text-foreground/80">
            {isSignUp ? 'Create Your Sanctuary' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'A gentle space just for you' : 'Your safe space awaits'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="bg-background/50"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-lavender hover:bg-lavender-deep text-primary-foreground"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Sanctuary' : 'Enter'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSignUp ? 'Already have a sanctuary? Sign in' : "New here? Create your space"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
