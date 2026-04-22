# 🚀 Open Graph 메타 태그 적용 가이드

## 📋 개요
이 가이드는 프로젝트의 모든 HTML 페이지에 Open Graph(OG) 메타 태그를 일관되게 적용하기 위한 템플릿과 Kiro 프롬프트를 제공합니다.

---

## ✅ index.html 적용 완료

**적용된 OG 메타 태그:**
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="스킨케어 유틸리티 - 내 피부를 위한 스마트 가이드" />
<meta property="og:description" content="피부 타입 확인부터 화장품 성분 분석, 홈케어 루틴까지 - 전문가 수준의 스킨케어 가이드를 무료로 제공합니다." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="피부 성향 가이드 & 홈케어 도우미 - 스킨케어 유틸리티" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="스킨케어 유틸리티 - 내 피부를 위한 스마트 가이드" />
<meta name="twitter:description" content="피부 타입 확인부터 화장품 성분 분석, 홈케어 루틴까지 - 전문가 수준의 스킨케어 가이드를 무료로 제공합니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

---

## 📄 다른 페이지 적용용 템플릿

### 1️⃣ subpages/skintype.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="내 피부 타입 확인 가이드: 정확한 자가 진단과 맞춤 관리법" />
<meta property="og:description" content="4가지 정밀 질문으로 피부 타입을 자동 판별하고, 지성, 건성, 수부지 타입별 맞춤 성분 가이드를 제공합니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/skintype.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="피부 타입 자가 진단 가이드" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="내 피부 타입 확인 가이드: 정확한 자가 진단과 맞춤 관리법" />
<meta name="twitter:description" content="4가지 정밀 질문으로 피부 타입을 자동 판별하고, 지성, 건성, 수부지 타입별 맞춤 성분 가이드를 제공합니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

### 2️⃣ subpages/ingredient.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="화장품 성분 신호등: 안전성 판별 및 성분 분석 가이드" />
<meta property="og:description" content="화장품 전성분을 입력하면 위험 성분을 자동 감지하고, 피부 타입별 맞춤 성분 추천을 제공합니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/ingredient.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="화장품 성분 신호등 분석 도구" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="화장품 성분 신호등: 안전성 판별 및 성분 분석 가이드" />
<meta name="twitter:description" content="화장품 전성분을 입력하면 위험 성분을 자동 감지하고, 피부 타입별 맞춤 성분 추천을 제공합니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

### 3️⃣ subpages/homecare.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="0원 나쁜 습관 파괴기: 홈케어 루틴 최적화 가이드" />
<meta property="og:description" content="세안, 보습, 생활 습관 등 피부를 망치는 나쁜 습관을 파악하고 개선하는 무료 홈케어 가이드입니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/homecare.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="홈케어 루틴 최적화 가이드" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="0원 나쁜 습관 파괴기: 홈케어 루틴 최적화 가이드" />
<meta name="twitter:description" content="세안, 보습, 생활 습관 등 피부를 망치는 나쁜 습관을 파악하고 개선하는 무료 홈케어 가이드입니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

### 4️⃣ subpages/d-1.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="D-1 중요날 찰떡 루틴: 하루 전 긴급 스킨케어 가이드" />
<meta property="og:description" content="중요한 날을 앞두고 피부를 최상의 상태로 만드는 D-1 긴급 스킨케어 루틴을 제공합니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/d-1.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="D-1 중요날 스킨케어 루틴" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="D-1 중요날 찰떡 루틴: 하루 전 긴급 스킨케어 가이드" />
<meta name="twitter:description" content="중요한 날을 앞두고 피부를 최상의 상태로 만드는 D-1 긴급 스킨케어 루틴을 제공합니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

### 5️⃣ subpages/soothing.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="오늘 밤 긴급 진정 가이드: 트러블 피부 응급 처치" />
<meta property="og:description" content="갑작스러운 피부 트러블, 염증, 붓기를 빠르게 진정시키는 응급 스킨케어 가이드입니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/soothing.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="긴급 진정 스킨케어 가이드" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="오늘 밤 긴급 진정 가이드: 트러블 피부 응급 처치" />
<meta name="twitter:description" content="갑작스러운 피부 트러블, 염증, 붓기를 빠르게 진정시키는 응급 스킨케어 가이드입니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

### 6️⃣ subpages/trace.html
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="흔적 & 케어 루틴 가이드: 피부 흔적 제거 및 관리법" />
<meta property="og:description" content="여드름 흔적, 색소침착, 흉터 등 피부 흔적을 개선하는 과학적 케어 루틴을 제공합니다." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://jiwontang.github.io/skin-guide-main/subpages/trace.html" />
<meta property="og:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="피부 흔적 제거 및 관리 가이드" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="흔적 & 케어 루틴 가이드: 피부 흔적 제거 및 관리법" />
<meta name="twitter:description" content="여드름 흔적, 색소침착, 흉터 등 피부 흔적을 개선하는 과학적 케어 루틴을 제공합니다." />
<meta name="twitter:image" content="https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp" />
```

---

## 🎯 Kiro 프롬프트 (각 페이지별)

### 📌 subpages/skintype.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/skintype.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/skintype.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "내 피부 타입 확인 가이드: 정확한 자가 진단과 맞춤 관리법"
- og:description: "4가지 정밀 질문으로 피부 타입을 자동 판별하고, 지성, 건성, 수부지 타입별 맞춤 성분 가이드를 제공합니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/skintype.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "피부 타입 자가 진단 가이드"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

### 📌 subpages/ingredient.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/ingredient.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/ingredient.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "화장품 성분 신호등: 안전성 판별 및 성분 분석 가이드"
- og:description: "화장품 전성분을 입력하면 위험 성분을 자동 감지하고, 피부 타입별 맞춤 성분 추천을 제공합니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/ingredient.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "화장품 성분 신호등 분석 도구"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

### 📌 subpages/homecare.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/homecare.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/homecare.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "0원 나쁜 습관 파괴기: 홈케어 루틴 최적화 가이드"
- og:description: "세안, 보습, 생활 습관 등 피부를 망치는 나쁜 습관을 파악하고 개선하는 무료 홈케어 가이드입니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/homecare.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "홈케어 루틴 최적화 가이드"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

### 📌 subpages/d-1.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/d-1.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/d-1.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "D-1 중요날 찰떡 루틴: 하루 전 긴급 스킨케어 가이드"
- og:description: "중요한 날을 앞두고 피부를 최상의 상태로 만드는 D-1 긴급 스킨케어 루틴을 제공합니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/d-1.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "D-1 중요날 스킨케어 루틴"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

### 📌 subpages/soothing.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/soothing.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/soothing.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "오늘 밤 긴급 진정 가이드: 트러블 피부 응급 처치"
- og:description: "갑작스러운 피부 트러블, 염증, 붓기를 빠르게 진정시키는 응급 스킨케어 가이드입니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/soothing.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "긴급 진정 스킨케어 가이드"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

### 📌 subpages/trace.html 적용용 프롬프트
```
너는 SEO 전문가야. 현재 subpages/trace.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.

[작업 지시사항]
- 파일 대상: subpages/trace.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "흔적 & 케어 루틴 가이드: 피부 흔적 제거 및 관리법"
- og:description: "여드름 흔적, 색소침착, 흉터 등 피부 흔적을 개선하는 과학적 케어 루틴을 제공합니다."
- og:type: "article"
- og:url: "https://jiwontang.github.io/skin-guide-main/subpages/trace.html"
- og:image: "https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp"
- og:image:width: "1200"
- og:image:height: "630"
- og:image:alt: "피부 흔적 제거 및 관리 가이드"
- og:locale: "ko_KR"
- Twitter Card 메타 태그도 함께 추가 (twitter:card, twitter:title, twitter:description, twitter:image)
```

---

## 📊 OG 메타 태그 체크리스트

각 페이지에 다음 항목이 포함되어 있는지 확인하세요:

- [ ] `og:title` - 페이지 제목 (55-60자 권장)
- [ ] `og:description` - 페이지 설명 (150-160자 권장)
- [ ] `og:type` - 콘텐츠 타입 (website 또는 article)
- [ ] `og:url` - 절대 경로 URL
- [ ] `og:image` - 이미지 절대 경로 (1200x630px 권장)
- [ ] `og:image:width` - 이미지 너비 (1200)
- [ ] `og:image:height` - 이미지 높이 (630)
- [ ] `og:image:alt` - 이미지 대체 텍스트
- [ ] `og:locale` - 언어 설정 (ko_KR)
- [ ] `twitter:card` - Twitter 카드 타입 (summary_large_image)
- [ ] `twitter:title` - Twitter 제목
- [ ] `twitter:description` - Twitter 설명
- [ ] `twitter:image` - Twitter 이미지

---

## 🔗 참고 자료

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**마지막 업데이트:** 2026-04-22
**상태:** ✅ index.html 완료 | ⏳ 다른 페이지 대기 중
