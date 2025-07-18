# Инструкция по установке и запуску

## 🚀 Быстрый старт

### Предварительные требования

1. **Node.js 18+** - [Скачать с официального сайта](https://nodejs.org/)
2. **PostgreSQL 12+** - [Скачать с официального сайта](https://www.postgresql.org/download/)
3. **Git** - [Скачать с официального сайта](https://git-scm.com/)

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd wedding-invitations-mvp
```

### 2. Установка зависимостей

```bash
# Установка всех зависимостей
npm run install:all
```

### 3. Настройка базы данных

#### Создание базы данных PostgreSQL:

```bash
# Подключитесь к PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE wedding_invitations;

# Выйдите из psql
\q
```

#### Настройка переменных окружения:

```bash
# Скопируйте примеры .env файлов
cp backend/env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

#### Отредактируйте `backend/.env`:

```env
# База данных
DATABASE_URL="postgresql://username:password@localhost:5432/wedding_invitations"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Сервер
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"

# Email (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourdomain.com"

# SMS (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Файлы
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=10485760

# Сайт
SITE_URL="http://localhost:3000"
API_URL="http://localhost:3001"
```

#### Отредактируйте `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Инициализация базы данных

```bash
# Перейдите в папку backend
cd backend

# Генерация Prisma клиента
npx prisma generate

# Применение схемы к базе данных
npx prisma db push

# Заполнение базы данных начальными данными
npx prisma db seed
```

### 5. Запуск в режиме разработки

#### Вариант 1: Запуск всего проекта

```bash
# В корневой папке проекта
npm run dev
```

#### Вариант 2: Запуск по отдельности

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Проверка работы

После запуска откройте в браузере:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 📋 Тестовые данные

После выполнения `npx prisma db seed` будут созданы:

### Тестовый пользователь:
- **Email**: test@example.com
- **Пароль**: test123

### Тестовый сайт приглашения:
- **URL**: http://localhost:3000/site/test-wedding

### Шаблоны:
- Классический (бесплатный)
- Современный (премиум)
- Романтический (бесплатный)

## 🛠 Команды разработки

### Backend

```bash
cd backend

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн версии
npm start

# Работа с базой данных
npx prisma studio          # Открыть Prisma Studio
npx prisma db push         # Применить изменения схемы
npx prisma db seed         # Заполнить тестовыми данными
npx prisma generate        # Обновить Prisma клиент
```

### Frontend

```bash
cd frontend

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн версии
npm start

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

## 🔧 Настройка для продакшена

### Backend (Railway/Heroku)

1. Создайте аккаунт на Railway или Heroku
2. Подключите репозиторий
3. Настройте переменные окружения
4. Добавьте PostgreSQL базу данных

### Frontend (Vercel)

1. Создайте аккаунт на Vercel
2. Подключите репозиторий
3. Настройте переменные окружения
4. Деплой автоматический при push в main

### Переменные окружения для продакшена

```env
# Backend
DATABASE_URL="postgresql://..."
JWT_SECRET="your-production-secret"
NODE_ENV=production
CORS_ORIGIN="https://yourdomain.com"
SENDGRID_API_KEY="your-sendgrid-key"
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"

# Frontend
NEXT_PUBLIC_API_URL="https://your-api-domain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

## 🐛 Решение проблем

### Ошибка подключения к базе данных

```bash
# Проверьте, что PostgreSQL запущен
sudo systemctl status postgresql

# Проверьте подключение
psql -U postgres -d wedding_invitations
```

### Ошибка портов

```bash
# Проверьте, какие порты заняты
lsof -i :3000
lsof -i :3001

# Убейте процессы если нужно
kill -9 <PID>
```

### Ошибки зависимостей

```bash
# Очистите кэш npm
npm cache clean --force

# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

### Ошибки TypeScript

```bash
# Проверьте типы
npm run type-check

# Обновите TypeScript
npm install typescript@latest
```

## 📚 Дополнительные ресурсы

- [Next.js документация](https://nextjs.org/docs)
- [Express.js документация](https://expressjs.com/)
- [Prisma документация](https://www.prisma.io/docs)
- [Tailwind CSS документация](https://tailwindcss.com/docs)
- [Zustand документация](https://github.com/pmndrs/zustand)

## 🤝 Поддержка

Если у вас возникли проблемы:

1. Проверьте раздел "Решение проблем" выше
2. Создайте Issue в репозитории
3. Опишите проблему подробно с логами ошибок

## 📄 Лицензия

MIT License - см. файл LICENSE для подробностей. 