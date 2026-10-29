# CLAUDE.md — Portfólio da Geise Moreira ("Caderno de design")

Contexto completo do projeto para continuar o desenvolvimento no Claude Code.
Leia este arquivo inteiro antes de mexer em qualquer coisa.

---

## 1. Quem é e o que é o projeto

- **Dona:** Geise Moreira (Geise dos Santos Cabral Moreira), estudante da 4ª fase de Design na **Unoesc, São Miguel do Oeste – SC**. Atua há seis meses na área de design gráfico; veio do administrativo. Foco atual: **UX/UI**.
- **O site:** portfólio pessoal com o conceito **"caderno de design"**: mostrar *como ela pensa* (problema → pergunta → decisão), não só telas bonitas. Tom de voz próximo, honesto, em primeira pessoa, com anotações "à mão".
- **Frase-guia (título da home, desde 28/10):** "Antes da tela, eu **entendo o problema.**" (marca-texto em "entendo o problema."). A frase antiga era "Desenho interfaces começando pelo problema, não pela tela."
- **Público:** recrutadores, agências, professores e colegas.
- **Idioma:** tudo em **português do Brasil** (conteúdo, comentários no código, nomes de classes e arquivos).
- **A Geise não é programadora.** Ela conversa em português simples. Explique mudanças sem jargão, mostre prints quando der e peça confirmação antes de mudanças grandes.

---

## 2. Tecnologias

- **HTML + CSS + JavaScript puro** (vanilla). **Sem framework, sem build, sem npm.** Abre direto no navegador (arquivo local) e funciona em qualquer hospedagem estática.
- **Um único CSS** para o site todo: `design.css`.
- **Fontes (Google Fonts):** `Atkinson Hyperlegible Next` (textos, pesos 400/500/600) e `Caveat` (anotações à mão, 400/600).
- **Imagens:** `.webp` para fotos e renders; `.svg` para ícones, setas, números e marca; `.mp4` para o vídeo do Windows 8.
- **Formulário:** FormSubmit (`https://formsubmit.co/ajax/geisedossantoscabral@gmail.com`) via `fetch`, no `pesquisa.js`.
  - Só funciona com o site **publicado na internet** (não em arquivo local).
  - No primeiro envio, o FormSubmit manda um e-mail de **"Activate"** para a Geise. Ela precisa clicar uma vez.
- **Ainda não está hospedado.** Sugestão: Netlify, Vercel ou GitHub Pages (estático, grátis).

---

## 3. Estrutura de arquivos

```
potifólio/
├── CLAUDE.md                         ← este arquivo
├── index.html                        ← página inicial
├── projetos-faculdade.html           ← lista dos projetos da faculdade
├── estudo-de-caso-fotos-sem-feed.html← estudo de caso da LP (ladu.des.br)
├── diario-ta-na-lista.html           ← diário de bordo do app Tá na Lista
├── pesquisa-ta-na-lista.html         ← pesquisa (formulário) do Tá na Lista
├── estudo-de-caso-guarda-roupa-viena.html ← Projeto II (design de produto)
├── estudo-de-caso-windows-8.html     ← análise e redesign do Windows 8
├── resumo-siepe.html                 ← pesquisa SIEPE (IA e ergonomia cognitiva), estilo landing
├── design.css                        ← TODO o visual
├── telas-slider.js                   ← slider (setas, bolinhas, teclado, arrastar)
├── borboleta-voo.js                  ← borboleta que voa nas margens + brilho ao clicar
├── contador.js                       ← números que contam ao aparecer
├── diario.js                         ← check que "se desenha" no diário
├── pesquisa.js                       ← envio do formulário (FormSubmit)
├── acender.js                        ← texto que "acende" ao rolar (TESTADO E REJEITADO: não está ligado em nenhuma página)
├── mural-slide.js                    ← desenhos viram slide (arrastar) com bolinhas no celular
├── mural-carrossel.js                ← carrossel dos desenhos (DESLIGADO no momento, ver §7)
├── favicon.ico / favicon.svg / apple-touch-icon.png
├── imagens/                          ← todas as imagens (ver §8)
└── versao-antiga/                    ← versão antiga, não usar
```

**Mapa de navegação:**
- `index.html`:
  - Fotos sem feed → `estudo-de-caso-fotos-sem-feed.html`
  - Tá na Lista → `diario-ta-na-lista.html` → `pesquisa-ta-na-lista.html`
  - Faixa da Faculdade → `resumo-siepe.html`, `estudo-de-caso-guarda-roupa-viena.html`, `estudo-de-caso-windows-8.html`
- `projetos-faculdade.html` tem os mesmos 3 cards da faculdade. O menu "Faculdade" das páginas internas leva para lá; na `index.html`, leva para `#faculdade`.

---

## 4. Design system

### Cores (variáveis em `:root` no `design.css`)
| Variável | Valor | Uso |
|---|---|---|
| `--cor-papel` | `#f4f7fb` | fundo da página (azul bem clarinho). **Substituiu o creme `#f6f6f3`, que a Geise achou com "cara de IA". Não voltar ao creme/bege.** |
| `--cor-superficie` | `#ffffff` | seções brancas e cards |
| `--cor-tinta` | `#1c1e22` | texto principal; fundo do rodapé |
| `--cor-texto-suave` | `#5b616b` | texto de apoio |
| `--cor-azul-acao` | `#1a66c9` | links e botões |
| `--cor-azul-hover` | `#1559b0` | botão com o mouse em cima |
| `--cor-marca-texto` | `#5eb1ff` | "marca-texto" atrás de palavras, números grandes, contornos de destaque |
| `--cor-marca-texto-suave` | `#cfe6ff` | fita adesiva, etiquetas "a solução" |
| `--cor-grafite` | `#3a3d43` | anotações à mão |
| `--cor-linha` | `#d8dfe8` | divisores finos |
| `--cor-pontos` | `#d0d9e5` | (sem uso no fundo) **A grade pontilhada fixa foi retirada** (ficava igual a outro portfólio). Agora as bolinhas só aparecem **em rosa, no rastro da borboleta**, e somem devagar. |
| `--sombra-card` | `0 2px 6px rgba(28,30,34,.05), 0 18px 40px rgba(28,30,34,.10)` | sombra projetada de **todos os cards** |

**Rosa da marca:** `#F0548A`. Degradê rosa: `#FFB3C7 → #F0548A → #C2185B`. Usado na borboleta, nas setas do slider, na bolinha ativa, no "café?" do rodapé, nos ícones de risco e nas anotações de "o problema" (`#C2185B`).
**Azul dos números (passo-1..4.svg):** degradê azul com o anel girando (SMIL).
**Verde (diário):** `#027A4B` / fundo `#E2F3EA` para etapas concluídas.

**Regra de cor dos ícones:** riscos/problemas em **rosa**, práticas/soluções em **azul**.

### Tipografia
- Títulos: Atkinson, peso 500, `letter-spacing` negativo. `h1` grande com `clamp()`.
- Anotações à mão: classe `.anotacao` (Caveat, 26px, cor grafite) com **setinha desenhada** antes (`::before`).
  - `.anotacao--sem-seta`: sem a seta.
  - `.anotacao--para-direita`: seta depois do texto, apontando para o conteúdo ao lado.
- `.rotulo`: texto pequeno acima de títulos.
- `.marca-texto`: fundo azul `#5eb1ff` atrás das palavras. Em títulos longos use `display:inline` + `box-decoration-break: clone`, para o azul não sobrar ao lado.

### Componentes (classes principais)
- **Botões:**
  - `.botao` (azul cheio)
  - `.botao--secundario` (contorno)
  - `.botao--pulso` (anel azul pulsando, nos "Vamos conversar")
  - **Botões ficam azuis por padrão.** A Geise pediu várias vezes para padronizar no azul.
- **Cards:**
  - `.academico__card` (branco, `border-radius:16px`, **sombra projetada, sem contorno cinza**)
  - Os cards da faculdade têm **altura igual** e o link fica sempre no pé do card (`margin-top:auto`).
  - A grade usa `repeat(auto-fit, minmax(min(300px,100%),1fr))` para ocupar a largura toda, sem coluna vazia.
- **Contornos azuis intencionais** (manter):
  - card do Diário na home
  - painel "a solução" no SIEPE
  - `.pesquisa__obrigada`
- `.tags` (pílulas), `.etapas` (lista numerada 01/02/03), `.numeros` (números grandes com `dt` embaixo).
- **`.estudo`**: wrapper das páginas de estudo de caso (fundo liso, ficha `.estudo__ficha`, blocos `.estudo__bloco` com anotação à esquerda).
- **Slider `.telas`**:
  - estrutura `.telas__janela > .telas__trilho > .telas__slide`, com `.telas__controles` contendo as setas `seta-esquerda.svg` e `seta-direita.svg` e as bolinhas
  - funciona com `telas-slider.js`
  - variações: `.telas__slide--foto`, `.telas__slide--capa` (imagem larga com texto embaixo), `.ia-exemplos` (SIEPE)
  - a seta apagada (`:disabled`) indica o fim; **as duas setas têm opacidade diferente de propósito** (a Geise aprovou)
- **Rodapé `.contato`** (igual em todas as páginas):
  - faixa de chamada: anotação + h2 animado palavra por palavra, com "café?" em rosa neon, + botão "Me chama no WhatsApp"
  - faixa `.contato__base`: selo da borboleta + colunas Fale comigo / Redes / Onde estou
- **Topo `.topo`** (sticky, igual em todas as páginas):
  - marca (borboleta + "Geise Moreira" + "caderno de design")
  - menu Projetos / Faculdade / Sobre / Contato
  - botão "Vamos conversar" (WhatsApp)
  - no celular, botão ☰ (`.menu-botao`) que abre o menu (script inline no fim de cada página)

### Responsivo
- Breakpoints: **1100px** (topo compacto, borboleta some), **1024px** (tablet), **900px**, **720px** (celular), **380px** (celular estreito).
- Margem lateral 80px → 40px → 20px (`--margem`).
- **Sempre testar:**
  - em 1440, 820 e 390px de largura
  - **sem rolagem horizontal** (`scrollWidth === innerWidth`)
  - o topo não pode encostar nem sair da tela em 760–1100px

### Acessibilidade e movimento
- Contraste WCAG AA conferido nas cores principais.
- Todas as imagens com `alt` descritivo; decorativas com `alt=""` / `aria-hidden`.
- Animações respeitam `prefers-reduced-motion: reduce`.
- Link "Pular para o conteúdo" (`.pular`) no topo de cada página.
- Área de toque mínima de ~24px nas bolinhas dos sliders (`::after` invisível).

---

## 5. Conteúdo de cada página

### index.html
A ordem das seções alterna o fundo: papel (azul clarinho, com bolinhas) e branco.
1. **Abertura:**
   - título "Antes da tela, eu entendo o problema." com marca-texto em "entendo o problema."
   - apresentação
   - botões "Ver meus projetos" / "Sobre mim"
   - anotação "psiu: este site eu mesma desenhei"
   - autorretrato `autorretrato.svg` com contorno neon e "oi! eu sou a Geise"
   - **no celular o texto vem primeiro**, a ilustração depois
2. **Fotos sem feed** (`#projetos`, branco):
   - mockup e "como eu pensei" (Problema / Pergunta / Decisão)
   - botão para o estudo de caso
   - números 120 / 2.970 / 0, com a anotação "o número que mais me orgulha" colada no 0
3. **Tá na Lista** (papel):
   - diário de bordo com checklist
   - a pergunta que está investigando
   - botão "Acompanhar o diário"
4. **Faculdade** (`#faculdade`, branco): "Na faculdade, eu experimento." e os 3 cards.
5. **Fora das telas, eu desenho.** (papel):
   - título centralizado e 3 desenhos **parados, retos e centralizados** (`.carrossel--parado`), cada um com fita azul
   - os desenhos: "o vestido, no caderno" (desenho-vestido-caderno), "o vestido, vetorizado" (desenho-vestido-vetor), "ilustração digital" (ilustracao-gatos-terra)
   - o estudo de proporção e o croqui saíram (os arquivos continuam em `imagens/`)
6. **Sobre** (`#sobre`, branco):
   - foto `geise-unoesc-day.webp`
   - "Do administrativo para o criativo."
   - trajetória: Administrativo → Graduação em Design → Unoesc Day → UX/UI
7. **Rodapé** (`#contato`).

### estudo-de-caso-fotos-sem-feed.html (LP da LIGA Acadêmica de Design)
- **Site:** https://ladu.des.br
- **Ficha:** Meu papel (design completo: UX, UI, direção visual) · Equipe (LIGA Acadêmica de Design, Unoesc) · Desenvolvimento (Lucas Moreira) · Fotografia (Geise Moreira).
- **Slider com 5 telas:** mockup, LP inteira (rola dentro do celular), código, código errado, galeria.
- **O desafio:** estúdio de fotos com público menor de idade; o ECA Digital impede feed aberto.
- **Restante da página:**
  - "como eu pensei"
  - fluxo em 4 passos com os ícones `passo-1..4.svg`
  - 3 decisões: Ergonomia, Mobile-first, Acessibilidade WCAG AA
  - números com contador (o 0 desce a partir de 2.970)
  - borboleta voando (`borboleta-voo.js`)

### diario-ta-na-lista.html + pesquisa-ta-na-lista.html
- **Tá na Lista:** app que aprende com as compras do mês e sugere a próxima lista.
- **Diário:** linha do tempo com os ícones:
  - `check-feito.svg` / `check-feito-anima.svg`: verde, o check se desenha
  - `check-agora.svg`: disco verde que pisca
  - `check-proximo.svg`: só o contorno
  - as etiquetas das etapas concluídas são verdes
- **Pesquisa:**
  - só perguntas de múltipla escolha, mais um campo final "deixe sua sugestão"
  - envia por FormSubmit
  - botão de voltar para o diário

### projetos-faculdade.html
- **H1:** "Na faculdade, eu experimento."
- **3 cards:** SIEPE (Ler o resumo), Guarda-roupa Viena (Ver o estudo de caso), Windows 8 (Ver o estudo de caso).

### estudo-de-caso-guarda-roupa-viena.html (Projeto II · Design de Produto)
- Guarda-roupa minimalista para a **MX Móveis**, feito pelo **método de Löbach** (Análise, Alternativas, Avaliação, Solução). Público de 20 a 59 anos, classe média.
- **Medidas e materiais:** 2,40 × 2,20 × 0,60 m; MDF verde jade fosco com detalhes em madeira; portas de correr, espelho, nichos externos.
- **Slider:**
  - **capa:** `viena-quarto.webp` (render no quarto)
  - **depois:** 10 fotos da maquete, na ordem do processo (peças → gavetas → porta → espelho → montagem → fechado → aberto → nichos → gavetas abertas → puxador)
  - o render antigo com fundo branco (`guarda-roupa-viena.webp`) saiu do slider e do card
- **Números:** a escala da maquete aparece como **1:10, montada à mão**. A Geise ainda precisa confirmar.
- **Ficha:** Dupla: Geise Moreira e Valentina Delanoy · Orientação: Prof. Willian Matida.

### estudo-de-caso-windows-8.html (Estética e Percepção · em grupo)
- Análise de proporção, ritmo visual, ergonomia, linguagem formal, coerência e usabilidade, mais o redesign de 3 telas (tela inicial, menu Iniciar, configurações rápidas).
- **Slider:**
  - **capa:** o vídeo `windows8-redesign.mp4` (autoplay, mudo, loop, com controles)
  - **depois:** 5 slides do PDF (`win8-*.webp`)
- **No vídeo:** a linha com os nomes das 6 alunas está **desfocada** (falta autorização).

### resumo-siepe.html (pesquisa SIEPE · estilo landing, dentro do padrão do site)
- **Título acadêmico:** "A importância do profissional de design na criação de interfaces com IA que preservem a ergonomia cognitiva do usuário".
- **Abertura:**
  - "A inteligência é artificial. **A experiência é humana.**" (marca-texto só nas palavras)
  - **ilustração da Geise em lilás** (`geise-ilustracao-ia.webp`) com manchas lilás e 3 cartões flutuando ("Por que esta sugestão?", "Você está no controle", "Desfazer")
  - linhas finas que **saem de trás da cabeça** (o SVG das linhas vem ANTES da imagem no HTML)
  - o card "Desfazer" fica no meio do peito
- **"Qual interface é mais fácil de entender?":** slider com **3 exemplos interativos**. Em cada exemplo, "o problema" fica à esquerda e "a solução" à direita, com anotações à mão explicando cada parte.
  - **planejar o dia:** sugestão com confiança, "Por que esta sugestão?" e Confirmar/Desfazer
  - **escolher o que assistir:** 8 filmes fictícios versus 1 recomendação com 92% e o motivo; "Não tenho interesse" com desfazer
  - **revisar uma mensagem:** a IA reescreve escondido versus sugestões marcadas com Aceitar/Ignorar
  - **Todos os slides têm a MESMA altura** (`align-items: stretch`); o slider não pode crescer nem encolher ao passar.
- **Ícones da Geise:**
  - "Três desafios para a mente", em rosa: `icone-emaranhado`, `icone-olho`, `icone-balanca`
  - "Onde o design faz a diferença", em azul: `icone-alvo` (flecha rosa), `icone-balao`, `icone-desfazer`
  - **Ícones sem animação** (a Geise pediu).
- **Final:**
  - "Da pesquisa à experiência", com a ficha
  - `<details>` "Ler o resumo completo", com o **título acadêmico em cima** e o texto integral (Introdução/Objetivo/Método/Resultados/Conclusão), mais as palavras-chave
- **Por que o PDF não foi linkado:** o PDF original tem nomes de professores não autorizados e o e-mail institucional dela.

---

## 6. Regras de nomes e autorização (IMPORTANTE)

Só publicar nomes de quem **autorizou**:
- ✅ **Valentina Delanoy**: participou de todos os projetos (SIEPE, Viena, Windows 8)
- ✅ **Prof. Willian Matida**: orientador do Projeto II (Viena)
- ✅ **Prof. Eduardo Cipriani Schwengber**: orientador do SIEPE
- ✅ **Mayara Wommer**: Windows 8
- ❌ **Ainda sem autorização:**
  - Daniela Bernardi (Viena)
  - Daniel Pinheiro e Renan Silva Nogueira (SIEPE)
  - Ana Carolina Franceschi, Eduarda Berndt e Patrícia Ogliari (Windows 8)
  - **Não citar.** Hoje aparece "e mais 3 colegas".

Quando chegar uma nova autorização: atualizar o card em `index.html` **e** em `projetos-faculdade.html`, mais a ficha da página do projeto.

---

## 7. Decisões que a Geise já tomou (não desfazer sem perguntar)

- Fundo **azul bem clarinho** (`#f4f7fb`), nunca creme ou bege.
- Cards com **sombra projetada**, não contorno cinza.
- Cards de decisão sobre fundo BRANCO (`.secao--branca .estudo__decisoes` na LP e os cards da faculdade `#faculdade` na home): vidro em **azul bem clarinho** (#f4f7fb). Sobre fundo azul clarinho fica o azul mais forte, para não sumir.
- Cards da faculdade (`.secao--vidro`): vidro **azul**, igual aos outros, sobre fundo branco. Degradê rosa/azul e manchas rosa foram testados e a Geise NÃO gostou.
- **Separação das seções: RETA e SEM LINHA**: só a troca de cor (azul clarinho / branco) separa. Ondas foram testadas (assimétricas e suaves) e a Geise preferiu reto. Não colocar ondas.
- **Efeito de vidro** (a Geise amou): só nos cards da faculdade (`.secao--vidro`, na `index.html` e em `projetos-faculdade.html`) e nos cartões flutuantes da abertura do SIEPE (`.ia-flutua`). (Em 28/10 o vidro foi testado em outras seções e a Geise NÃO gostou. Exceção pedida por ela: `.pergunta` ("A pergunta que estou investigando") os cards `.estudo__decisoes` dos estudos de caso e o `.diario__convite` ("Você faz as compras da casa?") em **vidro só azul** (sem rosa), com as cores presas dentro do card (`overflow: hidden`).) A seção de vidro tem duas manchas desfocadas, uma rosa (#FFB3C7) e uma azul (#5eb1ff), atrás dos cards translúcidos. Usar com moderação: não espalhar pelo site todo.
- Botões no **azul padrão**; botões de voltar também em azul.
- Nada de travessão (—) nos textos.
- Desenhos do mural **parados e retos**. O `mural-carrossel.js` está desligado (script removido do `index.html`). Se ela mandar mais desenhos e quiser o carrossel de volta: tirar `carrossel--parado` e recolocar `<script src="mural-carrossel.js" defer></script>`.
- Borboleta voando: na página inicial e nas páginas de estudo de caso (`.voo` + `borboleta-voo.js`), só na margem lateral direita, deixando um rastro de bolinhas rosa (o fundo não tem grade) (some abaixo de 1100px), em coordenadas da página (não acompanha a rolagem). O clique dá um brilho rosa na tela toda e trava novos cliques durante a animação.
- Topo e rodapé **idênticos** em todas as páginas.
- Rodapé: sem "feito por…", sem e-mail escrito. A palavra "E-mail" é o link: no computador abre o Gmail numa aba nova; no celular abre o app de e-mail pelo `mailto`.
- LinkedIn e Instagram abrem em **nova aba**.

---

## 8. Contatos e links

- WhatsApp: https://wa.link/a5lmdj (todos os "Vamos conversar" e "Me chama no WhatsApp")
- E-mail: geisedossantoscabral@gmail.com
- LinkedIn: https://www.linkedin.com/in/geisemoreira/
- Instagram: https://www.instagram.com/geisemoreiradesigner/
- Behance: **não tem**
- Figma da LP: arquivo `reG8omjSPrIXXsNJ0GtCkf`

---

## 9. Padrões de código

- **HTML semântico:**
  - um `h1` por página
  - `section` com comentário `<!-- ===== NOME ===== -->`
  - `alt` descritivo em português
- **Classes em português, no estilo BEM:** `bloco__elemento--variacao` (ex.: `telas__slide--capa`, `academico__card`).
- **CSS:**
  - organizado por seções numeradas, com comentários explicando o *porquê* em português simples (a Geise lê o código)
  - use as variáveis de `:root`; evite cores soltas
  - regras que precisam valer "por cima" de outras com a mesma especificidade vão **mais para o fim do arquivo**
- **JS:**
  - um arquivo por comportamento, envolto em IIFE `(function(){ ... })();`
  - comentário no topo dizendo o que faz
  - checar se o elemento existe antes de usar
  - respeitar `prefers-reduced-motion`
- **Para colocar mais um item** (desenho, slide, card): copiar o `<li>` ou `<article>` existente. Há comentários no HTML indicando onde.
- **Imagens:**
  - converter para `.webp` (até ~1600px no lado maior, qualidade ~80)
  - informar `width`/`height` reais
  - usar `loading="lazy"`, menos na primeira imagem visível

---

## Revisão de 28/10 (padronização e celular)
- Tablet 721–900px: abertura da home em uma coluna (antes a ilustração passava da tela).
- Rodapé no celular: links com área de toque maior; "Onde estou" na linha inteira.
- Botões de voltar sempre azuis (`.botao`). Exceção: na pesquisa, ao lado de "Enviar respostas", o "Voltar ao diário" é `.botao--secundario` (hierarquia: a ação principal é enviar).
- Abaixo de 400px o botão "Vamos conversar" do topo some (fica o ☰ e o rodapé).
- Slider da LP no celular: celulares menores e mockup maior.
- Testar sempre em 360, 390, 768, 1024, 1440 e 1920px sem rolagem lateral.

## Publicação (Cloudflare)
- No ar em **https://cadernodedesign.designday.workers.dev** (Cloudflare Workers & Pages, projeto "cadernodedesign", upload manual).
- Para atualizar: gerar um zip só com os arquivos usados e, no Cloudflare, abrir o projeto → **New deployment** → arrastar o zip.
- As `og:image` / `og:url` já usam esse endereço completo. Se mudar o endereço (domínio próprio), trocar em todas as páginas.
- Celular (28/10): "oi! eu sou a Geise" fica ACIMA da ilustração; no Tá na Lista as telas vêm ANTES do texto; títulos dos estudos menores e "Guarda‑roupa" sem quebrar.

## 10. Pendências e ideias

**Modo escuro: a Geise decidiu NÃO ter** (28/10). O `tema.js` foi desligado de todas as páginas; não recriar.

**Dica "arraste" no celular: a Geise decidiu deixar sem** (28/10). O `deslize.js` foi desligado; no celular os cards de decisão ficam um embaixo do outro. **Antes de sobrescrever qualquer arquivo da pasta, conferir se ele foi alterado desde a última cópia.**


**Inspiração de movimento** (portfólio de outra designer, adaptar e não copiar): texto que acende ao rolar (testado e a Geise NÃO gostou, foi retirado), cards de projeto empilhando ao rolar e palavra que troca no topo (ideias ainda não feitas). A Geise não quer carrossel 3D, selo girando nem faixa de categorias passando (cara de template).


1. **Publicar o site** (Netlify, Vercel ou GitHub Pages). Depois:
   - trocar `imagens/compartilhar.jpg` nas `<meta property="og:image">` pelo **endereço completo** (há um comentário no `<head>` de cada página)
   - ativar o FormSubmit pelo e-mail
2. Confirmar a escala 1:10 e o "montada à mão" da maquete do Viena.
3. Quando autorizarem: colocar os nomes que faltam e tirar o desfoque do vídeo do Windows 8.
4. O vídeo do Windows 8 mostra a caricatura das 6 alunas ("Meninas do Design"). Avaliar se as colegas aprovam.
5. Ponto 12 da curadoria (não feito): o espaço vazio nos cards da faculdade. A ideia é um ícone pequeno no topo de cada card (sem foto, a Geise pediu para tirar a foto do card do Viena).
6. Uma foto mais reta do "estudo de proporção" (a atual tem a borda da folha inclinada).
7. Mais desenhos para o mural (aí pode voltar o carrossel).

---

## 11. Como testar

Sem build: abrir o `index.html` no navegador. Para conferir rápido em vários tamanhos, use o modo responsivo do navegador (F12) em **1440, 1024, 820, 390 e 360px**. Verifique:
- não há rolagem para o lado
- o topo não encosta
- o menu ☰ abre e fecha
- os sliders mantêm a altura
- os links entre as páginas funcionam
