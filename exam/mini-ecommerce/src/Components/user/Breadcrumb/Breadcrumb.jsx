import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 w-full">
      <nav className="inline-flex flex-wrap items-center gap-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] px-4 py-2 rounded-xl font-comic font-bold text-sm sm:text-base">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              {isLast ? (
                <span className="text-comic-red uppercase bg-[#fff200] px-2 py-0.5 rounded border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 leading-tight tracking-wider">
                  {item.label}
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                </span>
              ) : (
                <Link to={item.link || "#"} className="hover:text-comic-red text-[#2d2d2d] uppercase transition-colors tracking-wider">
                  {item.label}
                </Link>
              )}
              
              {!isLast && (
                <span className="text-comic-red font-black text-lg">&gt;</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
