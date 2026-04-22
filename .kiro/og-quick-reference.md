# 🎯 OG 메타 태그 빠른 참조 카드

## ✅ 완료된 작업
- **index.html**: Open Graph + Twitter Card 메타 태그 적용 완료

---

## 📋 페이지별 OG 설정값

| 페이지 | og:type | og:url | 상태 |
|--------|---------|--------|------|
| index.html | website | https://jiwontang.github.io/skin-guide-main/ | ✅ 완료 |
| skintype.html | article | https://jiwontang.github.io/skin-guide-main/subpages/skintype.html | ⏳ 대기 |
| ingredient.html | article | https://jiwontang.github.io/skin-guide-main/subpages/ingredient.html | ⏳ 대기 |
| homecare.html | article | https://jiwontang.github.io/skin-guide-main/subpages/homecare.html | ⏳ 대기 |
| d-1.html | article | https://jiwontang.github.io/skin-guide-main/subpages/d-1.html | ⏳ 대기 |
| soothing.html | article | https://jiwontang.github.io/skin-guide-main/subpages/soothing.html | ⏳ 대기 |
| trace.html | article | https://jiwontang.github.io/skin-guide-main/subpages/trace.html | ⏳ 대기 |

---

## 🔧 공통 설정값

모든 페이지에서 동일하게 사용:

```
og:image: https://jiwontang.github.io/skin-guide-main/assets/images/og-img.webp
og:image:width: 1200
og:image:height: 630
og:locale: ko_KR
twitter:card: summary_large_image
```

---

## 📝 각 페이지의 고유 설정값

### skintype.html
```
og:title: 내 피부 타입 확인 가이드: 정확한 자가 진단과 맞춤 관리법
og:description: 4가지 정밀 질문으로 피부 타입을 자동 판별하고, 지성, 건성, 수부지 타입별 맞춤 성분 가이드를 제공합니다.
og:image:alt: 피부 타입 자가 진단 가이드
```

### ingredient.html
```
og:title: 화장품 성분 신호등: 안전성 판별 및 성분 분석 가이드
og:description: 화장품 전성분을 입력하면 위험 성분을 자동 감지하고, 피부 타입별 맞춤 성분 추천을 제공합니다.
og:image:alt: 화장품 성분 신호등 분석 도구
```

### homecare.html
```
og:title: 0원 나쁜 습관 파괴기: 홈케어 루틴 최적화 가이드
og:description: 세안, 보습, 생활 습관 등 피부를 망치는 나쁜 습관을 파악하고 개선하는 무료 홈케어 가이드입니다.
og:image:alt: 홈케어 루틴 최적화 가이드
```

### d-1.html
```
og:title: D-1 중요날 찰떡 루틴: 하루 전 긴급 스킨케어 가이드
og:description: 중요한 날을 앞두고 피부를 최상의 상태로 만드는 D-1 긴급 스킨케어 루틴을 제공합니다.
og:image:alt: D-1 중요날 스킨케어 루틴
```

### soothing.html
```
og:title: 오늘 밤 긴급 진정 가이드: 트러블 피부 응급 처치
og:description: 갑작스러운 피부 트러블, 염증, 붓기를 빠르게 진정시키는 응급 스킨케어 가이드입니다.
og:image:alt: 긴급 진정 스킨케어 가이드
```

### trace.html
```
og:title: 흔적 & 케어 루틴 가이드: 피부 흔적 제거 및 관리법
og:description: 여드름 흔적, 색소침착, 흉터 등 피부 흔적을 개선하는 과학적 케어 루틴을 제공합니다.
og:image:alt: 피부 흔적 제거 및 관리 가이드
```

---

## 🚀 다음 단계

각 페이지에 대해 `.kiro/og-meta-tags-guide.md`에 제공된 Kiro 프롬프트를 사용하여 OG 메타 태그를 적용하세요.

**예시:**
```
너는 SEO 전문가야. 현재 subpages/skintype.html 파일의 <head> 태그에 Open Graph 메타 태그를 추가해 줘.
[작업 지시사항]
- 파일 대상: subpages/skintype.html만 수정
- 위치: <head> 태그 내, <title> 태그 바로 아래에 추가
- og:title: "내 피부 타입 확인 가이드: 정확한 자가 진단과 맞춤 관리법"
...
```

---

## ✨ 팁

1. **이미지 최적화**: og-img.webp는 1200x630px 크기로 최적화되어 있습니다.
2. **절대 경로 사용**: GitHub Pages 배포 환경에서 정상 작동하도록 절대 경로를 사용합니다.
3. **Twitter Card**: 소셜 미디어 공유 시 더 나은 미리보기를 제공합니다.
4. **테스트**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)에서 각 페이지를 테스트하세요.

---

**마지막 업데이트:** 2026-04-22
