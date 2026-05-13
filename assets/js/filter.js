/**
 * filter.js
 * GNB / 모바일 카테고리 필터링 로직
 * - data-category 속성을 기준으로 .feature-card 카드를 show/hide
 * - '전체' 선택 시 모든 카드 표시
 */

(function () {
  'use strict';

  /** 카드 필터 적용 */
  function applyFilter(category) {
    const cards = document.querySelectorAll('.feature-card[data-category]');

    cards.forEach(function (card) {
      if (category === '전체' || card.dataset.category === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  /** 활성 버튼 스타일 갱신 */
  function setActiveBtn(clickedBtn, allBtns) {
    allBtns.forEach(function (btn) {
      btn.classList.remove('gnb__btn--active', 'mobile-filter__btn--active');
    });
    clickedBtn.classList.add(
      clickedBtn.classList.contains('gnb__btn')
        ? 'gnb__btn--active'
        : 'mobile-filter__btn--active'
    );
  }

  /** GNB 버튼과 모바일 필터 버튼을 동기화 */
  function syncButtons(category) {
    // GNB
    document.querySelectorAll('.gnb__btn').forEach(function (btn) {
      btn.classList.toggle('gnb__btn--active', btn.dataset.filter === category);
    });
    // 모바일
    document.querySelectorAll('.mobile-filter__btn').forEach(function (btn) {
      btn.classList.toggle('mobile-filter__btn--active', btn.dataset.filter === category);
    });
  }

  /** 이벤트 바인딩 */
  function bindFilterButtons(selector) {
    document.querySelectorAll(selector).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = this.dataset.filter;
        applyFilter(category);
        syncButtons(category);

        // 모바일 메뉴에서 카테고리 선택 시 오버레이 닫기
        if (this.classList.contains('mobile-filter__btn')) {
          const mobileMenu = document.getElementById('mobile-menu');
          const backdrop   = document.getElementById('mobile-menu-backdrop');
          const hamburger  = document.getElementById('hamburger-btn');
          if (mobileMenu) { mobileMenu.classList.remove('active'); mobileMenu.setAttribute('aria-hidden', 'true'); }
          if (backdrop)   backdrop.classList.remove('active');
          if (hamburger)  { hamburger.classList.remove('active'); hamburger.setAttribute('aria-expanded', 'false'); }
          document.body.style.overflow = '';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindFilterButtons('.gnb__btn');
    bindFilterButtons('.mobile-filter__btn');
  });
})();
