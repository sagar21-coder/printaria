// === PRINTARIA INTERACTIVE ENGINE ===

// --- Loader ---
document.addEventListener('DOMContentLoaded', () => {
  const tw = document.getElementById('typewriter');
  if (!tw) return;
  const text = 'PRINTARIA';
  let i = 0;
  const type = () => {
    if (i < text.length) { tw.textContent += text[i]; i++; setTimeout(type, 90); }
    else { setTimeout(() => {
      document.getElementById('loader').classList.add('loader-done');
      setTimeout(() => { document.getElementById('loader').style.display = 'none'; startEntrance(); }, 800);
    }, 400); }
  };
  type();

  // --- Attach add-to-cart listeners (inside DOMContentLoaded so DOM is ready) ---
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card && card.dataset.name) {
        addToCart(card.dataset.name, card.dataset.price, card.dataset.img);
      }
    });
  });

  // --- Reveal on Scroll ---
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // --- Custom Cursor ---
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a,button,.btn-cart,.swatch,.product-card,.btn-hero,.btn-create,.btn-corp,.cat-link,.hamburger,.btn-add-cart,.cart-close,.btn-checkout').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
  }

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const targetId = a.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Live Customizer ---
  const custInput = document.getElementById('custInput');
  const custPreview = document.getElementById('custPreview');
  const custCanvas = document.getElementById('custCanvas');
  if (custInput && custPreview) {
    custInput.addEventListener('input', e => {
      custPreview.textContent = e.target.value || 'YOUR VIBE';
    });
  }
  document.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      if (custCanvas) custCanvas.style.backgroundColor = sw.dataset.color;
    });
  });

  // --- Magnetic Button Effect (only on non-cart buttons to avoid click issues) ---
  document.querySelectorAll('.btn-hero,.btn-create').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
});

// --- Hero Entrance Animation ---
function startEntrance() {
  const contentWrap = document.getElementById('contentWrap');
  const mainNav = document.getElementById('mainNav');
  if (contentWrap) { contentWrap.style.transition = 'opacity .6s'; contentWrap.style.opacity = '1'; }
  if (mainNav) mainNav.classList.add('show');

  const spans = document.querySelectorAll('#heroTitle span');
  spans.forEach((s, i) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(40px)';
    setTimeout(() => {
      s.style.transition = 'all .8s cubic-bezier(.175,.885,.32,1.275)';
      s.style.opacity = '1';
      if (s.classList.contains('line2')) s.style.transform = 'rotate(-3deg)';
      else if (s.classList.contains('line1')) s.style.transform = 'rotate(-1deg)';
      else s.style.transform = 'rotate(1deg)';
    }, 300 + i * 250);
  });
}

// --- Consolidated Scroll Handler ---
window.addEventListener('scroll', () => {
  // Progress bar
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressEl = document.getElementById('progress');
  if (progressEl && h > 0) progressEl.style.width = (s / h * 100) + '%';

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => { if (s >= sec.offsetTop - 200) current = sec.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });

  // Parallax hero background
  const hero = document.querySelector('.hero-bg img');
  if (hero && s < window.innerHeight) {
    hero.style.transform = `translateY(${s * 0.3}px) scale(1.1)`;
  }
});

// --- Mobile Menu ---
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');
  const isOpen = menu.classList.contains('open');
  const bars = document.querySelectorAll('.hamburger span');
  if (bars.length >= 3) {
    bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    bars[1].style.opacity = isOpen ? '0' : '1';
    bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  }
}

// FIX: closeMenu was calling toggleMenu which re-toggled (open->close->open)
function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  const bars = document.querySelectorAll('.hamburger span');
  if (bars.length >= 3) {
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  }
}

// --- Cart System ---
let cart = [];

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price: parseInt(price), img, qty: 1 }); }
  renderCart();
  showToast(name + ' added to cart!');
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    renderCart();
  }
}

function updateQty(index, delta) {
  if (index >= 0 && index < cart.length) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
  }
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl || !footerEl || !countEl || !totalEl) return;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><span class="material-symbols-outlined" style="font-size:64px;color:var(--outline);margin-bottom:16px;">shopping_cart</span><p style="color:var(--text-dim);">Your cart is empty</p><p style="font-family:var(--font-mono);font-size:12px;color:var(--outline);margin-top:8px;">ADD ITEMS TO GET STARTED</p></div>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  totalEl.textContent = '\u20b9' + totalPrice.toLocaleString('en-IN');

  let html = '';
  cart.forEach((item, i) => {
    html += '<div class="cart-item">' +
      '<img class="cart-item-img" src="' + item.img + '" alt="' + item.name + '"/>' +
      '<div class="cart-item-details">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">\u20b9' + item.price.toLocaleString('en-IN') + '</div>' +
        '<div class="cart-item-qty">' +
          '<button onclick="updateQty(' + i + ',-1)">\u2212</button>' +
          '<span>' + item.qty + '</span>' +
          '<button onclick="updateQty(' + i + ',1)">+</button>' +
        '</div>' +
      '</div>' +
      '<span class="material-symbols-outlined cart-item-remove" onclick="removeFromCart(' + i + ')">delete</span>' +
    '</div>';
  });
  itemsEl.innerHTML = html;
}

function showToast(msg) {
  let toast = document.querySelector('.cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = '\u2713 ' + msg;
  toast.classList.remove('show');
  // Force reflow for re-animation
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
