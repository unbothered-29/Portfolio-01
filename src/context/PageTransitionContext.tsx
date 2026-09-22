import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export interface TransitionOptions {
  title: string;
  subtitle?: string;
  category?: string;
  onMidpoint?: () => void;
  onComplete?: () => void;
}

interface PageTransitionContextType {
  isTransitioning: boolean;
  phase: "idle" | "entering" | "peak" | "exiting";
  title: string;
  subtitle: string;
  category: string;
  triggerTransition: (options: TransitionOptions) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [phase, setPhase] = useState<"idle" | "entering" | "peak" | "exiting">("idle");
  const [title, setTitle] = useState<string>("JESSICAA CHAUHAN");
  const [subtitle, setSubtitle] = useState<string>("Frontend Developer & Creative Engineer");
  const [category, setCategory] = useState<string>("PORTFOLIO 2026");

  // Keep ref to avoid stale closure in timeout callbacks
  const activeCallbacks = useRef<{ onMidpoint?: () => void; onComplete?: () => void }>({});

  const triggerTransition = useCallback((options: TransitionOptions) => {
    // If already transitioning, don't re-trigger concurrently
    if (isTransitioning) return;

    setTitle(options.title);
    setSubtitle(options.subtitle || "");
    setCategory(options.category || "SECTION TRANSITION");
    activeCallbacks.current = {
      onMidpoint: options.onMidpoint,
      onComplete: options.onComplete,
    };

    setIsTransitioning(true);
    setPhase("entering");

    // Timeline Phase 1 -> Phase 2 (Peak veil reached)
    // Curtains drop in ~420ms
    setTimeout(() => {
      setPhase("peak");
      // Fire midpoint action (scroll or state change) while veiled
      if (activeCallbacks.current.onMidpoint) {
        try {
          activeCallbacks.current.onMidpoint();
        } catch (err) {
          console.error("Error in onMidpoint callback:", err);
        }
      }

      // Timeline Phase 2 -> Phase 3 (Exit curtains up/down)
      setTimeout(() => {
        setPhase("exiting");

        // Timeline Phase 3 -> Finished
        setTimeout(() => {
          setPhase("idle");
          setIsTransitioning(false);
          if (activeCallbacks.current.onComplete) {
            try {
              activeCallbacks.current.onComplete();
            } catch (err) {
              console.error("Error in onComplete callback:", err);
            }
          }
        }, 550); // exit duration
      }, 480); // peak display duration
    }, 450); // enter curtain duration
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        phase,
        title,
        subtitle,
        category,
        triggerTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}
