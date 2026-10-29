// Desenhos no celular: viram um slide para o lado (arrastar com o dedo), com bolinhas embaixo
// mostrando qual desenho está na tela. Tocar numa bolinha leva até o desenho.
(function () {
  var caixa = document.querySelector('.carrossel--parado');
  if (!caixa) return;
  var itens = caixa.querySelectorAll('.mural > li');
  var pontos = document.createElement('div');
  pontos.className = 'telas__pontos mural__pontos';
  pontos.setAttribute('aria-hidden', 'true');
  itens.forEach(function (li, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.tabIndex = -1;
    b.addEventListener('click', function () {
      caixa.scrollTo({ left: li.offsetLeft - (caixa.clientWidth - li.offsetWidth) / 2, behavior: 'smooth' });
    });
    pontos.appendChild(b);
  });
  caixa.parentNode.insertBefore(pontos, caixa.nextSibling);
  function marcar() {
    var meio = caixa.scrollLeft + caixa.clientWidth / 2, atual = 0, menor = Infinity;
    itens.forEach(function (li, i) {
      var d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - meio);
      if (d < menor) { menor = d; atual = i; }
    });
    pontos.querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-selected', i === atual ? 'true' : 'false'); });
  }
  caixa.addEventListener('scroll', marcar, { passive: true });
  window.addEventListener('resize', marcar);
  marcar();
})();
