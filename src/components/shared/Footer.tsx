import { Heart } from "lucide-react"
import { Github } from "@/components/icons"
import { Button } from "@/components/ui/glass/button"

export function Footer() {

  return (
    <footer className="w-full pb-4 bg-transparent mt-16">
      <div className="container mx-auto px-4">
        <div
          className="rounded-xl glass-bg px-4 py-6 md:px-6 md:py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-1 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span>Built by</span>
                <a
                  href="https://github.com/akshaypjoshi"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Akshay Joshi
                </a>
                <span>at</span>
                <a
                  href="https://crenspire.com"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crenspire Technologies
                </a>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span>Inspired by</span>
                <a
                  href="https://ui.shadcn.com/"
                  className="text-foreground hover:text-foreground/80 transition-colors whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadCN
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
              <Button
                variant="glass"
                size="sm"
                asChild
                className="gap-2"
              >
                <a
                  href="https://github.com/sponsors/akshaypjoshi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sponsor akshaypjoshi"
                >
                  <Heart className="h-4 w-4 fill-current" />
                  <span>Sponsor</span>
                </a>
              </Button>
              <a
                href="https://github.com/crenspire/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <span className="text-xs sm:text-sm text-muted-foreground">
                The source code is available on GitHub.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

