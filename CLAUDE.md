# Game VFX Portfolio - Claude Development Guide

프로젝트 개발을 위한 Claude 컨텍스트 및 규칙입니다.

## 프로젝트 개요

**Game VFX Portfolio** - VFX 아티스트들의 포트폴리오 관리 웹 애플리케이션

- **목표**: VFX 작품 온라인 포트폴리오 관리 시스템
- **MVP**: 기본 CRUD, 인증, 포트폴리오 전시
- **Phase 2+**: 분석, 협업, 평가 기능

## 기술 스택

- **Frontend**: Next.js 16+, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment**: Vercel
- **Version Control**: Git, GitHub
- **Development**: Node.js 18+, npm

## 폴더 구조

```
.
├── .claude/                # Claude 개발 도구 설정
│   ├── commands/          # 커스텀 커맨드
│   ├── agents/            # 서브에이전트 정의
│   └── settings.json      # Hooks 및 설정
├── app/                   # Next.js App Router
├── components/            # React 컴포넌트
├── lib/                   # 유틸 함수 (supabase.ts 포함)
├── docs/                  # 프로젝트 문서
├── public/                # 정적 파일
├── types/                 # TypeScript 타입
├── .env.local            # 로컬 환경변수 (Git 제외)
├── .env.example          # 환경변수 예제
├── .gitignore            # Git 무시 목록
├── CLAUDE.md             # 이 파일
└── package.json          # 프로젝트 설정
```

## 환경변수 관리

### 필수 환경변수

```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_[key]
```

### 보안 규칙

- `.env.local`은 **절대 Git에 커밋하지 않기**
- `.env*`는 `.gitignore`에 포함됨
- Service role 키는 클라이언트에 노출하지 않기
- API 키는 소스 코드에 하드코딩하지 않기

## 개발 규칙

### 1. 코드 작성

- TypeScript 사용 (모든 파일에 타입 정의)
- 함수형 컴포넌트 사용
- Tailwind CSS로 스타일링
- 에러 처리 필수

### 2. 보안

- 사용자 입력값 검증
- SQL injection 방지 (Supabase 타입 안정성 활용)
- XSS 취약점 방지 (React 자동 스케이프)
- HTTPS만 사용

### 3. 성능

- `next/image` 사용
- 코드 스플리팅
- ISR/SSR 활용
- 불필요한 렌더링 방지

### 4. 데이터베이스

- Row Level Security 활성화
- 사용자는 자신의 데이터만 접근
- 공개 포트폴리오는 모든 사용자 조회

### 5. Git 규칙

- 기능별 커밋 (한 커밋 = 한 기능)
- 명확한 커밋 메시지
- .env.local 포함 여부 항상 확인
- `git push` 전에 `npm run build` 실행

## 커스텀 커맨드

### `/check`
TypeScript 검사 및 빌드 확인
```bash
npx tsc --noEmit && npm run build
```

### `/commit`
변경사항 확인 후 커밋
```bash
git status
git add .
git commit -m "[메시지]"
```

### `/review`
코드 품질 및 보안 검토
- 타입 안정성
- API 키 노출 검사
- 스타일 일관성

## 서브에이전트

### Code Reviewer
코드 품질, 보안, 성능 검토 (필요시만 호출)

### Docs Writer
프로젝트 문서 작성 및 업데이트 (필요시만 호출)

## 문서 참고

@docs/next-js.md - Next.js 개발 가이드
@docs/supabase.md - Supabase 통합 가이드
@docs/coding-style.md - 코딩 스타일 및 규칙

## 개발 워크플로우

### 로컬 개발

```bash
npm install
npm run dev        # http://localhost:3000
```

### 빌드 및 배포

```bash
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
git push origin main  # GitHub 푸시 (Vercel 자동 배포)
```

### 타입 검사

```bash
npx tsc --noEmit   # 타입 에러 검사만
```

## 금지 사항

- ❌ 기존 정상 작동 코드 변경
- ❌ 불필요한 패키지 설치
- ❌ API 키/토큰을 소스 코드에 포함
- ❌ .env.local을 Git에 커밋
- ❌ 실제 Supabase 데이터 수정/삭제
- ❌ Agent Team 사용
- ❌ 불필요한 서브에이전트 호출
- ❌ 반복적인 빌드/분석

## 토큰 절약 규칙

1. **필요한 파일만 확인** - 전체 프로젝트 반복 분석 금지
2. **한 번의 빌드** - 오류 발생 시에만 재실행
3. **명확한 지시** - 불명확한 작업 지시 금지
4. **병렬 처리** - 독립적 작업은 동시 실행
5. **간단한 설명** - 장황한 설명 생략

## 시작하기

1. 프로젝트 폴더에서 `npm install`
2. `.env.local` 파일에 Supabase 정보 입력
3. `npm run dev`로 개발 서버 시작
4. 변경사항 커밋 전 `/check` 커맨드 실행
5. `git push` 전 모든 오류 해결

## 추가 리소스

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Last Updated**: 2026-11-07
