import shuffle from "./shuffle";

function addSpaces(wordLines: readonly string[][]): string[] {
  const origMaxLen = Math.max(
    ...wordLines.map((line) => line.join(" ").length),
  );
  return wordLines.map((wline, y) => {
    wline = [...wline];
    for (let i = 0; i < 1000; i++) {
      const line = wline.join(" ").trim();
      if (line.length >= origMaxLen) return line;
      wline[(y + i) % (wline.length - 1)] += " ";
    }
    throw new Error("Failed to generate solution");
  });
}

export default function generateSolution(
  words: readonly string[],
  minWidth: number,
  maxWidth: number,
  intraLineSort: boolean,
  lineSort: boolean,
): string[] {
  const wordLines: string[][] = [];
  const shuffledWords = shuffle(words);
  while (shuffledWords.length) {
    const line: string[] = [];
    while (line.join(" ").length < minWidth) {
      const word = shuffledWords.shift();
      if (!word) break;
      if ([...line, word].join(" ").length > maxWidth) {
        shuffledWords.push(word);
        break;
      }
      line.push(word);
    }
    if (intraLineSort) line.sort();
    wordLines.push(line);
  }
  const wrappedLines = addSpaces(wordLines);
  if (lineSort) {
    wrappedLines.sort();
  }
  return wrappedLines;
}
