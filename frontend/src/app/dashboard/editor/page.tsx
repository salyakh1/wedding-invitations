'use client'

import dynamic from 'next/dynamic';

const EditorPage = dynamic(() => import('@/components/EditorPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Загрузка редактора...</p>
      </div>
    </div>
  ),
});

export default function EditorPageWrapper() {
  return <EditorPage />;
} 