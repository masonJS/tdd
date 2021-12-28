export function refineText(s: string, options?: Record<string, string[]>) {
  s = s.replace("   ", " ").replace("\t", " ").replace("  ", " ");

  if (options) {
    for (const bannedWord of options.bannedWords) {
      s = s.replace(bannedWord, "*".repeat(bannedWord.length));
    }
  }

  return s;
}
