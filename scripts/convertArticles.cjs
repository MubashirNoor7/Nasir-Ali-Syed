const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

function cleanHtmlContent(html) {
  if (!html) return '';
  let text = html.replace(/<img[^>]*>/gi, '');
  text = text.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/(p|div|h2|h3|h4|li)>/gi, '\n\n');
  text = text.replace(/<[^>]*>/g, '');
  text = text.replace(/\t+/g, ' ');
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/&#038;/g, '&');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/\n\s*\n\s*\n+/g, '\n\n');

  // Split by lines and filter out lines containing only social media keywords or common icons
  const lines = text.split(/\r?\n/);
  const cleanedLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const normalized = trimmed.toLowerCase();
    if (
      normalized === 'facebook' ||
      normalized === 'youtube' ||
      normalized === 'twitter' ||
      normalized === 'instagram' ||
      normalized === 'whatsapp' ||
      normalized === 'linkedin' ||
      normalized === 'share' ||
      normalized === 'sharing'
    ) {
      continue;
    }
    cleanedLines.push(line);
  }
  return cleanedLines.join('\n').trim();
}

function splitIntoTitledEntries(rawText, fallbackTitle) {
  const lines = rawText.split(/\r?\n/);
  const titleIndexes = [];

  for (let i = 0; i < lines.length; i++) {
    const current = (lines[i] ?? "").trim();
    if (!current) continue;

    const prevBlank = i === 0 ? true : !(lines[i - 1] ?? "").trim();
    const nextBlank = i === lines.length - 1 ? true : !(lines[i + 1] ?? "").trim();

    const wordCount = current.split(/\s+/).filter(Boolean).length;
    const looksLikeTitle = current.length >= 4 && current.length <= 90 && wordCount <= 12;

    if (prevBlank && nextBlank && looksLikeTitle) titleIndexes.push(i);
  }

  if (titleIndexes.length < 2) {
    const cleaned = rawText.trim();
    return [{ title: fallbackTitle, text: cleaned }];
  }

  const entries = [];
  for (let idx = 0; idx < titleIndexes.length; idx++) {
    const startTitleIdx = titleIndexes[idx];
    const endTitleIdx = idx + 1 < titleIndexes.length ? titleIndexes[idx + 1] : lines.length;

    const title = (lines[startTitleIdx] ?? "").trim();
    const bodyLines = lines.slice(startTitleIdx + 1, endTitleIdx);
    const text = bodyLines.join("\n").trim();

    if (title && text) entries.push({ title, text });
  }

  if (entries.length === 0) {
    const cleaned = rawText.trim();
    return [{ title: fallbackTitle, text: cleaned }];
  }

  return entries;
}

function splitYearBatchByDates(rawText, fallbackTitle) {
  const lines = rawText.split(/\r?\n/).map((l) => l.replace(/\s+$/g, ""));

  const normalizeLine = (s) =>
    s.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, "").trim();

  const monthRe =
    "(January|February|March|April|May|June|July|August|September|October|November|December)";
  const dateLineRe = new RegExp(
    `^\\s*(?:تار[\\u06CC\\u064A]خ\\s*:\\s*)?\\d{1,2}\\s+${monthRe}\\s+\\d{4}\\s*$`
  );

  const isHeaderLine = (s) => {
    const t = normalizeLine(s);
    if (!t) return true;
    if (t === "مضامین") return true;
    if (/^کل\s+مضامین\s*:\s*\d+\s*$/.test(t)) return true;
    if (/^\d{4}\s*$/.test(t)) return true;
    return false;
  };

  const dateIndexes = [];
  for (let i = 0; i < lines.length; i++) {
    if (dateLineRe.test(normalizeLine(lines[i] ?? ""))) {
      dateIndexes.push(i);
    }
  }

  if (dateIndexes.length < 2) return [];

  const entries = [];

  const findTitleLineIdx = (dateIdx) => {
    for (let i = dateIdx - 1; i >= 0; i--) {
      const norm = normalizeLine(lines[i] ?? "");
      if (norm && !isHeaderLine(norm)) {
        return i;
      }
    }
    return -1;
  };

  const trimEmptyLines = (arr) => {
    let start = 0;
    let end = arr.length;
    while (start < end && !arr[start].trim()) start++;
    while (end > start && !arr[end - 1].trim()) end--;
    return arr.slice(start, end);
  };

  for (let k = 0; k < dateIndexes.length; k++) {
    const dateIdx = dateIndexes[k];
    
    // 1. Find title
    const titleIdx = findTitleLineIdx(dateIdx);
    const title = titleIdx !== -1 ? normalizeLine(lines[titleIdx]) : fallbackTitle;

    // 2. Find end index (next title start)
    let endIdx = lines.length;
    if (k + 1 < dateIndexes.length) {
      const nextDateIdx = dateIndexes[k + 1];
      const nextTitleIdx = findTitleLineIdx(nextDateIdx);
      if (nextTitleIdx !== -1) {
        endIdx = nextTitleIdx;
      } else {
        endIdx = nextDateIdx;
      }
    }

    // 3. Slice body lines
    let bodyLines = lines.slice(dateIdx + 1, endIdx);
    bodyLines = trimEmptyLines(bodyLines);

    while (bodyLines.length && isHeaderLine(bodyLines[0])) {
      bodyLines = bodyLines.slice(1);
    }

    // 4. Strip duplicated title at beginning of body lines
    if (bodyLines.length) {
      const firstLineNorm = normalizeLine(bodyLines[0]);
      if (firstLineNorm === title) {
        bodyLines = bodyLines.slice(1);
      }
    }

    bodyLines = trimEmptyLines(bodyLines);

    const text = bodyLines.join("\n").trim();
    if (text) {
      entries.push({ title, text });
    }
  }

  if (entries.length >= 2) return entries;
  return [];
}

function splitDocxIntoEntries(rawText, fallbackTitle) {
  const byDates = splitYearBatchByDates(rawText, fallbackTitle);
  if (byDates.length) return byDates;
  return splitIntoTitledEntries(rawText, fallbackTitle);
}

async function convertAll() {
  const articlesDir = path.join(__dirname, '..', 'src', 'assets', 'articles');
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  const outputFile = path.join(outputDir, 'articles.json');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const allArticles = [];
  const files = fs.readdirSync(articlesDir);
  console.log('Files in articles directory:', files);

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const yearMatch = file.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : 'Unknown';
    const fallbackTitle = file.replace(/\.[^.]+$/, "");

    if (file.endsWith('.docx')) {
      console.log(`Extracting text from DOCX: ${file} (Year: ${year})...`);
      try {
        const buffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer });
        const rawText = String(result?.value ?? "");
        
        console.log(`Splitting entries for ${file}...`);
        const entries = splitDocxIntoEntries(rawText, fallbackTitle);
        console.log(`Found ${entries.length} entries for ${year}.`);

        entries.forEach((entry, idx) => {
          allArticles.push({
            id: `${year}_art_${idx + 1}`,
            year,
            title: entry.title,
            text: entry.text
          });
        });
      } catch (err) {
        console.error(`Error processing file ${file}:`, err);
      }
    } else if (file.endsWith('.json')) {
      console.log(`Extracting posts from JSON export: ${file} (Year: ${year})...`);
      try {
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const table = fileContent.find(x => x.type === 'table' && x.name === 'wpus_posts');
        if (table && table.data) {
          // Filter to standard published posts
          const posts = table.data.filter(d => d.post_type === 'post' && d.post_status === 'publish');
          console.log(`Found ${posts.length} published posts in ${file}.`);

          // Process each post
          posts.forEach((post, idx) => {
            const rawTitle = cleanHtmlContent(post.post_title || post.post_name || 'بغیر عنوان');
            const rawText = cleanHtmlContent(post.post_content || '');
            
            if (rawText) {
              allArticles.push({
                id: `${year}_art_${idx + 1}`,
                year,
                title: rawTitle,
                text: rawText
              });
            }
          });
        }
      } catch (err) {
        console.error(`Error processing JSON file ${file}:`, err);
      }
    }
  }

  // Sort articles by year descending, then by ID
  allArticles.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year.localeCompare(a.year); // Descending order of year
    }
    return a.id.localeCompare(b.id);
  });

  fs.writeFileSync(outputFile, JSON.stringify(allArticles, null, 2), 'utf-8');
  console.log(`Saved ${allArticles.length} total articles to ${outputFile}`);
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
