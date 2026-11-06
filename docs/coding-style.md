# 코딩 스타일 가이드

## TypeScript

### 타입 정의

```typescript
// ✅ 좋은 예
interface User {
  id: string;
  name: string;
  email: string;
}

type ProjectStatus = 'draft' | 'published' | 'archived';

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ 나쁜 예
function getUser(id: any): any {
  // ...
}
```

### 함수 작성

```typescript
// ✅ 좋은 예
async function fetchProjects(userId: string): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}

// ❌ 나쁜 예
function fetchProjects(userId) {
  return supabase.from('projects').select('*');
}
```

## React 컴포넌트

### 함수형 컴포넌트

```typescript
// ✅ 좋은 예
interface ProjectProps {
  id: string;
  title: string;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({ id, title, onDelete }: ProjectProps) {
  return (
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      {onDelete && <button onClick={() => onDelete(id)}>Delete</button>}
    </div>
  );
}

// ❌ 나쁜 예
export default function ProjectCard(props: any) {
  return <div>{props.title}</div>;
}
```

## 네이밍 규칙

| 항목 | 형식 | 예시 |
|------|------|------|
| 변수 | camelCase | `projectId`, `userName` |
| 상수 | UPPER_SNAKE_CASE | `API_URL`, `MAX_ITEMS` |
| 함수 | camelCase | `fetchProjects()`, `handleSubmit()` |
| 클래스 | PascalCase | `ProjectManager`, `UserService` |
| 인터페이스 | PascalCase | `IUser`, `ProjectData` (타입은 제외) |
| 파일명 | kebab-case | `project-card.tsx`, `api-service.ts` |
| 컴포넌트 | PascalCase | `ProjectCard.tsx`, `UserProfile.tsx` |

## 파일 구조

```
components/
  ├── common/              # 공통 컴포넌트
  │   └── Header.tsx
  ├── auth/               # 인증 관련
  │   ├── LoginForm.tsx
  │   └── SignupForm.tsx
  └── projects/           # 프로젝트 관련
      ├── ProjectCard.tsx
      └── ProjectList.tsx

lib/
  ├── supabase.ts        # Supabase 클라이언트
  └── api.ts             # API 유틸

types/
  └── index.ts           # TypeScript 타입 정의
```

## CSS/Tailwind

```typescript
// ✅ 좋은 예: 클래스 문자열 정리
const containerClass = "p-4 bg-white rounded-lg shadow-md dark:bg-slate-800";

// ❌ 나쁜 예: 인라인 클래스 난잡함
<div className="p-4 bg-white rounded-lg shadow-md border-2 border-blue-500 dark:bg-slate-800 dark:border-blue-400">
```

## 환경변수

```typescript
// ✅ 좋은 예
const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!apiUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

// ❌ 나쁜 예
const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3000';
```

## 주석

```typescript
// ✅ 좋은 예: 왜를 설명
// 데이터 페칭 후 사용자 입력을 활성화하기 위해 로딩 상태 업데이트
setIsLoading(false);

// ❌ 나쁜 예: 무엇인지 설명
// isLoading을 false로 설정
setIsLoading(false);
```

## 에러 처리

```typescript
// ✅ 좋은 예
try {
  const result = await fetchData();
  return result;
} catch (error) {
  if (error instanceof Error) {
    console.error('Fetch error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
  throw error;
}

// ❌ 나쁜 예
try {
  return await fetchData();
} catch (e) {
  console.log(e);
}
```

## Git 커밋 메시지

```
# 형식
<type>(<scope>): <subject>

# 예시
feat(auth): 회원가입 기능 추가
fix(projects): 프로젝트 삭제 오류 수정
docs(readme): 설정 가이드 업데이트
chore(deps): 패키지 업데이트

# 타입: feat, fix, docs, style, refactor, test, chore
```

## 성능

- 불필요한 렌더링 방지 (`useMemo`, `useCallback`)
- 이미지 최적화 (`next/image`)
- 코드 스플리팅 (`next/dynamic`)
- 데이터 페칭 최소화
