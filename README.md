

```markdown
# 🚀 Drag & Drop Interface 


Интерактивный Drag & Drop интерфейс для веб-приложений с поддержкой touch-событий. Реализованы: перетаскивание элементов, зоны дропа, визуальные подсказки и кастомизация.

[▶ **Живая демо**](https://andreashev.github.io/Drag-Drop/) 

## ✨ Особенности
- Перетаскивание элементов мышью и на сенсорных устройствах
- Анимация при захвате элемента
- Кастомизируемые стили для состояний (drag-over, active)
- Поддержка нескольких типов данных
- События для интеграции (dragstart, dragend, drop)
- Оптимизированная производительность (requestAnimationFrame)

## 🛠 Технологии
[![Tech Stack](https://skillicons.dev/icons?i=js,html,css)](https://skillicons.dev)

**Без зависимостей!** Чистый ванильный JavaScript.

## 🚀 Быстрый старт
```bash
# Клонировать репозиторий
git clone https://github.com/AndreaShev/Drag-Drop.git

# Открыть в браузере
open index.html
```

## 🎮 Как использовать
```javascript
// Инициализация
const draggable = new Dragger({
  element: '.item',
  containers: '.drop-zone',
  onDrop: (data) => console.log('Дропнуто!', data)
});

// Кастомные события
document.addEventListener('drag:start', (e) => {
  e.detail.element.classList.add('my-drag-style');
});
```

## 📚 Документация
### Опции
| Параметр    | Тип       | По умолчанию | Описание                |
|-------------|-----------|--------------|-------------------------|
| `element`   | String    | '.drag-item' | Селектор элементов      |
| `containers`| String    | '.drop-zone' | Селектор контейнеров    |
| `dataType`  | String    | 'text'       | Тип передаваемых данных |

### События
| Событие        | Описание                         |
|----------------|----------------------------------|
| `drag:start`   | Начало перетаскивания            |
| `drag:end`     | Завершение перетаскивания        |
| `drag:enter`   | Вход в зону дропа                |
| `drag:leave`   | Выход из зоны дропа              |
| `drag:over`    | Нахождение над зоной             |
| `drag:drop`    | Дроп элемента в зону             |

## 🌟 Примеры
```html
<div class="drag-item" data-type="user">Item 1</div>

<section class="drop-zone" data-accept="user,image">
  <!-- Сюда можно дропать -->
</section>
```

## 🤝 Как внести вклад
1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add feature'`)
4. Запушьте ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📜 Лицензия
MIT © [Ваше Имя](https://github.com/AndreaShev)

---
