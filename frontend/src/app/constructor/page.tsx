"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ConstructorPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartConstructor = () => {
    setIsLoading(true);
    // Здесь будет переход к полному конструктору
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Конструктор свадебных приглашений
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Создайте красивое приглашение на вашу свадьбу
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Добро пожаловать в конструктор!
              </h2>
              <p className="text-gray-600 mb-6">
                Здесь вы сможете создать уникальное свадебное приглашение с красивым дизайном
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleStartConstructor}
                disabled={isLoading}
                className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Загрузка...' : 'Начать создание приглашения'}
              </button>

              <Link
                href="/templates"
                className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors text-center"
              >
                Посмотреть шаблоны
              </Link>

              <Link
                href="/dashboard"
                className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors text-center"
              >
                Перейти в панель управления
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Возможности конструктора:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Красивые шаблоны приглашений</li>
                <li>• Настройка цветов и шрифтов</li>
                <li>• Добавление фотографий</li>
                <li>• Таймер обратного отсчета</li>
                <li>• Поделиться с гостями</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 