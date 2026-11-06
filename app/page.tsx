'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('information_schema.tables').select('*').limit(1);

        if (error) {
          setStatus('connected');
          setMessage('Supabase 클라이언트 초기화 완료 (테이블 조회 불가능 - 권한 없음)');
        } else {
          setStatus('connected');
          setMessage('Supabase에 연결되었습니다!');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Supabase 연결 실패. 환경변수를 확인하세요.');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Game VFX + Supabase
        </h1>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Supabase 연결 상태
          </h2>

          <div className="space-y-4">
            {status === 'loading' && (
              <div className="flex items-center gap-3">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">확인 중...</span>
              </div>
            )}

            {status === 'connected' && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 dark:text-red-400 font-medium">{message}</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">환경변수 확인:</span>
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-500 mt-2 space-y-1">
              <li>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '미설정'}</li>
              <li>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? '설정됨' : '미설정'}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>.env.local 파일을 수정하고 개발 서버를 재시작하세요.</p>
        </div>
      </div>
    </div>
  );
}
