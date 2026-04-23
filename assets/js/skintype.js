window.addEventListener('load', () => {
  const checkBtn = document.getElementById('check-skintype-btn');
  const resultArea = document.getElementById('result-area');

  if (!checkBtn || !resultArea) return;

  checkBtn.addEventListener('click', () => {
    // Get all answers
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="q3"]:checked')?.value;
    const q4 = document.querySelector('input[name="q4"]:checked')?.value;

    // Validate all questions answered
    if (!q1 || !q2 || !q3 || !q4) {
      alert('모든 질문에 답해주세요!');
      return;
    }

    // Diagnostic logic based on 4 questions
    let skinType = determineSkinType(q1, q2, q3, q4);
    let isSensitive = q4 === 'a';

    // Generate result
    let result = generateResult(skinType, isSensitive);

    // Display result
    displayResult(result, resultArea);

    // Save to localStorage
    localStorage.setItem('userSkinType', skinType.type);
    localStorage.setItem('userSensitivity', isSensitive);

    // Scroll to result
    setTimeout(() => {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });

  function determineSkinType(q1, q2, q3, q4) {
    // Count indicators for each type
    let dryCount = 0;
    let oilyCount = 0;
    let comboCount = 0;

    // Q1: Tightness after cleansing
    if (q1 === 'a') dryCount++;
    else if (q1 === 'b') comboCount++;
    else if (q1 === 'c') oilyCount++;

    // Q2: Afternoon sebum state
    if (q2 === 'a') oilyCount++;
    else if (q2 === 'b') comboCount++;
    else if (q2 === 'c') dryCount++;

    // Q3: Oil-moisture balance
    if (q3 === 'a') comboCount++;
    else if (q3 === 'b') dryCount++;
    else if (q3 === 'c') oilyCount++;

    // Determine primary type
    let type = '';
    if (dryCount >= 2) {
      type = 'dry';
    } else if (oilyCount >= 2) {
      type = 'oily';
    } else {
      type = 'combo';
    }

    return {
      type: type,
      dryCount: dryCount,
      oilyCount: oilyCount,
      comboCount: comboCount
    };
  }

  function generateResult(skinType, isSensitive) {
    const typeMap = {
      dry: {
        catchphrase: '💧 수분을 갈망하는 메마른 대지',
        typename: '건조/악건성 피부',
        description: '유분과 수분이 모두 심각하게 부족하여 쉽게 당기고 푸석해지며 잔주름이 생기기 쉬운 타입입니다.',
        goodTexture: '고농축 오일 세럼, 피부 장벽을 모사하는 세라마이드 크림, 저분자 히알루론산 에센스',
        badTexture: '알코올(에탄올) 함량이 높은 토너, 뽀득하게 닦이는 알칼리성 폼 클렌저, 고점도 밤 제형',
        coreAdvice: '세안 직후 물기가 마르기 전 1분 이내에 즉각적인 보습을 해주는 것이 매우 중요합니다. 특히 겨울철에는 크림을 한 겹 더 덧바르는 스킵케어가 필수입니다.'
      },
      oily: {
        catchphrase: '🛢️ 24시간 멈추지 않는 유분 활성',
        typename: '지성 피부',
        description: '피지 분비가 매우 활발하여 얼굴 전체가 쉽게 번들거리고 모공이 넓어 트러블이 잦은 타입입니다.',
        goodTexture: '산뜻한 워터리 젤 로션, 약산성 클렌저, 모공 컨트롤 BHA 토너, 가벼운 수분 에센스',
        badTexture: '모공을 막을 수 있는 고점도 밤(Balm) 제형, 미네랄 오일이나 시어버터가 다량 함유된 제품, 유분기 많은 크림',
        coreAdvice: '유분을 과도하게 닦아내면 보상성 피지가 분비되므로, 부드러운 약산성 세안과 수분 보충에 집중하세요. 주 1-2회 딥클렌징으로 모공 관리를 병행하면 효과적입니다.'
      },
      combo: {
        catchphrase: '🌗 겉바속촉이 아닌 겉번속당',
        typename: '수분 부족형 지성',
        description: 'T존은 번들거리지만 U존은 건조한, 수분은 부족하고 유분은 부분적으로 넘치는 복합성 타입입니다.',
        goodTexture: '수분감 가득한 앰플, T존과 U존을 나눠 바르기 좋은 가벼운 수분 크림, 멀티 존 케어 제품',
        badTexture: '얼굴 전체에 바르는 꾸덕한 영양 크림, 유분기가 과도한 선크림, 고점도 밤 제형',
        coreAdvice: '얼굴의 부위별로 유수분 상태가 다르므로, 건조한 U존에는 크림을 한 겹 더 덧바르는 스킵케어(Skip-care)가 효과적입니다. T존에는 가벼운 제형을, U존에는 영양감 있는 제형을 사용하세요.'
      }
    };

    let result = typeMap[skinType.type];

    // Add sensitivity note
    if (isSensitive) {
      result.sensitivityNote = '⚠️ 초민감성 피부 주의: 외부 자극에 쉽게 반응하므로 저자극 제품을 선택하고, 새로운 제품은 패치 테스트 후 사용하세요. 향료, 알코올, 방부제 함량이 낮은 제품을 우선적으로 고려하세요.';
    }

    return result;
  }

  function displayResult(result, resultArea) {
    let sensitivityHTML = '';
    if (result.sensitivityNote) {
      sensitivityHTML = `
        <div class="result-section" style="border-left-color: #FF6B6B;">
          <h4 class="result-section__title" style="color: #FF6B6B;">⚠️ 민감성 피부 주의</h4>
          <p class="result-section__text">${result.sensitivityNote}</p>
        </div>
      `;
    }

    resultArea.innerHTML = `
      <div class="result-card">
        <div class="result-card__header">
          <h3 class="result-card__type">${result.catchphrase}<br><small class="result-card__typename">${result.typename}</small></h3>
          <p class="result-card__description">${result.description}</p>
        </div>

        <div class="result-card__content">
          <div class="result-section">
            <h4 class="result-section__title">👍 추천 제형</h4>
            <p class="result-section__text">${result.goodTexture}</p>
          </div>

          <div class="result-section" style="border-left-color: #FF6B6B;">
            <h4 class="result-section__title" style="color: #FF6B6B;">⛔ 피해야 할 성분/제형</h4>
            <p class="result-section__text">${result.badTexture}</p>
          </div>

          <div class="result-section" style="border-left-color: #4ADE80;">
            <h4 class="result-section__title" style="color: #4ADE80;">💡 핵심 조언</h4>
            <p class="result-section__text">${result.coreAdvice}</p>
          </div>

          ${sensitivityHTML}

          <div class="result-tip-box">
            <strong>💬 다음 단계:</strong> <a href="ingredient.html" style="color: var(--color-accent); text-decoration: underline;">성분 신호등</a>에서 화장품 전성분을 확인하고, <a href="homecare.html" style="color: var(--color-accent); text-decoration: underline;">0원 홈케어</a>로 기초 습관을 다져보세요.
          </div>
        </div>

        <div class="result-disclaimer">
          ※ 본 결과는 피부과 진단이 아니며, 화장품 선택을 위한 참고 가이드입니다. 지속적인 트러블이나 불편함이 있다면 전문의 상담을 권장합니다.
        </div>
      </div>
    `;

    resultArea.classList.remove('hidden');
    resultArea.style.display = 'block';
  }
});
