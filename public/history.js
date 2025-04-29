// --- Lotto 6/45 Crawled Section ---

function hideAllCrawledSections() {
    let lottoSection = document.getElementById('lotto645Crawled');
    if (lottoSection) lottoSection.style.display = 'none';
    let powerballSection = document.getElementById('powerballCrawled');
    if (powerballSection) powerballSection.style.display = 'none';
    let megaSection = document.getElementById('megamillionsCrawled');
    if (megaSection) megaSection.style.display = 'none';
}

async function renderLotto645Crawled() {
    hideAllCrawledSections();
    let section = document.getElementById('lotto645Crawled');
    if (!section) {
        section = document.createElement('div');
        section.id = 'lotto645Crawled';
        section.style.marginTop = '40px';
        section.innerHTML = '<h2 style="text-align:center; color:#3498db; margin-bottom:20px;">Lotto 6/45 Official Winning Numbers</h2><div id="lotto645CrawledList" style="display:flex; flex-direction:column; gap:18px; align-items:center;"></div>';
        document.querySelector('.button-container').before(section);
    }
    const list = document.getElementById('lotto645CrawledList');
    list.innerHTML = '<div style="color:#888">Loading...</div>';
    section.style.display = 'block';
    try {
        const res = await fetch('/api/lotto645');
        const data = await res.json();
        list.innerHTML = '';
        data.draws.forEach(item => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '18px';
            // Draw number
            const draw = document.createElement('span');
            draw.textContent = `#${item.draw}`;
            draw.style.fontWeight = 'bold';
            draw.style.fontSize = '18px';
            draw.style.width = '70px';
            row.appendChild(draw);
            // 6 numbers
            item.numbers.forEach(num => {
                const ball = document.createElement('div');
                ball.textContent = num;
                ball.style.width = '38px';
                ball.style.height = '38px';
                ball.style.background = '#3498db';
                ball.style.color = 'white';
                ball.style.borderRadius = '50%';
                ball.style.display = 'flex';
                ball.style.alignItems = 'center';
                ball.style.justifyContent = 'center';
                ball.style.fontWeight = 'bold';
                ball.style.fontSize = '16px';
                ball.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
                row.appendChild(ball);
            });
            // Bonus number
            const bonus = document.createElement('div');
            bonus.textContent = item.bonus;
            bonus.style.width = '38px';
            bonus.style.height = '38px';
            bonus.style.background = '#e67e22';
            bonus.style.color = 'white';
            bonus.style.borderRadius = '50%';
            bonus.style.display = 'flex';
            bonus.style.alignItems = 'center';
            bonus.style.justifyContent = 'center';
            bonus.style.fontWeight = 'bold';
            bonus.style.fontSize = '16px';
            bonus.style.marginLeft = '10px';
            bonus.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
            row.appendChild(bonus);
            list.appendChild(row);
        });
    } catch (e) {
        list.innerHTML = '<div style="color:#888">Error loading data.</div>';
    }
}

// Powerball
function renderPowerballCrawled() {
    hideAllCrawledSections();
    let section = document.getElementById('powerballCrawled');
    if (!section) {
        section = document.createElement('div');
        section.id = 'powerballCrawled';
        section.style.marginTop = '40px';
        section.innerHTML = '<h2 style="text-align:center; color:#e74c3c; margin-bottom:20px;">Powerball Official Website</h2>' +
            '<div style="text-align:center; margin-top:30px;"><a href="https://www.powerball.com/previous-results" target="_blank" style="font-size:20px; color:#e74c3c; text-decoration:underline;">Visit Powerball Previous Results</a></div>';
        document.querySelector('.button-container').before(section);
    }
    section.style.display = 'block';
}

// Mega Millions
function renderMegaCrawled() {
    hideAllCrawledSections();
    let section = document.getElementById('megamillionsCrawled');
    if (!section) {
        section = document.createElement('div');
        section.id = 'megamillionsCrawled';
        section.style.marginTop = '40px';
        section.innerHTML = '<h2 style="text-align:center; color:#f1c40f; margin-bottom:20px;">Mega Millions Official Website</h2>' +
            '<div style="text-align:center; margin-top:30px;"><a href="https://www.megamillions.com/Winning-Numbers/Previous-Drawings.aspx#page2" target="_blank" style="font-size:20px; color:#f1c40f; text-decoration:underline;">Visit Mega Millions Previous Drawings</a></div>';
        document.querySelector('.button-container').before(section);
    }
    section.style.display = 'block';
}

// Button event listeners
const lotto645Btn = document.querySelector('button[data-type="lotto645"]');
if (lotto645Btn) {
    lotto645Btn.addEventListener('click', () => {
        renderLotto645Crawled();
    });
}
const powerballBtn = document.querySelector('button[data-type="powerball"]');
if (powerballBtn) {
    powerballBtn.addEventListener('click', () => {
        renderPowerballCrawled();
    });
}
const megaBtn = document.querySelector('button[data-type="megamillions"]');
if (megaBtn) {
    megaBtn.addEventListener('click', () => {
        renderMegaCrawled();
    });
}

// Show Lotto 6/45 crawled results by default on page load
renderLotto645Crawled();
