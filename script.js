// Flip-reveal service cards into view as the user scrolls.
(function () {
  var tiles = document.querySelectorAll(".service-tile");
  if (!tiles.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    tiles.forEach(function (tile) { tile.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
  );

  tiles.forEach(function (tile) { observer.observe(tile); });
})();
