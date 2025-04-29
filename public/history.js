// Format date to a readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Create a number element with appropriate styling
function createNumberElement(number, type, isSpecialBall = false) {
    const numberElement = document.createElement('div');
    numberElement.className = `number ${isSpecialBall ? type : ''}`;
    numberElement.textContent = number;
    return numberElement;
}

// Create a plus sign element
function createPlusSign() {
    const plusSign = document.createElement('div');
    plusSign.className = 'plus-sign';
    plusSign.textContent = '+';
    return plusSign;
}

// Display numbers based on lottery type
function displayNumbers(container, numbers, type) {
    const numbersDisplay = document.createElement('div');
    numbersDisplay.className = 'numbers-display';

    if (type === 'lotto645') {
        numbers.forEach(number => {
            numbersDisplay.appendChild(createNumberElement(number));
        });
    } else {
        // For Powerball and Mega Millions
        for (let i = 0; i < 5; i++) {
            numbersDisplay.appendChild(createNumberElement(numbers[i]));
        }
        numbersDisplay.appendChild(createPlusSign());
        numbersDisplay.appendChild(createNumberElement(numbers[5], type === 'powerball' ? 'powerball' : 'megaball', true));
    }

    container.appendChild(numbersDisplay);
}

// Create a history item element
function createHistoryItem(item) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    // Create header with type and date
    const header = document.createElement('div');
    header.className = 'history-item-header';
    
    const typeSpan = document.createElement('span');
    typeSpan.className = `lottery-type type-${item.lottery_type}`;
    typeSpan.textContent = {
        'lotto645': 'Lotto 6/45',
        'powerball': 'Powerball',
        'megamillions': 'Mega Millions'
    }[item.lottery_type];
    
    const dateSpan = document.createElement('span');
    dateSpan.textContent = formatDate(item.created_at);
    
    header.appendChild(typeSpan);
    header.appendChild(dateSpan);
    historyItem.appendChild(header);

    // Display numbers
    const numbers = [item.num1, item.num2, item.num3, item.num4, item.num5, item.num6];
    displayNumbers(historyItem, numbers, item.lottery_type);

    return historyItem;
}

// Fetch and display history
async function fetchHistory(type = 'all') {
    try {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '<div class="no-results">Loading...</div>';

        let query = window.supabaseClient
            .from('lottery_numbers')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (type !== 'all') {
            query = query.eq('lottery_type', type);
        }

        const { data, error } = await query;

        if (error) throw error;

        historyList.innerHTML = '';
        
        if (!data || data.length === 0) {
            historyList.innerHTML = '<div class="no-results">No numbers generated yet</div>';
            return;
        }

        data.forEach(item => {
            historyList.appendChild(createHistoryItem(item));
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        document.getElementById('historyList').innerHTML = 
            '<div class="no-results">Error loading history. Please try again later.</div>';
    }
}

// Handle filter buttons
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Fetch filtered history
            fetchHistory(button.dataset.type);
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupFilterButtons();
    fetchHistory();
}); 