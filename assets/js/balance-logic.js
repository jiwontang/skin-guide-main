/**
 * balance-logic.js
 * 밸런스 게임의 데이터와 진행 로직을 담당합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ── 밸런스 게임 질문 데이터 ── */
  const balanceQuestions = [
    {
      id: 1,
      q: "평생 하나만 포기해야 한다면?",
      a: "외출 전 꼼꼼한 세안 (물세안만 가능)",
      b: "취침 전 꼼꼼한 기초케어 (아무것도 못 바름)"
    },
    {
      id: 2,
      q: "당신을 더 괴롭히는 피부 고민은?",
      a: "화장 독처럼 울긋불긋 올라오는 트러블",
      b: "속당김으로 얼굴이 찢어질 것 같은 건조함"
    },
    {
      id: 3,
      q: "스킨케어 루틴, 당신의 선택은?",
      a: "12단계 프리미엄 풀코스 케어",
      b: "최소한의 성분으로 끝내는 미니멀 케어"
    },
    {
      id: 4,
      q: "포기할 수 없는 피부 컨디션은?",
      a: "모공 하나 보이지 않는 깐달걀 피부결",
      b: "잡티 하나 없이 맑고 투명한 피부톤"
    },
    {
      id: 5,
      q: "돈을 투자한다면 어디에?",
      a: "100만원 상당의 고기능성 안티에이징 크림",
      b: "피부과 전문의의 정밀 레이저 시술 1회"
    }
  ];

  /* ── 게임 상태 관리 ── */
  let currentStep = 0;
  const totalSteps = balanceQuestions.length;
  const selections = [];

  /* ── DOM 요소 참조 ── */
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

  // 초기화
  if (totalQText) totalQText.textContent = totalSteps;

  /**
   * 질문 화면 업데이트
   */
  function renderStep() {
    if (currentStep >= totalSteps) {
      handleGameOver();
      return;
    }

    const data = balanceQuestions[currentStep];
    
    // 텍스트 교체
    questionEl.textContent = data.q;
    textA.textContent = data.a;
    textB.textContent = data.b;
    currentQText.textContent = currentStep + 1;

    // 진행도 업데이트
    const percent = (currentStep / totalSteps) * 100;
    gsap.to(progressFill, { width: `${percent}%`, duration: 0.6, ease: "power2.inOut" });

    // 카드 등장 애니메이션
    gsap.fromTo(".bg-card", 
      { y: 50, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }
    );
  }

  /**
   * 선택 시 클릭 피드백 및 다음 질문 이동
   */
  function onSelect(type) {
    selections.push(type);
    const targetCard = type === 'a' ? choiceA : choiceB;
    const otherCard = type === 'a' ? choiceB : choiceA;

    // GSAP 흔들기(Shake) 및 강조 효과
    const tl = gsap.timeline({
      onComplete: () => {
        currentStep++;
        renderStep();
      }
    });

    tl.to(targetCard, { x: -6, duration: 0.05, repeat: 5, yoyo: true }) // 흔들기
      .to(targetCard, { 
        scale: 1.1, 
        borderColor: "#7ec1ff", 
        backgroundColor: "rgba(126, 193, 255, 0.2)",
        boxShadow: "0 0 40px rgba(126, 193, 255, 0.4)",
        duration: 0.2 
      })
      .to(".bg-card", { opacity: 0, y: -30, duration: 0.4, delay: 0.1 });
  }

  /**
   * 결과 화면 출력
   */
  function handleGameOver() {
    gsap.to(progressFill, { width: "100%", duration: 0.5 });
    
    gsap.to(gameArea, { opacity: 0, y: -50, duration: 0.5, onComplete: () => {
      gameArea.style.displa    const RESULT_DATA = {
      guardian: {
        emoji: "🛡️",
        title: "당신은 피부 유니버스의 '철벽 수비 기사'!",
        intro: "탄탄한 기본기로 외부 침략을 완벽히 차단하는 당신! 피부의 가장 기초적인 평화를 지켜내는 모습이 정말 듬직해요.",
        report: `
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">🔬</span>
              <h4 class="report-box__title">과학적 팩트 체크</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>NMF 보호</strong>: 당신의 선택은 천연 보습 인자(NMF, 피부 속 수분을 잡아두는 아미노산 집합체)를 보존하여 속건조를 예방해요.</li>
                <li><strong>지질 장벽 강화</strong>: 피부 세포 사이를 메우는 라멜라 구조(Lamellar Structure, 기름과 물이 층을 이룬 장벽 구조)를 튼튼하게 유지해줍니다.</li>
                <li><strong>pH 밸런싱</strong>: 피부 표면의 약산성 보호막(Acid Mantle, 세균 번식을 막는 산성막)을 사수하여 외부 세균의 침입을 원천 차단하는 능력이 탁월해요.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">⚠️</span>
              <h4 class="report-box__title">만약 이대로 방치한다면?</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li>지나친 방어 위주의 케어는 피부의 '턴오버 주기(Turnover Cycle, 죽은 세포가 떨어지고 새 세포가 올라오는 과정)'를 늦춰 피부가 칙칙해질 수 있어요.</li>
                <li>물세안만 고집할 경우, 선크림의 친유성(Oil-soluble, 기름에 녹는 성질) 잔여물이 모공을 막아 만성적인 미세 트러블의 원인이 될 수 있습니다.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">💡</span>
              <h4 class="report-box__title">현실적인 구원 템</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>필수 성분</strong>: '세라마이드'와 '판테놀'이 들어간 고보습 크림이 당신의 철벽 수비를 완성해줄 거예요.</li>
                <li><strong>추천 제형</strong>: 피부에 얇은 막을 씌워주는 밀폐형(Occlusive, 수분 증발을 물리적으로 막는 제형) 연고 크림 제형을 밤에 사용해보세요.</li>
                <li><strong>꿀팁</strong>: 일주일에 한 번은 순한 효소 세안제로 묵은 각질만 걷어내 주는 센스!</li>
              </ul>
            </div>
          </div>
        `
      },
      curator: {
        emoji: "⚖️",
        title: "당신은 피부 유니버스의 '지능형 수분 탐험가'!",
        intro: "최적의 경로를 찾아 피부의 갈증을 해결하는 당신! 합리적인 선택으로 피부의 유수분 밸런스를 맞추는 능력이 대단해요.",
        report: `
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">🔬</span>
              <h4 class="report-box__title">과학적 팩트 체크</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>GAG 밸런스</strong>: 진피층의 글리코사미노글리칸(GAG, 수분을 끌어당기는 천연 다당류) 수치를 적절히 조절하여 피부 탄력을 유지해요.</li>
                <li><strong>항상성 유지</strong>: 외부 온도가 변해도 피부 내부의 수분도를 일정하게 맞추는 호메오스타시스(Homeostasis, 생체 평형 상태) 능력이 뛰어납니다.</li>
                <li><strong>피지 조절</strong>: 나이아신아마이드가 피지 분비를 정상화하여 모공의 크기와 피부 결을 동시에 관리해줘요.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">⚠️</span>
              <h4 class="report-box__title">만약 이대로 방치한다면?</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li>컨디션이 급격히 떨어지는 환절기에는 당신의 스마트한 루틴도 무너질 수 있어요. 이때를 대비한 '긴급 복구 키트'가 없으면 만성 속건조에 시달릴 수 있습니다.</li>
                <li>유수분 밸런스가 한쪽으로 치우치면 피부 장벽이 급격히 얇아지는 '민감성 피부'로 변할 위험이 있습니다.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">💡</span>
              <h4 class="report-box__title">현실적인 구원 템</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>필수 성분</strong>: 수분 자석이라 불리는 '히알루론산'과 피부 진정을 돕는 '마데카소사이드'를 섞어서 사용해보세요.</li>
                <li><strong>추천 제형</strong>: 수분감은 가득하면서 마무리는 산뜻한 젤 로션 제형이 당신의 루틴에 딱 맞아요.</li>
                <li><strong>꿀팁</strong>: 세안 후 3초 안에 수분 앰플을 발라 수분 통로(Aquaporin, 세포막에 있는 수분 이동 채널)를 열어주는 습관을 들여보세요!</li>
              </ul>
            </div>
          </div>
        `
      },
      highend: {
        emoji: "🚀",
        title: "당신은 피부 유니버스의 '거침없는 광채 사냥꾼'!",
        intro: "어떤 잡티도 허용하지 않고 광채를 찾아 떠나는 개척자! 고성능 케어로 피부의 한계에 도전하는 모습이 정말 멋져요.",
        report: `
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">🔬</span>
              <h4 class="report-box__title">과학적 팩트 체크</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>섬유아세포 활성</strong>: 레티놀과 비타민C 성분이 진피층의 섬유아세포(Fibroblasts, 콜라겐과 엘라스틴을 만드는 핵심 세포)를 자극해 탄력을 높여요.</li>
                <li><strong>색소 억제 기전</strong>: 멜라닌 합성을 차단하여 색소 침착(Hyperpigmentation, 피부가 검게 변하는 현상)을 방지하고 피부 톤을 화사하게 개선합니다.</li>
                <li><strong>세포 재생 가속</strong>: 펩타이드 사슬이 세포에 신호를 보내 단백질 합성을 촉진하고 노화 징후를 빠르게 교정해요.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">⚠️</span>
              <h4 class="report-box__title">만약 이대로 방치한다면?</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li>고강도 케어 후 '복구 루틴'을 소홀히 하면 피부 장벽이 얇아지는 '피부 소진(Burn-out, 피부가 더 이상 회복하지 못하는 상태)' 현상이 올 수 있어요.</li>
                <li>자외선 차단을 놓치면 오히려 색소 침착이 더 진해지는 '반동 현상(Rebound Effect, 자극에 대한 방어 기제로 색소가 더 올라오는 현상)'이 나타날 수 있으니 주의해야 합니다.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">💡</span>
              <h4 class="report-box__title">현실적인 구원 템</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>필수 성분</strong>: 피부 재생의 핵심인 'EGF(Epidermal Growth Factor, 상피세포 성장 인자)'와 자극을 잠재워줄 '시카(병풀 추출물)' 성분을 필수적으로 구비하세요.</li>
                <li><strong>추천 제형</strong>: 고농축 성분이 안정적으로 흡수될 수 있는 오일 인 워터(Oil-in-water, 수분 속에 미세한 오일 입자가 분산된 제형) 타입의 고영양 세럼이 좋아요.</li>
                <li><strong>꿀팁</strong>: 강력한 활성 성분은 반드시 밤에만 사용하고, 아침에는 SPF 50 이상의 자외선 차단제로 피부를 보호하세요!</li>
              </ul>
            </div>
          </div>
        `
      }
    };
�� 진피층 깊숙이 수분을 충전하세요.</li>
                <li><strong>제형 큐레이션</strong>: 계절에 따라 제형(Texture)만 젤에서 크림으로 변경하며 유수분 밸런스를 유지하세요.</li>
              </ul>
            </div>
          </div>
        `
      },
      highend: {
        emoji: "🚀",
        title: "당신은 드라마틱한 변화를 즐기는 '결과 중심 하이엔드'형!",
        intro: "포기란 없다! 고성능 케어로 피부를 개척하는 당신은 뷰티 테크놀로지의 선두주자입니다.",
        report: `
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">📊</span>
              <h4 class="report-box__title">피부 성향 분석</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li>단순한 유지를 넘어 <strong>가시적인 개선(Correction)</strong>을 위해 과감하게 투자하는 타입입니다.</li>
                <li>레티놀, 비타민C 등 고활성 성분에 대한 지식이 해박하며, 전문 시술에 대한 수용도도 높습니다.</li>
                <li>피부의 잠재력을 최대한으로 끌어올리는 '성장지향형' 케어를 선호합니다.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">🔬</span>
              <h4 class="report-box__title">과학적 고찰: 결 vs 톤</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>재생 한계점</strong>: 고농도 성분과 시술은 세포를 자극해 재생을 유도하지만, 과도할 경우 '피부 소진(Burn-out)' 상태에 빠집니다.</li>
                <li><strong>섬유아세포 자극</strong>: 레티놀은 콜라겐 합성 신호를 보내지만, 실제 콜라겐을 만들 '원료(아미노산)'가 부족하면 효과가 반감됩니다.</li>
                <li><strong>멜라닌 기전</strong>: 색소 파괴 시술 후에는 피부 장벽이 매우 얇아져 자외선에 의한 2차 색소 침착 위험이 큽니다.</li>
              </ul>
            </div>
          </div>
          <div class="report-box">
            <div class="report-box__header">
              <span class="report-box__icon">💡</span>
              <h4 class="report-box__title">현실적 솔루션</h4>
            </div>
            <div class="report-box__content">
              <ul class="report-list">
                <li><strong>정교한 복구</strong>: 강력한 재생 성분을 사용한 만큼 반드시 EGF, 펩타이드 같은 '성장 인자'로 뒷수습을 해주어야 합니다.</li>
                <li><strong>시카 보험</strong>: 미세 염증을 잠재우는 시카(병풀) 성분을 루틴에 50% 이상 포함시켜 부작용을 방지하세요.</li>
                <li><strong>턴오버 관리</strong>: 시술 후에는 직접적인 각질 제거를 금하고, 진정 중심의 밀폐 보습에 집중하세요.</li>
              </ul>
            </div>
          </div>
        `
      }
    };

    let result;
    if (aCount >= 4) {
      result = RESULT_DATA.guardian;
    } else if (aCount >= 2) {
      result = RESULT_DATA.curator;
    } else {
      result = RESULT_DATA.highend;
    }

    resultEmoji.textContent = result.emoji;
    resultTitle.textContent = result.title;
    resultIntro.textContent = result.intro;
    expertReport.innerHTML = result.report;
  }

  /* ── 이벤트 리스너 등록 ── */
  choiceA.addEventListener('click', () => onSelect('a'));
  choiceB.addEventListener('click', () => onSelect('b'));

  // 게임 시작
  renderStep();
});
