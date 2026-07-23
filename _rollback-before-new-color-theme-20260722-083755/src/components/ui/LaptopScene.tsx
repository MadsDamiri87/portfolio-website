import { useEffect, useMemo, useState, type CSSProperties } from "react";
import heroSceneImage from "../../assets/images/hero-clean-scene-bg-extra-wide.webp";

type CodeTone = "kw" | "type" | "fn" | "str" | "plain";
type CodeToken = [CodeTone, string];
type CodeLine = {
  tokens: CodeToken[];
};

const VISIBLE_LINES = 9;
const TYPE_DELAY = 58;
const LINE_DELAY = 260;

const codeLines: CodeLine[] = [
  {
    tokens: [
      ["kw", "public"],
      ["plain", " "],
      ["kw", "class"],
      ["plain", " PortfolioService"],
    ],
  },
  {
    tokens: [
      ["plain", "{"],
      ["plain", " "],
      ["kw", "private readonly"],
      ["plain", " IProjectRepo _repo;"],
    ],
  },
  {
    tokens: [
      ["kw", "public"],
      ["plain", " "],
      ["fn", "PortfolioService"],
      ["plain", "(IProjectRepo repo)"],
    ],
  },
  {
    tokens: [["plain", "  => _repo = repo;"]],
  },
  {
    tokens: [
      ["kw", "public async"],
      ["plain", " Task<"],
      ["type", "Result"],
      ["plain", "> "],
      ["fn", "BuildAsync"],
      ["plain", "()"],
    ],
  },
  {
    tokens: [
      ["plain", "{"],
    ],
  },
  {
    tokens: [
      ["plain", "  "],
      ["kw", "var"],
      ["plain", " projects = "],
      ["kw", "await"],
      ["plain", " _repo."],
      ["fn", "GetFeaturedAsync"],
      ["plain", "();"],
    ],
  },
  {
    tokens: [
      ["plain", "  "],
      ["kw", "var"],
      ["plain", " viewModel = "],
      ["kw", "new"],
      ["plain", " "],
      ["type", "PortfolioViewModel"],
      ["plain", "();"],
    ],
  },
  {
    tokens: [
      ["plain", "  "],
      ["kw", "foreach"],
      ["plain", " ("],
      ["kw", "var"],
      ["plain", " project "],
      ["kw", "in"],
      ["plain", " projects)"],
    ],
  },
  {
    tokens: [
      ["plain", "  {"],
    ],
  },
  {
    tokens: [
      ["plain", "    viewModel."],
      ["fn", "Add"],
      ["plain", "("],
      ["kw", "new"],
      ["plain", " "],
      ["type", "ProjectCard"],
      ["plain", "("],
    ],
  },
  {
    tokens: [
      ["plain", "      project.Title,"],
    ],
  },
  {
    tokens: [
      ["plain", "      "],
      ["str", '"Clean architecture"'],
      ["plain", ","],
    ],
  },
  {
    tokens: [
      ["plain", "      project."],
      ["fn", "GetTechStack"],
      ["plain", "()));"],
    ],
  },
  {
    tokens: [
      ["plain", "  }"],
    ],
  },
  {
    tokens: [
      ["plain", "  "],
      ["kw", "return"],
      ["plain", " "],
      ["kw", "new"],
      ["plain", " "],
      ["type", "Result"],
      ["plain", "(viewModel);"],
    ],
  },
  {
    tokens: [
      ["plain", "}"],
    ],
  },
  {
    tokens: [
      ["kw", "private static"],
      ["plain", " "],
      ["type", "Theme"],
      ["plain", " "],
      ["fn", "ResolveTheme"],
      ["plain", "()"],
    ],
  },
  {
    tokens: [
      ["plain", "  => "],
      ["kw", "new"],
      ["plain", "("],
      ["str", '"Midnight blue"'],
      ["plain", ", "],
      ["str", '"Amber glow"'],
      ["plain", ");"],
    ],
  },
];

function getLineText(line: CodeLine) {
  return line.tokens.map(([, text]) => text).join("");
}

function renderTokens(tokens: CodeToken[], visibleChars: number) {
  let remainingChars = visibleChars;

  return tokens.map(([tone, text], tokenIndex) => {
    if (remainingChars <= 0) {
      return null;
    }

    const visibleText = text.slice(0, remainingChars);
    remainingChars -= text.length;

    return (
      <span className={`code-token code-token--${tone}`} key={tokenIndex}>
        {visibleText}
      </span>
    );
  });
}

export function LaptopScene() {
  const lineTexts = useMemo(() => codeLines.map(getLineText), []);
  const [activeLine, setActiveLine] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const currentLineLength = lineTexts[activeLine % lineTexts.length].length;
    const timeout = window.setTimeout(
      () => {
        if (visibleChars < currentLineLength) {
          setVisibleChars((chars) => chars + 1);
          return;
        }

        setActiveLine((line) => line + 1);
        setVisibleChars(0);
      },
      visibleChars < currentLineLength ? TYPE_DELAY : LINE_DELAY,
    );

    return () => window.clearTimeout(timeout);
  }, [activeLine, lineTexts, visibleChars]);

  const firstVisibleLine = Math.max(0, activeLine - VISIBLE_LINES + 1);
  const visibleLineNumbers = Array.from(
    { length: activeLine - firstVisibleLine + 1 },
    (_, index) => firstVisibleLine + index,
  );

  return (
    <div className="laptop-scene-frame" aria-hidden="true">
      <div className="laptop-scene" aria-hidden="true">
        <img className="laptop-scene__image" src={heroSceneImage} alt="" />
      </div>
      <div className="laptop-screen-code">
        <div className="laptop-screen-code__bar">
          <span className="vscode-window-dot vscode-window-dot--red" />
          <span className="vscode-window-dot vscode-window-dot--yellow" />
          <span className="vscode-window-dot vscode-window-dot--green" />
          <span className="vscode-tab">PortfolioService.cs</span>
        </div>
        <div className="vscode-activity-rail">
          <span />
          <span />
          <span />
        </div>
        <div className="laptop-screen-code__body">
          {visibleLineNumbers.map((lineNumber) => {
            const line = codeLines[lineNumber % codeLines.length];
            const isActiveLine = lineNumber === activeLine;
            const lineText = lineTexts[lineNumber % lineTexts.length];

            return (
              <div
                className={`code-line${isActiveLine ? " code-line--active" : ""}`}
                key={lineNumber}
                style={
                  {
                    "--chars": lineText.length,
                  } as CSSProperties
                }
              >
                <span className="code-line__number">{lineNumber + 1}</span>
                <span className="code-line__content">
                  {renderTokens(line.tokens, isActiveLine ? visibleChars : lineText.length)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
