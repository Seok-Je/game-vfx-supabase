# Supabase 개발 가이드

## Supabase 클라이언트 설정

### 클라이언트 초기화 (lib/supabase.ts)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 환경변수

필수 환경변수:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 공개 가능한 클라이언트 키

금지 항목:
- ❌ `service_role` 키를 클라이언트에 노출
- ❌ API 키를 소스 코드에 하드코딩

## 데이터베이스 접근

### 데이터 조회

```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId);

if (error) console.error('Error:', error);
```

### 데이터 생성

```typescript
const { data, error } = await supabase
  .from('projects')
  .insert([{ user_id: userId, title: 'New Project' }]);
```

### 데이터 수정

```typescript
const { data, error } = await supabase
  .from('projects')
  .update({ title: 'Updated Title' })
  .eq('id', projectId);
```

### 데이터 삭제

```typescript
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

## 인증

### 로그인

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

### 회원가입

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'new@example.com',
  password: 'password123',
});
```

### 로그아웃

```typescript
const { error } = await supabase.auth.signOut();
```

### 현재 사용자

```typescript
const { data: { user } } = await supabase.auth.getUser();
```

## 파일 저장

```typescript
const { data, error } = await supabase.storage
  .from('vfx-projects')
  .upload(`${userId}/${filename}`, file);

if (data) {
  const url = supabase.storage
    .from('vfx-projects')
    .getPublicUrl(data.path).data.publicUrl;
}
```

## 보안 규칙

- Row Level Security (RLS) 활성화
- 사용자는 자신의 데이터만 접근 가능
- 공개 포트폴리오는 모든 사용자 조회 가능

## 데이터베이스 스키마

### users 테이블 (auth.users와 연동)

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### projects 테이블

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 에러 처리

```typescript
if (error) {
  if (error.status === 401) {
    // 인증 실패
  } else if (error.status === 403) {
    // 권한 없음
  } else {
    // 기타 에러
  }
  console.error('Supabase Error:', error.message);
}
```
