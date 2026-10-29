// Diário de bordo: o check de cada passo feito "se desenha" quando aparece na tela,
// como se alguém marcasse o caderno com a caneta.
(function () {
  var icones = document.querySelectorAll('.diario__icone[data-src]');
  if (!icones.length) return;
  function desenhar(img) {
    var src = img.getAttribute('data-src');
    img.src = src.indexOf('data:') === 0 ? src : src + '?v=' + Date.now();   // carrega agora: a animação começa daqui
    img.closest('.diario__passo').classList.add('diario__passo--desenha');
  }
  if (!('IntersectionObserver' in window)) { icones.forEach(desenhar); return; }
  var olho = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { desenhar(e.target); olho.unobserve(e.target); }
    });
  }, { threshold: 1, rootMargin: '0px 0px -15% 0px' });
  icones.forEach(function (img) { olho.observe(img); });
})();
