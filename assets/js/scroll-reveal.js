// ── 전역 스크롤 리빌 (Intersection Observer) ──────────────
(function () {
  'use strict';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // 한 번 나타나면 해제
      }
    });
  }, {
    threshold: 0.12,       // 12% 이상 보이면 트리거
    rootMargin: '0px 0px -4% 0px'
  });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      // 헤더·히어로 내부 요소는 즉시 활성화
      if (
        el.closest('.site-header') ||
        el.closest('.hero-section') ||
        el.closest('.hero-content')
      ) {
        el.classList.add('active');
        return;
      }
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
}());
