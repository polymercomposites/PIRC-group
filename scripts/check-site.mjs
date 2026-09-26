import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const projectPath = '/PIRC-group/';
const errors = [];
const warnings = [];

const publicPages = [
  'index.html',
  'pi.html',
  'members.html',
  'research.html',
  'publications.html',
  'funding.html',
  'news.html',
  'gallery.html',
  'contact.html'
];

const requiredFiles = [
  ...publicPages,
  '404.html',
  'style.css',
  'pages.css',
  'enhancements.css',
  'main.js',
  'data/members.json',
  'data/publications.json',
  'data/news.json',
  'favicon.svg',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml'
];

function error(message) {
  errors.push(message);
}

function warning(message) {
  warnings.push(message);
}

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8');
}

function resolveLocalReference(fromFile, rawReference) {
  let reference = rawReference.trim();

  if (
    !reference ||
    reference.startsWith('#') ||
    /^(?:https?:)?\/\//i.test(reference) ||
    /^(?:mailto|tel|data|javascript):/i.test(reference)
  ) {
    return null;
  }

  reference = reference.split('#')[0].split('?')[0];
  if (!reference) return null;

  if (reference.startsWith(projectPath)) {
    reference = reference.slice(projectPath.length);
  } else if (reference.startsWith('/')) {
    return null;
  }

  if (!reference || reference === './') return 'index.html';

  const fromDirectory = path.dirname(fromFile);
  return path.normalize(path.join(fromDirectory, reference));
}

function collectHtmlFiles(directory = root, prefix = '') {
  const files = [];
  for (const entry of readdirSync(directory)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const absolute = path.join(directory, entry);
    const relative = path.join(prefix, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      files.push(...collectHtmlFiles(absolute, relative));
    } else if (entry.endsWith('.html')) {
      files.push(relative);
    }
  }
  return files;
}

for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) error(`Missing required file: ${file}`);
}

const htmlFiles = collectHtmlFiles();

for (const htmlFile of htmlFiles) {
  const html = read(htmlFile);
  const references = [...html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const rawReference of references) {
    const resolved = resolveLocalReference(htmlFile, rawReference);
    if (!resolved) continue;
    const absolute = path.join(root, resolved);
    if (!existsSync(absolute)) {
      error(`${htmlFile}: broken local reference "${rawReference}" -> ${resolved}`);
    }
  }

  const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) error(`${htmlFile}: duplicate id="${id}"`);
    seen.add(id);
  }

  if (!/<h1\b/i.test(html)) error(`${htmlFile}: missing <h1>`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) error(`${htmlFile}: missing viewport meta tag`);
}

for (const page of publicPages) {
  const html = read(page);
  if (!/<link\s+rel=["']canonical["']/i.test(html)) error(`${page}: missing canonical URL`);
  if (!/<meta\s+name=["']description["']/i.test(html)) error(`${page}: missing meta description`);
  if (!/property=["']og:title["']/i.test(html)) error(`${page}: missing Open Graph title`);
}

try {
  const members = JSON.parse(read('data/members.json'));
  if (!Array.isArray(members) || members.length === 0) {
    error('data/members.json: expected a non-empty array');
  } else {
    members.forEach((member, index) => {
      const label = `data/members.json[${index}]`;
      for (const field of ['name', 'role', 'research', 'affiliation']) {
        if (!member[field] || typeof member[field] !== 'string') error(`${label}: missing or invalid ${field}`);
      }
      if (member.image) {
        const imagePath = path.join(root, member.image);
        if (!existsSync(imagePath)) error(`${label}: image not found: ${member.image}`);
      }
    });
  }
} catch (err) {
  error(`data/members.json: invalid JSON (${err.message})`);
}

try {
  const publications = JSON.parse(read('data/publications.json'));
  if (!Array.isArray(publications) || publications.length === 0) {
    error('data/publications.json: expected a non-empty array');
  } else {
    publications.forEach((publication, index) => {
      const label = `data/publications.json[${index}]`;
      for (const field of ['title', 'authors', 'journal', 'doi']) {
        if (!publication[field] || typeof publication[field] !== 'string') error(`${label}: missing or invalid ${field}`);
      }
      if (!Number.isInteger(publication.year)) error(`${label}: year must be an integer`);
      if (publication.doi && !/^https:\/\/doi\.org\//i.test(publication.doi)) {
        error(`${label}: DOI must use https://doi.org/...`);
      }
    });
  }
} catch (err) {
  error(`data/publications.json: invalid JSON (${err.message})`);
}

try {
  const news = JSON.parse(read('data/news.json'));
  if (!Array.isArray(news) || news.length === 0) {
    error('data/news.json: expected a non-empty array');
  } else {
    news.forEach((item, index) => {
      const label = `data/news.json[${index}]`;
      for (const field of ['date', 'label', 'title', 'summary']) {
        if (!item[field] || typeof item[field] !== 'string') error(`${label}: missing or invalid ${field}`);
      }
      if (!/^\d{4}-\d{2}(?:-\d{2})?$/.test(item.date || '')) error(`${label}: date must use YYYY-MM or YYYY-MM-DD`);
      if (item.url !== null && item.url !== undefined && !/^https:\/\//i.test(item.url)) {
        error(`${label}: url must be null or an https URL`);
      }
    });
  }
} catch (err) {
  error(`data/news.json: invalid JSON (${err.message})`);
}

const sitemap = read('sitemap.xml');
for (const page of publicPages) {
  const expected = page === 'index.html'
    ? 'https://polymercomposites.github.io/PIRC-group/'
    : `https://polymercomposites.github.io/PIRC-group/${page}`;
  if (!sitemap.includes(`<loc>${expected}</loc>`)) error(`sitemap.xml: missing ${expected}`);
}

const robots = read('robots.txt');
if (!robots.includes('https://polymercomposites.github.io/PIRC-group/sitemap.xml')) {
  error('robots.txt: sitemap URL is missing or incorrect');
}

function walkImages(directory = root, prefix = '') {
  for (const entry of readdirSync(directory)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const absolute = path.join(directory, entry);
    const relative = path.join(prefix, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      walkImages(absolute, relative);
    } else if (/\.(?:jpe?g|png|webp)$/i.test(entry) && stat.size > 750_000) {
      warning(`${relative}: ${(stat.size / 1024 / 1024).toFixed(2)} MB image; consider optimizing it`);
    }
  }
}
walkImages();

for (const message of warnings) console.warn(`WARN: ${message}`);

if (errors.length > 0) {
  console.error(`\nSite check failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Site check passed: ${htmlFiles.length} HTML files, ${publicPages.length} indexed pages, structured data validated.`);
if (warnings.length > 0) console.log(`${warnings.length} non-blocking warning${warnings.length === 1 ? '' : 's'} reported.`);
