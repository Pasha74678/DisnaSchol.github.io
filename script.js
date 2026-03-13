// ==== Открытие модальных окон для карточек ====
document.addEventListener('DOMContentLoaded', function() {
    // ==== Выдвижная панель (сайдбар) ====
    const menuToggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('drawer');
    
    // Создаем оверлей для затемнения фона
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
    
    // Функция открытия панели
    function openDrawer() {
        drawer.classList.add('open');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Предотвращаем скролл
    }
    
    // Функция закрытия панели
    function closeDrawer() {
        drawer.classList.remove('open');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }
    
    // Обработчик клика на кнопку-гамбургер
    menuToggle.addEventListener('click', function() {
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    
    // Закрытие при клике на оверлей
    overlay.addEventListener('click', closeDrawer);
    
    // Закрытие при клике на ссылку в меню
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeDrawer();
        }
    });
    
    // Получаем все карточки
    const cards = document.querySelectorAll('.card');
    
    // ==== Переключение темы (включая кнопку в сайдбаре) ====
    const themeToggle = document.getElementById('theme-toggle-drawer');
    const body = document.body;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        if (themeToggle) {
            themeToggle.classList.add('dark');
            themeToggle.querySelector('.theme-icon').textContent = '☀︎';
        }
    }
    
    // Обработчик переключения темы (для кнопки в сайдбаре)
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark')) {
                // Переключение на светлую тему (moon)
                body.classList.remove('dark');
                themeToggle.classList.remove('dark');
                themeToggle.querySelector('.theme-icon').textContent = '☾';
                localStorage.setItem('theme', 'light');
            } else {
                // Переключение на темную тему (sun)
                body.classList.add('dark');
                themeToggle.classList.add('dark');
                themeToggle.querySelector('.theme-icon').textContent = '☀︎';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Создаем модальное окно (если его еще нет)
    if (!document.querySelector('.modal')) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modal-title">Информация о человеке</h3>
                    <button class="close-btn" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <img id="modal-image" src="" alt="Фото">
                    <p id="modal-description"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Добавляем обработчики клика на кнопки карточек
    cards.forEach(card => {
        const btn = card.querySelector('.btn-card');
        const personData = card.dataset.person;
        
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            openModal(personData);
        });
        
        // Также можно открывать по клику на всю карточку
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-card')) return;
            openModal(personData);
        });
    });

// Функция для открытия модального окна
function openModal(personData) {
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = modal.querySelector('#modal-title');
    const modalImage = modal.querySelector('#modal-image');
    const modalDescription = modal.querySelector('#modal-description');
    
    
    // Подготовка данных для каждого человека
    const peopleData = {
        'teacher-1': {
            title: 'Иванова Мария Петровна',
            image: 'https://picsum.photos/seed/teacher1/400/300.jpg',
            description: 'Учитель математики с 15-летним стажем. Победитель олимпиадных команд, разработчик методических материалов. Обладает высокой квалификацией и умением находить подход к каждому ученику.'
        },
        'student-1': {
            title: 'Петров Андрей',
            image: 'https://picsum.photos/seed/student1/400/300.jpg',
            description: 'Победитель всероссийской олимпиады по математике. Обучается в 11 классе, активно участвует в научно-практических конференциях. Планирует поступать в МГУ.'
        },
        'alumni-1': {
            title: 'Сидорова Елена',
            image: 'https://picsum.photos/seed/alumni1/400/300.jpg',
            description: 'Выпускница 2020 года. Разработчик игр и создатель образовательных приложений. Работает в крупной IT-компании, активно участвует в менторских программах для школьников.'
        }
    };
    
    // Проверяем наличие данных
    if (peopleData[personData]) {
        const person = peopleData[personData];
        modalTitle.textContent = person.title;
        modalImage.src = person.image;
        modalImage.alt = person.title;
        modalDescription.textContent = person.description;
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        
        // Добавляем обработчик для закрытия по клику вне модального окна
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };
    }
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==== Дополнительные интерактивности ====
// Плавная прокрутка к секции Гордость школы
document.querySelector('.btn-primary').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('pride').scrollIntoView({ behavior: 'smooth' });
});

}); // Закрываем DOMContentLoaded