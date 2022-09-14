import * as React from "react";
import { SolutionAndScore } from "../types";

interface SolutionViewProps {
  solutionAndScore: SolutionAndScore;
  maxWidth: number;
}

export default function SolutionView({
  solutionAndScore: [solution, score],
  maxWidth,
}: SolutionViewProps) {
  return (
    <div>
      <textarea
        readOnly
        cols={maxWidth}
        rows={solution.length + 1}
        value={solution.join("\n")}
      />
      <p>
        Score: {score}
        &middot; Width: {Math.max(...solution.map((l) => l.length))}
      </p>
    </div>
  );
}
