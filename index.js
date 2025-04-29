import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 