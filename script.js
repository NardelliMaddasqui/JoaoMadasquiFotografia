/* ===================================================
   HERO — Slideshow da página principal
   (passa em ordem aleatória automaticamente)
=================================================== */

(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  /* Embaralha a ordem das fotos */
  const order = shuffleArray(Array.from({ length: slides.length }, (_, i) => i));
  let current = 0;
  let timer;

  showSlide(0);
  timer = setInterval(next, 10000); /* intervalo em ms — ajuste à vontade */

  function next() {
    goTo(current + 1);
  }

  function goTo(index) {
    slides[order[current]].classList.remove('active');
    current = (index + order.length) % order.length;
    showSlide(current);
  }

  function showSlide(index) {
    slides[order[index]].classList.add('active');
  }

  function reset() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  /* Exposta para os botões onclick do HTML */
  window.changeHero = function (dir) {
    goTo(current + dir);
    reset();
  };
})();


/* ===================================================
   SERVIÇOS — Carrossel automático
=================================================== */

(function () {
  const slides = document.querySelectorAll('.service-slide');
  if (!slides.length) return;

  const dotsEl = document.getElementById('serviceDots');
  let current = 0;
  let timer;

  /* Cria dots */
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.classList.add('dot');
    d.addEventListener('click', () => { goTo(i); reset(); });
    dotsEl.appendChild(d);
  });

  show(0);
  timer = setInterval(() => goTo(current + 1), 100000);

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsEl.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    show(current);
  }

  function show(index) {
    slides[index].classList.add('active');
    dotsEl.children[index].classList.add('active');
  }

  function reset() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 100000);
  }

  window.changeService = function (dir) {
    goTo(current + dir);
    reset();
  };
})();


/* ===================================================
   GALERIA — Alternância de álbuns por aba
=================================================== */

function activateAlbum(albumId, clickedBtn) {
  /* Esconde todos os painéis */
  document.querySelectorAll('.album-panel').forEach(p => p.classList.remove('active'));
  /* Remove active de todos os botões */
  document.querySelectorAll('.album-tab').forEach(b => b.classList.remove('active'));

  /* Mostra o painel escolhido */
  const panel = document.getElementById(albumId);
  if (panel) panel.classList.add('active');

  /* Marca o botão clicado */
  if (clickedBtn) clickedBtn.classList.add('active');
}

window.showAlbum = activateAlbum;

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.album-tab[data-album]').forEach(btn => {
    btn.addEventListener('click', function () {
      activateAlbum(btn.dataset.album, btn);
    });
  });
});


/* ===================================================
   UTILITÁRIO — Fisher-Yates shuffle
=================================================== */

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
