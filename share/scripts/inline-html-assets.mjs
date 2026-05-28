#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.avif': 'image/avif',
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
};

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const positional = args.filter((arg) => !arg.startsWith('--'));

if (positional.length < 1 || flags.has('--help')) {
  console.error('Usage: inline-html-assets.mjs <input.html> [output.html] [--check-only] [--inline-remote-css] [--keep-font-links]');
  process.exit(flags.has('--help') ? 0 : 1);
}

const inputPath = path.resolve(positional[0]);
const outputPath = positional[1] ? path.resolve(positional[1]) : defaultOutputPath(inputPath);
const rootDir = path.dirname(inputPath);
const checkOnly = flags.has('--check-only');
const inlineRemoteCss = flags.has('--inline-remote-css');
const keepFontLinks = flags.has('--keep-font-links');
const skipped = [];
const inlined = [];

let html = fs.readFileSync(inputPath, 'utf8');

function defaultOutputPath(filePath) {
  const parsed = path.parse(filePath);
  return path.join(parsed.dir, `${parsed.name}-inline${parsed.ext || '.html'}`);
}

function isSkippable(value) {
  if (!value) return true;
  const trimmed = value.trim();
  return (
    trimmed.startsWith('#') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('about:')
  );
}

function isRemote(value) {
  return /^https?:\/\//i.test(value) || /^\/\//.test(value);
}

function isFileLikeReference(value) {
  return /\.(avif|gif|ico|jpe?g|json|m4a|mp3|mp4|otf|pdf|png|svg|ttf|webm|webp|woff2?|xml)([?#].*)?$/i.test(value);
}

function stripHashAndQuery(value) {
  const queryIndex = value.search(/[?#]/);
  return queryIndex === -1 ? value : value.slice(0, queryIndex);
}

function resolveLocal(ref, baseDir) {
  const cleanRef = decodeURIComponent(stripHashAndQuery(ref));
  if (!cleanRef || cleanRef.startsWith('/')) return null;
  return path.resolve(baseDir, cleanRef);
}

function toDataUri(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

function inlineCssUrls(css, cssDir) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, quote, rawUrl) => {
    const ref = rawUrl.trim();
    if (isSkippable(ref) || isRemote(ref)) return match;
    const assetPath = resolveLocal(ref, cssDir);
    if (!assetPath || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
      skipped.push({ type: 'css-url', ref, reason: 'not found' });
      return match;
    }
    inlined.push({ type: 'css-url', ref });
    return `url("${toDataUri(assetPath)}")`;
  });
}

function inlineSrcset(value, baseDir) {
  return value.split(',').map((candidate) => {
    const trimmed = candidate.trim();
    if (!trimmed) return candidate;
    const parts = trimmed.split(/\s+/);
    const ref = parts[0];
    if (isSkippable(ref) || isRemote(ref)) return trimmed;
    const assetPath = resolveLocal(ref, baseDir);
    if (!assetPath || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
      skipped.push({ type: 'srcset', ref, reason: 'not found' });
      return trimmed;
    }
    inlined.push({ type: 'srcset', ref });
    return [toDataUri(assetPath), ...parts.slice(1)].join(' ');
  }).join(', ');
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function inlineStylesheets(source) {
  const linkPattern = /<link\b([^>]*?)\bhref=(["'])([^"']+)\2([^>]*)>/gi;
  let result = '';
  let lastIndex = 0;
  for (const match of source.matchAll(linkPattern)) {
    const [full, before, quote, href, after] = match;
    const attrs = `${before} ${after}`;
    result += source.slice(lastIndex, match.index);
    lastIndex = match.index + full.length;

    const relMatch = attrs.match(/\brel=(["'])(.*?)\1/i);
    const rel = relMatch ? relMatch[2].toLowerCase() : '';
    const isStylesheet = rel.split(/\s+/).includes('stylesheet');
    const isPreconnect = rel.split(/\s+/).includes('preconnect');

    if (!keepFontLinks && (href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com')) && (isStylesheet || isPreconnect)) {
      skipped.push({ type: 'font-link', ref: href, reason: 'removed remote font dependency' });
      continue;
    }

    if (!isStylesheet) {
      result += full;
      continue;
    }

    if (isRemote(href)) {
      if (!inlineRemoteCss) {
        result += full;
        skipped.push({ type: 'stylesheet', ref: href, reason: 'remote stylesheet preserved' });
        continue;
      }
      try {
        const css = await fetchText(href);
        result += `<style>\n${css}\n</style>`;
        inlined.push({ type: 'remote-stylesheet', ref: href });
      } catch (error) {
        result += full;
        skipped.push({ type: 'stylesheet', ref: href, reason: error.message });
      }
      continue;
    }

    const cssPath = resolveLocal(href, rootDir);
    if (!cssPath || !fs.existsSync(cssPath) || !fs.statSync(cssPath).isFile()) {
      result += full;
      skipped.push({ type: 'stylesheet', ref: href, reason: 'not found' });
      continue;
    }

    const css = fs.readFileSync(cssPath, 'utf8');
    result += `<style>\n${inlineCssUrls(css, path.dirname(cssPath))}\n</style>`;
    inlined.push({ type: 'stylesheet', ref: href });
  }
  return result + source.slice(lastIndex);
}

function inlineScripts(source) {
  return source.replace(/<script\b([^>]*?)\bsrc=(["'])([^"']+)\2([^>]*)>\s*<\/script>/gi, (full, before, quote, src, after) => {
    if (isSkippable(src) || isRemote(src)) {
      if (isRemote(src)) skipped.push({ type: 'script', ref: src, reason: 'remote script preserved' });
      return full;
    }
    const scriptPath = resolveLocal(src, rootDir);
    if (!scriptPath || !fs.existsSync(scriptPath) || !fs.statSync(scriptPath).isFile()) {
      skipped.push({ type: 'script', ref: src, reason: 'not found' });
      return full;
    }
    const js = fs.readFileSync(scriptPath, 'utf8');
    inlined.push({ type: 'script', ref: src });
    return `<script${before}${after}>\n${js}\n</script>`;
  });
}

function inlineGenericAttrs(source) {
  return source
    .replace(/\b(src|poster|content|href)=(["'])([^"']+)\2/gi, (full, attr, quote, value) => {
      const lowerAttr = attr.toLowerCase();
      if (isSkippable(value) || isRemote(value)) return full;
      if ((lowerAttr === 'href' || lowerAttr === 'content') && !isFileLikeReference(value)) {
        return full;
      }
      const assetPath = resolveLocal(value, rootDir);
      if (!assetPath || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
        skipped.push({ type: lowerAttr, ref: value, reason: 'not found' });
        return full;
      }
      inlined.push({ type: lowerAttr, ref: value });
      return `${attr}=${quote}${toDataUri(assetPath)}${quote}`;
    })
    .replace(/\bsrcset=(["'])([^"']+)\1/gi, (full, quote, value) => `srcset=${quote}${inlineSrcset(value, rootDir)}${quote}`);
}

function collectRemainingRefs(source) {
  const refs = [];
  for (const match of source.matchAll(/\b(?:src|href|poster|content|srcset)=(["'])([^"']+)\1/gi)) {
    const attrMatch = match[0].match(/^(\w+)=/i);
    const attr = attrMatch ? attrMatch[1].toLowerCase() : '';
    const value = match[2];
    if (isSkippable(value) || isRemote(value)) continue;
    if ((attr === 'href' || attr === 'content') && !isFileLikeReference(value)) continue;
    refs.push(value);
  }
  for (const match of source.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)) {
    const value = match[2].trim();
    if (isSkippable(value) || isRemote(value)) continue;
    refs.push(value);
  }
  return refs;
}

html = await inlineStylesheets(html);
html = inlineScripts(html);
html = inlineGenericAttrs(html);

const remainingLocalReferences = collectRemainingRefs(html);
const summary = {
  input: inputPath,
  output: outputPath,
  bytes: Buffer.byteLength(html),
  inlinedCount: inlined.length,
  skipped,
  remainingLocalReferences,
};

if (!checkOnly) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

console.log(JSON.stringify(summary, null, 2));

if (remainingLocalReferences.length) {
  process.exitCode = 2;
}
