/* Dica de arrastar para os cards de decisão (só aparece no celular):
   cria "arraste → ● ● ●" embaixo do carrossel e acende a bolinha do card que está na tela. */
(function () {
  var grade = document.querySelector('.estudo__decisoes');
  if (!grade || !grade.children.length) return;

  var dica = document.createElement('p');
  dica.className = 'deslize-dica deslize-dica--estudo';
  dica.setAttribute('aria-hidden', 'true');
  var pontos = '';
  for (var i = 0; i < grade.children.length; i++) pontos += '<i' + (i === 0 ? ' class="ativo"' : '') + '></i>';
  dica.innerHTML = '<span>arraste</span><img src="imagens/seta-direita.svg" width="36" height="14" alt=""><span class="deslize-dica__pontos">' + pontos + '</span>';
  grade.parentNode.insertBefore(dica, grade.nextSibling);

  var bolinhas = dica.querySelectorAll('i');
  grade.addEventListener('scroll', function () {
    var cards = grade.children, meio = grade.scrollLeft + grade.clientWidth / 2, atual = 0, menor = Infinity;
    for (var i = 0; i < cards.length; i++) {
      var d = Math.abs(cards[i].offsetLeft + cards[i].offsetWidth / 2 - meio);
      if (d < menor) { menor = d; atual = i; }
    }
    for (var j = 0; j < bolinhas.length; j++) bolinhas[j].classList.toggle('ativo', j === atual);
  }, { passive: true });
})();
