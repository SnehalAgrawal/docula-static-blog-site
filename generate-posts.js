const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUT_FILE = path.join(POSTS_DIR, 'posts.json');

function extractTitle(markdown) {
  // Try to extract the first top-level heading as title
  const match = markdown.match(new RegExp('^#\\s+(.+)$', 'm'));
  return match ? match[1].trim() : 'Untitled Post';
}

function generatePostList() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      return {
        title: extractTitle(content),
        file: filename
      };
    });

  fs.writeFileSync(OUT_FILE, JSON.stringify(files, null, 2), 'utf8');
  console.log(`✅ Generated posts.json with ${files.length} posts`);
}

generatePostList();
