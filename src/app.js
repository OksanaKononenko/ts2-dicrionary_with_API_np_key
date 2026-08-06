"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');
const wordTitle = document.getElementById('wordTitle');
const wordDef = document.getElementById('wordDef');
if (searchBtn && wordInput) {
    searchBtn.addEventListener('click', async () => {
        const word = wordInput.value.trim();
        if (!word)
            return;
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Слово не знайдено');
            }
            const data = await response.json();
            const firstEntry = data[0];
            // Захищений витяг визначення за допомогою оператора ?.
            const definitionText = firstEntry?.meanings?.[0]?.definitions?.[0]?.definition || "Визначення не знайдено";
            if (wordTitle && wordDef && resultContainer) {
                wordTitle.textContent = firstEntry?.word || word;
                wordDef.textContent = definitionText;
                resultContainer.style.display = 'block';
            }
        }
        catch (error) {
            alert('Помилка: такого слова не знайдено в базі!');
            if (resultContainer) {
                resultContainer.style.display = 'none';
            }
        }
    });
}
//# sourceMappingURL=app.js.map