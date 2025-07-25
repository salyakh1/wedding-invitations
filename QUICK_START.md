# 🚀 Быстрый запуск для продакшена

## Вариант 1: Локальный сервер (Быстро)

### 1. Узнайте ваш IP-адрес
```bash
ipconfig
```
Найдите строку "IPv4 Address" (например, 192.168.1.100)

### 2. Создайте файл .env.local в папке frontend
```
NEXT_PUBLIC_SITE_URL=http://ВАШ_IP_АДРЕС:3000
NEXT_PUBLIC_API_URL=http://ВАШ_IP_АДРЕС:3001
```

### 3. Откройте порты в брандмауэре
1. Откройте "Брандмауэр Защитника Windows"
2. "Дополнительные параметры" → "Правила для входящих подключений"
3. "Создать правило" → "Для порта"
4. Укажите порты: 3000, 3001
5. "Разрешить подключение"

### 4. Запустите серверы
```bash
# Терминал 1 - Frontend
cd frontend
npm run dev:external

# Терминал 2 - Backend  
cd backend
npm run dev
```

### 5. Поделитесь ссылкой
Теперь клиенты могут открыть: `http://ВАШ_IP_АДРЕС:3000`

---

## Вариант 2: Бесплатный хостинг (Рекомендуется)

### Vercel (5 минут)
1. Зарегистрируйтесь на https://vercel.com
2. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Разверните:
   ```bash
   vercel
   ```

### Netlify (5 минут)
1. Зарегистрируйтесь на https://netlify.com
2. Подключите GitHub репозиторий
3. Настройте сборку:
   - Build command: `npm run build`
   - Publish directory: `out`

---

## Проверка работы

### Тест на телефоне:
1. Откройте браузер на телефоне
2. Перейдите по ссылке: `http://ВАШ_IP_АДРЕС:3000`
3. Создайте тестовое приглашение
4. Отправьте ссылку на другой телефон

### Тест QR-кода:
1. Создайте приглашение
2. Скачайте QR-код
3. Отсканируйте с телефона
4. Проверьте открытие страницы

---

## Решение проблем

### Если не открывается:
1. Проверьте IP-адрес: `ipconfig`
2. Проверьте брандмауэр
3. Попробуйте другой порт
4. Используйте Vercel/Netlify

### Если медленно работает:
1. Используйте Vercel/Netlify
2. Настройте CDN
3. Оптимизируйте изображения

---

## Для 5+ заказов в день

### Рекомендуемая схема:
- **Frontend**: Vercel (бесплатно)
- **Backend**: Railway или Supabase (бесплатно)
- **База данных**: PostgreSQL на Railway
- **Домен**: Купите домен (1000₽/год)

### Настройка домена:
1. Купите домен (например, weddinginvitations.ru)
2. Настройте DNS на Vercel/Netlify
3. Обновите переменные окружения

---

## Мониторинг

### Бесплатные инструменты:
- **UptimeRobot**: Мониторинг доступности
- **Google Analytics**: Статистика посещений
- **Vercel Analytics**: Встроенная аналитика

### Уведомления:
- Настройте уведомления о новых заказах
- Мониторинг ошибок
- Автоматические бэкапы

---

## Готово! 🎉

Теперь ваш проект готов к приему заказов. Клиенты смогут:
- Открывать приглашения на любых устройствах
- Сканировать QR-коды
- Отвечать на RSVP
- Делиться ссылками

**Следующий шаг**: Настройте платежи и аналитику для масштабирования бизнеса. 