import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Share2, Volume2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    author: "Roy T. Bennett"
  },
  {
    text: "I learned that courage was not the absence of fear, but the triumph over it.",
    author: "Nelson Mandela"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery"
  },
  {
    text: "Little things make big days.",
    author: "Unknown"
  },
  {
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown"
  },
  {
    text: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown"
  },
  {
    text: "Dream it. Believe it. Build it.",
    author: "Unknown"
  }
];

const Index = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  const copyToClipboard = () => {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    toast.success("Quote copied to clipboard!");
  };

  const shareQuote = async () => {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Motivational Quote",
          text: text,
        });
        toast.success("Quote shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      copyToClipboard();
      toast.info("Share not supported, quote copied instead!");
    }
  };

  const speakQuote = () => {
    if ("speechSynthesis" in window) {
      const text = `${currentQuote.text}. By ${currentQuote.author}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      toast.success("Playing quote...");
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sunrise flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <Card className="w-full max-w-2xl p-8 md:p-12 backdrop-blur-sm bg-card/95 shadow-glow relative z-10 border-2 border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-warm rounded-full mb-4 shadow-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-2">
            Daily Motivation
          </h1>
          <p className="text-muted-foreground">Get inspired with powerful quotes</p>
        </div>

        <div 
          className={`my-12 transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <blockquote className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-relaxed mb-6">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-lg md:text-xl text-muted-foreground text-center font-medium">
            — {currentQuote.author}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            onClick={generateRandomQuote}
            className="flex-1 bg-gradient-warm hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow transition-all hover:scale-105"
            size="lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            New Quote
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="border-2 hover:bg-muted transition-smooth"
            size="lg"
          >
            <Copy className="w-5 h-5" />
          </Button>
          <Button
            onClick={shareQuote}
            variant="outline"
            className="border-2 hover:bg-muted transition-smooth"
            size="lg"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            onClick={speakQuote}
            variant="outline"
            className="border-2 hover:bg-muted transition-smooth"
            size="lg"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Click the buttons to copy, share, or hear the quote
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Index;
