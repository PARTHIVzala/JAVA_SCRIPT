// dataset
const movies = [
  {title:'Avatar: The Way of Water',genre:'Sci-fi',rating:'UA', img:'images/avatar.jfif'},
  {title:'Interstellar',genre:'Sci-fi',rating:'UA', img:'images/insteller.webp'},
  {title:'Spider-Man: No Way Home',genre:'Action, Adventure',rating:'UA', img:'images/spider.webp'},
  {title:'The Hercules',genre:'Action, Crime',rating:'UA', img:'images/hercules.webp'},
  {title:'Dune',genre:'Sci-fi',rating:'UA', img:'images/dune.webp'},
  {title:'RRR',genre:'Drama, Action',rating:'UA', img:'images/rrr.jfif'},
  {title:'Jawan',genre:'Action, Thriller',rating:'UA', img:'images/jawan.jfif'},
  {title:'Ponniyin Selvan',genre:'Historical',rating:'U', img:'images/ponni.jfif'},
  {title:'lalo' , genre:'Historical' , rating:'U' , img:'images/lalo.avif'}
];

// elements
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('dots');
const grid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

// render carousel (first 3)
const slidesToShow = movies.slice(0, 3);
slidesToShow.forEach((m)=>{
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `
    <div class="poster"><img src="${m.img}" alt="${m.title}"></div>
    <div class="slide-info">
      <h2>${m.title}</h2>
      <p>Now showing in cinemas near you. Book seats and get offers.</p>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn" data-trailer="${m.title} — Trailer">Watch trailer</button>
        <button class="btn alt" style="background:#444;color:#fff" data-book="${m.title}">Book tickets</button>
      </div>
    </div>
  `;
  slidesEl.appendChild(slide);
});

// carousel logic
let index = 0;
function renderDots(){
  dotsEl.innerHTML = '';
  for(let i=0;i<slidesEl.children.length;i++){
    const d = document.createElement('div');
    d.className = 'dot' + (i===index? ' active' : '');
    d.addEventListener('click', ()=>{ go(i); });
    dotsEl.appendChild(d);
  }
}
function go(i){ index = i; update(); }
function update(){
  slidesEl.style.transform = `translateX(${-index*100}%)`;
  Array.from(dotsEl.children).forEach((d,di)=> d.classList.toggle('active', di===index));
}
renderDots(); update();
const auto = setInterval(()=>{ index = (index+1) % slidesEl.children.length; update(); }, 5000);

// populate movie grid
function renderMovies(list){
  grid.innerHTML = '';
  list.forEach(m=>{
    const card = document.createElement('div'); card.className='movie';
    card.innerHTML = `
      <div class="thumb"><img src="${m.img}" alt="${m.title}"></div>
      <h4>${m.title}</h4>
      <div class="meta">${m.genre} • ${m.rating}</div>
      <button class="book" data-book="${m.title}">Book tickets</button>
    `;
    grid.appendChild(card);
  });
}
renderMovies(movies);

// search
function performSearch(){
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ renderMovies(movies); return; }
  const filtered = movies.filter(m=> m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q));
  renderMovies(filtered);
}
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e)=> { if(e.key === 'Enter') performSearch(); });

// navigation-enabled global click handler
document.body.addEventListener('click', (e)=>{
  const t = e.target;

  // watch trailer (slides)
  if(t.matches('[data-trailer]')){
    openModal(t.getAttribute('data-trailer'));
    return;
  }

  // book buttons -> navigate to movie details page
  if(t.matches('[data-book]')){
    const title = t.getAttribute('data-book');
    window.location.href = `movie.html?title=${encodeURIComponent(title)}`;
    return;
  }

  // make poster/thumb clickable to open movie details too
  if(t.closest && t.closest('.thumb')){
    const thumbImg = t.closest('.thumb').querySelector('img');
    if(thumbImg && thumbImg.alt){
      window.location.href = `movie.html?title=${encodeURIComponent(thumbImg.alt)}`;
      return;
    }
  }

  if(t.dataset.action === 'select'){
    window.location.href = `movie.html?title=${encodeURIComponent('Avatar: The Way of Water')}`;
    return;
  }
});

// modal helpers
function openModal(title){
  modalTitle.textContent = title;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(){ modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); }
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target === modal) closeModal();
});

// city change 
document.getElementById('citySelect').addEventListener('change', (e)=>{ alert('City changed to '+e.target.value+' ()'); });