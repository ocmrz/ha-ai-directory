import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { RulesSidebarItem } from './RulesSidebarItem';

type Tag = {
  slug: string;
  name: string;
  count?: number;
};

async function getRulesTags() {
  try {
    const rulesDirectory = path.join(process.cwd(), 'rules');
    const fileNames = fs.readdirSync(rulesDirectory).filter(file => file.endsWith('.md'));
    
    const tagsYamlPath = path.join(rulesDirectory, 'tags.yaml');
    const tagsYamlContent = fs.readFileSync(tagsYamlPath, 'utf8');
    const tagsList = yaml.load(tagsYamlContent) as Tag[];
    
    const tagsMap = new Map<string, Tag>();
    tagsList.forEach(tag => tagsMap.set(tag.slug, tag));
    
    const tagCounts = new Map<string, number>();
    
    const uniqueTags = new Set<string>();
    
    fileNames.forEach(fileName => {
      const filePath = path.join(rulesDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => {
          uniqueTags.add(tag);
          // Increment tag count
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      }
    });
    
    // Check if all tags exist in tags.yaml
    const validTags: Tag[] = [];
    const missingTags: string[] = [];
    
    uniqueTags.forEach(tag => {
      if (tagsMap.has(tag)) {
        const tagData = tagsMap.get(tag)!;
        // Add count to tag data
        validTags.push({
          ...tagData,
          count: tagCounts.get(tag) || 0
        });
      } else {
        missingTags.push(tag);
      }
    });
    
    if (missingTags.length > 0) {
      throw new Error(`Tags found in markdown but not defined in tags.yaml: ${missingTags.join(', ')}`);
    }
    
    return { tags: validTags };
  } catch (err) {
    console.error('Error loading tags:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

async function RulesSidebar() {
  const { tags, error } = await getRulesTags();

  if (error) {
    return (
      <nav className="w-64 h-full bg-background p-4 shrink-0">
        <div className="text-destructive text-sm">
          <h3 className="font-bold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      </nav>
    );
  }

  const sortedTags = tags ? [...tags].sort((a, b) => (b.count || 0) - (a.count || 0)) : null;

  return (
    <nav className="w-64 bg-neutral-900 shrink-0 border-r h-[calc(100vh-68px)]">
      {sortedTags && sortedTags.map(tag => (
        <RulesSidebarItem key={tag.slug} slug={tag.slug} count={tag.count || 0}>{tag.name}</RulesSidebarItem>
      ))}
      {!tags && !error && (
        <div className="p-4 text-muted-foreground text-sm">No tags found</div>
      )}
    </nav>
  )
}

export {
    RulesSidebar
}
