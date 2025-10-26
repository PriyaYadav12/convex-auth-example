import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Id } from "../../convex/_generated/dataModel";

export function Message({
  authorName,
  author,
  viewer,
  children,
}: {
  authorName: string;
  author: Id<"users">;
  viewer: Id<"users">;
  children: ReactNode;
}) {
  const isViewer = author === viewer;
  
  return (
    <li
      className={cn(
        "flex flex-col text-base mb-4 bounce-in",
        isViewer ? "items-end self-end" : "items-start self-start",
      )}
    >
      <div className={cn(
        "flex items-center gap-2 mb-2",
        isViewer ? "flex-row-reverse" : "flex-row"
      )}>
        <div className="text-lg">
          {isViewer ? '👤' : '👥'}
        </div>
        <div className={cn(
          "text-sm font-bold px-3 py-1 rounded-full",
          isViewer ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {authorName}
        </div>
      </div>
      <div
        className={cn(
          "playful-border px-4 py-3 text-lg font-medium shadow-lg max-w-xs md:max-w-md",
          isViewer 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground",
          isViewer ? "rounded-tr-none" : "rounded-tl-none",
        )}
      >
        {children}
      </div>
      <div className={cn(
        "text-xs text-muted-foreground mt-1",
        isViewer ? "text-right" : "text-left"
      )}>
        {isViewer ? '✨ Your story' : '🌟 Friend\'s story'}
      </div>
    </li>
  );
}
