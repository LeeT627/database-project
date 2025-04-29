import { supabase } from './supabaseClient.js'

export class LotteryService {
  // Generate 6 unique random numbers between 1 and 45
  static generateNumbers() {
    const numbers = new Set()
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1)
    }
    return Array.from(numbers).sort((a, b) => a - b)
  }

  // Save generated numbers to the database
  static async saveNumbers(numbers) {
    const { data, error } = await supabase
      .from('lottery_numbers')
      .insert([
        {
          numbers: numbers,
          generated_at: new Date().toISOString()
        }
      ])
    
    if (error) throw error
    return data
  }

  // Get all previously generated numbers
  static async getHistory() {
    const { data, error } = await supabase
      .from('lottery_numbers')
      .select('*')
      .order('generated_at', { ascending: false })
    
    if (error) throw error
    return data
  }
} 