import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react";
import { analyzeNews } from "@/lib/fakeNewsDetector";

interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  reasons: string[];
}

export const NewsAnalyzer = () => {
  const [newsText, setNewsText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const analysisResult = analyzeNews(newsText);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const getResultColor = () => {
    if (!result) return "";
    return result.isFake ? "text-destructive" : "text-success";
  };

  const getResultBorder = () => {
    if (!result) return "";
    return result.isFake
      ? "border-destructive shadow-[0_0_30px_hsl(var(--destructive-glow)/0.3)]"
      : "border-success shadow-[0_0_30px_hsl(var(--success-glow)/0.3)]";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-gradient-to-br from-card/50 to-muted/30 border-border backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Analyze News Content</h2>
          </div>

          <Textarea
            placeholder="Paste the news article or headline here..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            className="min-h-[200px] bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none text-base"
          />

          <Button
            onClick={handleAnalyze}
            disabled={!newsText.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-white font-semibold py-6 text-lg shadow-[0_0_40px_hsl(var(--primary-glow)/0.3)] hover:shadow-[0_0_50px_hsl(var(--accent-glow)/0.4)]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              "Detect Fake News"
            )}
          </Button>
        </div>
      </Card>

      {result && (
        <Card
          className={`p-8 border-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${getResultBorder()}`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {result.isFake ? (
                <AlertCircle className="w-12 h-12 text-destructive" />
              ) : (
                <CheckCircle className="w-12 h-12 text-success" />
              )}
              <div>
                <h3 className={`text-3xl font-bold ${getResultColor()}`}>
                  {result.isFake ? "Likely FAKE" : "Likely REAL"}
                </h3>
                <p className="text-muted-foreground text-lg mt-1">
                  Confidence: {Math.round(result.confidence)}%
                </p>
              </div>
            </div>

            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  result.isFake ? "bg-destructive" : "bg-success"
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            <div className="space-y-3 pt-4">
              <h4 className="text-lg font-semibold text-foreground">Analysis Details:</h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
