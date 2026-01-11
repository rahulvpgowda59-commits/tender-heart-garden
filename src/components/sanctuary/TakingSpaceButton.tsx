import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TakingSpaceButtonProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export function TakingSpaceButton({ isActive, onToggle }: TakingSpaceButtonProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onToggle(!isActive);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`text-sm ${isActive ? 'text-lavender-deep' : 'text-muted-foreground'}`}
        >
          <Shield className="w-4 h-4 mr-2" />
          {isActive ? 'Taking space (active)' : 'I need space for a while'}
        </Button>
      </DialogTrigger>
      <DialogContent className="card-floating">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isActive ? 'Ready to come back?' : 'Taking space'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isActive 
              ? "When you're ready, you can turn this off. No pressure."
              : "This will hide your entries from the reader. They'll only see 'She's taking space.' No streaks, no pressure, no reminders."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-lavender hover:bg-lavender-deep text-primary-foreground"
          >
            {isActive ? 'Come back' : 'Take space'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
