# Design System Plan

## 목표
포트폴리오용 디자인 시스템 구축 — 디자이너와 협업하여 설계한 경험으로 서술 가능한 수준

global.css, tailwind.config.ts 파일을 읽고,
선언된 변수로 스타일 잡기, 애매하다면 물어보기

---

## 완료

### 1. globals.css 정리
- 기존 724줄 → 110줄로 축소
- 삭제: `.color--*`, `.bg--*`, `.padding--*`, `.typography--h*`, `.checkable*`, `.btn`, `.button2`, 모든 `:root` CSS 변수 블록, 미사용 유틸리티 클래스 전체
- 유지: 기본 리셋, 폰트, `scrollbar-hide`, Toss 결제 페이지 전용 클래스 (`.box_section`, `.p-grid`, `.button` 등 — fail/success 페이지에서 사용 중)

### 2. tailwind.config.ts — 디자인 토큰 정의
- **Colors**: `primary (blue 50~900)`, `grey (50~900)`, `surface`, `surface-grey`
- **Font sizes**: `h1~h7`, `body`, `sm`, `xs` (line-height 포함)
- **Font weights**: `regular`, `medium`, `semibold`, `bold`
- **Font family**: Toss Product Sans 기반 시스템 폰트 스택

컴포넌트에서 `text-[#3182f6]` 대신 `text-primary`, `text-grey-700` 사용 가능

---

## 남은 작업

### 3. 공통 컴포넌트 — props 기반 설계
우선순위 순서:

#### ~~Button (`app/components/ui/Button.tsx`)~~ ✅ 완료

- `action: '#093AEE'` 토큰 추가 (tailwind.config.ts)
- `text` variant: 인라인 텍스트 버튼용 (`bg-transparent text-action`)
- 교체 완료: `BottomButton`, `PaymentButton`, `ChangeButton`(삭제), `Accounting`, `MyPagePaymentComponent`, `TicketPaymentInfo`
- 미교체 (점진적): `SelectModel` 등 form select 성격의 버튼

#### ~~Modal (`app/components/ui/Modal.tsx`)~~ ✅ 완료

- 교체 완료: `MainHeader`(로그인 모달), `NaverMapComponent`(예약확인·주차요금), `ReservationDetailComponent`(주차요금)
- 미교체 (구조 다름): `MainHeader` 사이드바 드로어, `ReservationDetailComponent` 전체화면 overlay, `DateCalendar` 바텀시트·연도선택

#### ~~Header (`app/components/ui/PageHeader.tsx`)~~ ✅ 완료

- 교체 완료 (PageHeader): `PaymentHeader`, `HistoryHeader`(history/), `NoticeHeader`, `TicketPaymentHeader`, `CarChangeHeader`, `InfoHeader`, `PlaceHeader`
- 사이드바 중복 제거: `useSidebar` 훅 + `SidebarDrawer` 컴포넌트 추출 → `MainHeader`, `ReservationHeader`(reservation/), `TicketHeader`, `MypageHeader`에 적용
- 미교체 (섹션 헤더, 별도 패턴): `HistoryHeader`(components/), `ReservationHeader`(components/), `TicektHeader`(components/), `UnpaidHistoryHeader`, `MyPagePaymentHeader`, `TicketComponentHeader`

#### ~~Input (`app/components/ui/Input.tsx`)~~ ✅ 완료

- variant: `filled` (bg-surface-grey, 기본) / `outlined` (border, focus시 action 색) / `underline` (border-bottom만)
- props: `label`, `placeholder`, `error`, `disabled` + HTMLInputElement 전체 상속
- 교체 완료: `UserRegister`(아이디·비밀번호·비밀번호확인), `UserInfoInput`(이름·차량번호), `CarNumberInput`(차량번호), `LoginFormContainer`(아이디·비밀번호·비회원차량번호 + error prop 통합), `PhoneInput`(전화번호·인증번호)
- 미교체 (checkbox/radio — 별도 패턴): `NoticeComponent`, `NoticeContainer`, `result/page.tsx`, `PaymentMethod`
- 미교체 (SearchBar 구조 — 아이콘+컨테이너가 border 담당): `ReservationSearchBar`

### 4. Typography 컴포넌트 (`app/components/ui/Text.tsx`)
```
variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "body" | "sm" | "xs"
color: "primary" | "secondary" | "disabled" | "inverse"
weight?: "regular" | "medium" | "semibold" | "bold"
```

### 5. /design-system 갤러리 페이지
- 모든 컴포넌트 variants를 한눈에 볼 수 있는 내부 페이지
- 포트폴리오 서술: "디자이너와 이 페이지 보며 피드백 반영"
- Storybook 없이도 시각적 문서화 가능

---

## 파일 구조 (목표)
```
app/
  components/
    ui/               ← 새로 만들 공통 컴포넌트
      Button.tsx
      Modal.tsx
      PageHeader.tsx
      Input.tsx
      Text.tsx
  design-system/      ← 갤러리 페이지
    page.tsx
```

---

## 참고 사항
- 다크모드 없음 → CSS 변수 불필요, tailwind.config.ts에 직접 값 입력
- Toss 결제 페이지(fail, success)는 Toss 템플릿 기반 → globals.css 클래스 의존, 건드리지 말 것
- 현재 컴포넌트들은 `text-[#hex]` 하드코딩 혼재 → 신규 컴포넌트부터 토큰 사용, 기존은 점진적 교체
