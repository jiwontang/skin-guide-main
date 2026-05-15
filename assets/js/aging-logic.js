/**
 * aging-logic.js
 * 피부 노화 시계 테스트 (Aging Clock) — GSAP 의존성 제거, CSS transition 기반으로 동작
 */

document.addEventListener('DOMContentLoaded', function () {
  // -----------------------------------------------------------
  // 1. 질문 데이터 및 점수 체계
  // Base Age를 25세로 가정하고 답변에 따라 나이 증감 (+ / -)
  // -----------------------------------------------------------
  const questions = [
    {
      question: "오늘 당신의 자외선 방패(선크림)는 얼마나 튼튼한가요?",
      options: [
        { text: "철통 방어! 외출 전 바르고 수시로 덧바른다", score: -2 },
        { text: "반쪽 방어. 아침에 한 번 바르거나 가끔 까먹는다", score: 1 },
        { text: "무방비 상태. 답답해서 거의 바르지 않는다", score: 4 }
      ]
    },
    {
      question: "어젯밤 피부 배터리(수면)를 몇 % 충전하셨나요?",
      options: [
        { text: "100% 완충! 7시간 이상 푹 잤다", score: -1 },
        { text: "50% 충전. 5~6시간 정도로 아쉽게 잤다", score: 1 },
        { text: "방전 직전. 5시간 미만이거나 자주 깼다", score: 3 }
      ]
    },
    {
      question: "하루 동안 피부에 '디지털 피로도(블루라이트)'를 얼마나 쌓으시나요?",
      options: [
        { text: "최소화 모드. 업무 외에는 전자기기를 멀리한다", score: 0 },
        { text: "기본 모드. 하루 4~6시간 정도 시청한다", score: 1 },
        { text: "과부하 모드. 잠들기 직전까지 스마트폰을 놓지 못한다", score: 3 }
      ]
    },
    {
      question: "내면의 '노화 가속 페달(스트레스)'을 얼마나 밟고 계신가요?",
      options: [
        { text: "브레이크 작동! 취미나 운동으로 잘 털어낸다", score: -1 },
        { text: "조금씩 가속 중. 스트레스를 받지만 꾹 참는다", score: 2 },
        { text: "풀 액셀! 항상 피로하고 예민한 상태다", score: 4 }
      ]
    },
    {
      question: "피부 오아시스에 수분을 공급하고, 당분 폭탄은 피하고 계신가요?",
      options: [
        { text: "오아시스 유지! 물을 자주 마시고 건강식을 먹는다", score: -2 },
        { text: "가뭄의 단비. 물은 적당히 마시고 일반식을 먹는다", score: 0 },
        { text: "당분 폭격! 물보다 달달한 음료나 디저트를 달고 산다", score: 3 }
      ]
    },
    {
      question: "피부 시계를 거꾸로 돌리는 산소 도둑(흡연)과 수분 도둑(음주)을 자주 만나시나요?",
      options: [
        { text: "출입 금지! 둘 다 철저히 멀리한다", score: -2 },
        { text: "가끔 면회. 비흡연자이며 가벼운 음주만 즐긴다", score: 1 },
        { text: "단골 손님. 잦은 음주 또는 흡연 습관이 있다", score: 5 }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let totalScore = 0;
  const baseAge = 25;

  // -----------------------------------------------------------
  // 2. DOM 요소 선택
  // -----------------------------------------------------------
  const gameArea = document.getElementById('ac-game-area');
  const questionText = document.getElementById('ac-question-text');
  const optionsContainer = document.getElementById('ac-options-container');

  const progressFill = document.getElementById('ac-progress-fill');
  const currentQSpan = document.getElementById('ac-current-q');
  const totalQSpan = document.getElementById('ac-total-q');

  const resultArea = document.getElementById('ac-result-area');
  const resultAge = document.getElementById('ac-result-age');
  const resultTitle = document.getElementById('ac-result-title');
  const resultDesc = document.getElementById('ac-result-desc');

  if (totalQSpan) totalQSpan.textContent = questions.length;

  // 초기 진행률 설정 (첫 질문 = 1/6)
  // renderQuestion에서 setProgress가 호출되므로 별도 초기화 불필요

  var progressBar = document.querySelector('.ac-progress__bar');
  if (progressBar) {
    progressBar.style.background = 'rgba(148, 163, 184, 0.2)';
    progressBar.style.borderRadius = '9999px';
    progressBar.style.overflow = 'hidden';
  }

  // -----------------------------------------------------------
  // 유틸: CSS transition 기반 애니메이션 헬퍼
  // -----------------------------------------------------------

  function setProgress(percent) {
    if (!progressFill) return;
    progressFill.style.width = percent + '%';
  }


  function fadeInElements(elements, duration) {
    duration = duration || 300;
    elements.forEach(function (el) {
      if (!el) return;
      el.style.transition = 'opacity ' + duration + 'ms ease, transform ' + duration + 'ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        elements.forEach(function (el) {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  function fadeOutElements(elements, duration, callback) {
    duration = duration || 200;
    elements.forEach(function (el) {
      if (!el) return;
      el.style.transition = 'opacity ' + duration + 'ms ease, transform ' + duration + 'ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
    });
    setTimeout(callback, duration);
  }

  // 숫자 카운트업 (requestAnimationFrame 기반)
  function countUp(el, from, to, duration) {
    if (!el) return;
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased) + '세';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // -----------------------------------------------------------
  // 3. 질문 렌더링
  // -----------------------------------------------------------
  function renderQuestion() {
    var qData = questions[currentQuestionIndex];

    // 진행률 계산
    var pct = ((currentQuestionIndex + 1) / questions.length) * 100;

    // fill에 직접 강제 주입 (transition 없이 즉시 적용)
    var fill = document.getElementById('ac-progress-fill');
    if (fill) {
      fill.style.cssText = 'width:' + pct + '%; height:100%; background:linear-gradient(90deg,#4de9ab,#7ec1ff); display:block; transition:width 0.5s ease;';
    }
    if (currentQSpan) currentQSpan.textContent = currentQuestionIndex + 1;

    if (questionText) questionText.textContent = qData.question;
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      qData.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.className = 'ac-option-btn';
        btn.textContent = opt.text;
        btn.addEventListener('click', function () { handleOptionClick(opt.score); });
        optionsContainer.appendChild(btn);
      });
    }
  }


  function loadQuestion(isFirst) {
    if (isFirst) {
      renderQuestion();
      fadeInElements([questionText, optionsContainer], 400);
    } else {
      fadeOutElements([questionText, optionsContainer], 200, function () {
        renderQuestion();
        fadeInElements([questionText, optionsContainer], 300);
      });
    }
  }

  function handleOptionClick(score) {
    // 중복 클릭 방지
    var btns = optionsContainer ? optionsContainer.querySelectorAll('.ac-option-btn') : [];
    btns.forEach(function (b) { b.disabled = true; });

    totalScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion(false);
    } else {
      showResult();
    }
  }

  // -----------------------------------------------------------
  // 4. 결과 계산 및 표시
  // -----------------------------------------------------------
  function showResult() {
    setProgress(100);

    if (gameArea) {
      gameArea.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      gameArea.style.opacity = '0';
      gameArea.style.transform = 'translateY(30px)';
      setTimeout(function () {
        gameArea.style.display = 'none';

        if (resultArea) {
          resultArea.style.display = 'block';
          resultArea.style.opacity = '0';
          resultArea.style.transform = 'translateY(30px)';
          resultArea.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              resultArea.style.opacity = '1';
              resultArea.style.transform = 'translateY(0)';
            });
          });
          calculateFinalAge();
        }
      }, 400);
    }
  }

  function calculateFinalAge() {
    var finalAge = baseAge + totalScore;
    if (finalAge < 18) finalAge = 18;

    var title = '';
    var desc = '';

    if (totalScore <= -3) {
      title = '놀라운 동안 피부! 철벽 방어력 🛡️';
      desc = '아주 훌륭한 생활 습관을 가지고 계시네요. 현재의 스킨케어와 습관을 계속 유지한다면 오랫동안 건강한 피부를 지킬 수 있습니다.';
    } else if (totalScore <= 3) {
      title = '평균적인 피부 나이! 조금만 더 관리해볼까요? 🌱';
      desc = '비교적 무난한 습관을 가졌지만, 특정 항목에서 노화가 가속화되고 있을 수 있습니다. 자외선 차단이나 수분 섭취에 조금 더 신경 써주세요.';
    } else if (totalScore <= 8) {
      title = '노화 시계 가속 중! 긴급 조치가 필요해요 🚨';
      desc = '현재 생활 습관이 피부 장벽을 무너뜨리고 광노화를 촉진하고 있습니다. 아래 상세 리포트를 확인하고 습관을 반드시 교정하세요.';
    } else {
      title = '피부 비상사태! 적극적인 안티에이징 필수 🆘';
      desc = '위험 신호! 자외선, 스트레스, 식습관이 복합적으로 피부 노화를 급격히 앞당기고 있습니다. 당장 오늘부터 전문가 리포트의 가이드를 실천하세요.';
    }

    if (resultTitle) resultTitle.textContent = title;
    if (resultDesc) resultDesc.textContent = desc;

    // 나이 카운트업 애니메이션 (requestAnimationFrame 기반)
    countUp(resultAge, baseAge, finalAge, 2000);
  }

  // -----------------------------------------------------------
  // 5. 초기 시작
  // -----------------------------------------------------------
  loadQuestion(true);
});
