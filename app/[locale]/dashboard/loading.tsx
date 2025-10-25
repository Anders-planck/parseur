export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated circles */}
        <div className="relative h-32 w-32">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/30 border-t-primary dark:border-primary/20 dark:border-t-primary" />

          {/* Middle ring */}
          <div
            className="absolute inset-3 animate-spin rounded-full border-4 border-primary/50 border-t-primary dark:border-primary/40 dark:border-t-primary"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          />

          {/* Inner ring */}
          <div
            className="absolute inset-6 animate-spin rounded-full border-4 border-primary/70 border-t-primary dark:border-primary/60 dark:border-t-primary"
            style={{ animationDuration: '1s' }}
          />

          {/* Center pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-pulse rounded-full bg-primary shadow-lg shadow-primary/50 dark:bg-primary/90 dark:shadow-primary/40" />
          </div>
        </div>

        {/* Animated text */}
        <div className="flex flex-col items-center gap-2">
          <p className="animate-pulse text-lg font-medium text-foreground">
            Loading
            <span className="animate-bounce inline-block">.</span>
            <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>.</span>
          </p>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-muted dark:bg-muted/50">
            <div className="h-full w-1/2 animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-primary to-transparent dark:via-primary/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
