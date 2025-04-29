// Fetch and display a random Powerball row from Supabase
async function fetchRandomNumbers() {
    try {
        // Get all ids
        const { data: ids, error: idError } = await window.supabaseClient
            .from('powerball_numbers')
            .select('id')
        if (idError) throw idError
        if (!ids || ids.length === 0) {
            displayNumbers(null)
            return
        }
        // Pick a random id
        const randomId = ids[Math.floor(Math.random() * ids.length)].id
        // Fetch the row with that id
        const { data, error } = await window.supabaseClient
            .from('powerball_numbers')
            .select('num1, num2, num3, num4, num5, powerball')
            .eq('id', randomId)
            .single()
        if (error) throw error
        displayNumbers(data)
    } catch (error) {
        console.error('Error fetching random Powerball numbers:', error)
        displayNumbers(null)
    }
}

function displayNumbers(row) {
    const numbersDisplay = document.getElementById('numbersDisplay')
    numbersDisplay.innerHTML = ''
    if (!row) {
        numbersDisplay.innerHTML = '<span style="color:#888">No numbers found.</span>'
        return
    }
    // Display 5 numbers
    for (let i = 1; i <= 5; i++) {
        const numberElement = document.createElement('div')
        numberElement.className = 'number'
        numberElement.textContent = row[`num${i}`]
        numbersDisplay.appendChild(numberElement)
    }
    // Centered plus sign
    const plus = document.createElement('div')
    plus.textContent = '+'
    plus.style.display = 'flex'
    plus.style.alignItems = 'center'
    plus.style.justifyContent = 'center'
    plus.style.width = '60px'
    plus.style.height = '60px'
    plus.style.fontSize = '32px'
    plus.style.fontWeight = 'bold'
    plus.style.color = '#2c3e50'
    plus.style.background = 'transparent'
    numbersDisplay.appendChild(plus)
    // Powerball
    const powerballElement = document.createElement('div')
    powerballElement.className = 'number powerball'
    powerballElement.textContent = row.powerball
    numbersDisplay.appendChild(powerballElement)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchButton').addEventListener('click', fetchRandomNumbers)
    fetchRandomNumbers()
}) 