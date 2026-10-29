// Números do resultado: contam quando aparecem na tela.
// 120 e 2.970 sobem a partir do 0; o 0 desce a partir de 2.970 (ninguém ficou exposto).
(function () {
  var numeros = document.querySelectorAll('[data-contar]');
  if (!numeros.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // mostra o número final direto

  var DURACAO = 1800;
  function formatar(n) { return Math.round(n).toLocaleString('pt-BR'); }
  function suave(t) { return 1 - Math.pow(1 - t, 3); }   // começa rápido e desacelera no fim

  numeros.forEach(function (el) {
    var de = parseFloat(el.getAttribute('data-de')) || 0;
    var ate = parseFloat(el.getAttribute('data-contar'));
    // reserva a largura do maior número, para nada pular de lugar enquanto conta
    el.textContent = formatar(Math.max(de, ate));
    el.style.minWidth = el.getBoundingClientRect().width + 'px';
    el.textContent = formatar(de);
    el._de = de; el._ate = ate;
  });

  function contar(el) {
    var inicio = null;
    function passo(agora) {
      if (inicio === null) inicio = agora;
      var t = Math.min(1, (agora - inicio) / DURACAO);
      el.textContent = formatar(el._de + (el._ate - el._de) * suave(t));
      if (t < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  if (!('IntersectionObserver' in window)) { numeros.forEach(contar); return; }
  var olho = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { contar(e.target); olho.unobserve(e.target); }   // conta uma vez só
    });
  }, { threshold: 0.6 });
  numeros.forEach(function (el) { olho.observe(el); });
})();
