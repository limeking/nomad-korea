'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">오류가 발생했습니다</h1>
        {message ? (
          <p className="text-red-600 mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
            {message}
          </p>
        ) : (
          <p className="text-gray-600 mb-8">인증 과정에서 문제가 발생했습니다. 다시 시도해 주세요.</p>
        )}
        <a 
          href="/login" 
          className="text-blue-600 hover:underline"
        >
          로그인 페이지로 돌아가기
        </a>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}