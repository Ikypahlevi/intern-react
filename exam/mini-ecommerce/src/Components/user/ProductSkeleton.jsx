import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-white comic-border shadow-comic flex flex-col justify-between p-3 relative h-full animate-pulse">
      <div className="w-full h-48 bg-stone-200 comic-border-sm mb-3"></div>
      
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-stone-200 rounded w-full"></div>
        <div className="h-4 bg-stone-200 rounded w-3/4"></div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-stone-200 rounded w-1/3"></div>
          <div className="h-4 bg-stone-200 rounded w-1/4"></div>
        </div>
      </div>
      
      <div className="w-full h-10 bg-stone-200 rounded mt-3 comic-border-sm"></div>
    </div>
  );
}
