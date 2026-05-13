✨ 프로젝트명: Skincare Lab (스킨케어 랩)
"피부 타입 분석부터 성분 궁합까지, 당신만을 위한 스마트 홈케어 가이드"

Skincare Lab은 복잡한 화장품 성분과 피부 관리법을 누구나 쉽게 이해하고 즐길 수 있도록 메타포(Metaphor)와 인터랙티브 기술을 결합한 맞춤형 스킨케어 큐레이션 웹 서비스입니다.

🎯 프로젝트 목적 (AdSense & UX Strategy)
YMYL 준수: 구글의 YMYL(Your Money Your Life) 정책에 맞춰 전문적이고 신뢰할 수 있는 스킨케어 정보 제공.

E-E-A-T 강화: 500자 이상의 고품질 텍스트 데이터를 동적으로 생성하여 정보성 가치 극대화.

체류 시간 최적화: '성분 소개팅' 등 게임화(Gamification) 요소를 도입하여 사용자 경험(UX)과 체류 시간 향상.

🛠 기술 스택 (Tech Stack)
Frontend: HTML5, CSS3 (BEM 방법론 지향), JavaScript (ES6+)

Animation: GSAP (GreenSock Animation Platform)

Workflow: Vibe Coding (Cursor AI & Kiro 활용), Local LLM 최적화

Deployment: Netlify (HTTPS 보안 적용 및 자동 배포)

🚀 주요 기능 (Key Features)
1. 피부 분석 및 진단 (Analysis)
내 피부 타입 확인 가이드: 자가 진단을 통한 정밀 피부 타입 분석.

퍼스널 무드 팔레트: 피부 톤에 맞는 화장품 제형 및 컬러 추천.

2. 성분 및 루틴 가이드 (Ingredients & Routine)
성분 소개팅 (Ingredient Merge Lab): [핵심 기능] 성분 간의 궁합을 소개팅 메타포로 풀어낸 인터랙티브 분석 도구.

화장품 성분 신호등: 성분 안전도를 시각적으로 상징화하여 정보 전달.

텍스트 레이어링 슬라이더: 제형별 올바른 사용 순서 가이드.

3. 긴급 및 스페셜 케어 (Special Care)
오늘 밤 긴급 진정 가이드: 갑작스러운 트러블 발생 시 SOS 솔루션.

D-1 중요날 찰떡 루틴: 중요한 일정을 앞둔 사용자를 위한 집중 케어 플랜.

오늘의 피부 타로: 날씨와 환경 데이터를 결합한 데일리 스킨케어 메시지.

🎨 UI/UX 디자인 컨셉
Dark Mode Aesthetic: 사용자 눈의 피로를 줄이고 전문적인 'Lab' 분위기를 조성하는 다크 테마.

Responsive GNB: * PC: 호버(Hover) 시 부드럽게 슬라이드되는 드롭다운 메뉴로 접근성 향상.

Mobile: 햄버거 메뉴 및 아코디언 UI를 통한 모바일 최적화 탐색 제공.

Micro Interactions: GSAP를 활용한 부드러운 카드 전환 및 요소 애니메이션.

📁 디렉토리 구조 (Directory Structure)
project-root/
├── index.html              # 메인 페이지 (기능 그리드 레이아웃)
├── assets/
│   ├── css/
│   │   └── style.css       # 전역 스타일 및 컴포넌트 디자인
│   ├── js/
│   │   ├── match-logic.js  # 성분 소개팅 게임 로직 및 데이터
│   │   └── main.js         # 공통 UI 및 GNB 로직
│   └── images/             # 로고 및 파비콘 에셋
├── subpages/               # 15개 이상의 개별 기능 페이지
│   ├── skintype.html
│   ├── ingredient-match.html
│   └── ...
└── robots.txt, sitemap.xml # SEO 최적화 파일

⚖️ 면책 조항 (Disclaimer)
본 서비스에서 제공하는 정보는 일반적인 가이드라인이며, 의학적 진단이나 처방을 대신할 수 없습니다. 특정 피부 질환이 있는 경우 반드시 전문가와 상담하십시오.