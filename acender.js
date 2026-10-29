// Texto que "acende" ao rolar: a frase começa clarinha e cada palavra vai ficando escura
// conforme a pessoa desce a página, como se fosse sendo escrita no caderno.
// Para usar em outra frase, é só colocar data-acender no <p>.
(function () {
  var frases = document.querySelectorAll('[data-acender]');
  if (!frases.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // separa cada palavra num <span> (o texto continua igual para leitor de tela)
  var grupos = [];
  frases.forEach(function (p) {
    var texto = p.textContent.trim();
    p.setAttribute('aria-label', texto);
    p.innerHTML = texto.split(/\s+/).map(function (pal) {
      return '<span class="acende" aria-hidden="true">' + pal + '</span>';
    }).join(' ');
    p.classList.add('acender--pronto');
    grupos.push({ el: p, palavras: p.querySelectorAll('.acende') });
  });

  var pedido = false;
  function atualizar() {
    pedido = false;
    var alt = window.innerHeight;
    grupos.forEach(function (g) {
      var r = g.el.getBoundingClientRect();
      // começa quando o topo da frase entra a 90% da tela; termina quando o fim da frase chega a 55%
      var inicio = alt * 0.9, fim = alt * 0.55;
      var progresso = (inicio - r.top) / ((inicio - fim) + r.height);
      progresso = Math.max(0, Math.min(1, progresso));
      var acesas = Math.round(progresso * g.palavras.length);
      g.palavras.forEach(function (w, i) { w.classList.toggle('acende--on', i < acesas); });
    });
  }
  function pedir() { if (!pedido) { pedido = true; requestAnimationFrame(atualizar); } }
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  atualizar();
})();
