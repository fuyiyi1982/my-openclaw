export type TokenEstimate = {
  tokens: number;
  chars: number;
  words: number;
  cjkChars: number;
};

const CJK_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;

export function estimateTokens(text: string): TokenEstimate {
  const input = text ?? "";
  const chars = input.length;
  if (!input.trim()) {
    return { tokens: 0, chars, words: 0, cjkChars: 0 };
  }
  const cjkMatches = input.match(CJK_RE) ?? [];
  const cjkChars = cjkMatches.length;
  const nonCjkChars = chars - cjkChars;

  const words = (input
    .replace(CJK_RE, " ")
    .match(/[A-Za-z0-9]+(?:[\-'_][A-Za-z0-9]+)*/g) ?? []).length;

  const tokens = Math.max(1, Math.ceil(nonCjkChars / 4) + cjkChars);

  return { tokens, chars, words, cjkChars };
}
