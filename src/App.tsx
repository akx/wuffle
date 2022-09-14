import * as React from "react";
import generateSolution from "./solver/generateSolution";
import scoreSolution from "./solver/scoreSolution";
import useInterval from "./hooks/useInterval";
import { SolutionAndScore } from "./types";
import SolutionView from "./components/SolutionView";

const example =
  "aamu etana fiksu haikea ilta jakala joulu joutsen kaisla laine mainio neito omena pouta ruska sade tuuhea usva valkea aamu etana fiksu haikea ilta jakala joulu joutsen kaisla laine mainio neito omena pouta ruska sade tuuhea usva valkea";

export default function App() {
  const [input, setInput] = React.useState("");
  const [minWidth, setMinWidth] = React.useState(60);
  const [maxWidth, setMaxWidth] = React.useState(80);
  const [intraLineSort, setIntraLineSort] = React.useState(false);
  const [lineSort, setLineSort] = React.useState(false);
  const [lastError, setLastError] = React.useState<string | null>(null);
  const [bestSolutionAndScore, setBestSolutionAndScore] =
    React.useState<SolutionAndScore | null>(null);
  const [lastSolutionAndScore, setLastSolutionAndScore] =
    React.useState<SolutionAndScore | null>(null);

  const generateNext = React.useCallback(() => {
    try {
      const words = input.split(/\s+/).filter((w) => w.length > 0);
      if (!words.length) {
        throw new Error("No words");
      }
      if (minWidth === 0 || maxWidth === 0) {
        throw new Error("Either width is zero");
      }
      if (minWidth > maxWidth) {
        throw new Error("Minimum width is greater than maximum width");
      }
      const solution = generateSolution(
        words,
        minWidth,
        maxWidth,
        intraLineSort,
        lineSort,
      );
      const solutionScore = scoreSolution(solution);
      const sas: SolutionAndScore = [solution, solutionScore];
      setLastError(null);
      setLastSolutionAndScore(sas);
      setBestSolutionAndScore((prev) =>
        !prev || prev[1] > solutionScore ? sas : prev,
      );
    } catch (e) {
      setLastError(String(e));
    }
  }, [intraLineSort, lineSort, input, minWidth, maxWidth]);

  React.useEffect(() => {
    setBestSolutionAndScore(null);
    setLastSolutionAndScore(null);
  }, [intraLineSort, lineSort, input, minWidth, maxWidth]);

  useInterval(generateNext, 100);
  return (
    <div className="App">
      <h1>Aesthetic Word Wrapper</h1>
      <div>
        <h2>Setup</h2>
        <textarea
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter words to shuffle and wrap here..."
        />
        <button onClick={() => setInput(example)}>Load example words</button>
        <div className="settings">
          <label>
            Minimum Width:{" "}
            <input
              type="number"
              value={minWidth}
              onChange={(e) => setMinWidth(Number(e.target.value))}
            />
          </label>
          <label>
            Maximum Width:{" "}
            <input
              type="number"
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="settings">
          <label>
            <input
              type="checkbox"
              checked={intraLineSort}
              onChange={(e) => setIntraLineSort(e.target.checked)}
            />
            Sort words within lines
          </label>
          <label>
            <input
              type="checkbox"
              checked={lineSort}
              onChange={(e) => setLineSort(e.target.checked)}
            />
            Sort lines
          </label>
        </div>
      </div>
      <div className="sol">
        <h2>Best Solution</h2>
        {bestSolutionAndScore ? (
          <SolutionView
            solutionAndScore={bestSolutionAndScore}
            maxWidth={maxWidth}
          />
        ) : null}
      </div>
      <div className="sol">
        <h2>Last Solution</h2>
        {lastSolutionAndScore ? (
          <SolutionView
            solutionAndScore={lastSolutionAndScore}
            maxWidth={maxWidth}
          />
        ) : null}
        {lastError ? <p>{lastError}</p> : null}
      </div>
    </div>
  );
}
