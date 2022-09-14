function getSpaceVarianceScore(solution: readonly string[]) {
  const spaceCounts = solution.map(
    (line) => [...line].filter((c) => c === " ").length,
  );
  const minSpaces = Math.min(...spaceCounts);
  const maxSpaces = Math.max(...spaceCounts);
  return maxSpaces - minSpaces;
}

function getSpaceRunScore(solution: readonly string[]) {
  const spaceRuns = solution.map((line) => {
    const spaceRunLengths: number[] = [];
    const spaceRe = /[ ]+/g;
    let match;
    while ((match = spaceRe.exec(line))) {
      spaceRunLengths.push(match[0].length);
    }
    return spaceRunLengths;
  });
  const spaceRunSums = spaceRuns.map((runs) => runs.reduce((a, b) => a + b, 0));
  return Math.max(...spaceRunSums);
  // const maxSpaceRunLength = Math.max(
  //   ...spaceRuns.map((spaceRun) => Math.max(...spaceRun)),
  // );
  // return maxSpaceRunLength;
}

export default function scoreSolution(solution: readonly string[]) {
  const score =
    getSpaceVarianceScore(solution) * getSpaceRunScore(solution) ** 2;
  return score;
}
