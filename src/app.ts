interface Definition {     // Початок оголошення інтерфейсу Definition (шаблон об'єкта визначення)
    definition: string;    // Обов'язкова властивість 'definition', яка має бути рядком (текстом)
}                                                      

interface Meaning {           //   інтерфейс Meaning (шаблон частини мови)
    partOfSpeech: string;     // Властивість 'partOfSpeech' (наприклад, іменник чи дієслово) — рядок
    definitions: Definition[];   // Масив об'єктів, що відповідають інтерфейсу Definition вище
}                                                     

 interface DictionaryResponse {    // Початок оголошення інтерфейсу відповіді від API словника
    word: string;                  // Шукане слово — рядок
    meanings: Meaning[];           // Масив значень (частин мови), що відповідають інтерфейсу Meaning
}     

// Знаходження поля введення тексту в HTML та приведення його типу
const wordInput = document.getElementById('wordInput') as HTMLInputElement | null;   
     // Знаходження кнопки пошуку в HTML та приведення її типу    
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement | null;    
    // Знаходження блоку результатів та приведення його типу
const resultContainer = document.getElementById('resultContainer') as HTMLDivElement | null; 
// Знаходження заголовка для слова та приведення його типу
const wordTitle = document.getElementById('wordTitle') as HTMLElement | null;   
    // Знаходження елемента для виведення дефініції та приведення його типу          
const wordDef = document.getElementById('wordDef') as HTMLElement | null;                   


// Перевірка: чи існують кнопка та поле введення на сторінці, перш ніж вішати слухач
if (searchBtn && wordInput) {        
// Додавання обробника кліку на кнопку; функція робиться асинхронною (async)
    searchBtn.addEventListener('click', async () => {   
         // Зчитування тексту з поля вводу та видалення зайвих пробілів по краях
        const word = wordInput.value.trim();      
         // Перевірка: якщо рядок порожній (нічого не ввели), зупинити виконання    функції
        if (!word) return;                             
  // Початок блоку перехоплення можливих помилок при виконанні мережевого запиту
        try {  
            // Виконання HTTP-запиту до API словника з уведеним словом                                       
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); 
            // Перевірка: чи успішна відповідь від сервера (статус 200-299)
            if (!response.ok) {      
                        // Якщо сервер відповів помилкою, примусово створюємо і викидаємо помилку            
                throw new Error('Слово не знайдено');  
            }
// Очікування та конвертація відповіді сервера у масив  об'єктів за нашим інтерфейсом
            const data: DictionaryResponse[] = await response.json();
               // Отримання першого елемента з масиву результатів пошуку слова
            const firstEntry = data[0];              
// Безпечне витягнення тексту дефініції через ?. або підстановка тексту за замовчуванням
            const definitionText = firstEntry?.meanings?.[0]?.definitions?.[0]?.definition || "Визначення не знайдено"; 
// Перевірка, чи існують усі необхідні елементи інтерфейсу для виведення даних
            if (wordTitle && wordDef && resultContainer) { 

                // Запис знайденого слова (або введеного) у заголовок
                wordTitle.textContent = firstEntry?.word || word; 

                  // Запис тексту визначення у відповідний HTML-елемент
                wordDef.textContent = definitionText;    
                
                 // Зміна стилю блоку результатів на видимий ('block')
                resultContainer.style.display = 'block';       
            }                 
            
              // Блок catch, який перехоплює будь-які помилки з блоку try
        } catch (error) {    
            
            // Виведення спливаючого вікна з повідомленням про помилку
            alert('Помилка: такого слова не знайдено в базі!'); 

             // Перевірка, чи існує контейнер результатів перед зміною стилю
            if (resultContainer) {     
                
                 // Приховування блоку результатів у разі помилки
                resultContainer.style.display = 'none';        
            }                                                   // Закінчення внутрішньої перевірки контейнера
        }                                                       // Закінчення блоку catch
    });                                                         // Закінчення анонімної функції слухача події click
}                                                               // Закінчення головної перевірки наявності кнопки і поля вводу