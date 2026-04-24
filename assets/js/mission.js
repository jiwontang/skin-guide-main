// ── 시크릿 글로우 미션 ────────────────────────────────────
(function () {
  'use strict';

  // 7가지 미션 데이터
  var missions = [
    {
      emoji: '💧',
      tag: '오늘의 습관',
      title: '3분 수분법',
      steps: [
        '세안 직후 3분 이내에 토너를 바르세요.',
        '손바닥으로 가볍게 눌러 흡수시키세요.',
        '수분 크림으로 마무리해 수분을 잠그세요.'
      ],
      tip: '세안 후 3분이 지나면 피부 수분이 급격히 증발합니다.'
    },
    {
      emoji: '🌙',
      tag: '오늘의 습관',
      title: '10시 취침 챌린지',
      steps: [
        '밤 10시 이전에 스킨케어를 완료하세요.',
        '스마트폰을 침대 밖에 두세요.',
        '7시간 이상 수면으로 피부 재생 골든타임을 확보하세요.'
      ],
      tip: '밤 10시~새벽 2시는 성장호르몬이 분비되는 피부 재생의 황금 시간입니다.'
    },
    {
      emoji: '☀️',
      tag: '오늘의 습관',
      title: '선크림 2시간 룰',
      steps: [
        '외출 15분 전 선크림을 500원 동전 크기로 바르세요.',
        '2~3시간마다 덧발라 자외선 차단 효과를 유지하세요.',
        '실내에서도 창문 근처라면 선크림은 필수입니다.'
      ],
      tip: '선크림 없이 바른 세럼은 자외선에 의해 효과가 반감됩니다.'
    },
    {
      emoji: '🧊',
      tag: '오늘의 습관',
      title: '냉장 토너 진정법',
      steps: [
        '토너를 냉장고에 30분 보관하세요.',
        '화장솜에 충분히 적셔 얼굴에 10분간 올려두세요.',
        '열감과 붉은기가 빠르게 가라앉는 것을 느껴보세요.'
      ],
      tip: '피부 온도가 1도 낮아지면 피지 분비량이 10% 감소합니다.'
    },
    {
      emoji: '🌿',
      tag: '오늘의 습관',
      title: '미니멀 루틴 데이',
      steps: [
        '오늘은 토너 + 보습제 2단계만 사용하세요.',
        '피부가 스스로 회복하는 시간을 주세요.',
        '자극 없는 하루가 피부 장벽을 강화합니다.'
      ],
      tip: '과도한 레이어링이 오히려 피부 장벽을 약화시킬 수 있습니다.'
    },
    {
      emoji: '💦',
      tag: '오늘의 습관',
      title: '하루 2L 수분 충전',
      steps: [
        '아침 기상 직후 물 한 잔(200ml)을 마시세요.',
        '식사 30분 전 물을 마셔 피부 세포에 수분을 공급하세요.',
        '카페인 음료 1잔당 물 1잔을 추가로 마시세요.'
      ],
      tip: '체내 수분이 1% 부족해도 피부 탄력이 눈에 띄게 감소합니다.'
    },
    {
      emoji: '🛡️',
      tag: '오늘의 습관',
      title: '장벽 강화 세라마이드 집중 케어',
      steps: [
        '세라마이드 함유 크림을 평소보다 두 배 두껍게 바르세요.',
        '손바닥으로 30초간 온열 마사지로 흡수를 도와주세요.',
        '취침 전 한 번 더 덧발라 밤새 장벽을 재건하세요.'
      ],
      tip: '세라마이드는 피부 장벽의 핵심 지질 성분으로, 수분 증발을 막는 방어막입니다.'
    }
  ];

  // 랜덤 미션 선택
  function pickMission() {
    return missions[Math.floor(Math.random() * missions.length)];
  }

  var currentMission = pickMission();

  // DOM 요소
  var resultInner  = document.getElementById('mission-result-inner');
  var blurCover    = document.getElementById('mission-blur-cover');
  var retryWrap    = document.getElementById('scratch-retry-wrap');
  var retryBtn     = document.getElementById('scratch-retry-btn');
  var modalOverlay = document.getElementById('mission-modal-overlay');
  var modalInner   = document.getElementById('mission-modal-inner');
  var modalClose   = document.getElementById('mission-modal-close');

  // 미션 결과 렌더링
  function renderResult(mission) {
    var stepsHTML = mission.steps.map(function (s, i) {
      return '<li class="mission-result__step"><span class="mission-result__step-num">' + (i + 1) + '</span>' + s + '</li>';
    }).join('');

    resultInner.innerHTML =
      '<div class="mission-result__tag">' + mission.tag + '</div>' +
      '<div class="mission-result__emoji">' + mission.emoji + '</div>' +
      '<h3 class="mission-result__title">' + mission.title + '</h3>' +
      '<ul class="mission-result__steps">' + stepsHTML + '</ul>' +
      '<p class="mission-result__tip">💡 ' + mission.tip + '</p>';
  }

  // 모달 렌더링
  function showModal(mission) {
    var stepsHTML = mission.steps.map(function (s, i) {
      return '<li class="mission-modal__step"><span class="mission-modal__step-num">' + (i + 1) + '</span>' + s + '</li>';
    }).join('');

    modalInner.innerHTML =
      '<div class="mission-modal__tag">' + mission.tag + '</div>' +
      '<div class="mission-modal__emoji">' + mission.emoji + '</div>' +
      '<h3 class="mission-modal__title" id="modal-title">' + mission.title + '</h3>' +
      '<ul class="mission-modal__steps">' + stepsHTML + '</ul>' +
      '<p class="mission-modal__tip">💡 ' + mission.tip + '</p>' +
      '<button class="ingredient-btn mission-modal__btn" id="mission-modal-confirm">미션 시작하기 🚀</button>';

    modalOverlay.classList.add('is-active');

    var confirmBtn = document.getElementById('mission-modal-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        modalOverlay.classList.remove('is-active');
      });
    }
  }

  // 블러 덮개 클릭/터치 → 해제
  blurCover.addEventListener('click', function () {
    if (blurCover.classList.contains('is-revealed')) return;
    blurCover.classList.add('is-revealed');
    setTimeout(function () {
      retryWrap.style.display = 'block';
      showModal(currentMission);
    }, 800);
  });

  // 모달 닫기
  modalClose.addEventListener('click', function () {
    modalOverlay.classList.remove('is-active');
  });
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('is-active');
    }
  });

  // 다시하기
  retryBtn.addEventListener('click', function () {
    currentMission = pickMission();
    retryWrap.style.display = 'none';
    blurCover.classList.remove('is-revealed');
    renderResult(currentMission);
  });

  // 초기화
  renderResult(currentMission);
}());
