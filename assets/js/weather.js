// ── 오늘의 피부 타로 ──────────────────────────────────────
(function () {
  'use strict';

  // 5가지 타로 메시지
  var tarotMessages = [
    {
      emoji: '🏜️',
      title: '사막화 경보',
      text: '비상! 피부 사막화 진행 중. 오늘은 오아시스(수분 앰플)를 듬뿍 바르고 일찍 주무세요.'
    },
    {
      emoji: '🛡️',
      title: '철벽 방어 모드',
      text: '철벽 방어 모드 발동! 유해 환경이 피부를 노립니다. 외출 전 장벽 크림으로 꼼꼼히 공사하세요.'
    },
    {
      emoji: '🌿',
      title: '강제 휴식 선고',
      text: '강제 휴식 선고. 피부가 화장품에 지쳤어요. 가벼운 토너 하나만 바르고 숨통을 틔워주세요.'
    },
    {
      emoji: '✨',
      title: '유분 폭발 주의',
      text: '유전 터지기 일보 직전! 오후의 번들거림을 막으려면 지금 당장 산뜻한 피지 조절 젤을 투입하세요.'
    },
    {
      emoji: '🌟',
      title: '컨디션 120점',
      text: '컨디션 120점 달성! 이 완벽한 상태를 내일까지 유지하려면 선크림과 꼼꼼한 세안은 필수입니다.'
    }
  ];

  // 카드마다 랜덤 메시지 배정 (중복 없이 3개 선택)
  function pickThree() {
    var shuffled = tarotMessages.slice().sort(function () { return Math.random() - 0.5; });
    return shuffled.slice(0, 3);
  }

  var assigned = pickThree();
  var selected = false;

  var cards = [
    document.getElementById('tarot-card-0'),
    document.getElementById('tarot-card-1'),
    document.getElementById('tarot-card-2')
  ];
  var fronts = [
    document.getElementById('tarot-front-0'),
    document.getElementById('tarot-front-1'),
    document.getElementById('tarot-front-2')
  ];
  var retryWrap = document.getElementById('tarot-retry-wrap');
  var retryBtn  = document.getElementById('tarot-retry-btn');

  // 앞면 콘텐츠 미리 주입 (backface-visibility로 숨겨져 있음)
  assigned.forEach(function (msg, i) {
    fronts[i].innerHTML =
      '<span class="tarot-front__emoji">' + msg.emoji + '</span>' +
      '<strong class="tarot-front__title">' + msg.title + '</strong>' +
      '<p class="tarot-front__text">' + msg.text + '</p>';
  });

  // 카드 클릭 핸들러
  function handleCardClick(index) {
    if (selected) return;
    selected = true;

    cards.forEach(function (card, i) {
      if (i === index) {
        card.classList.add('tarot-card--flipped');
      } else {
        card.classList.add('tarot-card--fade');
      }
    });

    // 다시하기 버튼 표시
    setTimeout(function () {
      retryWrap.style.display = 'block';
    }, 800);
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () { handleCardClick(i); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(i);
      }
    });
  });

  // 다시하기
  retryBtn.addEventListener('click', function () {
    selected = false;
    assigned = pickThree();

    cards.forEach(function (card) {
      card.classList.remove('tarot-card--flipped', 'tarot-card--fade');
    });

    assigned.forEach(function (msg, i) {
      fronts[i].innerHTML =
        '<span class="tarot-front__emoji">' + msg.emoji + '</span>' +
        '<strong class="tarot-front__title">' + msg.title + '</strong>' +
        '<p class="tarot-front__text">' + msg.text + '</p>';
    });

    retryWrap.style.display = 'none';
  });
}());
