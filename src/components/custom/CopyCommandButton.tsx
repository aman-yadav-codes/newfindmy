"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommandButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      aria-label="Copy installation command to clipboard"
      className="glass-bg max-w-xl mx-auto flex items-center justify-between gap-3 px-5 py-3 font-mono text-sm rounded-xl w-full cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleCopy}
    >
      <code className="text-foreground/70 truncate select-all">{command}</code>
      {copied ? (
        <Check className="h-4 w-4 text-green-500 shrink-0" />
      ) : (
        <Copy className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </button>
  );
}
