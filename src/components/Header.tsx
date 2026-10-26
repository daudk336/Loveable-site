import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else if (hour < 21) setGreeting('Good Evening');
    else setGreeting('Night Mode');
  }, [currentTime]);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="glass-panel border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 glow-amber"
          >
            <Shield className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              MAGE COMMAND
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" />
              Level 10 Mage • Muhammad Daud Khan
            </p>
          </div>
        </div>

        {/* Time Display */}
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <motion.p
            key={formattedTime}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-foreground tracking-wider font-mono"
          >
            {formattedTime}
          </motion.p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
    </header>
  );
}
