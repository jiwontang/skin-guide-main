/**
 * skincare-diet-logic.js
 * 화장대 다이어트 시뮬레이터 로직
 * GSAP CDN이 로드된 경우 GSAP 애니메이션 사용,
 * 로드 실패 시 CSS transition 폴백으로 동작
 */

document.addEventListener('DOMContentLoaded', function () {
  /* ── GSAP 로드 여부 확인 ── */
  var hasGsap = typeof gsap !== 'undefined';

  /* ── DOM 요소 ── */
  var step1      = document.getElementById('sd-step-1');
  var step2      = document.getElementById('sd-step-2');
  var gameArea   = document.getElementById('sd-game-area');
  var resultArea = document.getElementById('sd-result-area');

  var btnNext   = document.getElementById('btn-next-step');
  var btnPrev   = document.getElementById('btn-prev-step');
  var btnSubmit = document.getElementById('btn-submit-test');

  var resultTitle    = document.getElementById('sd-result-title');
  var resultDesc     = document.getElementById('sd-result-desc');
  var dynamicComment = document.getElementById('dynamic-diet-comment');

  /* ── 폴백용 CSS transition 헬퍼 ── */
  function cssSlideOut(el, direction, callback) {
    // direction: 'up' | 'down'
    var y = direction === 'up' ? '-20px' : '20px';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(' + y + ')';
    setTimeout(function () {
      el.classList.remove('active');
      el.style.transition = '';
      el.style.opacity = '';
      el.style.transform = '';
      if (callback) callback();
    }, 300);
  }

  function cssSlideIn(el, direction) {
    // direction: 'up' | 'down'
    var fromY = direction === 'up' ? '20px' : '-20px';
    el.classList.add('active');
    el.style.opacity = '0';
    el.style.transform = 'translateY(' + fromY + ')';
    el.style.transition = '';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  /* ── Step 1 → Step 2 ── */
  btnNext.addEventListener('click', function () {
    if (hasGsap) {
      gsap.to(step1, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: function () {
          step1.classList.remove('active');
          gsap.set(step1, { opacity: '', y: '' });

          step2.classList.add('active');
          gsap.fromTo(step2,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    } else {
      cssSlideOut(step1, 'up', function () {
        cssSlideIn(step2, 'up');
      });
    }
  });

  /* ── Step 2 → Step 1 ── */
  btnPrev.addEventListener('click', function () {
    if (hasGsap) {
      gsap.to(step2, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: function () {
          step2.classList.remove('active');
          gsap.set(step2, { opacity: '', y: '' });

          step1.classList.add('active');
          gsap.fromTo(step1,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    } else {
      cssSlideOut(step2, 'down', function () {
        cssSlideIn(step1, 'down');
      });
    }
  });

  /* ── 결과 제출 ── */
  btnSubmit.addEventListener('click', function () {
    var checkedProducts = Array.from(
      document.querySelectorAll('input[name="product"]:checked')
    ).map(function (cb) { return cb.value; });

    var checkedIngredients = Array.from(
      document.querySelectorAll('input[name="ingredient"]:checked')
    ).map(function (cb) { return cb.value; });

    var evaluation = evaluateDiet(checkedProducts, checkedIngredients);
    renderResult(evaluation);

    if (hasGsap) {
      gsap.to(gameArea, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        onComplete: function () {
          gameArea.style.display = 'none';

          resultArea.style.display = 'block';
          gsap.fromTo(resultArea,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: function () {
                window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
              }
            }
          );
        }
      });
    } else {
      gameArea.style.transition = 'opacity 0.4s ease';
      gameArea.style.opacity = '0';
      setTimeout(function () {
        gameArea.style.display = 'none';
        resultArea.style.display = 'block';
        resultArea.style.opacity = '0';
        resultArea.style.transform = 'translateY(50px)';
        resultArea.style.transition = '';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            resultArea.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            resultArea.style.opacity = '1';
            resultArea.style.transform = 'translateY(0)';
            setTimeout(function () {
              window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
            }, 100);
          });
        });
      }, 400);
    }
  });

  /* ── 평가 로직 ── */
  function evaluateDiet(products, ingredients) {
    var productCount = products.length;
    var hasVitC    = ingredients.indexOf('vitamin_c') !== -1;
    var hasRetinol = ingredients.indexOf('retinol') !== -1;
    var hasAhaBha  = ingredients.indexOf('aha_bha') !== -1;
    var isClashing = (hasVitC && hasRetinol) || (hasRetinol && hasAhaBha);

    var title, desc, comment;

    if (productCount >= 5 || isClashing) {
      title   = '초고도 비만 화장대! 🚨 피부 장벽 붕괴 경보';
      desc    = '현재 피부가 감당할 수 있는 흡수량을 훨씬 초과했습니다. 치명적인 성분 충돌과 과잉 영양으로 인해 피부가 숨을 쉬지 못하고 있습니다.';
      comment = '<strong>[전문가 긴급 진단]</strong> 당신은 현재 기초 제품을 ' + productCount + '개나 겹쳐 바르고 있습니다. ';
      if (isClashing) {
        comment += '특히 <strong>비타민C, 레티놀, AHA/BHA와 같은 고활성 성분들이 충돌</strong>하며 피부에 극심한 자극을 주고 있습니다. ';
      }
      comment += '피부 장벽을 복구하기 위해서는 지금 당장 화장대에서 불필요한 제품들을 과감히 덜어내야 합니다. 화장대 다이어트의 핵심은 <strong>피부 지질의 구성 성분과 유사한 환경을 만들어주는 것</strong>입니다.';

    } else if (productCount >= 3) {
      title   = '경도 비만 화장대! ⚠️ 다이어트가 필요해요';
      desc    = '조금씩 영양이 과잉되고 있습니다. 겉돌고 있는 스킨케어 단계를 과감히 생략(Skip)해 보세요.';
      comment = '<strong>[전문가 진단]</strong> 현재 ' + productCount + '개의 제품을 사용 중이시군요. 나쁘지 않지만 약간 과할 수 있습니다. 화장대 다이어트의 핵심은 <strong>피부 지질의 구성 성분과 유사한 환경을 만들어주는 것</strong>입니다.';

    } else {
      title   = '완벽한 스킵-케어! ✨ 모범적인 미니멀리스트';
      desc    = '아주 훌륭합니다! 피부 자생력을 지키는 최적의 루틴을 유지하고 계십니다.';
      comment = '<strong>[전문가 칭찬]</strong> ' + productCount + '개의 최소한의 제품만으로 피부를 관리하는 훌륭한 습관입니다! 앞으로도 화장대 다이어트의 핵심인 <strong>피부 지질의 구성 성분과 유사한 환경을 유지하는 것</strong>에 집중하세요.';
    }

    return { title: title, desc: desc, comment: comment };
  }

  /* ── 결과 렌더링 ── */
  function renderResult(evaluation) {
    if (resultTitle)    resultTitle.textContent  = evaluation.title;
    if (resultDesc)     resultDesc.textContent   = evaluation.desc;
    if (dynamicComment) dynamicComment.innerHTML = evaluation.comment;
  }
});
