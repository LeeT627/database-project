// Test Supabase connection
async function testConnection() {
    try {
        console.log('Testing Supabase connection...')
        const { data, error } = await window.supabaseClient
            .from('lottery_numbers')
            .select('*')
            .limit(1)
        
        if (error) {
            console.error('Supabase connection error:', error)
            throw error
        }
        console.log('Supabase connection successful!')
        console.log('Data:', data)
        return data
    } catch (error) {
        console.error('Error testing connection:', error)
        throw error
    }
}

// Fetch numbers from the database
async function fetchNumbers() {
    try {
        console.log('Fetching numbers from database...')
        const { data, error } = await window.supabaseClient
            .from('lottery_numbers')
            .select('num1, num2, num3, num4, num5, num6')
            .order('id', { ascending: false })
            .limit(1)
        
        if (error) {
            console.error('Supabase error:', error)
            throw error
        }
        if (!data || data.length === 0) {
            console.log('No data found in database')
            throw new Error('No numbers found in the database')
        }
        const row = data[0]
        const numbers = [row.num1, row.num2, row.num3, row.num4, row.num5, row.num6]
        console.log('Fetched numbers:', numbers)
        return numbers
    } catch (error) {
        console.error('Error fetching numbers:', error)
        throw error
    }
}

// Display numbers in the UI
function displayNumbers(numbers) {
    console.log('Displaying numbers:', numbers)
    const numbersDisplay = document.getElementById('numbersDisplay')
    numbersDisplay.innerHTML = ''
    numbers.forEach(number => {
        const numberElement = document.createElement('div')
        numberElement.className = 'number'
        numberElement.textContent = number
        numbersDisplay.appendChild(numberElement)
    })
}

// Save numbers to the database
async function saveNumbers(numbers) {
    try {
        const [num1, num2, num3, num4, num5, num6] = numbers
        const { data, error } = await window.supabaseClient
            .from('lottery_numbers')
            .insert([
                {
                    num1, num2, num3, num4, num5, num6
                }
            ])
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error saving numbers:', error)
        throw error
    }
}

// Generate random lottery numbers
function generateRandomNumbers() {
    const numbers = []
    while (numbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber)
        }
    }
    return numbers.sort((a, b) => a - b)
}

// Main function to generate and display numbers
async function generateNumbers() {
    try {
        console.log('Button clicked, generating new numbers...')
        const newNumbers = generateRandomNumbers()
        console.log('Generated numbers:', newNumbers)
        // Save the new numbers to the database
        await saveNumbers(newNumbers)
        // Display the numbers
        displayNumbers(newNumbers)
        // No more history refresh
    } catch (error) {
        console.error('Error:', error)
        alert('An error occurred while generating numbers. Please try again.')
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Test the connection first
    try {
        await testConnection()
    } catch (error) {
        console.error('Failed to connect to Supabase:', error)
        alert('Failed to connect to the database. Please check the console for details.')
        return
    }
    // Add click event listener to the button
    document.getElementById('generateButton').addEventListener('click', generateNumbers)
    // No more loadHistory()
})

// Make generateNumbers available globally
window.generateNumbers = generateNumbers 