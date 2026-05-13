/**
 * balance-game.js
 * 밸런스 게임 로직 및 GSAP 인터랙션, 결과 박스 렌더링
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ── 1. 질문 데이터 ── */
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

  /* ── 2. 상태 변수 ── */
  let currentStep = 0;
  const totalSteps = questions.length;
  const userChoices = [];

  /* ── 3. DOM 요소 ── */
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
  if (totalQText) totalQText.textContent = totalSteps;

  /* ── 4. 함수: 질문 렌더링 ── */
  function updateUI() {
    if (currentStep >= totalSteps) {
      showResult();
      return;
    }

    const currentData = questions[currentStep];

    // 텍스트 업데이트
    if (questionEl) questionEl.textContent = currentData.q;
    if (textA) textA.textContent = currentData.a;
    if (textB) textB.textContent = currentData.b;
    if (currentQText) currentQText.textContent = currentStep + 1;

    // 진행바 업데이트
    const progressPercent = ((currentStep) / totalSteps) * 100;
    if (progressFill) gsap.to(progressFill, { width: `${progressPercent}%`, duration: 0.5 });

    // 카드 등장 애니메이션
    gsap.fromTo(".bg-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }

  /* ── 5. 함수: 선택 처리 ── */
  function handleChoice(choice) {
    userChoices.push(choice);

    // 선택한 카드 애니메이션
    const target = choice === 'a' ? choiceA : choiceB;

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

  /* ── 6. 함수: 결과 표시 (애니메이션) ── */
  function showResult() {
    // 최종 진행바 100%
    if (progressFill) gsap.to(progressFill, { width: "100%", duration: 0.5 });

    // 게임 영역 숨기기 및 결과 영역 표시
    gsap.to(gameArea, {
      opacity: 0, display: "none", duration: 0.5, onComplete: () => {
        if (resultArea) {
          resultArea.style.display = "block";
          calculateResult(); // 데이터 꽂아넣기
          gsap.fromTo(resultArea,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
          );
        }
      }
    });
  }

  /* ── 7. 함수: 결과 리포트 계산 및 HTML 동적 생성 ── */
  function calculateResult() {
    const countA = userChoices.filter(c => c === 'a').length;

    // 상세 결과 데이터
    const resultData = {
      highEnd: {
        title: "🛡️ 결과 중심의 '철벽 수비 대장'",
        summary: "당신은 모공 하나 허용하지 않는 완벽주의자! 전문적인 케어와 고기능성 성분을 신뢰하는 하이엔드 유저군요.",
        boxes: [
          { title: "🔬 과학적 팩트 체크: 결 vs 톤", content: "당신의 선택은 피부의 '턴오버 주기(세포 재생 주기)'를 인위적으로 조절하여 최상의 컨디션을 유지하려는 경향이 강합니다. 레티놀이나 비타민C 같은 고활성 성분은 진피층의 콜라겐 밀도를 높여 피부결을 매끈하게 만들지만, 그만큼 피부가 예민해질 수 있는 환경을 제공하기도 해요." },
          { title: "⚠️ 만약 이대로 방치한다면?", content: "고기능성 제품에만 의존하다 보면 피부 스스로를 보호하는 '천연 보습 인자(NMF)' 생성이 게을러질 수 있습니다. 너무 강한 자극은 오히려 피부 장벽의 미세한 균열을 만들어 만성 염증이나 예민 홍조를 유발할 위험이 있어요." },
          { title: "💡 현실적인 전문가 처방전", content: "강력한 기능성 제품 사이사이에 '세라마이드'나 '판테놀' 성분이 듬뿍 든 보습제를 배치하세요. 일주일에 이틀은 수분 공급에만 집중하는 '스킨케어 안식일'을 갖는 것이 진정한 하이엔드 케어의 완성입니다." }
        ]
      },
      balance: {
        title: "⚖️ 똑똑한 '스킨 전략가'",
        summary: "유행에 휘둘리지 않고 나에게 꼭 필요한 것만 쏙쏙 골라 쓰는 스마트한 밸런스 파인더시네요!",
        boxes: [
          { title: "🔬 효율적인 스킨케어의 원리", content: "당신은 피부가 감당할 수 있는 자극의 임계치를 잘 알고 계시군요. 여러 단계의 화장품을 겹쳐 바르는 것보다, 유효 성분의 흡수율을 높이는 '스마트 레이어링' 방식이 잘 어울립니다. 피부 스트레스는 줄이면서 효과는 극대화하는 방식이죠." },
          { title: "⚠️ 놓치기 쉬운 포인트", content: "밸런스를 잘 유지하다가도 갑작스러운 환경 변화에 대응이 늦어질 수 있습니다. 평소에 잘 맞던 루틴이 갑자기 따갑게 느껴진다면, 그것은 피부 장벽이 보낸 작은 조난 신호일 수 있으니 주의 깊게 관찰해야 해요." },
          { title: "💡 이런 성분을 추천해요", content: "당신에게는 '나이아신아마이드'를 추천합니다. 미백, 장벽 강화, 피지 조절까지 다재다능한 이 성분은 당신의 효율적인 루틴에 완벽한 시너지를 더해줄 거예요." }
        ]
      },
      minimal: {
        title: "🌿 자연스러운 '본연의 미니멀리스트'",
        summary: "복잡한 건 딱 질색! 피부 본연의 힘을 믿으며 최소한의 케어로 최대의 효율을 추구하는 타입입니다.",
        boxes: [
          { title: "🔬 미니멀 케어의 철학", content: "화장품 다이어트(Skip-care)는 지친 피부를 쉬게 하는 가장 좋은 방법입니다. 불필요한 화학 성분 접촉을 줄임으로써 피부가 스스로 유수분 밸런스를 맞출 수 있는 시간을 벌어주는 것이죠." },
          { title: "⚠️ 주의해야 할 자산 관리", content: "미니멀리즘이 자칫 '방치'가 되어서는 안 됩니다. 특히 자외선 차단과 세안은 미니멀의 영역이 아니라 생존의 영역이에요! 이 두 가지만큼은 타협하지 말고 꼼꼼히 챙겨야 합니다." },
          { title: "💡 당신을 위한 구원 템", content: "성분 가짓수가 적은 '히알루론산' 단일 성분 토너나 크림을 활용해 보세요. 피부에 꼭 필요한 수분만 깔끔하게 채워주어, 답답함 없이 맑은 피부 바탕을 유지하는 데 큰 도움을 줄 것입니다." }
        ]
      }
    };

    // 점수에 따른 결과 매핑
    let finalData;
    if (countA >= 4) finalData = resultData.highEnd;
    else if (countA >= 2) finalData = resultData.balance;
    else finalData = resultData.minimal;

    // 상세 박스 HTML 덩어리 만들기
    let boxesHtml = '';
    finalData.boxes.forEach(box => {
      boxesHtml += `
        <div class="report-box">
          <h3>${box.title}</h3>
          <p>${box.content}</p>
        </div>
      `;
    });

    // resultArea 안에 완벽하게 일치하는 클래스명으로 구조 삽입
    if (resultArea) {
      resultArea.innerHTML = `
        <div class="result-summary-card">
          <h2 id="result-title">${finalData.title}</h2>
          <p id="result-desc">${finalData.summary}</p>
        </div>
        <div id="result-detail">
          ${boxesHtml}
        </div>
      `;
    }
  }

  /* ── 8. 이벤트 리스너 등록 ── */
  if (choiceA) choiceA.addEventListener('click', () => handleChoice('a'));
  if (choiceB) choiceB.addEventListener('click', () => handleChoice('b'));

  // 첫 질문 로드
  updateUI();
});