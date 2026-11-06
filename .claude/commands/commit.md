# commit

변경사항 확인 후 Git 커밋

## Description
현재 변경사항을 확인하고 커밋 메시지와 함께 커밋합니다.

## Steps
1. git status로 변경사항 확인
2. git diff로 상세 확인
3. .env.local 포함 여부 검증
4. git add 및 commit

## Rules
- .env.local은 절대 포함하지 않기
- 커밋 메시지는 명확하게 작성
- 커밋 전 변경사항 확인 필수

## Commands
```
git status
git diff
git add .
git commit -m "[커밋 메시지]"
```
