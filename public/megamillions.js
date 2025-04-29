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
        return data
    } catch (error) {
        console.error('Error testing connection:', error)
        throw error
    }
}

// Display numbers in the UI
function displayNumbers(numbers, megaball) {
    console.log('Displaying numbers:', numbers, 'Mega Ball:', megaball)
    const numbersDisplay = document.getElementById('numbersDisplay')
    numbersDisplay.innerHTML = ''
    
    // Display main numbers
    numbers.forEach(number => {
        const numberElement = document.createElement('div')
        numberElement.className = 'number'
        numberElement.textContent = number
        numbersDisplay.appendChild(numberElement)
    })
    
    // Add plus sign
    const plusSign = document.createElement('div')
    plusSign.className = 'plus-sign'
    plusSign.textContent = '+'
    numbersDisplay.appendChild(plusSign)
    
    // Display Mega Ball number
    const megaballElement = document.createElement('div')
    megaballElement.className = 'number megaball'
    megaballElement.textContent = megaball
    numbersDisplay.appendChild(megaballElement)
}

// Save numbers to the database
async function saveNumbers(numbers, megaball) {
    try {
        const [num1, num2, num3, num4, num5] = numbers
        const { data, error } = await window.supabaseClient
            .from('lottery_numbers')
            .insert([
                {
                    num1, num2, num3, num4, num5,
                    num6: megaball,
                    lottery_type: 'megamillions'
                }
            ])
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error saving numbers:', error)
        throw error
    }
}

// Generate random lottery numbers for Mega Millions
function generateRandomNumbers() {
    // Generate 5 main numbers (1-70)
    const numbers = []
    while (numbers.length < 5) {
        const randomNumber = Math.floor(Math.random() * 70) + 1
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber)
        }
    }
    
    // Generate Mega Ball number (1-25)
    const megaball = Math.floor(Math.random() * 25) + 1
    
    return {
        numbers: numbers.sort((a, b) => a - b),
        megaball
    }
}

// Main function to generate and display numbers
async function generateNumbers() {
    try {
        console.log('Button clicked, generating new numbers...')
        const { numbers, megaball } = generateRandomNumbers()
        console.log('Generated numbers:', numbers, 'Mega Ball:', megaball)
        // Save the new numbers to the database
        await saveNumbers(numbers, megaball)
        // Display the numbers
        displayNumbers(numbers, megaball)
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
})

// Make generateNumbers available globally
window.generateNumbers = generateNumbers 