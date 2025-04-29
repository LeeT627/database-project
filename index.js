import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = 'https://klwnaivbyaxrwpdstsli.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsd25haXZieWF4cndwZHN0c2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjA3ODcsImV4cCI6MjA2MTM5Njc4N30.CfMciBUdAc_VaPQ18s2DdsEkCwN0ufvwYvxTNnrN2tk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Add your API routes here
// Example:
app.get('/api/test', async (req, res) => {
  res.json({ message: 'API is working!' });
});

// Lotto 6/45 API route
app.get('/api/lotto645', async (req, res) => {
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
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 