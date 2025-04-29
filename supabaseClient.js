import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

// Initialize the Supabase client
const supabaseUrl = 'https://klwnaivbyaxrwpdstsli.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsd25haXZieWF4cndwZHN0c2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjA3ODcsImV4cCI6MjA2MTM5Njc4N30.CfMciBUdAc_VaPQ18s2DdsEkCwN0ufvwYvxTNnrN2tk'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('_test').select('*').limit(1)
    if (error) throw error
    console.log('Successfully connected to Supabase!')
  } catch (error) {
    console.error('Error connecting to Supabase:', error.message)
  }
}

testConnection() 