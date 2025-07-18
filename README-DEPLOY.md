# 🚀 Быстрый деплой на Vercel + Supabase

## ⚡ Быстрый старт (15 минут)

### 1. **Подготовьте код**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### 2. **Создайте Supabase проект**
- Перейдите на [supabase.com](https://supabase.com)
- Создайте новый проект
- Скопируйте DATABASE_URL из Settings > API

### 3. **Деплой на Vercel**
- Перейдите на [vercel.com](https://vercel.com)
- Импортируйте ваш GitHub репозиторий
- Добавьте переменные окружения (см. ниже)
- Нажмите Deploy

## 🔧 Переменные окружения для Vercel

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app
```

## 🎯 Результат

После деплоя у вас будет:
- ✅ Сайт: `https://your-project.vercel.app`
- ✅ QR-коды для приглашений
- ✅ Система заказов
- ✅ Доступ с телефона

## 📱 Для клиентов

Отправляйте клиентам:
- QR-коды приглашений
- Прямые ссылки: `https://your-project.vercel.app/invitation/[slug]`

## 🆘 Если что-то не работает

1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все переменные окружения добавлены
3. Проверьте подключение к базе данных в Supabase 