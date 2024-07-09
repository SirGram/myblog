import Markdown from "react-markdown";
import {
  materialLight,
  pojoaque,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "@/context/theme-provider";

export default function AdjustedMarkdown({ children }: { children: string }) {
  const { theme } = useTheme();
  const currentTheme =
    theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <Markdown
      className={"font-roboto"}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...(rest as any)}
              style={currentTheme === "dark" ? pojoaque : materialLight}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
