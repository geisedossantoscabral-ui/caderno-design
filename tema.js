/* Modo escuro: cria o botão de lua/sol no topo e guarda a escolha da pessoa.
   Sem escolha guardada, segue o tema do aparelho (claro ou escuro).
   Este arquivo vai no <head> (sem defer) para a página já abrir no tema certo, sem piscar. */
(function () {
  var raiz = document.documentElement;
  var chave = 'tema-geise';

  function guardado() {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }
  function aparelhoEscuro() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function aplicar(tema) {
    if (tema === 'escuro') raiz.setAttribute('data-tema', 'escuro');
    else raiz.removeAttribute('data-tema');
  }

  var escolha = guardado();
  aplicar(escolha || (aparelhoEscuro() ? 'escuro' : 'claro'));

  document.addEventListener('DOMContentLoaded', function () {
    var linha = document.querySelector('.topo__linha');
    if (!linha) return;

    var botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'tema-botao';
    botao.innerHTML =
      '<svg class="tema-lua" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>' +
      '<svg class="tema-sol" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    function atualizar() {
      var escuro = raiz.getAttribute('data-tema') === 'escuro';
      botao.setAttribute('aria-pressed', escuro ? 'true' : 'false');
      botao.setAttribute('aria-label', escuro ? 'Mudar para o modo claro' : 'Mudar para o modo escuro');
      botao.title = escuro ? 'Modo claro' : 'Modo escuro';
    }

    botao.addEventListener('click', function () {
      var novo = raiz.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
      aplicar(novo);
      try { localStorage.setItem(chave, novo); } catch (e) {}
      atualizar();
    });

    /* fica antes do botão ☰ (celular); no computador, depois do "Vamos conversar" */
    var menu = linha.querySelector('.menu-botao');
    linha.insertBefore(botao, menu || null);
    atualizar();

    /* se a pessoa nunca escolheu, acompanha o aparelho quando ele muda */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var seguir = function (e) { if (!guardado()) { aplicar(e.matches ? 'escuro' : 'claro'); atualizar(); } };
      if (mq.addEventListener) mq.addEventListener('change', seguir);
    }
  });
})();
