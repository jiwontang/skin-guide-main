/**
 * balance-game.js
 * 밸런스 게임 로직 및 GSAP 인터랙션
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ── 질문 데이터 ── */
  const questions = [
    {
      q: "평생 한 가지만 발라야 한다면?",
      a: "평생 선크림만 바르기 (자외선 완벽 차단)",
      b: "평생 보습제만 바르기 (수분막 완벽 유지)"
    },
    {
      q: "더 끔찍한 상황은?",
      a: "화장 독 올라서 얼굴 뒤집어지기",
      b: "심한 건조함으로 얼굴 가뭄 나기"
    },
    {
      q: "스킨케어 루틴, 당신의 스타일은?",
      a: "10단계 풀코스 정성 케어",
      b: "올인원 하나로 끝내는 미니멀 케어"
    },
    {
      q: "포기할 수 없는 효과는?",
      a: "모공 하나 없는 매끈한 피부 결",
      b: "잡티 하나 없는 투명한 피부 톤"
    },
    {
      q: "돈을 쓴다면 어디에?",
      a: "고가의 기능성 에센스/크림",
      b: "정기적인 피부과 전문 시술"
    }
  ];

  /* ── 상태 변수 ── */
  let currentStep = 0;
  const totalSteps = questions.length;
  const userChoices = [];

  /* ── DOM 요소 ── */
  const progressFill = document.getElementById('progress-fill');
  const currentQText = document.getElementById('current-q');
  const totalQText = document.getElementById('total-q');
  const questionEl = document.getElementById('question-text');
  const textA = document.getElementById('text-a');
  const textB = document.getElementById('text-b');
  const choiceA = document.getElementById('choice-a');
  const choiceB = document.getElementById('choice-b');
  const gameArea = document.getElementById('game-area');
  const resultArea = document.getElementById('result-area');

  // 초기 설정
  totalQText.textContent = totalSteps;

  /* ── 함수: 질문 렌더링 ── */
  function updateUI() {
    if (currentStep >= totalSteps) {
      showResult();
      return;
    }

    const currentData = questions[currentStep];

    // 텍스트 업데이트
    questionEl.textContent = currentData.q;
    textA.textContent = currentData.a;
    textB.textContent = currentData.b;
    currentQText.textContent = currentStep + 1;

    // 진행바 업데이트
    const progressPercent = ((currentStep) / totalSteps) * 100;
    gsap.to(progressFill, { width: `${progressPercent}%`, duration: 0.5 });

    // 카드 등장 애니메이션
    gsap.fromTo(".bg-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }

  /* ── 함수: 선택 처리 ── */
  function handleChoice(choice) {
    userChoices.push(choice);

    // 선택한 카드 애니메이션
    const target = choice === 'a' ? choiceA : choiceB;
    const other = choice === 'a' ? choiceB : choiceA;

    const tl = gsap.timeline({
      onComplete: () => {
        currentStep++;
        updateUI();
      }
    });

    tl.to(target, { scale: 0.95, duration: 0.1 })
      .to(target, { scale: 1.05, borderColor: "#7ec1ff", boxShadow: "0 0 30px rgba(126,193,255,0.5)", duration: 0.2 })
      .to(".bg-card", { opacity: 0, y: -20, duration: 0.3, delay: 0.2 });
  }

  /* ── 함수: 결과 표시 ── */
  function showResult() {
    // 최종 진행바 100%
    gsap.to(progressFill, { width: "100%", duration: 0.5 });

    // 게임 영역 숨기기 및 결과 영역 표시
    gsap.to(gameArea, {
      opacity: 0, display: "none", duration: 0.5, onComplete: () => {
        resultArea.style.display = "block";
        gsap.fromTo(resultArea,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        // 결과 리포트 생성 (간단 로직)
        calculateResult();
      }
    });
  }

  function calculateResult() {
    const countA = userChoices.filter(c => c === 'a').length;
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');

    if (countA >= 4) {
      resultTitle.textContent = "당신은 '완벽주의 장벽 수호자'";
      resultDesc.textContent = "기초가 탄탄해야 흔들리지 않는다! 유행보다는 검증된 루틴과 자외선 차단, 기본 보습에 목숨을 거는 타입이시군요. 당신의 피부 장벽은 철옹성 같습니다.";
    } else if (countA >= 2) {
      resultTitle.textContent = "당신은 '스마트한 밸런스 파인더'";
      resultDesc.textContent = "효율과 효과 사이에서 최적의 균형을 찾는 당신! 필요한 기능성 성분은 챙기되 과하지 않게 조절할 줄 아는 진정한 스킨케어 전략가 스타일입니다.";
    } else {
      resultTitle.textContent = "당신은 '자유로운 미니멀리스트'";
      resultDesc.textContent = "복잡한 건 딱 질색! 피부 본연의 힘을 믿으며 최소한의 케어로 최대의 효율을 추구하시네요. 때로는 단순한 것이 가장 강력한 법이죠.";
    }
  }

  /* ── 이벤트 리스너 ── */
  choiceA.addEventListener('click', () => handleChoice('a'));
  choiceB.addEventListener('click', () => handleChoice('b'));

  // 첫 질문 로드
  updateUI();
});
