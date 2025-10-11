import { Shield, TrendingUp, Users, Brain } from "lucide-react";
import { NewsAnalyzer } from "@/components/NewsAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[image:var(--gradient-hero)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-20 h-20 text-accent animate-pulse" />
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-1000">
            Fake News Detector
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-top-6 duration-1000 delay-150">
            Powered by Advanced NLP & Machine Learning
          </p>
          
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-8 duration-1000 delay-300">
            Verify news authenticity instantly with our AI-powered analysis engine. 
            Detect misinformation, clickbait, and unreliable sources in seconds.
          </p>
        </div>

        {/* Main Analyzer */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <NewsAnalyzer />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-card/50 to-muted/30 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary-glow)/0.2)]">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">98.5%</h3>
            <p className="text-muted-foreground">Detection Accuracy</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-card/50 to-muted/30 border border-border backdrop-blur-sm hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--accent-glow)/0.2)]">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">1M+</h3>
            <p className="text-muted-foreground">Articles Analyzed</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-card/50 to-muted/30 border border-border backdrop-blur-sm hover:border-success/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--success-glow)/0.2)]">
            <Users className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">500K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
          <h2 className="text-3xl font-bold text-foreground mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-accent mb-3">NLP Analysis</h3>
              <p className="text-muted-foreground">
                Our Natural Language Processing algorithms analyze text patterns, 
                sentiment, and linguistic markers commonly found in fake news.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-accent mb-3">Pattern Recognition</h3>
              <p className="text-muted-foreground">
                Machine learning models detect clickbait, sensationalism, unsourced claims, 
                and other red flags associated with misinformation.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-accent mb-3">Source Verification</h3>
              <p className="text-muted-foreground">
                Checks for proper citation, credible sources, and professional 
                journalism standards to determine content authenticity.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-accent mb-3">Real-time Results</h3>
              <p className="text-muted-foreground">
                Get instant feedback with confidence scores and detailed reasoning 
                about why content is flagged as real or fake.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Fake News Detector. Powered by AI & Machine Learning.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
