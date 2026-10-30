// Pesquisa do Tá na Lista: confere as respostas e envia para o e-mail da Geise pelo Web3Forms, sem sair da página.
// (Antes era FormSubmit, mas o servidor dele estava fora do ar e nada chegava.)
(function () {
  var form = document.getElementById('pesquisa');
  if (!form) return;
  var aviso = form.querySelector('.pesquisa__aviso');
  var botao = form.querySelector('button[type="submit"]');
  var obrigada = document.getElementById('pesquisa-obrigada');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form._honey && form._honey.value) return;   // robô
    for (var n = 1; n <= 5; n++) {
      if (!form.querySelector('input[name="p' + n + '"]:checked')) {
        aviso.textContent = 'Falta responder a pergunta ' + n + '.';
        form.querySelector('input[name="p' + n + '"]').focus();
        return;
      }
    }
    // no e-mail, cada resposta aparece com o texto da pergunta (e não "p1", "p2"...)
    var dados = new FormData();
    ['access_key', 'subject', 'from_name'].forEach(function (k) { dados.append(k, form[k].value); });
    form.querySelectorAll('fieldset').forEach(function (f, i) {
      dados.append((i + 1) + '. ' + f.querySelector('legend').textContent.replace(/^\d/, '').trim(), f.querySelector('input:checked').value);
    });
    dados.append('6. Sugestão', form.sugestao.value.trim() || '(sem sugestão)');

    botao.disabled = true; aviso.textContent = 'Enviando...';
    // FormData sem cabeçalho de conteúdo: o navegador não faz "pergunta prévia" (preflight)
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json' }, body: dados })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (!r.success) throw new Error(r.message);
        form.hidden = true; obrigada.hidden = false;
        obrigada.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () {
        // só mostra o "obrigada" quando o envio deu certo de verdade
        botao.disabled = false;
        aviso.textContent = 'Não consegui enviar agora. Tente de novo em instantes.';
      });
  });

  form.addEventListener('change', function () { aviso.textContent = ''; });
})();
