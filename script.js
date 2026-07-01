// Flip-reveal service cards into view as the user scrolls.
(function () {
  var tiles = document.querySelectorAll(".service-tile");
  if (!tiles.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    tiles.forEach(function (tile) { tile.classList.add("is-visible"); });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
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
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );

  tiles.forEach(function (tile) { observer.observe(tile); });

  // Failsafe: on short pages, a tile near the very bottom of the document can
  // sit in a dead zone the observer's rootMargin never satisfies. If the user
  // reaches the bottom of the page, force-reveal anything still hidden.
  function revealIfAtBottom() {
    var scrolledToBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (scrolledToBottom) revealAll();
  }

  window.addEventListener("scroll", revealIfAtBottom, { passive: true });
  window.addEventListener("resize", revealIfAtBottom);
  window.addEventListener("load", revealIfAtBottom);
  revealIfAtBottom();
})();
