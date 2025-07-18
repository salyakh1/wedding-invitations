'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Heart, Calendar, MapPin, Users, Phone, Mail, Share2, Download, QrCode, Copy, Check } from 'lucide-react'
import QRCode from 'qrcode.react'

interface InvitationData {
  id: string
  title: string
  description?: string
  eventDate: string
  eventTime: string
  venue: string
  venueAddress: string
  dressCode?: string
  additionalInfo?: string
  backgroundImage?: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  guests?: any[]
  blocks?: any[]
  colorScheme?: any
}

export default function InvitationPage() {
  const params = useParams()
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(null)
  const [plusOne, setPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        // В реальном приложении здесь будет API запрос
        // const response = await fetch(`/api/invitation-sites/${params.id}`)
        // const data = await response.json()
        
        // Временные данные для демонстрации
        setInvitation({
          id: params.id as string,
          title: 'Свадьба Анны и Михаила',
          description: 'Приглашаем вас разделить с нами этот особенный день',
          eventDate: '15 июня 2024',
          eventTime: '16:00',
          venue: 'Ресторан "Времена года"',
          venueAddress: 'ул. Тверская, 15, Москва',
          dressCode: 'Вечерний наряд',
          additionalInfo: 'Пожалуйста, подтвердите ваше присутствие до 1 июня',
          primaryColor: '#8B5CF6',
          secondaryColor: '#EC4899',
          fontFamily: 'Inter',
          blocks: [
            {
              type: 'video',
              url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              shape: 'rectangle',
              size: 'medium'
            }
          ],
          colorScheme: {
            headingColor: '#8B5CF6',
            mainTextColor: '#374151',
            accentColor: '#EC4899'
          }
        })
      } catch (error) {
        console.error('Ошибка загрузки приглашения:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvitation()
  }, [params.id])

  const handleRsvp = async (status: 'yes' | 'no' | 'maybe') => {
    setRsvpStatus(status)
    
    try {
      // В реальном приложении здесь будет API запрос для сохранения RSVP
      console.log('RSVP:', {
        status,
        guestName,
        guestEmail,
        guestPhone,
        plusOne,
        plusOneName,
      })
      
      // Показать уведомление об успехе
    } catch (error) {
      console.error('Ошибка отправки RSVP:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: invitation?.title || 'Свадебное приглашение',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'video':
        return (
          <div key={index} className="mb-6">
            <div className={`${block.shape === 'circle' ? 'rounded-full' : 'rounded-lg'} overflow-hidden`}>
              <iframe
                src={block.url}
                className={`w-full ${block.size === 'small' ? 'h-32' : block.size === 'large' ? 'h-64' : 'h-48'}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Приглашение не найдено</h1>
          <p className="text-gray-600">Возможно, ссылка неверна или приглашение было удалено</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: invitation.backgroundImage ? `url(${invitation.backgroundImage})` : 'none',
        backgroundColor: invitation.primaryColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Main Content */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ 
                  fontFamily: invitation.fontFamily,
                  color: invitation.colorScheme?.headingColor || invitation.primaryColor
                }}
              >
                {invitation.title}
              </h1>
              <p 
                className="text-xl text-gray-600 mb-6"
                style={{ color: invitation.colorScheme?.mainTextColor || '#374151' }}
              >
                {invitation.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">{invitation.eventDate}</p>
                  <p className="text-gray-600">в {invitation.eventTime}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">{invitation.venue}</p>
                  <p className="text-gray-600">{invitation.venueAddress}</p>
                </div>
              </div>

              {invitation.dressCode && (
                <div className="flex items-center space-x-4">
                  <Users className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Дресс-код</p>
                    <p className="text-gray-600">{invitation.dressCode}</p>
                  </div>
                </div>
              )}

              {invitation.additionalInfo && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{invitation.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Custom Blocks */}
            {invitation.blocks && invitation.blocks.map((block, index) => renderBlock(block, index))}

            {/* RSVP Form */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Подтвердите ваше присутствие
              </h2>

              <form className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="input w-full"
                    placeholder="+7 999 123-45-67"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="plusOne"
                    checked={plusOne}
                    onChange={(e) => setPlusOne(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="plusOne" className="text-sm text-gray-700">
                    Я приду с сопровождающим
                  </label>
                </div>

                {plusOne && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя сопровождающего
                    </label>
                    <input
                      type="text"
                      value={plusOneName}
                      onChange={(e) => setPlusOneName(e.target.value)}
                      className="input w-full"
                    />
                  </div>
                )}
              </form>

              {/* RSVP Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleRsvp('yes')}
                  className={`btn-primary ${rsvpStatus === 'yes' ? 'bg-green-600' : ''}`}
                >
                  Приду
                </button>
                <button
                  onClick={() => handleRsvp('maybe')}
                  className={`btn-secondary ${rsvpStatus === 'maybe' ? 'bg-yellow-600 text-white' : ''}`}
                >
                  Возможно
                </button>
                <button
                  onClick={() => handleRsvp('no')}
                  className={`btn-secondary ${rsvpStatus === 'no' ? 'bg-red-600 text-white' : ''}`}
                >
                  Не смогу прийти
                </button>
              </div>

              {rsvpStatus && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Спасибо за ваш ответ!
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t pt-6">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleShare}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Поделиться</span>
                </button>
                
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <QrCode className="h-4 w-4" />
                  <span>QR-код</span>
                </button>
                
                <button
                  onClick={copyLink}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Скопировано!' : 'Копировать ссылку'}</span>
                </button>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Скачать</span>
                </button>
              </div>

              {/* QR Code Modal */}
              {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-4">QR-код приглашения</h3>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <QRCode 
                          value={window.location.href}
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
                        className="btn-primary mt-4 w-full"
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 