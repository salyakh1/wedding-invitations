"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaPalette, FaGlobe, FaUserFriends, FaEnvelopeOpenText, FaGlassCheers, FaSave, FaShare, FaQrcode } from 'react-icons/fa';
import QRCode from 'qrcode.react';

type Block = {
  id: string;
  type: 'text' | 'photo' | 'date' | 'signature' | 'menu' | 'wishes' | 'note' | 'map' | 'video' | 'names' | 'message' | 'datetime' | 'venue' | 'address' | 'wishes-slider' | 'countdown' | 'cortege';
  label?: string;
  value?: string;
  image?: string;
  videoUrl?: string;
  videoShape?: 'circle' | 'rect';
  videoSize?: number;
  videoType?: 'file' | 'youtube' | 'audio';
  audioBlob?: string;
  wishes?: string[];
  countdownScale?: number;
  cortegeTime?: string;
  cortegeRoute?: string;
};

const defaultData = {
  groom: 'Имя жениха',
  bride: 'Имя невесты',
  date: '2025-06-15',
  time: '16:00',
  place: 'Название ЗАГСа, ресторан',
  address: 'Адрес места',
  message: 'Мы рады сообщить Вам, что состоится главное торжество в нашей жизни — день нашей свадьбы!'
};

const defaultBlocks: Block[] = [
  { id: '1', type: 'names', label: 'Имена', value: `${defaultData.groom} & ${defaultData.bride}` },
  { id: '2', type: 'message', label: 'Сообщение', value: defaultData.message },
  { id: '3', type: 'datetime', label: 'Дата и время', value: `${defaultData.date} в ${defaultData.time}` },
  { id: '4', type: 'venue', label: 'Место', value: defaultData.place },
  { id: '5', type: 'address', label: 'Адрес', value: defaultData.address },
  { id: '6', type: 'countdown', label: 'Таймер', countdownScale: 1 },
  { id: '7', type: 'wishes-slider', label: 'Пожелания гостей', wishes: [
    'Счастья и любви на долгие годы!',
    'Пусть ваша семья будет крепкой и дружной!',
    'Желаем яркой и незабываемой свадьбы!'
  ]},
  { id: '8', type: 'wishes', label: 'Пожелания', value: 'Желаем счастья и любви!' },
];

export default function ConstructorPage() {
  const [data, setData] = useState(defaultData);
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks);
  const [bg, setBg] = useState<string | null>(null);
  const [color, setColor] = useState({ name: 'Классика', bg: 'bg-neutral-900', text: 'text-white', accent: 'text-primary-400', border: 'border-neutral-700' });
  const [font, setFont] = useState({ name: 'Montserrat', class: 'font-montserrat' });
  const fileInput = useRef<HTMLInputElement>(null);
  const [countdown, setCountdown] = useState({
    weeks: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    finished: false,
  });
  const [timerScale, setTimerScale] = useState(1);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const musicInput = useRef<HTMLInputElement>(null);
  const [blur, setBlur] = useState(8);
  const [blocksOffset, setBlocksOffset] = useState(0);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [textColorType, setTextColorType] = useState<'all' | 'headings' | 'main' | 'accent'>('all');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wishSlide, setWishSlide] = useState(0);
  const [wishInput, setWishInput] = useState('');

  const blurStyle = {
    backdropFilter: `blur(${blur}px)`,
    background: `rgba(255,255,255,${0.10 + blur/50})`,
    transition: 'backdrop-filter 0.2s, background 0.2s',
  };

  const addBlock = (type: Block['type'] = 'text') => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      label: 'Новый блок',
      value: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const updateBlock = (id: string, value: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...value } : block
    ));
  };

  const saveInvitation = async () => {
    try {
      const invitationData = {
        data,
        blocks,
        color,
        font,
        bg
      };
      
      localStorage.setItem('weddingInvitationData', JSON.stringify(data));
      localStorage.setItem('weddingInvitationBlocks', JSON.stringify(blocks));
      localStorage.setItem('weddingInvitationColor', JSON.stringify(color));
      localStorage.setItem('weddingInvitationFont', JSON.stringify(font));
      if (bg) localStorage.setItem('weddingInvitationBg', bg);
      
      alert('Приглашение сохранено!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения');
    }
  };

  const publishInvitation = async () => {
    try {
      // Здесь будет логика публикации
      setShowPublishModal(true);
    } catch (error) {
      console.error('Ошибка публикации:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Конструктор свадебных приглашений
          </h1>
          <p className="text-lg text-gray-600">
            Создайте красивое приглашение на вашу свадьбу
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Панель инструментов */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Инструменты</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => addBlock('text')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Добавить текст
              </button>
              
              <button
                onClick={() => addBlock('photo')}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Добавить фото
              </button>
              
              <button
                onClick={saveInvitation}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                Сохранить
              </button>
              
              <button
                onClick={publishInvitation}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Опубликовать
              </button>
            </div>
          </div>

          {/* Предварительный просмотр */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Предварительный просмотр</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px]">
              {blocks.map((block) => (
                <div key={block.id} className="mb-4 p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-sm text-gray-600 mb-1">
                    {block.label}
                  </div>
                  <div className="text-gray-800">
                    {block.value || 'Пустой блок'}
                  </div>
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="mt-2 text-red-500 text-sm hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              ))}
              
              {blocks.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Добавьте блоки для создания приглашения
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 