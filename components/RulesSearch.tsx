"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Rule {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export function RulesSearch() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filtered, setFiltered] = useState<Rule[]>([]);

  useEffect(() => {
    fetch('/api/rules')
      .then((res) => res.json())
      .then((data: Rule[]) => {
        setRules(data);
        setFiltered(data);
      })
      .catch((err) => console.error('Failed to load rules:', err));
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      rules.filter(
        (rule) =>
          rule.title.toLowerCase().includes(q) ||
          rule.content.toLowerCase().includes(q)
      )
    );
  }, [query, rules]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search rules..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {filtered.length > 0 ? (
        <ul className="space-y-2">
          {filtered.map((rule) => {
            const tag = rule.tags[0] || '';
            const href = `/rules/${tag}/${rule.slug}`;
            return (
              <li key={rule.slug}>
                <Link
                  href={href}
                  className="block p-3 border border-border rounded hover:bg-muted/50"
                >
                  <h3 className="font-semibold">{rule.title}</h3>
                  {rule.description && (
                    <p className="text-sm text-muted-foreground">
                      {rule.description}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No rules found.</p>
      )}
    </div>
  );
} 