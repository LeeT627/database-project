const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://superkts.com/lotto/list/');
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];
    // Find the table rows for the draws
    $('table tr').each((i, el) => {
      // Skip header row
      if (i === 0) return;
      const tds = $(el).find('td');
      if (tds.length >= 8) {
        const draw = $(tds[0]).text().trim();
        const numbers = [
          $(tds[1]).text().trim(),
          $(tds[2]).text().trim(),
          $(tds[3]).text().trim(),
          $(tds[4]).text().trim(),
          $(tds[5]).text().trim(),
          $(tds[6]).text().trim()
        ];
        const bonus = $(tds[7]).text().trim();
        results.push({ draw, numbers, bonus });
      }
    });
    // Return the latest 10 draws
    res.status(200).json({ draws: results.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Lotto 6/45 data', details: err.message });
  }
}; 