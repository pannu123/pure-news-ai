// Simple NLP-based fake news detection using keyword analysis and sentiment patterns
// This is a basic implementation for demonstration. For production, integrate with ML models.

interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  reasons: string[];
}

const fakeNewsIndicators = [
  'shocking', 'unbelievable', 'you won\'t believe', 'doctors hate',
  'miracle cure', 'they don\'t want you to know', 'secret revealed',
  'breaking', 'exclusive', 'leaked', 'conspiracy', 'cover-up',
  'wake up', 'sheeple', 'mainstream media', 'fake news',
];

const clickbaitPatterns = [
  /(\d+)\s+(shocking|amazing|unbelievable|surprising)/i,
  /(what|how|why)\s+[^.!?]{10,}\s+will\s+(shock|amaze|surprise)/i,
  /you\s+won't\s+believe/i,
  /doctors\s+hate/i,
  /number\s+\d+\s+will/i,
];

const sensationalWords = [
  'explosive', 'bombshell', 'devastating', 'alarming', 'terrifying',
  'shocking', 'outrageous', 'unbelievable', 'scandal', 'crisis',
];

const allCapsPattern = /\b[A-Z]{4,}\b/g;
const excessivePunctuation = /[!?]{2,}/g;
const suspiciousNumbers = /\d{2,}%|\$\d+\s*(million|billion|trillion)/gi;

export function analyzeNews(text: string): AnalysisResult {
  const lowerText = text.toLowerCase();
  const words = text.split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  let fakeScore = 0;
  const reasons: string[] = [];
  const maxScore = 100;

  // Check for fake news indicator keywords (weight: 20)
  const foundIndicators = fakeNewsIndicators.filter(indicator => 
    lowerText.includes(indicator)
  );
  if (foundIndicators.length > 0) {
    const indicatorScore = Math.min(foundIndicators.length * 5, 20);
    fakeScore += indicatorScore;
    reasons.push(`Contains ${foundIndicators.length} fake news indicator word(s): "${foundIndicators.slice(0, 3).join('", "')}"`);
  }

  // Check for clickbait patterns (weight: 15)
  const matchedPatterns = clickbaitPatterns.filter(pattern => pattern.test(text));
  if (matchedPatterns.length > 0) {
    fakeScore += 15;
    reasons.push('Uses clickbait-style headlines common in misinformation');
  }

  // Check for excessive sensational words (weight: 15)
  const sensationalCount = sensationalWords.filter(word => 
    lowerText.includes(word)
  ).length;
  if (sensationalCount >= 3) {
    fakeScore += 15;
    reasons.push(`Contains ${sensationalCount} sensational words designed to provoke emotion`);
  }

  // Check for excessive ALL CAPS (weight: 10)
  const capsMatches = text.match(allCapsPattern);
  if (capsMatches && capsMatches.length > 3) {
    fakeScore += 10;
    reasons.push('Excessive use of ALL CAPS text, common in sensationalized content');
  }

  // Check for excessive punctuation (weight: 10)
  const punctuationMatches = text.match(excessivePunctuation);
  if (punctuationMatches && punctuationMatches.length > 2) {
    fakeScore += 10;
    reasons.push('Excessive exclamation marks or question marks indicating sensationalism');
  }

  // Check for suspicious statistics without sources (weight: 15)
  const numberMatches = text.match(suspiciousNumbers);
  const hasStatistics = numberMatches && numberMatches.length > 0;
  const hasSources = /according to|source|study|research|report/i.test(text);
  if (hasStatistics && !hasSources) {
    fakeScore += 15;
    reasons.push('Contains statistics or claims without citing sources');
  }

  // Check sentence structure (weight: 10)
  const avgSentenceLength = words.length / sentences.length;
  if (avgSentenceLength < 8) {
    fakeScore += 10;
    reasons.push('Very short sentences may indicate lack of detailed, factual reporting');
  }

  // Check for vague sources (weight: 5)
  if (/sources say|insiders claim|anonymous|reportedly|allegedly/i.test(text)) {
    fakeScore += 5;
    reasons.push('Uses vague attribution (e.g., "sources say", "allegedly") without specifics');
  }

  // Positive indicators of real news
  if (/published|journalist|reporter|editor|newspaper|press/i.test(text)) {
    fakeScore -= 10;
    reasons.push('Contains professional journalism terminology');
  }

  if (hasSources) {
    fakeScore -= 15;
    reasons.push('Cites sources or references studies/reports');
  }

  if (text.length > 500 && avgSentenceLength > 12) {
    fakeScore -= 10;
    reasons.push('Detailed, well-structured content with proper sentence length');
  }

  // Calculate final confidence
  fakeScore = Math.max(0, Math.min(maxScore, fakeScore));
  const isFake = fakeScore >= 40;
  
  // Adjust confidence based on score
  let confidence: number;
  if (isFake) {
    confidence = 50 + (fakeScore / 2); // 50-100% for fake news
  } else {
    confidence = 50 + ((maxScore - fakeScore) / 2); // 50-100% for real news
  }

  // Add summary reason
  if (reasons.length === 0) {
    reasons.push('Content appears neutral with balanced language and structure');
  }

  return {
    isFake,
    confidence: Math.round(confidence),
    reasons: reasons.slice(0, 5), // Limit to top 5 reasons
  };
}
