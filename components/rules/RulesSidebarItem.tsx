"use client";

import { usePathname } from 'next/navigation';

interface RulesSidebarItemProps {
  children: React.ReactNode;
  slug: string;
}

export function RulesSidebarItem({ children, slug }: RulesSidebarItemProps) {
  const pathname = usePathname();
  const isCurrentPage = pathname.startsWith(`/rules/${slug}`);
  
  return (
    <a 
      href={`/rules/${slug}`} 
      className={`block px-6 py-3 cursor-pointer hover:bg-secondary transition duration-150 font-medium text-sm ${!isCurrentPage ? 'opacity-30' : ''}`}
    >
      {children}
    </a>
  );
}
