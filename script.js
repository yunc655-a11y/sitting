// ── DATA ──────────────────────────────────────────────
// Replace src with your own image paths when ready.
// Each photo has a matching note revealed on click.

const MOMENTS = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    alt: 'Sunlight through tree branches',
    caption: 'Central Park, 4:11 PM',
    time: '4:11 PM — Tuesday',
    loc: 'Central Park, New York',
    note: 'I sat on the bench for five minutes.\nThe world kept going, and that was okay.'
  },
  {
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    alt: 'Blue sky over the city',
    caption: 'Midtown, 1:38 PM',
    time: '1:38 PM — Friday',
    loc: 'Midtown, New York',
    note: 'The sky was so blue today.\nI almost forgot I was late.'
  },
  {
    src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
    alt: 'Tree shadow on pavement',
    caption: 'Bryant Park, 3:22 PM',
    time: '3:22 PM — Wednesday',
    loc: 'Bryant Park, New York',
    note: 'The shadow moved while I watched it.\nTime works differently when you stop.'
  },
  {
    src: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=600&q=80',
    alt: 'Sunlight on a city bench',
    caption: 'Stuyvesant Town, 5:07 PM',
    time: '5:07 PM — Monday',
    loc: 'Stuyvesant Town, New York',
    note: 'I think I have been rushing\nfor no reason.'
  },
  {
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e6785?w=600&q=80',
    alt: 'Wind in the leaves',
    caption: 'Riverside Park, 2:54 PM',
    time: '2:54 PM — Thursday',
    loc: 'Riverside Park, New York',
    note: 'The leaves sound like applause\nwhen the wind moves through them.'
  },
  {
    src: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
    alt: 'NYC street corner light',
    caption: 'Lower East Side, 6:18 PM',
    time: '6:18 PM — Saturday',
    loc: 'Lower East Side, New York',
    note: 'Everyone around me was moving fast.\nI was the only still thing on the block.'
  },
  {
    src: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&q=80',
    alt: 'Sunlight on park grass',
    caption: 'Prospect Park, 11:43 AM',
    time: '11:43 AM — Sunday',
    loc: 'Prospect Park, Brooklyn',
    note: 'My problems felt very small\ncompared to the size of the sky.'
  },
  {
    src: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80',
    alt: 'A stoop in the afternoon',
    caption: 'Brooklyn, 4:49 PM',
    time: '4:49 PM — Wednesday',
    loc: 'Carroll Gardens, Brooklyn',
    note: 'Somebody left flowers here.\nI wonder who they were for.'
  }
];

const NOTES_TEXT = [
  { time: '9:02 AM', text: 'I keep forgetting to look up.' },
  { time: '12:15 PM', text: 'Three missed calls. I'm sitting here anyway.' },
  { time: '2:30 PM', text: 'The city feels smaller when you sit still.' },
  { time: '7:44 AM', text: 'Running late again.\nBut the light was too good to ignore.' },
  { time: '5:55 PM', text: 'I should do this more.' },
  { time: '3:08 PM', text: 'Nobody here is thinking about my deadlines.' },
  { time: '1:22 PM', text: 'Wind. Just wind.\nThat was enough.' },
  { time: '10:47 AM', text: 'The bench was warm from the morning sun.' },
  { time: '6:31 PM', text: 'New York is actually very beautiful\nif you stop moving.' },
  { time: '4:05 PM', text: 'I forgot what quiet felt like.' },
  { time: '8:19 AM', text: 'A pigeon sat next to me for a while.\nWe both had nowhere to be.' },
  { time: '2:57 PM', text: 'The world kept going.\nThat was okay.' },
];

// ── LAYOUT SEEDS ────────────────────────────────────────
// Predefined positions so layout feels editorial, not random

const PHOTO_POSITIONS = [
  { left: '6%',  top: '8%',  w: '28vw', rot: '-2deg'  },
  { left: '36%', top: '4%',  w: '22vw', rot: '1.5deg' },
  { left: '62%', top: '10%', w: '26vw', rot: '-1deg'  },
  { left: '10%', top: '44%', w: '24vw', rot: '2deg'   },
  { left: '38%', top: '40%', w: '20vw', rot: '-2.5deg'},
  { left: '62%', top: '48%', w: '25vw', rot: '1deg'   },
  { left: '18%', top: '76%', w: '22vw', rot: '-1.5deg'},
  { left: '52%', top: '78%', w: '26vw', rot: '2.5deg' },
];

const NOTE_POSITIONS = [
  { left: '3%',  top: '5%',  rot: '-3deg',  style: ''    },
  { left: '28%', top: '2%',  rot: '1.5deg', style: 'alt' },
  { left: '55%', top: '6%',  rot: '-2deg',  style: 'sky' },
  { left: '80%', top: '3%',  rot: '2.5deg', style: ''    },
  { left: '8%',  top: '30%', rot: '2deg',   style: 'sky' },
  { left: '33%', top: '28%', rot: '-1.5deg',style: ''    },
  { left: '60%', top: '32%', rot: '3deg',   style: 'alt' },
  { left: '82%', top: '30%', rot: '-2deg',  style: ''    },
  { left: '2%',  top: '58%', rot: '1deg',   style: 'alt' },
  { left: '25%', top: '60%', rot: '-3deg',  style: ''    },
  { left: '52%', top: '56%', rot: '2deg',   style: 'sky' },
  { left: '76%', top: '62%', rot: '-1.5deg',style: ''    },
];

// ── BUILD PHOTOS ─────────────────────────────────────────
const photosLayer = document.getElementById('photosLayer');
const notesLayer  = document.getElementById('notesLayer');
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lightboxImg');
const lbTime      = document.getElementById('lightboxTime');
const lbText      = document.getElementById('lightboxText');
const lbLoc       = document.getElementById('lightboxLoc');
const lbClose     = document.getElementById('lightboxClose');
const lbNext      = document.getElementById('lightboxNext');

let currentMoment = 0;

MOMENTS.forEach((m, i) => {
  const pos = PHOTO_POSITIONS[i % PHOTO_POSITIONS.length];

  const card = document.createElement('div');
  card.className = 'photo-card';
  card.style.cssText = `
    left: ${pos.left};
    top: ${pos.top};
    width: ${pos.w};
    aspect-ratio: 4/3;
    transform: rotate(${pos.rot});
  `;

  const img = document.createElement('img');
  img.src = m.src;
  img.alt = m.alt;
  img.loading = 'lazy';

  const caption = document.createElement('div');
  caption.className = 'photo-caption';
  caption.textContent = m.caption;

  card.appendChild(img);
  card.appendChild(caption);
  card.addEventListener('click', () => openLightbox(i));
  photosLayer.appendChild(card);
});

// ── BUILD NOTES ──────────────────────────────────────────
NOTES_TEXT.forEach((n, i) => {
  const pos = NOTE_POSITIONS[i % NOTE_POSITIONS.length];

  const card = document.createElement('div');
  card.className = `note-card ${pos.style}`;
  card.style.cssText = `
    left: ${pos.left};
    top: ${pos.top};
    transform: rotate(${pos.rot});
  `;
  card.innerHTML = `
    <span class="note-time">${n.time}</span>
    <p class="note-text">${n.text.replace(/\n/g, '<br>')}</p>
  `;

  makeDraggable(card);
  notesLayer.appendChild(card);
});

// Set stage min-height based on tallest photo
function setStageHeight() {
  const stage = document.getElementById('stage');
  stage.style.minHeight = '260vh';
}
setStageHeight();

// ── DRAG ─────────────────────────────────────────────────
function makeDraggable(el) {
  let startX, startY, origX, origY, dragging = false;

  const onDown = (e) => {
    dragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    const rect = el.getBoundingClientRect();
    const parent = el.offsetParent.getBoundingClientRect();
    origX = rect.left - parent.left;
    origY = rect.top  - parent.top;
    el.style.transition = 'none';
    el.style.zIndex = 20;
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - startX;
    const dy = point.clientY - startY;
    el.style.left = (origX + dx) + 'px';
    el.style.top  = (origY + dy) + 'px';
  };

  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    el.style.zIndex = 10;
  };

  el.addEventListener('mousedown',  onDown, { passive: false });
  el.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup',  onUp);
  window.addEventListener('touchend', onUp);
}

// ── LIGHTBOX ─────────────────────────────────────────────
function openLightbox(index) {
  currentMoment = index;
  const m = MOMENTS[index];
  lbImg.src    = m.src;
  lbImg.alt    = m.alt;
  lbTime.textContent = m.time;
  lbText.textContent = m.note;
  lbLoc.textContent  = m.loc;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

lbClose.addEventListener('click', closeLightbox);

lbNext.addEventListener('click', () => {
  currentMoment = (currentMoment + 1) % MOMENTS.length;
  openLightbox(currentMoment);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight' && lightbox.classList.contains('open')) {
    currentMoment = (currentMoment + 1) % MOMENTS.length;
    openLightbox(currentMoment);
  }
});
