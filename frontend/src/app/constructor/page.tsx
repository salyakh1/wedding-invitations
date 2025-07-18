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
  videoSize?: number; // px
  videoType?: 'file' | 'youtube' | 'audio'; // тип видео: файл, YouTube, аудио
  audioBlob?: string; // для голосовых сообщений
  wishes?: string[]; // для слайдера пожеланий
  countdownScale?: number; // для таймера
  cortegeTime?: string; // время выезда за невестой
  cortegeRoute?: string; // маршрут выезда за невестой
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

const colorSchemes = [
  { name: 'Классика', bg: 'bg-neutral-900', text: 'text-white', accent: 'text-primary-400', border: 'border-neutral-700' },
  { name: 'Розовый', bg: 'bg-pink-900', text: 'text-pink-50', accent: 'text-pink-300', border: 'border-pink-800' },
  { name: 'Зелёный', bg: 'bg-green-900', text: 'text-green-50', accent: 'text-green-300', border: 'border-green-800' },
  { name: 'Синий', bg: 'bg-blue-900', text: 'text-blue-50', accent: 'text-blue-300', border: 'border-blue-800' },
  { name: 'Фиолетовый', bg: 'bg-purple-900', text: 'text-purple-50', accent: 'text-purple-300', border: 'border-purple-800' },
  { name: 'Красный', bg: 'bg-red-900', text: 'text-red-50', accent: 'text-red-300', border: 'border-red-800' },
  { name: 'Оранжевый', bg: 'bg-orange-900', text: 'text-orange-50', accent: 'text-orange-300', border: 'border-orange-800' },
  { name: 'Жёлтый', bg: 'bg-yellow-900', text: 'text-yellow-50', accent: 'text-yellow-300', border: 'border-yellow-800' },
  { name: 'Бирюзовый', bg: 'bg-teal-900', text: 'text-teal-50', accent: 'text-teal-300', border: 'border-teal-800' },
  { name: 'Циан', bg: 'bg-cyan-900', text: 'text-cyan-50', accent: 'text-cyan-300', border: 'border-cyan-800' },
  { name: 'Индиго', bg: 'bg-indigo-900', text: 'text-indigo-50', accent: 'text-indigo-300', border: 'border-indigo-800' },
  { name: 'Лайм', bg: 'bg-lime-900', text: 'text-lime-50', accent: 'text-lime-300', border: 'border-lime-800' },
  { name: 'Эмбер', bg: 'bg-amber-900', text: 'text-amber-50', accent: 'text-amber-300', border: 'border-amber-800' },
  { name: 'Розовый светлый', bg: 'bg-pink-800', text: 'text-pink-100', accent: 'text-pink-200', border: 'border-pink-700' },
  { name: 'Синий светлый', bg: 'bg-blue-800', text: 'text-blue-100', accent: 'text-blue-200', border: 'border-blue-700' },
  { name: 'Зелёный светлый', bg: 'bg-green-800', text: 'text-green-100', accent: 'text-green-200', border: 'border-green-700' },
  { name: 'Фиолетовый светлый', bg: 'bg-purple-800', text: 'text-purple-100', accent: 'text-purple-200', border: 'border-purple-700' },
  { name: 'Красный светлый', bg: 'bg-red-800', text: 'text-red-100', accent: 'text-red-200', border: 'border-red-700' },
  { name: 'Оранжевый светлый', bg: 'bg-orange-800', text: 'text-orange-100', accent: 'text-orange-200', border: 'border-orange-700' },
  { name: 'Бирюзовый светлый', bg: 'bg-teal-800', text: 'text-teal-100', accent: 'text-teal-200', border: 'border-teal-700' },
  { name: 'Циан светлый', bg: 'bg-cyan-800', text: 'text-cyan-100', accent: 'text-cyan-200', border: 'border-cyan-700' },
  { name: 'Индиго светлый', bg: 'bg-indigo-800', text: 'text-indigo-100', accent: 'text-indigo-200', border: 'border-indigo-700' },
  { name: 'Лайм светлый', bg: 'bg-lime-800', text: 'text-lime-100', accent: 'text-lime-200', border: 'border-lime-700' },
  { name: 'Эмбер светлый', bg: 'bg-amber-800', text: 'text-amber-100', accent: 'text-amber-200', border: 'border-amber-700' },
];

const fonts = [
  { name: 'Montserrat', class: 'font-montserrat' },
  { name: 'Playfair Display', class: 'font-playfair' },
  { name: 'Dancing Script', class: 'font-dancing' },
  { name: 'Great Vibes', class: 'font-greatvibes' },
  { name: 'Pacifico', class: 'font-pacifico' },
  { name: 'Parisienne', class: 'font-parisienne' },
  { name: 'Satisfy', class: 'font-satisfy' },
  { name: 'Lora', class: 'font-lora' },
  { name: 'Roboto', class: 'font-roboto' },
  { name: 'Cormorant Garamond', class: 'font-cormorant' },
  { name: 'Marck Script', class: 'font-marck' },
  { name: 'Alex Brush', class: 'font-alexbrush' },
];

const menu = [
  { icon: <FaPalette size={22} />, label: 'Стиль' },
  { icon: <FaGlobe size={22} />, label: 'Сайт' },
  { icon: <FaUserFriends size={22} />, label: 'Гости' },
  { icon: <FaEnvelopeOpenText size={22} />, label: 'Приглашения' },
  { icon: <FaGlassCheers size={22} />, label: 'Банкет' },
];

const blockTypes = [
  { type: 'names', label: 'Имена жениха и невесты' },
  { type: 'message', label: 'Текст приглашения' },
  { type: 'datetime', label: 'Дата и время' },
  { type: 'venue', label: 'Место проведения' },
  { type: 'address', label: 'Адрес' },
  { type: 'countdown', label: 'Таймер обратного отсчета' },
  { type: 'wishes-slider', label: 'Слайдер пожеланий' },
  { type: 'cortege', label: 'Выезд за невестой' },
  { type: 'text', label: 'Произвольный текст' },
  { type: 'photo', label: 'Фото' },
  { type: 'date', label: 'Дата' },
  { type: 'signature', label: 'Подпись' },
  { type: 'menu', label: 'Меню' },
  { type: 'wishes', label: 'Пожелания' },
  { type: 'note', label: 'Примечание' },
  { type: 'map', label: 'Карта' },
  { type: 'video', label: 'Видео' },
];

export default function ConstructorPage() {
  // Загружаем сохраненные данные из localStorage или используем дефолтные
  const loadSavedData = () => {
    try {
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem('weddingInvitationData');
        const savedBlocks = localStorage.getItem('weddingInvitationBlocks');
        const savedColor = localStorage.getItem('weddingInvitationColor');
        const savedFont = localStorage.getItem('weddingInvitationFont');
        const savedBg = localStorage.getItem('weddingInvitationBg');
        
        return {
          data: savedData ? JSON.parse(savedData) : defaultData,
          blocks: savedBlocks ? JSON.parse(savedBlocks) : defaultBlocks,
          color: savedColor ? JSON.parse(savedColor) : colorSchemes[0],
          font: savedFont ? JSON.parse(savedFont) : fonts[0],
          bg: savedBg || null
        };
      }
      return {
        data: defaultData,
        blocks: defaultBlocks,
        color: colorSchemes[0],
        font: fonts[0],
        bg: null
      };
    } catch (error) {
      console.error('Ошибка загрузки данных из localStorage:', error);
      return {
        data: defaultData,
        blocks: defaultBlocks,
        color: colorSchemes[0],
        font: fonts[0],
        bg: null
      };
    }
  };

  const savedData = loadSavedData();
  
  const [data, setData] = useState(savedData.data);
  const [blocks, setBlocks] = useState<Block[]>(savedData.blocks);
  const [bg, setBg] = useState<string | null>(savedData.bg);
  const [color, setColor] = useState(savedData.color);
  const [font, setFont] = useState(savedData.font);
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
  const [blur, setBlur] = useState(8); // px, по умолчанию 8
  const blurStyle = {
    backdropFilter: `blur(${blur}px)`,
    background: `rgba(255,255,255,${0.10 + blur/50})`,
    transition: 'backdrop-filter 0.2s, background 0.2s',
  };
  const [blocksOffset, setBlocksOffset] = useState(0); // px
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

  // Функция для получения цвета текста в зависимости от типа
  const getTextColor = (type: 'headings' | 'main' | 'accent') => {
    if (textColorType === 'all') return color.text;
    if (textColorType === type) return color.text;
    if (textColorType === 'headings' && type === 'headings') return color.text;
    if (textColorType === 'main' && type === 'main') return color.text;
    if (textColorType === 'accent' && type === 'accent') return color.text;
    return color.text; // fallback
  };

  const getAccentColor = (type: 'headings' | 'main' | 'accent') => {
    if (textColorType === 'all') return color.accent;
    if (textColorType === type) return color.accent;
    if (textColorType === 'headings' && type === 'headings') return color.accent;
    if (textColorType === 'main' && type === 'main') return color.accent;
    if (textColorType === 'accent' && type === 'accent') return color.accent;
    return color.accent; // fallback
  };



  useEffect(() => {
    function updateCountdown() {
      try {
        const eventDate = new Date(`${data.date}T${data.time || '00:00'}`);
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();
        if (isNaN(eventDate.getTime()) || diff <= 0) {
          setCountdown(c => ({ ...c, finished: true }));
          return;
        }
        let totalSeconds = Math.floor(diff / 1000);
        const weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
        totalSeconds -= weeks * 7 * 24 * 60 * 60;
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds -= days * 24 * 60 * 60;
        const hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds -= hours * 60 * 60;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds - minutes * 60;
        setCountdown({
          weeks: weeks.toString().padStart(2, '0'),
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0'),
          finished: false,
        });
      } catch (error) {
        console.error('Ошибка обновления таймера:', error);
      }
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [data.date, data.time]);

  // Автослайдер для пожеланий
  useEffect(() => {
    try {
      const wishesSliderBlock = blocks.find(b => b.type === 'wishes-slider');
      if (!wishesSliderBlock || (wishesSliderBlock.wishes || []).length < 2) return;
      
      const timer = setInterval(() => {
        setWishSlide(s => (s + 1) % (wishesSliderBlock.wishes || []).length);
      }, 3000);
      
      return () => clearInterval(timer);
    } catch (error) {
      console.error('Ошибка в автослайдере пожеланий:', error);
    }
  }, [blocks]);

  const addBlock = (type: Block['type'] = 'text') => {
    try {
      const newBlock: Block = {
        id: Date.now().toString(),
        type,
        label: blockTypes.find(b => b.type === type)?.label || 'Новый блок',
        value: '',
        image: undefined
      };
      
      // Специальные настройки для видео блока
      if (type === 'video') {
        newBlock.videoType = 'youtube';
        newBlock.videoShape = 'rect';
        newBlock.videoSize = 180;
        newBlock.videoUrl = '';
      }
      
      // Специальные настройки для блока кортежа
      if (type === 'cortege') {
        newBlock.cortegeTime = '14:00';
        newBlock.cortegeRoute = 'Маршрут выезда за невестой будет объявлен позже';
      }
      
      setBlocks([...blocks, newBlock]);
    } catch (error) {
      console.error('Ошибка добавления блока:', error);
    }
  };
  const removeBlock = (id: string) => {
    try {
      setBlocks(blocks.filter(b => b.id !== id));
    } catch (error) {
      console.error('Ошибка удаления блока:', error);
    }
  };
  const updateBlock = (id: string, value: Partial<Block>) => {
    try {
      setBlocks(blocks.map(b => b.id === id ? { ...b, ...value } : b));
    } catch (error) {
      console.error('Ошибка обновления блока:', error);
    }
  };

  // Функции для сохранения и публикации
  const saveInvitation = async () => {
    try {
      const invitationData = {
        id: invitationId || Date.now().toString(),
        title: `${data.groom} и ${data.bride}`,
        description: data.message,
        eventDate: data.date,
        eventTime: data.time,
        venue: data.place,
        venueAddress: data.address,
        primaryColor: color.bg.replace('bg-', '#'),
        secondaryColor: color.accent.replace('text-', '#'),
        fontFamily: font.class,
        blocks: blocks,
        colorScheme: {
          headingColor: getTextColor('headings'),
          mainTextColor: getTextColor('main'),
          accentColor: getAccentColor('accent')
        },
        backgroundImage: bg
      };

      // В реальном приложении здесь будет API запрос
      console.log('Сохранение приглашения:', invitationData);
      
      if (!invitationId) {
        setInvitationId(invitationData.id);
      }
      
      // Показать уведомление об успехе
      alert('Приглашение сохранено!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении');
    }
  };

  const publishInvitation = async () => {
    if (!invitationId) {
      await saveInvitation();
    }
    setShowPublishModal(true);
  };

  const copyInvitationLink = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInvitation = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Свадебное приглашение',
        url: link,
      });
    } else {
      copyInvitationLink();
    }
  };

  // Новая функция для отправки через WhatsApp
  const shareViaWhatsApp = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    const message = `Приглашаем вас на нашу свадьбу! 🎉\n\nОткройте приглашение по ссылке:\n${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Новая функция для отправки через Telegram
  const shareViaTelegram = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    const message = `Приглашаем вас на нашу свадьбу! 🎉\n\nОткройте приглашение по ссылке:\n${link}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  // Новая функция для отправки через Email
  const shareViaEmail = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    const subject = 'Приглашение на свадьбу';
    const body = `Дорогие друзья!\n\nПриглашаем вас на нашу свадьбу! 🎉\n\nОткройте приглашение по ссылке:\n${link}\n\nС нетерпением ждем встречи!\n\nС любовью,\n${data.groom} и ${data.bride}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  // Новая функция для создания SMS
  const shareViaSMS = () => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    const message = `Приглашаем на свадьбу! 🎉 Откройте: ${link}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl);
  };

  const updateBlockLabel = (id: string, label: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, label } : b));
  };
  const updateBlockImage = (id: string, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBlocks(blocks.map(b => b.id === id ? { ...b, image: url } : b));
  };
  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setBg(url);
    }
  };

  // Автоматическое сохранение при изменениях
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('weddingInvitationData', JSON.stringify(data));
        localStorage.setItem('weddingInvitationBlocks', JSON.stringify(blocks));
        localStorage.setItem('weddingInvitationColor', JSON.stringify(color));
        localStorage.setItem('weddingInvitationFont', JSON.stringify(font));
        localStorage.setItem('weddingInvitationBg', bg || '');
      }
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  }, [data, blocks, color, font, bg]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      {/* Фоновая музыка */}
      <audio autoPlay loop style={{ display: 'none' }} key={musicUrl || 'default'}>
        <source src={musicUrl || "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae5b6.mp3"} type="audio/mpeg" />
      </audio>
      {/* Верхние кнопки */}
      <div className="flex items-center justify-between px-8 py-4 bg-neutral-900 shadow border-b border-neutral-800">
        <div className="flex gap-4">
          <button 
            onClick={saveInvitation}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
          >
            <FaSave className="w-4 h-4" />
            Сохранить
          </button>
          <button 
            onClick={publishInvitation}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
          >
            <FaShare className="w-4 h-4" />
            Поделиться
          </button>
          <button 
            onClick={shareViaWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
            title="Отправить через WhatsApp"
          >
            📱 WhatsApp
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition">Скачать PDF</button>
        </div>
        <Link href="/templates" className="text-primary-400 hover:underline">← Назад к шаблонам</Link>
      </div>
      <div className="flex flex-1">
        {/* Левое меню */}
        <aside className="w-28 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-8 gap-8 shadow-sm">
          {menu.map((item, idx) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-1 border border-neutral-700 text-primary-400">{item.icon}</div>
              <span className="text-xs text-neutral-400">{item.label}</span>
            </div>
          ))}
        </aside>
        {/* Центр: превью приглашения в виде телефона */}
        <main className="flex-1 flex justify-center items-start py-10">
          <div className="relative flex flex-col items-center">
            <div className="w-[370px] h-[740px] rounded-[2.5rem] bg-neutral-900 border-8 border-neutral-800 shadow-2xl flex flex-col items-center overflow-hidden relative">
              {/* Фон */}
              <div className="absolute inset-0 w-full h-full z-0">
                {bg ? (
                  <img src={bg} alt="Фон" className="w-full h-full object-cover" style={{ opacity: 0.3 }} onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-60" />
                )}
              </div>
              {/* Экран приглашения */}
              <div className={`flex-1 w-full flex flex-col items-center px-4 py-6 z-10 relative overflow-y-auto ${color.bg} ${font.class}`}
                   style={{ minHeight: 0, background: 'transparent' }}>
                <div className={`w-full text-center mb-4 ${getTextColor('main')}`} style={{ marginTop: blocksOffset }}>
                  {/* Управляемые блоки рендерятся ниже */}
                  
                  {/* Рендеринг управляемых блоков */}
                  {blocks.map(b => {
                    // Обработка новых типов блоков
                    if (b.type === 'names') {
                      return (
                        <div key={b.id} className="rounded-xl p-3 my-2 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`text-2xl font-bold ${getAccentColor('headings')}`}>{b.value || `${data.groom} & ${data.bride}`}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'message') {
                      return (
                        <div key={b.id} className="rounded-xl p-3 my-2 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`${getTextColor('main')}`}>{b.value || data.message}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'datetime') {
                      // Форматируем дату для красивого отображения
                      const formatDate = (dateStr: string) => {
                        const date = new Date(dateStr);
                        const months = [
                          'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                        ];
                        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                      };
                      
                      // Всегда используем актуальную дату из календаря
                      const displayDate = `${formatDate(data.date)} в ${data.time}`;
                      
                      return (
                        <div key={b.id} className="rounded-xl p-3 my-2 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`text-lg font-semibold ${getTextColor('headings')}`}>{displayDate}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'venue') {
                      return (
                        <div key={b.id} className="rounded-xl p-3 my-2 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`${getTextColor('main')}`}>{b.value || data.place}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'address') {
                      return (
                        <div key={b.id} className="rounded-xl p-3 my-2 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`${getTextColor('main')} text-sm`}>{b.value || data.address}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'countdown') {
                      return (
                        <div key={b.id} className="w-full flex flex-col items-center justify-center my-2">
                          <div className="flex justify-end w-full max-w-xl mb-1">
                            <button
                              className="bg-neutral-800 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold border border-white/10 hover:bg-primary-700 transition mr-2"
                              onClick={() => updateBlock(b.id, { countdownScale: Math.max(0.7, (b.countdownScale || 1) - 0.1) })}
                              title="Уменьшить таймер"
                            >–</button>
                            <button
                              className="bg-neutral-800 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold border border-white/10 hover:bg-primary-700 transition"
                              onClick={() => updateBlock(b.id, { countdownScale: Math.min(2, (b.countdownScale || 1) + 0.1) })}
                              title="Увеличить таймер"
                            >+</button>
                          </div>
                          {!countdown.finished ? (
                            <div
                              className="flex flex-row items-end justify-center gap-2 rounded-xl py-2 px-1 w-full max-w-xl mx-auto shadow-lg border border-white/10"
                              style={{ ...blurStyle, transform: `scale(${b.countdownScale || 1})`, transition: `${blurStyle.transition}, transform 0.2s` }}
                            >
                              <div className="flex flex-col items-center mx-1">
                                <span className={`text-2xl md:text-3xl font-bold ${getTextColor('accent')} drop-shadow-sm`}>{countdown.weeks}</span>
                                <span className={`text-[10px] md:text-xs ${getTextColor('main')} opacity-80 mt-1`}>недель</span>
                              </div>
                              <div className="flex flex-col items-center mx-1">
                                <span className={`text-2xl md:text-3xl font-bold ${getTextColor('accent')} drop-shadow-sm`}>{countdown.days}</span>
                                <span className={`text-[10px] md:text-xs ${getTextColor('main')} opacity-80 mt-1`}>дней</span>
                              </div>
                              <div className="flex flex-col items-center mx-1">
                                <span className={`text-2xl md:text-3xl font-bold ${getTextColor('accent')} drop-shadow-sm`}>{countdown.hours}</span>
                                <span className={`text-[10px] md:text-xs ${getTextColor('main')} opacity-80 mt-1`}>часов</span>
                              </div>
                              <div className="flex flex-col items-center mx-1">
                                <span className={`text-2xl md:text-3xl font-bold ${getTextColor('accent')} drop-shadow-sm`}>{countdown.minutes}</span>
                                <span className={`text-[10px] md:text-xs ${getTextColor('main')} opacity-80 mt-1`}>минут</span>
                              </div>
                              <div className="flex flex-col items-center mx-1">
                                <span className={`text-2xl md:text-3xl font-bold ${getTextColor('accent')} drop-shadow-sm`}>{countdown.seconds}</span>
                                <span className={`text-[10px] md:text-xs ${getTextColor('main')} opacity-80 mt-1`}>секунд</span>
                              </div>
                            </div>
                          ) : (
                            <div className={`text-lg ${getAccentColor('accent')} font-semibold animate-pulse`}>Событие уже наступило!</div>
                          )}
                        </div>
                      );
                    }
                    
                    if (b.type === 'wishes-slider') {
                      const wishes = b.wishes || [];
                      const currentWish = wishes[wishSlide] || 'Нет пожеланий';
                      
                      return (
                        <div key={b.id} className="flex flex-col items-center w-full">
                          <div className="rounded-xl p-6 shadow-lg border border-white/10 transition-all text-center max-w-md mx-auto relative" style={blurStyle}>
                            <div className={`font-bold text-lg mb-2 ${getAccentColor('headings')}`}>Пожелания гостей</div>
                            <div className={`min-h-[48px] flex items-center justify-center text-base italic transition-all duration-500 ease-in-out ${getTextColor('main')}`}>
                              {currentWish}
                            </div>
                            <div className="flex justify-center gap-2 mt-2">
                              {wishes.map((_, i) => (
                                <span key={i} className={`w-2 h-2 rounded-full ${i === wishSlide ? getAccentColor('accent').replace('text-', 'bg-') : 'bg-white/20'} inline-block transition-all`}></span>
                              ))}
                            </div>
                          </div>
                          <form
                            className="flex flex-col items-center gap-2 mt-4 w-full max-w-md"
                            onSubmit={e => {
                              e.preventDefault();
                              if (wishInput.trim().length < 2) return;
                              const newWishes = [...wishes, wishInput.trim()];
                              updateBlock(b.id, { wishes: newWishes });
                              setWishInput('');
                              setWishSlide(wishes.length); // показать новое пожелание
                            }}
                          >
                            <input
                              type="text"
                              className="border border-neutral-700 bg-neutral-900 text-white rounded px-3 py-2 w-full"
                              placeholder="Оставьте своё пожелание..."
                              value={wishInput}
                              onChange={e => setWishInput(e.target.value)}
                              maxLength={200}
                            />
                            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white rounded px-4 py-2 font-semibold transition">Отправить</button>
                          </form>
                        </div>
                      );
                    }
                    
                    // Обработка существующих типов блоков
                    if (b.type === 'photo' && b.image) {
                      return (
                        <div key={b.id} className="flex flex-col items-center my-4">
                          <img src={b.image} alt="Фото" className="w-32 h-32 object-cover rounded-full border-4 border-white/30 shadow-lg" />
                        </div>
                      );
                    }
                    
                    if (b.type === 'map' && b.value) {
                      return (
                        <div
                          key={b.id}
                          className="flex flex-col items-center my-4 w-full cursor-pointer group"
                          onClick={() => {
                            const url = `https://yandex.ru/maps/?text=${encodeURIComponent(b.value)}`;
                            window.open(url, '_blank');
                          }}
                          title="Открыть карту в новой вкладке"
                        >
                          {b.label && <div className={`font-semibold mb-1 ${getAccentColor('headings')} drop-shadow-sm text-lg`}>{b.label}</div>}
                          <img
                            src={`https://static-maps.yandex.ru/1.x/?lang=ru_RU&ll=&size=350,200&z=15&l=map&pt=&pl=&text=${encodeURIComponent(b.value)}`}
                            alt="Карта"
                            className="w-full h-48 object-cover rounded-xl border border-white/10 shadow-lg group-hover:brightness-90 group-hover:scale-[1.02] transition"
                          />
                          <div className={`text-xs ${getTextColor('main')} opacity-70 mt-1 underline group-hover:${getAccentColor('accent')} transition`}>{b.value} <span className="ml-1">↗</span></div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'date') {
                      // Форматируем дату для красивого отображения
                      const formatDate = (dateStr: string) => {
                        const date = new Date(dateStr);
                        const months = [
                          'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                        ];
                        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                      };
                      
                      // Всегда используем актуальную дату из календаря
                      const displayDate = formatDate(data.date);
                      
                      return (
                        <div key={b.id} className={`text-2xl font-bold ${getAccentColor('headings')} my-4 drop-shadow-sm`}>{displayDate}</div>
                      );
                    }
                    
                    if (b.type === 'signature') {
                      return (
                        <div key={b.id} className={`italic text-xl ${getAccentColor('accent')} my-4 drop-shadow-sm`}>{b.value || 'Подпись'}</div>
                      );
                    }
                    
                    if (b.type === 'menu') {
                      return (
                        <div key={b.id} className="rounded-xl p-4 my-3 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`font-semibold mb-1 ${getAccentColor('headings')} drop-shadow-sm text-lg`}>{b.label}</div>
                          <div className={`${getTextColor('main')} drop-shadow-sm whitespace-pre-line`}>{b.value}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'wishes') {
                      return (
                        <div key={b.id} className="rounded-xl p-4 my-3 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`font-semibold mb-1 ${getAccentColor('headings')} drop-shadow-sm text-lg`}>{b.label}</div>
                          <div className={`${getTextColor('main')} drop-shadow-sm whitespace-pre-line`}>{b.value}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'note') {
                      return (
                        <div key={b.id} className="rounded-xl p-4 my-3 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`font-semibold mb-1 ${getAccentColor('headings')} drop-shadow-sm text-lg`}>{b.label}</div>
                          <div className={`${getTextColor('main')} drop-shadow-sm whitespace-pre-line`}>{b.value}</div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'video') {
                      return (
                        <div key={b.id} className="flex flex-col items-center my-4 w-full">
                          <div
                            className={`flex items-center justify-center mx-auto ${b.videoShape === 'circle' ? 'rounded-full overflow-hidden' : 'rounded-xl'} shadow-lg border border-white/10 bg-black/60`}
                            style={{ width: b.videoSize || 180, height: b.videoSize || 180 }}
                          >
                            {b.videoType === 'audio' && b.audioBlob ? (
                              <audio
                                src={b.audioBlob}
                                controls
                                style={{ width: '100%', height: '100%' }}
                              />
                            ) : b.videoType === 'youtube' && b.videoUrl ? (
                              <iframe
                                src={b.videoUrl.replace('watch?v=', 'embed/')}
                                title="YouTube video"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allowFullScreen
                              />
                            ) : b.videoUrl ? (
                              <video
                                src={b.videoUrl}
                                controls
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-white/60">
                                <div className="text-center">
                                  <div className="text-2xl mb-2">🎥</div>
                                  <div className="text-sm">Видео не выбрано</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    if (b.type === 'cortege') {
                      // Форматируем дату кортежа для красивого отображения
                      const formatDate = (dateStr: string) => {
                        if (!dateStr) return '';
                        const date = new Date(dateStr);
                        const months = [
                          'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                        ];
                        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                      };
                      
                      const cortegeTime = b.cortegeTime || '14:00';
                      const cortegeRoute = b.cortegeRoute || 'Маршрут выезда за невестой будет объявлен позже';
                      
                      return (
                        <div key={b.id} className="rounded-xl p-4 my-3 shadow-lg border border-white/10 transition-all" style={blurStyle}>
                          <div className={`font-semibold mb-3 ${getAccentColor('headings')} drop-shadow-sm text-lg text-center`}>
                            🚗 Выезд за невестой
                          </div>
                          <div className={`text-center ${getTextColor('main')} mb-3`}>
                            <div className="font-semibold mb-1">
                              В {cortegeTime}
                            </div>
                            <div className="text-sm opacity-80">
                              {cortegeRoute}
                            </div>
                          </div>
                          <div className="text-xs text-center opacity-60">
                            Приглашаем всех желающих поприветствовать молодоженов!
                          </div>
                        </div>
                      );
                    }
                    
                    // По умолчанию - обычный текстовый блок
                    return (
                      <div key={b.id} className="rounded-xl p-4 my-3 text-base shadow-lg border border-white/10 transition-all" style={blurStyle}>
                        <div className={`font-semibold mb-1 ${getAccentColor('headings')} drop-shadow-sm text-lg`}>{b.label}</div>
                        <div className={`${getTextColor('main')} drop-shadow-sm whitespace-pre-line`}>{b.value}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1 flex flex-col justify-end w-full">
                  <div className="mt-8 text-xs text-neutral-500 text-center">(Здесь будет предпросмотр выбранного стиля и фона)</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Правая панель: форма редактирования */}
        <aside className="w-[370px] bg-neutral-900 border-l border-neutral-800 shadow-sm p-8 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-primary-400">Данные приглашения</h2>
          <label className="text-sm font-semibold">Имя жениха
            <input type="text" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.groom} onChange={e => setData({ ...data, groom: e.target.value })} />
          </label>
          <label className="text-sm font-semibold">Имя невесты
            <input type="text" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.bride} onChange={e => setData({ ...data, bride: e.target.value })} />
          </label>
          <label className="text-sm font-semibold">Дата
            <input type="date" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} />
            <div className="text-xs text-neutral-400 mt-1">Таймер автоматически обновится</div>
          </label>
          <label className="text-sm font-semibold">Время
            <input type="time" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.time} onChange={e => setData({ ...data, time: e.target.value })} />
            <div className="text-xs text-neutral-400 mt-1">Таймер автоматически обновится</div>
          </label>
          <label className="text-sm font-semibold">Место
            <input type="text" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.place} onChange={e => setData({ ...data, place: e.target.value })} />
          </label>
          <label className="text-sm font-semibold">Адрес
            <input type="text" className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.address} onChange={e => setData({ ...data, address: e.target.value })} />
          </label>
          <label className="text-sm font-semibold">Текст приглашения
            <textarea className="mt-1 w-full border border-neutral-700 bg-neutral-800 text-white rounded px-3 py-2" value={data.message} onChange={e => setData({ ...data, message: e.target.value })} />
          </label>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Фон приглашения</h3>
            <input type="file" accept="image/*" ref={fileInput} onChange={handleBgChange} className="mb-2" />
            {bg && <button className="text-xs text-red-400 underline" onClick={() => setBg(null)}>Удалить фон</button>}
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Стиль приглашения</h3>
            <button
              className={`w-full py-2 px-4 rounded-lg border border-white/10 bg-neutral-800 flex items-center justify-between`}
              onClick={() => setColorPaletteOpen(v => !v)}
            >
              <span className="truncate">{color.name}</span>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${color.bg} border border-white/20`}></div>
                <svg className={`w-4 h-4 ml-2 transition-transform ${colorPaletteOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>
            {colorPaletteOpen && (
              <div className="space-y-3 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-lg p-3 z-50 relative">
                <div className="flex gap-2 mb-2">
                  <button
                    className={`px-2 py-1 text-xs rounded ${textColorType === 'all' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}
                    onClick={() => setTextColorType('all')}
                  >
                    Все тексты
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded ${textColorType === 'headings' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}
                    onClick={() => setTextColorType('headings')}
                  >
                    Заголовки
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded ${textColorType === 'main' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}
                    onClick={() => setTextColorType('main')}
                  >
                    Основной
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded ${textColorType === 'accent' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}
                    onClick={() => setTextColorType('accent')}
                  >
                    Акценты
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {colorSchemes.map((c) => (
                    <button 
                      key={c.name} 
                      className={`w-10 h-10 rounded-full border-2 ${c.bg} ${color.name === c.name ? 'border-primary-400 ring-2 ring-primary-400' : 'border-neutral-700'} hover:scale-110 transition-transform`} 
                      onClick={() => {
                        setColor(c);
                        setColorPaletteOpen(false);
                      }} 
                      title={c.name}
                    ></button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <h3 className="font-bold mb-2 text-primary-400">Шрифт приглашения</h3>
              <button
                className={`w-full py-2 px-4 rounded-lg border border-white/10 bg-neutral-800 flex items-center justify-between ${font.class}`}
                onClick={() => setFontDropdownOpen(v => !v)}
              >
                <span className="truncate">{font.name}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform ${fontDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {fontDropdownOpen && (
                <div className="grid grid-cols-3 gap-2 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-lg p-2 z-50 absolute w-[320px]">
                  {fonts.map(f => (
                    <button
                      key={f.class}
                      className={`py-2 px-2 rounded-lg text-center hover:bg-primary-900/20 transition font-semibold ${f.class} ${font.class === f.class ? 'ring-2 ring-primary-400' : ''}`}
                      style={{ fontSize: '1.1rem' }}
                      onClick={() => {
                        setFont(f);
                        setFontDropdownOpen(false);
                      }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Блоки приглашения</h3>
            <div className="flex gap-2 mb-2 flex-wrap">
              {blockTypes.map(bt => (
                <button key={bt.type} className="bg-primary-900 text-primary-200 px-3 py-1 rounded font-semibold text-sm" onClick={() => addBlock(bt.type as Block['type'])}>{bt.label}</button>
              ))}
            </div>
            {blocks.map((b, i) => (
              <div key={b.id} className="flex flex-col gap-1 mb-2 border border-neutral-700 rounded p-2 bg-neutral-800">
                <input type="text" className="font-semibold border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1 mb-1" value={b.label} onChange={e => updateBlockLabel(b.id, e.target.value)} />
                {b.type === 'names' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Имена жениха и невесты:</label>
                    <input 
                      type="text" 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Имя & Имя" 
                      value={b.value || `${data.groom} & ${data.bride}`} 
                      onChange={e => updateBlock(b.id, { value: e.target.value })} 
                    />
                  </div>
                ) : b.type === 'message' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Текст приглашения:</label>
                    <textarea 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Введите текст приглашения" 
                      value={b.value || data.message} 
                      onChange={e => updateBlock(b.id, { value: e.target.value })} 
                    />
                  </div>
                ) : b.type === 'datetime' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Дата и время:</label>
                    <div className="flex flex-col gap-2">
                      <input 
                        type="date" 
                        className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                        value={data.date} 
                        onChange={e => setData({ ...data, date: e.target.value })} 
                      />
                      <input 
                        type="time" 
                        className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                        value={data.time} 
                        onChange={e => setData({ ...data, time: e.target.value })} 
                      />
                    </div>
                    <div className="text-xs text-neutral-400">Предварительный просмотр:</div>
                    <div className="text-sm text-neutral-400 p-2 bg-neutral-800 rounded border border-neutral-700">
                      {(() => {
                        const formatDate = (dateStr: string) => {
                          const date = new Date(dateStr);
                          const months = [
                            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                          ];
                          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                        };
                        return `${formatDate(data.date)} в ${data.time}`;
                      })()}
                    </div>
                  </div>
                ) : b.type === 'venue' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Место проведения:</label>
                    <input 
                      type="text" 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Название места" 
                      value={b.value || data.place} 
                      onChange={e => updateBlock(b.id, { value: e.target.value })} 
                    />
                  </div>
                ) : b.type === 'address' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Адрес:</label>
                    <input 
                      type="text" 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Полный адрес" 
                      value={b.value || data.address} 
                      onChange={e => updateBlock(b.id, { value: e.target.value })} 
                    />
                  </div>
                ) : b.type === 'countdown' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Масштаб таймера:</label>
                    <input
                      type="range"
                      min={0.7}
                      max={2}
                      step={0.1}
                      value={b.countdownScale || 1}
                      onChange={e => updateBlock(b.id, { countdownScale: Number(e.target.value) })}
                      className="w-full accent-primary-400"
                    />
                    <div className="text-xs text-neutral-400">{(b.countdownScale || 1).toFixed(1)}x</div>
                    <div className="text-xs text-neutral-400 mt-1">Таймер автоматически показывает время до события</div>
                  </div>
                ) : b.type === 'wishes-slider' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Пожелания:</label>
                    <div className="space-y-2">
                      {(b.wishes || []).map((wish, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            className="flex-1 border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1"
                            value={wish}
                            onChange={e => {
                              const newWishes = [...(b.wishes || [])];
                              newWishes[index] = e.target.value;
                              updateBlock(b.id, { wishes: newWishes });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newWishes = (b.wishes || []).filter((_, i) => i !== index);
                              updateBlock(b.id, { wishes: newWishes });
                            }}
                            className="text-red-400 hover:text-red-300 px-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newWishes = [...(b.wishes || []), 'Новое пожелание'];
                          updateBlock(b.id, { wishes: newWishes });
                        }}
                        className="text-primary-400 hover:text-primary-300 text-sm"
                      >
                        + Добавить пожелание
                      </button>
                    </div>
                  </div>
                ) : b.type === 'photo' ? (
                  <>
                    <input type="file" accept="image/*" onChange={e => updateBlockImage(b.id, e.target.files?.[0] || null)} />
                    {b.image && <img src={b.image} alt="Фото" className="w-24 h-24 object-cover rounded-full mx-auto mt-2" />}
                  </>
                ) : b.type === 'map' ? (
                  <input type="text" className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" placeholder="Адрес или координаты" value={b.value} onChange={e => updateBlock(b.id, { value: e.target.value })} />
                ) : b.type === 'video' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Тип медиа:</label>
                    <div className="flex gap-2 mb-2">
                      <button
                        className={`px-3 py-1 rounded border text-sm ${b.videoType === 'youtube' ? 'border-primary-400 bg-primary-950 text-primary-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                        onClick={() => updateBlock(b.id, { videoType: 'youtube' })}
                      >YouTube</button>
                      <button
                        className={`px-3 py-1 rounded border text-sm ${b.videoType === 'file' ? 'border-primary-400 bg-primary-950 text-primary-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                        onClick={() => updateBlock(b.id, { videoType: 'file' })}
                      >Файл</button>
                      <button
                        className={`px-3 py-1 rounded border text-sm ${b.videoType === 'audio' ? 'border-primary-400 bg-primary-950 text-primary-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                        onClick={() => updateBlock(b.id, { videoType: 'audio' })}
                      >Аудио</button>
                    </div>
                    
                    {b.videoType === 'youtube' && (
                      <>
                        <label className="font-semibold">Ссылка на YouTube:</label>
                        <input
                          type="text"
                          className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1"
                          value={b.videoUrl || ''}
                          onChange={e => updateBlock(b.id, { videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </>
                    )}
                    
                    {b.videoType === 'file' && (
                      <>
                        <label className="font-semibold">Загрузить видео файл:</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              const url = URL.createObjectURL(e.target.files[0]);
                              updateBlock(b.id, { videoUrl: url });
                            }
                          }}
                          className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1"
                        />
                      </>
                    )}
                    
                    {b.videoType === 'audio' && (
                      <>
                        <label className="font-semibold">Голосовое сообщение:</label>
                        <div className="flex flex-col gap-2">
                          <button
                            className={`px-3 py-2 rounded border text-sm ${b.audioBlob ? 'border-green-400 bg-green-950 text-green-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                            onClick={() => {
                              // Здесь будет логика записи аудио
                              // Пока просто заглушка
                              alert('Функция записи аудио будет добавлена позже');
                            }}
                          >
                            {b.audioBlob ? '🎤 Аудио записано' : '🎤 Записать аудио'}
                          </button>
                          {b.audioBlob && (
                            <button
                              className="px-3 py-1 rounded border border-red-400 bg-red-950 text-red-200 text-sm"
                              onClick={() => updateBlock(b.id, { audioBlob: undefined })}
                            >
                              Удалить аудио
                            </button>
                          )}
                        </div>
                      </>
                    )}
                    
                    <label className="font-semibold mt-2">Форма:</label>
                    <div className="flex gap-2">
                      <button
                        className={`px-3 py-1 rounded border ${b.videoShape === 'rect' ? 'border-primary-400 bg-primary-950 text-primary-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                        onClick={() => updateBlock(b.id, { videoShape: 'rect' })}
                      >Окно</button>
                      <button
                        className={`px-3 py-1 rounded border ${b.videoShape === 'circle' ? 'border-primary-400 bg-primary-950 text-primary-200' : 'border-neutral-700 bg-neutral-800 text-white'}`}
                        onClick={() => updateBlock(b.id, { videoShape: 'circle' })}
                      >Круг</button>
                    </div>
                    <label className="font-semibold mt-2">Размер:</label>
                    <input
                      type="range"
                      min={100}
                      max={400}
                      step={10}
                      value={b.videoSize || 180}
                      onChange={e => updateBlock(b.id, { videoSize: Number(e.target.value) })}
                      className="w-full accent-primary-400"
                    />
                    <div className="text-xs text-neutral-400">{b.videoSize || 180} px</div>
                  </div>
                ) : b.type === 'date' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Дата (автоматически из календаря):</label>
                    <div className="text-sm text-neutral-400 p-2 bg-neutral-800 rounded border border-neutral-700">
                      {(() => {
                        const formatDate = (dateStr: string) => {
                          const date = new Date(dateStr);
                          const months = [
                            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                          ];
                          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                        };
                        return formatDate(data.date);
                      })()}
                    </div>
                    <div className="text-xs text-neutral-400">Дата автоматически обновляется при изменении в календаре выше</div>
                  </div>
                ) : b.type === 'signature' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Текст подписи:</label>
                    <textarea 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Введите текст подписи..." 
                      value={b.value || ''} 
                      onChange={e => updateBlock(b.id, { value: e.target.value })} 
                      rows={3}
                    />
                    <div className="text-xs text-neutral-400">
                      Подпись будет отображаться курсивом в приглашении
                    </div>
                  </div>
                ) : b.type === 'cortege' ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Время выезда за невестой:</label>
                    <input 
                      type="time" 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      value={b.cortegeTime || '14:00'} 
                      onChange={e => updateBlock(b.id, { cortegeTime: e.target.value })} 
                    />
                    <label className="font-semibold">Маршрут выезда за невестой:</label>
                    <textarea 
                      className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" 
                      placeholder="Опишите маршрут следования..." 
                      value={b.cortegeRoute || ''} 
                      onChange={e => updateBlock(b.id, { cortegeRoute: e.target.value })} 
                      rows={3}
                    />
                    <div className="text-xs text-neutral-400">
                      Предварительный просмотр:
                    </div>
                    <div className="text-sm text-neutral-400 p-2 bg-neutral-800 rounded border border-neutral-700">
                      В {b.cortegeTime || '14:00'}
                    </div>
                  </div>
                ) : (
                  <textarea className="border border-neutral-700 bg-neutral-900 text-white rounded px-2 py-1" value={b.value} onChange={e => updateBlock(b.id, { value: e.target.value })} />
                )}
                <button className="text-xs text-red-400 underline self-end" onClick={() => removeBlock(b.id)}>Удалить</button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Фоновая музыка</h3>
            <input
              type="file"
              accept="audio/*"
              ref={musicInput}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setMusicUrl(url);
                }
              }}
              className="mb-2"
            />
            {musicUrl && (
              <button className="text-xs text-red-400 underline" onClick={() => setMusicUrl(null)}>Удалить музыку</button>
            )}
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Мутность блоков</h3>
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={blur}
              onChange={e => setBlur(Number(e.target.value))}
              className="w-full accent-primary-400"
            />
            <div className="text-xs text-neutral-400 mt-1">{blur}px</div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2 text-primary-400">Смещение блоков</h3>
            <input
              type="range"
              min={-100}
              max={300}
              step={1}
              value={blocksOffset}
              onChange={e => setBlocksOffset(Number(e.target.value))}
              className="w-full accent-primary-400"
            />
            <div className="text-xs text-neutral-400 mt-1">{blocksOffset}px</div>
          </div>
        </aside>
      </div>

      {/* Модальное окно публикации */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4 border border-neutral-700">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-white">Поделиться приглашением</h3>
              
              {invitationId ? (
                <>
                  <div className="mb-4">
                    <p className="text-neutral-300 mb-2">Ссылка на ваше приглашение:</p>
                    <div className="bg-neutral-800 rounded p-3 text-sm text-primary-400 break-all">
                      {`${window.location.origin}/invitation/${invitationId}`}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <button
                      onClick={copyInvitationLink}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      {copied ? 'Скопировано!' : 'Копировать ссылку'}
                    </button>
                    
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <FaQrcode className="w-4 h-4" />
                      QR-код
                    </button>
                    
                    <button
                      onClick={shareInvitation}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <FaShare className="w-4 h-4" />
                      Поделиться
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-3 text-white">Отправить через:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={shareViaWhatsApp}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                      >
                        📱 WhatsApp
                      </button>
                      
                      <button
                        onClick={shareViaTelegram}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                      >
                        📬 Telegram
                      </button>
                      
                      <button
                        onClick={shareViaEmail}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                      >
                        📧 Email
                      </button>
                      
                      <button
                        onClick={shareViaSMS}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                      >
                        💬 SMS
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-neutral-400">
                    <p className="font-semibold mb-2">Что смогут делать гости:</p>
                    <ul className="text-left space-y-1">
                      <li>• 📱 Просматривать приглашение на любом устройстве</li>
                      <li>• ✅ Подтверждать присутствие (RSVP)</li>
                      <li>• 💝 Оставлять пожелания молодоженам</li>
                      <li>• 📍 Видеть карту и маршрут</li>
                      <li>• ⏰ Следить за обратным отсчетом</li>
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-neutral-300">Сначала сохраните приглашение</p>
              )}
              
              <button
                onClick={() => setShowPublishModal(false)}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2 rounded mt-4"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR-код модальное окно */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-4 text-gray-900">QR-код приглашения</h3>
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCode 
                  value={`${window.location.origin}/invitation/${invitationId}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Отсканируйте QR-код для открытия приглашения
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded mt-4"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 