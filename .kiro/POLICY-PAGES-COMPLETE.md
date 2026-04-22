# 정책 페이지 완성 (개인정보처리방침 & 이용약관)

## 📋 작업 개요
푸터에 연결될 **개인정보처리방침(privacy.html)**과 **이용약관(terms.html)** 두 페이지를 완성했습니다. 구글 애드센스 승인 및 법적 보호를 위한 필수 정책 문서입니다.

---

## ✅ 완료된 작업

### 1. 개인정보처리방침 (privacy.html)

#### 주요 섹션 (10개)
1. **개요**: 사이트의 개인정보보호 정책 개요
2. **수집하는 개인정보**: 자동 수집 정보 & 사용자 제공 정보
3. **수집 및 이용 목적**: 5가지 주요 목적
4. **쿠키 및 타사 광고 게재** (구글 애드센스 필수)
5. **제3자 제공**: 예외 상황 명시
6. **보유 및 이용 기간**: 데이터 보관 정책
7. **보안**: 4가지 보안 조치
8. **사용자의 권리**: 4가지 권리 명시
9. **정책 변경**: 변경 공지 정책
10. **문의**: 연락처 정보

#### 구글 애드센스 필수 요소
✅ **쿠키 및 타사 광고 게재 조항** (섹션 4)
- Google Ads 쿠키 사용 명시
- Google Analytics 데이터 수집 명시
- 타사 광고 네트워크 명시
- 광고 개인화 거부 방법 제시
- Google 광고 설정 링크 제공

#### 콘텐츠 통계
- 총 텍스트: 1,500자 이상
- 섹션: 10개
- 리스트 항목: 25개 이상
- 법률 용어: 표준적이고 객관적

---

### 2. 이용약관 (terms.html)

#### 주요 섹션 (10개)
1. **서비스 개요**: 서비스 목적 및 범위
2. **서비스 이용 약관**: 이용 자격, 사용자 의무, 이용 제한
3. **서비스 내용 및 정보의 정확성**: 정보 정확성 보장 한계
4. **면책 조항** (가장 중요) - 5개 세부 항목
5. **지적재산권**: 저작권 보호
6. **링크 및 제3자 사이트**: 제3자 콘텐츠 책임 부인
7. **서비스 변경 및 중단**: 서비스 변경 권리
8. **약관 변경**: 약관 변경 정책
9. **준거법 및 관할권**: 법적 관할권
10. **문의**: 연락처 정보

#### 면책 조항 (가장 중요)
```
4.1 의료 서비스 비제공
"본 사이트에서 제공하는 피부 진단, 성분 분석 및 스킨케어 가이드는 
정보 제공 목적일 뿐이며, 피부과 전문의의 의학적 진단이나 치료를 
대신할 수 없습니다."

4.2 개인적 결과에 대한 책임
"화장품 사용으로 인한 부작용, 피부 반응, 알레르기 반응 등 
개인적 결과에 대해 본 사이트는 법적 책임을 지지 않습니다."

4.3 피부 질환 관련 책임
"본 사이트의 정보를 기반으로 한 스킨케어 실천으로 인한 피부 질환, 
악화, 또는 기타 건강상 문제에 대해 본 사이트는 책임을 지지 않습니다."
```

#### 콘텐츠 통계
- 총 텍스트: 1,800자 이상
- 섹션: 10개
- 리스트 항목: 20개 이상
- 면책 조항: 5개 세부 항목

---

## 🎨 디자인 (공통)

### 색상 시스템
```css
배경색: #0F172A (다크 네이비)
텍스트: #F1F5F9 (흰색), #94A3B8 (연회색)
포인트: #7EC1FF (라이트 블루)
강조: rgba(126, 193, 255, 0.08) (배경 강조)
```

### Hero 섹션
```css
.policy-hero {
  min-height: 40vh;
  background: 데이터 그리드 패턴 (45px 간격)
  padding: clamp(4rem, 6vw, 6rem);
}

.policy-hero__title {
  font-size: clamp(3.2rem, 5vw, 5.2rem);
  font-weight: 800;
  color: #FFFFFF;
}

.policy-hero__subtitle {
  font-size: 1.6rem;
  color: var(--text-secondary);
}
```

### 콘텐츠 섹션
```css
.policy-section {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.policy-section__title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #FFFFFF;
  border-bottom: 0.15rem solid rgba(126, 193, 255, 0.2);
  padding-bottom: 1.2rem;
}

.policy-section__subtitle {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-accent);
}

.policy-section__text {
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.9;
  color: var(--text-secondary);
  text-align: justify;
}
```

### 중요 텍스트 강조
```css
.policy-section__text--important {
  padding: 1.6rem;
  background: rgba(126, 193, 255, 0.08);
  border-left: 0.4rem solid #7EC1FF;
  border-radius: 0 0.8rem 0.8rem 0;
  color: #F1F5F9;
  font-weight: 500;
}
```

### 리스트 스타일
```css
.policy-list {
  padding-left: 2.4rem;
  list-style: disc;
  gap: 1rem;
}

.policy-list li {
  font-size: 1.6rem;
  line-height: 1.8;
  color: var(--text-secondary);
}
```

### 강조 섹션 (면책 조항)
```css
.policy-section--highlight {
  padding: 2.4rem;
  background: linear-gradient(135deg, rgba(126, 193, 255, 0.08) 0%, rgba(77, 233, 171, 0.08) 100%);
  border: 0.15rem solid rgba(126, 193, 255, 0.2);
  border-radius: 1.2rem;
}
```

---

## 📱 반응형 디자인

### 데스크톱 (1200px+)
- 최대 너비: 96rem (1536px)
- 여백: clamp(2.4rem, 6vw, 10rem)
- 폰트 크기: 1.6rem (본문)

### 태블릿 (768px)
```css
.policy-hero__title {
  font-size: clamp(2.4rem, 4vw, 3.6rem);
}

.policy-section__title {
  font-size: 2rem;
}

.policy-section__text {
  font-size: 1.5rem;
}
```

### 모바일 (480px)
```css
.policy-hero {
  min-height: 35vh;
  background-size: 35px 35px;
}

.policy-hero__title {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
}

.policy-section__title {
  font-size: 1.8rem;
}

.policy-section__text {
  font-size: 1.4rem;
}
```

---

## 📂 수정된 파일

### 1. subpages/privacy.html (신규 생성)
- 10개 섹션의 완전한 개인정보처리방침
- 구글 애드센스 필수 요소 포함
- 1,500자 이상의 고품질 콘텐츠
- 메타 태그 및 OG 태그 포함

### 2. subpages/terms.html (신규 생성)
- 10개 섹션의 완전한 이용약관
- 5개 세부 항목의 명확한 면책 조항
- 1,800자 이상의 고품질 콘텐츠
- 메타 태그 및 OG 태그 포함

### 3. assets/css/style.css (추가)
- `.policy-hero` 및 하위 스타일
- `.policy-content` 및 하위 스타일
- `.policy-section` 및 관련 스타일
- `.policy-list` 스타일
- `.policy-section--highlight` 스타일
- 반응형 미디어 쿼리 (768px, 480px)

### 4. index.html (수정)
- 푸터 링크 업데이트
  - 개인정보처리방침: `subpages/privacy.html`
  - 이용약관: `subpages/terms.html`

---

## 🔍 SEO 최적화

### 메타 데이터 (Privacy)
- Title: "개인정보처리방침 - 피부 성향 가이드 & 홈케어 도우미"
- Description: "개인정보처리방침 - 사용자의 개인정보 수집, 이용, 보호에 관한 정책"
- Keywords: "개인정보처리방침, 개인정보보호, 개인정보, 쿠키, 광고"

### 메타 데이터 (Terms)
- Title: "이용약관 - 피부 성향 가이드 & 홈케어 도우미"
- Description: "이용약관 - 서비스 이용 시 준수해야 할 사항과 면책 조항"
- Keywords: "이용약관, 서비스 약관, 면책 조항, 서비스 이용"

### 구글 애드센스 승인 요소
✅ 명확한 개인정보 정책
✅ 쿠키 및 타사 광고 게재 명시
✅ 사용자 권리 명시
✅ 명확한 면책 조항
✅ 연락처 정보 제공
✅ 1,000자 이상의 고품질 콘텐츠

---

## 💡 핵심 특징

### 개인정보처리방침
1. **투명성**: 모든 데이터 수집 및 이용 목적 명시
2. **법적 준수**: 개인정보보호법 준수
3. **애드센스 준비**: 쿠키 및 타사 광고 명시
4. **사용자 권리**: 4가지 권리 명시
5. **보안**: 구체적인 보안 조치 명시

### 이용약관
1. **명확한 면책**: 5개 세부 항목의 명확한 면책 조항
2. **의료 비제공**: 의료 서비스 비제공 명시
3. **책임 한계**: 개인적 결과에 대한 책임 부인
4. **법적 보호**: 사이트 운영자 법적 보호
5. **사용자 의무**: 명확한 사용자 의무 명시

---

## 📊 콘텐츠 통계

| 항목 | Privacy | Terms |
|------|---------|-------|
| 섹션 수 | 10개 | 10개 |
| 총 텍스트 | 1,500자+ | 1,800자+ |
| 리스트 항목 | 25개+ | 20개+ |
| 제목 (h2) | 10개 | 10개 |
| 소제목 (h3) | 5개 | 5개 |
| 강조 섹션 | 1개 | 1개 |

---

## 🚀 배포 체크리스트

- ✅ HTML 파일 생성 (privacy.html, terms.html)
- ✅ CSS 스타일 추가 (style.css)
- ✅ 푸터 링크 업데이트 (index.html)
- ✅ 메타 태그 추가
- ✅ OG 태그 추가
- ✅ 반응형 디자인 구현
- ✅ 접근성 고려
- ✅ 법적 요구사항 충족

---

## 📝 법적 고지

### 개인정보처리방침
- 개인정보보호법 준수
- 쿠키 정책 명시
- 타사 광고 게재 명시
- 사용자 권리 명시

### 이용약관
- 서비스 이용 조건 명시
- 명확한 면책 조항
- 의료 서비스 비제공 명시
- 화장품 사용 부작용 책임 부인

---

## 🎯 다음 단계

1. 구글 애드센스 신청 (필수 정책 완료)
2. 개인정보 보호 정책 검토
3. 법률 전문가 검토 (선택사항)
4. 정기적인 정책 업데이트
5. 사용자 피드백 수집

---

**작업 완료일**: 2026년 4월 22일  
**작업자**: Kiro AI Assistant  
**버전**: v1.0 - Policy Pages Complete  
**상태**: ✅ 완성 및 배포 준비 완료

---

## 📌 중요 참고사항

### 개인정보처리방침
- 쿠키 및 타사 광고 게재 조항이 구글 애드센스 승인의 핵심
- 정기적으로 업데이트 필요
- 사용자 권리 명시로 신뢰성 강화

### 이용약관
- 면책 조항이 법적 보호의 핵심
- 의료 서비스 비제공 명시로 책임 한계 설정
- 화장품 사용 부작용 책임 부인으로 사이트 보호

---

## 🔗 페이지 구조

```
Policy Pages
├── Header (네비게이션)
├── Hero Section
│   ├── 페이지 제목
│   └── 마지막 업데이트 날짜
├── Content Section
│   ├── 섹션 1-10
│   ├── 각 섹션 제목 (h2)
│   ├── 소제목 (h3)
│   ├── 본문 텍스트
│   └── 리스트 항목
└── Footer (네비게이션)
```
