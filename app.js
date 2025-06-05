document.addEventListener('DOMContentLoaded', () => {
  class DragBoard {
    constructor() {
      this.dragItem = null;
      this.nextId = 3;
      this.init();
    }

    init() {
      this.cacheDOM();
      this.setupEventListeners();
      this.loadState();
    }

    cacheDOM() {
      this.board = document.querySelector('.content');
      this.placeholders = document.querySelectorAll('.placeholder');
      this.addButton = document.getElementById('add-task');
      this.searchInput = document.getElementById('search');
    }

    setupEventListeners() {
      // Кнопка добавления задачи
      this.addButton.addEventListener('click', () => this.addTask());

      // Поиск задач
      this.searchInput.addEventListener('input', (e) => this.filterTasks(e.target.value));

      // Делегирование событий для элементов
      this.board.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('item')) {
          this.dragStart(e);
        }
      });

      this.board.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('item')) {
          this.dragEnd(e);
        }
      });

      // Обработчики для плейсхолдеров
      this.placeholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', this.dragOver.bind(this));
        placeholder.addEventListener('dragenter', this.dragEnter.bind(this));
        placeholder.addEventListener('dragleave', this.dragLeave.bind(this));
        placeholder.addEventListener('drop', this.dragDrop.bind(this));
      });

      // Редактирование по двойному клику
      this.board.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('item')) {
          this.editTask(e.target);
        }
      });

      // Пометить как важную по Ctrl+клику
      this.board.addEventListener('click', (e) => {
        if (e.ctrlKey && e.target.classList.contains('item')) {
          e.target.classList.toggle('important');
          this.saveState();
        }
      });
    }

    // Добавление новой задачи
    addTask() {
      const taskText = prompt('Введите текст задачи:', `Задача ${this.nextId}`);
      if (!taskText) return;
      
      const newTask = document.createElement('div');
      newTask.className = 'item';
      newTask.draggable = true;
      newTask.textContent = taskText;
      newTask.dataset.id = this.nextId++;
      
      document.querySelector('[data-column="start"]').appendChild(newTask);
      this.saveState();
    }

    // Редактирование задачи
    editTask(task) {
      const newText = prompt('Измените текст задачи:', task.textContent);
      if (newText) {
        task.textContent = newText;
        this.saveState();
      }
    }

    // Фильтрация задач
    filterTasks(term) {
      const items = document.querySelectorAll('.item');
      term = term.toLowerCase();
      
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
      });
    }

    // Drag & Drop функции
    dragStart(e) {
      this.dragItem = e.target;
      setTimeout(() => {
        e.target.classList.add('hold', 'hide');
      }, 0);
    }

    dragEnd(e) {
      e.target.classList.remove('hold', 'hide');
      this.saveState();
    }

    dragOver(e) {
      e.preventDefault();
    }

    dragEnter(e) {
      e.preventDefault();
      if (e.target.classList.contains('placeholder')) {
        e.target.classList.add('hovered');
      }
    }

    dragLeave(e) {
      e.target.classList.remove('hovered');
    }

    dragDrop(e) {
      e.preventDefault();
      e.target.classList.remove('hovered');
      
      if (e.target.classList.contains('placeholder')) {
        e.target.appendChild(this.dragItem);
      } else if (e.target.closest('.placeholder')) {
        e.target.closest('.placeholder').appendChild(this.dragItem);
      }
    }

    // Сохранение состояния
    saveState() {
      const state = {
        tasks: [],
        nextId: this.nextId
      };
      
      document.querySelectorAll('.placeholder').forEach(column => {
        const columnId = column.dataset.column;
        const tasks = Array.from(column.querySelectorAll('.item')).map(item => ({
          id: item.dataset.id,
          text: item.textContent,
          important: item.classList.contains('important')
        }));
        
        state.tasks.push({ columnId, tasks });
      });
      
      localStorage.setItem('boardState', JSON.stringify(state));
    }

    // Загрузка состояния
    loadState() {
      const state = JSON.parse(localStorage.getItem('boardState'));
      if (!state) return;
      
      this.nextId = state.nextId || this.nextId;
      
      state.tasks.forEach(columnData => {
        const column = document.querySelector(`[data-column="${columnData.columnId}"]`);
        if (!column) return;
        
        column.innerHTML = '';
        
        columnData.tasks.forEach(task => {
          const taskEl = document.createElement('div');
          taskEl.className = 'item';
          taskEl.draggable = true;
          taskEl.textContent = task.text;
          taskEl.dataset.id = task.id;
          
          if (task.important) {
            taskEl.classList.add('important');
          }
          
          column.appendChild(taskEl);
        });
      });
    }
  }

  // Инициализация приложения
  const board = new DragBoard();
  
  // Автосохранение каждые 30 секунд
  setInterval(() => board.saveState(), 30000);
});