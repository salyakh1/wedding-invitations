# WeddingInvitations - Платформа для создания свадебных приглашений

Полнофункциональная платформа для создания и продажи онлайн свадебных приглашений, аналог WeddingPost.ru

## 🚀 Возможности

### Для пользователей (жених и невеста):
- **Создание приглашений**: Выбор из готовых шаблонов или создание с нуля
- **Редактор**: Интуитивный drag-and-drop редактор с настройкой цветов, шрифтов, изображений
- **Управление гостями**: Добавление, редактирование, отслеживание RSVP
- **Аналитика**: Статистика просмотров, ответов гостей
- **Экспорт**: Скачивание в PDF, печать
- **Публичные страницы**: Красивые страницы приглашений для гостей

### Для гостей:
- **Просмотр приглашений**: Адаптивные страницы на любых устройствах
- **RSVP система**: Подтверждение участия с дополнительной информацией
- **Интерактивность**: Карты, календари, дополнительная информация

## 🛠 Технологии

### Backend:
- **Node.js** + **Express.js** - серверная часть
- **PostgreSQL** + **Prisma** - база данных и ORM
- **JWT** - аутентификация
- **PDF-lib** - генерация PDF
- **QR Code** - создание QR кодов
- **SendGrid** - отправка email
- **Twilio** - отправка SMS
- **Multer** - загрузка файлов

### Frontend:
- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **TailwindCSS** - стилизация
- **Zustand** - управление состоянием
- **React Hook Form** + **Zod** - валидация форм
- **Framer Motion** - анимации
- **Lucide React** - иконки
- **React Hot Toast** - уведомления

## 📁 Структура проекта

```
свадебные приглошения  проект/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Контроллеры API
│   │   ├── middleware/     # Middleware (auth, error handling)
│   │   ├── routes/         # API маршруты
│   │   ├── services/       # Бизнес-логика (email, PDF)
│   │   ├── types/          # TypeScript типы
│   │   └── utils/          # Утилиты
│   ├── prisma/             # Схема базы данных
│   └── package.json
├── frontend/               # Frontend приложение
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React компоненты
│   │   ├── store/         # Zustand stores
│   │   ├── lib/           # Утилиты и конфигурация
│   │   └── types/         # TypeScript типы
│   └── package.json
└── README.md
```

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
# Клонировать репозиторий
git clone <repository-url>
cd свадебные приглошения проект

# Установить зависимости для backend
cd backend
npm install

# Установить зависимости для frontend
cd ../frontend
npm install
```

### 2. Настройка базы данных

```bash
# В папке backend
# Создать .env файл на основе env.example
cp env.example .env

# Настроить переменные окружения в .env:
DATABASE_URL="postgresql://username:password@localhost:5432/wedding_invitations"
JWT_SECRET="your-secret-key"
SENDGRID_API_KEY="your-sendgrid-key"
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
```

### 3. Запуск базы данных

```bash
# Установить PostgreSQL (если не установлен)
# Создать базу данных
createdb wedding_invitations

# Применить миграции
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Запуск приложения

```bash
# Запустить backend (в папке backend)
npm run dev

# В новом терминале запустить frontend (в папке frontend)
npm run dev
```

### 5. Открыть в браузере

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход
- `GET /api/auth/me` - Получить текущего пользователя

### Приглашения
- `GET /api/invitation-sites` - Список приглашений
- `POST /api/invitation-sites` - Создать приглашение
- `GET /api/invitation-sites/:id` - Получить приглашение
- `PUT /api/invitation-sites/:id` - Обновить приглашение
- `DELETE /api/invitation-sites/:id` - Удалить приглашение

### Шаблоны
- `GET /api/templates` - Список шаблонов
- `GET /api/templates/:id` - Получить шаблон
- `POST /api/templates/:id/like` - Лайкнуть шаблон

### Гости
- `GET /api/guests` - Список гостей
- `POST /api/guests` - Добавить гостя
- `PUT /api/guests/:id` - Обновить гостя
- `DELETE /api/guests/:id` - Удалить гостя

## 🎨 Шаблоны приглашений

Платформа включает готовые шаблоны в различных стилях:
- **Классические** - элегантные и традиционные
- **Современные** - минималистичные и стильные
- **Романтичные** - нежные и чувственные
- **Минималистичные** - простые и элегантные
- **Винтажные** - ретро стиль

## 🔧 Настройка для продакшена

### Backend
```bash
# Сборка
npm run build

# Запуск в продакшене
npm start
```

### Frontend
```bash
# Сборка
npm run build

# Запуск в продакшене
npm start
```

### Переменные окружения для продакшена
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-secure-jwt-secret
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
CORS_ORIGIN=https://your-domain.com
```

## 📱 Функции

### ✅ Реализовано:
- [x] Аутентификация и авторизация
- [x] CRUD операции для приглашений
- [x] Управление гостями
- [x] Редактор приглашений
- [x] Галерея шаблонов
- [x] Публичные страницы приглашений
- [x] RSVP система
- [x] Адаптивный дизайн
- [x] Дашборд с аналитикой
- [x] Настройки пользователя
- [x] Генерация PDF
- [x] Отправка email/SMS
- [x] Загрузка изображений

### 🚧 В разработке:
- [ ] Платежная система
- [ ] Продвинутая аналитика
- [ ] Мобильное приложение
- [ ] Интеграция с календарями
- [ ] Многоязычность
- [ ] Темная тема

## 🤝 Вклад в проект

1. Fork репозитория
2. Создать ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Открыть Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

Если у вас есть вопросы или проблемы:
- Создайте Issue в репозитории
- Обратитесь к документации в папке docs/
- Проверьте примеры в папке examples/

## 🎯 Roadmap

### Версия 2.0
- [ ] Платежная интеграция (Stripe)
- [ ] Продвинутая аналитика
- [ ] API для мобильных приложений
- [ ] Интеграция с социальными сетями

### Версия 3.0
- [ ] Искусственный интеллект для дизайна
- [ ] Виртуальная реальность для предпросмотра
- [ ] Интеграция с планировщиками мероприятий
- [ ] Многоязычная поддержка

---

**Создано с ❤️ для всех влюбленных пар** 