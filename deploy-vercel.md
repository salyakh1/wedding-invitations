# 🚀 Деплой на Vercel + Supabase

## 📋 Пошаговая инструкция

### **Шаг 1: Подготовка GitHub**

1. **Создайте репозиторий на GitHub:**
   - Перейдите на [github.com](https://github.com)
   - Нажмите "New repository"
   - Назовите: `wedding-invitations`
   - Сделайте публичным
   - Нажмите "Create repository"

2. **Загрузите код в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wedding-invitations.git
   git push -u origin main
   ```

### **Шаг 2: Настройка Supabase**

1. **Создайте аккаунт на Supabase:**
   - Перейдите на [supabase.com](https://supabase.com)
   - Нажмите "Start your project"
   - Войдите через GitHub

2. **Создайте новый проект:**
   - Нажмите "New Project"
   - Выберите организацию
   - Назовите проект: `wedding-invitations`
   - Введите пароль для базы данных
   - Выберите регион (ближайший к вам)
   - Нажмите "Create new project"

3. **Получите данные для подключения:**
   - В проекте перейдите в Settings > API
   - Скопируйте:
     - Project URL
     - anon public key
     - service_role secret key
     - Database password

### **Шаг 3: Настройка Vercel**

1. **Создайте аккаунт на Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Войдите через GitHub

2. **Импортируйте проект:**
   - Нажмите "New Project"
   - Выберите репозиторий `wedding-invitations`
   - Нажмите "Import"

3. **Настройте переменные окружения:**
   - В проекте перейдите в Settings > Environment Variables
   - Добавьте следующие переменные:

   ```env
   # Supabase Database
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Frontend URL
   FRONTEND_URL=https://your-project.vercel.app
   
   # CORS
   CORS_ORIGIN=https://your-project.vercel.app
   ```

4. **Настройте Build Command:**
   - В настройках проекта найдите "Build & Development Settings"
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/.next`
   - Install Command: `npm run install:all`

### **Шаг 4: Деплой**

1. **Запустите деплой:**
   - Нажмите "Deploy" в Vercel
   - Дождитесь завершения сборки

2. **Настройте базу данных:**
   - После успешного деплоя перейдите в Vercel Functions
   - Найдите функцию `/api/health`
   - Проверьте, что она работает

3. **Запустите миграции:**
   - В Supabase перейдите в SQL Editor
   - Выполните команду: `npx prisma db push`

### **Шаг 5: Тестирование**

1. **Откройте ваш сайт:**
   - URL будет: `https://your-project.vercel.app`

2. **Протестируйте функции:**
   - Регистрация/вход
   - Создание приглашения
   - Генерация QR-кода
   - Публичная страница приглашения

## 🎯 Результат

После выполнения всех шагов у вас будет:
- ✅ Рабочий сайт: `https://your-project.vercel.app`
- ✅ База данных в облаке
- ✅ QR-коды для приглашений
- ✅ Система заказов
- ✅ Доступ с любого устройства

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте логи в Vercel
2. Проверьте подключение к базе данных в Supabase
3. Убедитесь, что все переменные окружения настроены правильно 