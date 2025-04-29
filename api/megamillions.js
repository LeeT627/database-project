const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.megamillions.com/Winning-Numbers/Previous-Drawings.aspx#page2');
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];
    // Find the table rows for the draws (may need to adjust selector based on actual HTML)
    $('table tbody tr').each((i, el) => {
      if (i >= 10) return false;
      const tds = $(el).find('td');
      if (tds.length >= 7) {
        const date = $(tds[0]).text().trim();
        const numbers = [
          parseInt($(tds[1]).text().trim(), 10),
          parseInt($(tds[2]).text().trim(), 10),
          parseInt($(tds[3]).text().trim(), 10),
          parseInt($(tds[4]).text().trim(), 10),
          parseInt($(tds[5]).text().trim(), 10)
        ];
        const megaball = parseInt($(tds[6]).text().trim(), 10);
        results.push({ date, numbers, megaball });
      }
    });
    res.status(200).json({ draws: results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mega Millions data', details: err.message });
  }
}; 