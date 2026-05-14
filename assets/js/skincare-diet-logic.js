/**
 * skincare-diet-logic.js
 * 화장대 다이어트 시뮬레이터 로직
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const step1 = document.getElementById('sd-step-1');
  const step2 = document.getElementById('sd-step-2');
  const resultArea = document.getElementById('sd-result-area');
  const gameArea = document.getElementById('sd-game-area');
  
  const btnNext = document.getElementById('btn-next-step');
  const btnPrev = document.getElementById('btn-prev-step');
  const btnSubmit = document.getElementById('btn-submit-test');
  
  const resultTitle = document.getElementById('sd-result-title');
  const resultDesc = document.getElementById('sd-result-desc');
  const dynamicComment = document.getElementById('dynamic-diet-comment');

  // Step 1 -> Step 2
  btnNext.addEventListener('click', () => {
    gsap.to(step1, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        step1.classList.remove('active');
        step2.classList.add('active');
        gsap.fromTo(step2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    });
  });

  // Step 2 -> Step 1
  btnPrev.addEventListener('click', () => {
    gsap.to(step2, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        step2.classList.remove('active');
        step1.classList.add('active');
        gsap.fromTo(step1, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    });
  });

  // 결과 확인하기
  btnSubmit.addEventListener('click', () => {
    // 선택된 제품 및 성분 수집
    const checkedProducts = Array.from(document.querySelectorAll('input[name="product"]:checked')).map(cb => cb.value);
    const checkedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(cb => cb.value);

    // 평가 로직 계산
    const evaluation = evaluateDiet(checkedProducts, checkedIngredients);

    // 결과 화면 렌더링
    renderResult(evaluation);

    // 화면 전환
    gsap.to(gameArea, {
      opacity: 0,
      y: 30,
      duration: 0.4,
      onComplete: () => {
        gameArea.style.display = 'none';
        resultArea.style.display = 'block';
        gsap.fromTo(resultArea, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        
        // 스크롤 상단 이동 (부드럽게)
        window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
      }
    });
  });

  function evaluateDiet(products, ingredients) {
    let title = "";
    let desc = "";
    let comment = "";
    let level = "safe"; // safe, warning, danger

    const productCount = products.length;
    const hasVitC = ingredients.includes('vitamin_c');
    const hasRetinol = ingredients.includes('retinol');
    const hasAhaBha = ingredients.includes('aha_bha');

    // 충돌 체크
    const isClashing = (hasVitC && hasRetinol) || (hasRetinol && hasAhaBha);

    if (productCount >= 5 || isClashing) {
      level = "danger";
      title = "초고도 비만 화장대! 🚨 피부 장벽 붕괴 경보";
      desc = "현재 피부가 감당할 수 있는 흡수량을 훨씬 초과했습니다. 치명적인 성분 충돌과 과잉 영양으로 인해 피부가 숨을 쉬지 못하고 있습니다.";
      
      comment = `<strong>[전문가 긴급 진단]</strong> 당신은 현재 기초 제품을 ${productCount}개나 겹쳐 바르고 있습니다. `;
      if (isClashing) {
        comment += `특히 <strong>비타민C, 레티놀, AHA/BHA와 같은 고활성 성분들이 충돌</strong>하며 피부에 극심한 자극을 주고 있습니다. `;
      }
      comment += "피부 장벽을 복구하기 위해서는 지금 당장 화장대에서 불필요한 제품들을 과감히 덜어내야 합니다. 화장대 다이어트의 핵심은 <strong>피부 지질의 구성 성분과 유사한 환경을 만들어주는 것</strong>입니다.";

    } else if (productCount >= 3) {
      level = "warning";
      title = "경도 비만 화장대! ⚠️ 다이어트가 필요해요";
      desc = "조금씩 영양이 과잉되고 있습니다. 겉돌고 있는 스킨케어 단계를 과감히 생략(Skip)해 보세요.";
      
      comment = `<strong>[전문가 진단]</strong> 현재 ${productCount}개의 제품을 사용 중이시군요. 나쁘지 않지만 약간 과할 수 있습니다. 화장대 다이어트의 핵심은 <strong>피부 지질의 구성 성분과 유사한 환경을 만들어주는 것</strong>입니다.`;
    } else {
      level = "safe";
      title = "완벽한 스킵-케어! ✨ 모범적인 미니멀리스트";
      desc = "아주 훌륭합니다! 피부 자생력을 지키는 최적의 루틴을 유지하고 계십니다.";
      
      comment = `<strong>[전문가 칭찬]</strong> ${productCount}개의 최소한의 제품만으로 피부를 관리하는 훌륭한 습관입니다! 앞으로도 화장대 다이어트의 핵심인 <strong>피부 지질의 구성 성분과 유사한 환경을 유지하는 것</strong>에 집중하세요.`;
    }

    return { title, desc, comment };
  }

  function renderResult(evaluation) {
    resultTitle.textContent = evaluation.title;
    resultDesc.textContent = evaluation.desc;
    dynamicComment.innerHTML = evaluation.comment;
  }
});
