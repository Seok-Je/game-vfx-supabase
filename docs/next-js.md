# Next.js 개발 가이드

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (dashboard)/       # 대시보드 페이지
│   └── api/               # API 라우트
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸 함수
├── public/                # 정적 파일
├── styles/               # 전역 스타일
└── types/                # TypeScript 타입 정의
```

## 컴포넌트 작성 규칙

### 1. 클라이언트 컴포넌트
```typescript
'use client';

import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState('');
  return <div>{state}</div>;
}
```

### 2. 서버 컴포넌트
```typescript
import { Supabase } from '@/lib/supabase';

export default async function Component() {
  const data = await supabase.from('table').select('*');
  return <div>{JSON.stringify(data)}</div>;
}
```

## 라우팅

- `app/page.tsx`: 홈 (/)
- `app/auth/login/page.tsx`: 로그인 (/auth/login)
- `app/(dashboard)/projects/page.tsx`: 프로젝트 목록 (/projects)
- `app/api/projects/route.ts`: API 엔드포인트

## API 라우트

```typescript
// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 로직
  return NextResponse.json({ data: [] });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  // 로직
  return NextResponse.json({ success: true });
}
```

## 환경변수

- `NEXT_PUBLIC_*`: 클라이언트에 노출 가능
- 그 외: 서버에서만 사용
- `.env.local`: 개발 환경 (Git 제외)
- `.env.example`: 예제 (Git 포함)

## 성능 최적화

1. **Image Optimization**
   - `next/image` 사용
   - 자동 최적화

2. **Code Splitting**
   - 동적 import 사용
   - `next/dynamic` 활용

3. **Caching**
   - ISR 설정
   - revalidate 옵션

## 디버깅

```bash
# 개발 서버 시작
npm run dev

# 빌드 검사
npm run build

# 타입 검사
npx tsc --noEmit
```
