# 🐛 GitHub 이슈 생성기

## 사용법
```bash
/create-issue "해결해야 할 이슈를 여기에 입력"
```

---

## 📝 이슈 정보 분석

### 🎯 이슈 내용
**원본**: $ARGUMENT

### 🔍 이슈 분류
- **타입**: [🐛 Bug | ✨ Feature | 📝 Documentation | 🔧 Refactor | 🎨 UI/UX | ⚡ Performance | 🧪 Test]
- **우선순위**: [🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low]
- **복잡도**: [🟢 Simple | 🟡 Medium | 🔴 Complex]
- **예상 작업 시간**: [< 1시간 | 1-4시간 | 1일 | 2-3일 | 1주일+]

---

## 📋 이슈 템플릿

### 제목 (Title)
```
[타입] 간결하고 명확한 이슈 설명
```

### 본문 (Body)

#### 📄 Description
**이슈 요약**
[이슈에 대한 간단하고 명확한 설명]

**현재 상황**
- 현재 어떤 상태인지
- 어떤 문제가 발생하는지
- 언제부터 이 문제가 있었는지

**기대하는 결과**
- 어떻게 동작해야 하는지
- 최종 목표가 무엇인지

#### 🔧 Technical Details

**환경 정보**
- **OS**: [Windows/macOS/Linux]
- **브라우저**: [Chrome/Firefox/Safari + 버전]
- **Node.js**: [버전]
- **Framework**: [Next.js/React + 버전]

**관련 파일/컴포넌트**
- `src/components/ComponentName.tsx`
- `src/pages/PageName.tsx`
- `src/utils/UtilName.ts`

**에러 메시지** (해당하는 경우)
```
에러 로그나 스택 트레이스를 여기에 붙여넣기
```

#### 📸 Screenshots/Recordings
[스크린샷이나 화면 녹화가 있다면 첨부]

#### 🔄 Reproduction Steps
1. [첫 번째 단계]
2. [두 번째 단계]
3. [세 번째 단계]
4. [문제 발생]

#### ✅ Acceptance Criteria
- [ ] [완료 조건 1]
- [ ] [완료 조건 2]
- [ ] [완료 조건 3]
- [ ] [완료 조건 4]

#### 🔗 Related Issues/PRs
- Related to #[이슈번호]
- Depends on #[이슈번호]
- Blocks #[이슈번호]

#### 📚 Additional Context
[추가적인 컨텍스트, 참고 자료, 외부 링크 등]

---

## 🏷️ 라벨 추천

### 타입 라벨
- `bug` - 버그 수정
- `enhancement` - 새로운 기능
- `documentation` - 문서 관련
- `refactor` - 리팩토링
- `ui/ux` - 사용자 인터페이스
- `performance` - 성능 개선
- `test` - 테스트 관련

### 우선순위 라벨
- `priority: critical` - 즉시 수정 필요
- `priority: high` - 높은 우선순위
- `priority: medium` - 보통 우선순위
- `priority: low` - 낮은 우선순위

### 상태 라벨
- `status: ready` - 작업 준비 완료
- `status: in-progress` - 작업 진행 중
- `status: blocked` - 차단됨
- `status: needs-info` - 추가 정보 필요

### 기타 라벨
- `good first issue` - 초보자에게 적합
- `help wanted` - 도움이 필요함
- `duplicate` - 중복 이슈
- `wontfix` - 수정하지 않음

---

## 🎯 이슈 생성 가이드라인

### ✅ 좋은 이슈 작성법
1. **명확한 제목**: 이슈의 핵심을 한 줄로 표현
2. **구체적인 설명**: 모호하지 않고 구체적으로 작성
3. **재현 가능한 단계**: 누구나 따라할 수 있도록 명확히
4. **완료 조건 명시**: 언제 완료되었다고 할지 명확히
5. **관련 자료 첨부**: 스크린샷, 로그, 링크 등

### ❌ 피해야 할 것들
1. **모호한 표현**: "잘 안됨", "이상함" 등
2. **중복 이슈**: 기존 이슈 검색 후 작성
3. **너무 큰 범위**: 하나의 이슈에 여러 문제 포함
4. **부족한 정보**: 재현할 수 없을 정도로 정보 부족

---

## 📊 이슈 우선순위 매트릭스

| 영향도 \ 긴급도 | 높음 | 보통 | 낮음 |
|---|---|---|---|
| **높음** | 🔴 Critical | 🟠 High | 🟡 Medium |
| **보통** | 🟠 High | 🟡 Medium | 🟢 Low |
| **낮음** | 🟡 Medium | 🟢 Low | 🟢 Low |

---

## 🔄 이슈 생명주기

```
Open → In Progress → Review → Testing → Closed
  ↓         ↓          ↓        ↓
Triage   Development  QA    Deployment
```

### 단계별 체크리스트
- [ ] **Open**: 이슈 생성 및 라벨 설정
- [ ] **Triage**: 우선순위 및 담당자 배정
- [ ] **In Progress**: 개발 시작, 브랜치 생성
- [ ] **Review**: PR 생성 및 코드 리뷰
- [ ] **Testing**: QA 테스트 및 검증
- [ ] **Closed**: 배포 완료 및 이슈 종료

---

## 📋 실제 생성될 이슈

### 제목
```
[분류된 타입] $ARGUMENT에서 추출한 핵심 내용
```

### 본문
```markdown
## 📄 Description
[ARGUMENT를 바탕으로 생성된 구체적인 설명]

## 🔧 Technical Details
[기술적 세부사항 및 관련 파일]

## 🔄 Reproduction Steps
1. [단계별 재현 방법]

## ✅ Acceptance Criteria
- [ ] [완료 조건들]

## 📚 Additional Context
[추가 컨텍스트 정보]
```

### 라벨
`[자동으로 분석된 적절한 라벨들]`

### 담당자
`[필요시 담당자 태그]`

---

*이 프롬프트는 $ARGUMENT를 분석하여 완전한 GitHub 이슈를 생성합니다. 모든 필드를 채우고 적절한 라벨을 추천합니다.*

ARGUMENTS: $ARGUMENT