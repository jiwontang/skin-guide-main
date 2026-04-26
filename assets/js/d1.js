// D-1 타임라인 스크롤 애니메이션 — Intersection Observer
(function () {
  const items = document.querySelectorAll('.d1-timeline__item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // 한 번 활성화 후 해제
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -30% 0px' // 뷰포트 70% 지점 도달 시 트리거
    }
  );

  items.forEach((item) => observer.observe(item));
})();
