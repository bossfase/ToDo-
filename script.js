const taskList = document.getElementById('toDoListe');
const input = document.getElementById('eingabe');
const addBtn = document.getElementById('add-btn');

// LocalStorage key
const STORAGE_KEY = 'meineTodoListe';

// Alle Aufgaben aus LocalStorage laden
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    taskList.innerHTML = '';
    tasks.forEach(task => {
        addTask(task.text, task.done);
    });
}

// Aufgaben speichern
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#toDoListe li').forEach(li => {
        tasks.push({ text: li.textContent, done: li.classList.contains('done') });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Aufgabe interaktiv machen
function makeTaskInteractive(li) {
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTasks();
    });
    li.addEventListener('dblclick', () => {
        taskList.removeChild(li);
        saveTasks();
    });
}

// Aufgabe hinzufügen
function addTask(text, done = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if (done) li.classList.add('done');
    makeTaskInteractive(li);
    taskList.appendChild(li);
}

// Button klick
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        addTask(text);
        input.value = '';
        input.focus();
        saveTasks();
    }
});

// Enter-Taste
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

// Seite laden → Aufgaben aus LocalStorage laden
loadTasks();


