import dynamic from 'next/dynamic';

const ConstructorPage = dynamic(() => import('@/components/ConstructorPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Загрузка конструктора...</p>
      </div>
    </div>
  ),
});

export default function ConstructorPageWrapper() {
  return <ConstructorPage />;
} 