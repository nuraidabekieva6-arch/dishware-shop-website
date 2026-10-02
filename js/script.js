const STORAGE_KEYS = {
  cart: 'miryava_cart',
  favorites: 'miryava_favorites'
};

const categories = [
  { id: 'cookware', label: 'Кастрюли и сковороды', thumb: 'cookware' },
  { id: 'tools', label: 'Ножи и инструменты', thumb: 'tools' },
  { id: 'appliances', label: 'Кухонная техника', thumb: 'appliances' },
  { id: 'tableware', label: 'Столовая посуда', thumb: 'tableware' },
  { id: 'accessories', label: 'Кухонные аксессуары', thumb: 'accessories' }
];

const products = [
  { id: 1, name: 'Кастрюля', category: 'cookware', price: 2100, oldPrice: 2600, sale: 19, rating: 4.9, reviews: 128, image: 'https://stahlkitchens.com/cdn/shop/articles/1x1_STAHL_03_2022_8090_1_fe5af819-cfe1-4d92-9a82-064fb8dfaf34_712x.jpg?v=1782739853', description: 'Элегантная кастрюля для соусов, супов и медленного томления.' },
  { id: 2, name: 'Сковорода', category: 'cookware', price: 1900, oldPrice: 2400, sale: 21, rating: 4.8, reviews: 124, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ4ZKXq6hqOdZukHbpV_Afh445Ag3aGSVOrgSQYu2AGk7oYtYx4OI5YjhJ&s=10', description: 'Устойчивая сковорода с качественным покрытием и отличной теплопередачей.' },
  { id: 3, name: 'Набор ножей', category: 'tools', price: 2600, oldPrice: 3300, sale: 21, rating: 4.9, reviews: 118, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy1CBJNpofVhN5okwgKTvb6BK8PWBhcUhkGr_pR4y0XY6bNcKQVi-8a_M&s=10', description: 'Профессиональный набор ножей для повседневной подготовки продуктов.' },
  { id: 4, name: 'Миксер', category: 'appliances', price: 5400, oldPrice: 6800, sale: 21, rating: 4.9, reviews: 96, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FEWyVY-nxPQOtdC-RP8ANKbXUCrwo-e8bx5QkjeoK4OMxXi4QpUPJMyc&s=10', description: 'Мощный миксер для замешивания теста и взбивания кремов.' },
  { id: 5, name: 'Набор тарелок', category: 'tableware', price: 3200, oldPrice: 4300, sale: 26, rating: 4.8, reviews: 142, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYe56Z10i1s7UFkn6ScaRkqh-VjZ1Vu2je5O3nWXwsfusagmhU13UJic&s=10', description: 'Минималистичный набор для ежедневного сервирования и семейных ужинов.' },
  { id: 6, name: 'Чайник', category: 'appliances', price: 2100, oldPrice: 2900, sale: 28, rating: 4.7, reviews: 72, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdc780erbqoecrUqNdS4fKyVUMzHzbITkjGJSk1LpuNUzYao91MvKk6eq2&s=10', description: 'Классический чайник с уютной формой и удобной ручкой.' },
  { id: 7, name: 'Кухонные инструменты', category: 'tools', price: 1400, oldPrice: 1900, sale: 26, rating: 4.8, reviews: 101, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80', description: 'Набор полезных кухонных аксессуаров для ежедневной готовки.' },
  { id: 8, name: 'Сотейник', category: 'cookware', price: 2300, oldPrice: 3000, sale: 23, rating: 4.8, reviews: 112, image: '', description: 'https://laklakmarket.tj/uploads/all/BrULpTnwJl2gZWToyQwte7TVgUwHtfG5OkJ1L0IQ.webp' },
  { id: 9, name: 'Кофеварка', category: 'appliances', price: 4700, oldPrice: 6200, sale: 24, rating: 4.9, reviews: 90, image: 'https://ir.ozone.ru/s3/multimedia-1-5/6934320545.jpg', description: 'Компактная кофеварка для быстрого и вкусного кофе с утра.' },
  { id: 10, name: 'Набор аксессуаров', category: 'accessories', price: 1600, oldPrice: 2100, sale: 24, rating: 4.7, reviews: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkH1V-uavu8B5OiYs-6_l3pQOb-CJFDyqzzyMJZKVufStZd--6qiKWVcjx&s=10', description: 'Практичные аксессуары, которые делают кухню аккуратной и комфортной.' }
];

const ui = {
  categoryRow: document.getElementById('category-row'),
  productGrid: document.getElementById('product-grid'),
  cartList: document.getElementById('cart-list'),
  favoritesList: document.getElementById('favorites-list'),
  cartTotal: document.getElementById('cart-total'),
  favoritesCount: document.getElementById('favorites-count'),
  cartCount: document.getElementById('cart-count'),
  searchModal: document.getElementById('search-modal'),
  searchInput: document.getElementById('search-input'),
  searchResults: document.getElementById('search-results'),
  modal: document.getElementById('modal'),
  modalContent: document.getElementById('modal-content'),
  toast: document.getElementById('toast'),
  cartPanel: document.getElementById('cart-panel'),
  favoritesPanel: document.getElementById('favorites-panel')
};

const bind = (selector, eventName, handler) => {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener(eventName, handler);
  }
};

const state = {
  cart: JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]'),
  favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]'),
  filter: 'all',
  heroIndex: 0,
  heroTimer: null
};

function saveState() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
}

function money(amount) {
  return `${Number(amount).toLocaleString('ru-RU')} с`;
}

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => ui.toast.classList.remove('is-visible'), 1800);
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.section, .feature-item, .category-card, .product-card, .sale-banner-inner, .new-inner, .site-footer');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => {
      item.classList.add('reveal');
      observer.observe(item);
    });
    return;
  }

  revealItems.forEach((item) => item.classList.add('reveal', 'is-visible'));
}

function renderCategories() {
  ui.categoryRow.innerHTML = categories.map((category) => `
    <button type="button" class="category-card" data-filter="${category.id}">
      <span class="category-thumb" data-category="${category.thumb}" aria-hidden="true"></span>
      <span class="category-name">${category.label}</span>
    </button>
  `).join('');

  ui.categoryRow.querySelectorAll('.category-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      applyFilterAndScroll();
    });
  });

  setupRevealAnimations();
}

function getFilteredProducts() {
  let items = [...products];
  const query = (ui.searchInput?.value || '').trim().toLowerCase();

  if (state.filter !== 'all' && state.filter !== 'new') {
    items = items.filter((item) => item.category === state.filter);
  }

  if (state.filter === 'new') {
    items = items.filter((item) => item.id >= 7 || item.id <= 3).slice(0, 8);
  }

  if (query) {
    items = items.filter((item) => {
      const categoryLabel = categories.find((cat) => cat.id === item.category)?.label || '';
      const text = `${item.name} ${item.description} ${categoryLabel}`.toLowerCase();
      return text.includes(query);
    });
  }

  return items;
}

function renderProducts() {
  const items = getFilteredProducts();

  if (!items.length) {
    ui.productGrid.innerHTML = '<div class="empty-list">По вашему запросу ничего не найдено.</div>';
    return;
  }

  ui.productGrid.innerHTML = items.map((product) => {
    const favoritesActive = state.favorites.includes(product.id);
    const categoryLabel = categories.find((entry) => entry.id === product.category)?.label || 'Категория';
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image">
          ${product.sale ? `<span class="product-badge">-${product.sale}%</span>` : ''}
          <button type="button" class="favorite-btn ${favoritesActive ? 'is-active' : ''}" data-favorite-id="${product.id}" aria-label="Добавить в избранное">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.35-9.5-8.3C1.3 9.7 3 5.5 7 5.5c2.1 0 3.3 1.1 4 2.2.7-1.1 1.9-2.2 4-2.2 4 0 5.7 4.2 4.5 6.7-2 3.95-9.5 8.3-9.5 8.3Z"></path></svg>
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80';" />
        </div>
        <div class="product-main">
          <div class="product-meta"><span>${categoryLabel}</span><span>${money(product.price)}</span></div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            <span class="product-price">${money(product.price)}</span>
            <span class="product-old-price">${money(product.oldPrice)}</span>
          </div>
          <div class="product-rating">
            <span>★★★★★</span>
            <span>(${product.reviews})</span>
          </div>
          <div class="product-actions">
            <button type="button" class="add-cart" data-product-id="${product.id}">В корзину</button>
            <button type="button" class="quick-view" data-product-id="${product.id}" aria-label="Быстрый просмотр">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  ui.productGrid.querySelectorAll('.favorite-btn').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(Number(button.dataset.favoriteId)));
  });

  ui.productGrid.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.productId)));
  });

  ui.productGrid.querySelectorAll('.quick-view').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products.find((item) => item.id === Number(button.dataset.productId));
      if (product) openModal(productModal(product));
    });
  });

  setupRevealAnimations();
}

function renderCart() {
  const total = state.cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  ui.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  ui.cartTotal.textContent = `${money(total)}`;

  if (!state.cart.length) {
    ui.cartList.innerHTML = '<div class="empty-list">Корзина пуста. Добавьте товары для оформления заказа.</div>';
    return;
  }

  ui.cartList.innerHTML = state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-thumb"><img src="${product.image}" alt="${product.name}" /></div>
        <div class="cart-item-copy">
          <h4>${product.name}</h4>
          <p class="cart-item-price">${money(product.price)}</p>
          <div class="quantity-controls">
            <button type="button" data-id="${product.id}" data-action="minus">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-id="${product.id}" data-action="plus">+</button>
          </div>
        </div>
        <button type="button" class="remove-link" data-id="${product.id}" data-action="remove">Удалить</button>
      </div>
    `;
  }).join('');

  ui.cartList.querySelectorAll('[data-action="plus"]').forEach((button) => {
    button.addEventListener('click', () => updateCartQuantity(Number(button.dataset.id), 1));
  });

  ui.cartList.querySelectorAll('[data-action="minus"]').forEach((button) => {
    button.addEventListener('click', () => updateCartQuantity(Number(button.dataset.id), -1));
  });

  ui.cartList.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.id)));
  });
}

function renderFavorites() {
  ui.favoritesCount.textContent = state.favorites.length;

  if (!state.favorites.length) {
    ui.favoritesList.innerHTML = '<div class="empty-list">Вы пока ничего не добавили в избранное.</div>';
    return;
  }

  ui.favoritesList.innerHTML = state.favorites.map((productId) => {
    const product = products.find((entry) => entry.id === productId);
    if (!product) return '';
    return `
      <div class="favorite-item">
        <div class="favorite-item-thumb"><img src="${product.image}" alt="${product.name}" /></div>
        <div class="favorite-item-copy">
          <h4>${product.name}</h4>
          <p class="favorite-item-price">${money(product.price)}</p>
        </div>
        <button type="button" class="remove-link" data-favorite-id="${product.id}">Удалить</button>
      </div>
    `;
  }).join('');

  ui.favoritesList.querySelectorAll('[data-favorite-id]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(Number(button.dataset.favoriteId)));
  });
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1; else state.cart.push({ id: productId, quantity: 1 });
  saveState();
  renderCart();
  showToast('Товар добавлен в корзину');
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  saveState();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveState();
  renderCart();
}

function toggleFavorite(productId) {
  const detected = state.favorites.includes(productId);
  state.favorites = detected ? state.favorites.filter((id) => id !== productId) : [...state.favorites, productId];
  saveState();
  renderProducts();
  renderFavorites();
  showToast(detected ? 'Удалено из избранного' : 'Добавлено в избранное');
}

function applyFilterAndScroll() {
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const isActive = link.dataset.filter === state.filter;
    link.classList.toggle('is-active', isActive);
  });
  renderProducts();
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function productModal(product) {
  const categoryLabel = categories.find((entry) => entry.id === product.category)?.label || '';
  return `
    <div class="modal-content-box">
      <h3>${product.name}</h3>
      <div class="modal-grid">
        <img src="${product.image}" alt="${product.name}" class="modal-image" />
        <div>
          <p><strong>Категория:</strong> ${categoryLabel}</p>
          <p><strong>Цена:</strong> ${money(product.price)}</p>
          <p><strong>Скидка:</strong> -${product.sale}%</p>
          <p><strong>Рейтинг:</strong> ${product.rating} ★</p>
          <p>${product.description}</p>
          <button type="button" class="btn btn-primary" data-add-modal="${product.id}">В корзину</button>
        </div>
      </div>
    </div>
  `;
}

function openModal(html) {
  ui.modalContent.innerHTML = html;
  ui.modal.classList.add('is-open');
  ui.modal.setAttribute('aria-hidden', 'false');

  const addButton = document.querySelector('[data-add-modal]');
  if (addButton) {
    addButton.addEventListener('click', () => addToCart(Number(addButton.dataset.addModal)));
  }
}

function closeModal() {
  ui.modal.classList.remove('is-open');
  ui.modal.setAttribute('aria-hidden', 'true');
}

function createInfoModal(type) {
  const map = {
    delivery: {
      title: 'Доставка',
      body: '<p>Мы доставляем заказы по Бишкеку и по всему Кыргызстану. Сроки зависят от района и выбранного способа доставки.</p><p>Доставка бесплатна при заказе от 3000 сом, а при небольших заказах стоимость рассчитывается автоматически.</p>'
    },
    payment: {
      title: 'Оплата',
      body: '<p>При оформлении заказа доступны способы оплаты: карта, QR-код и наличные при получении.</p><p>Все платежи проходят через защищённую систему, чтобы вы могли оформить заказ без лишнего риска.</p>'
    },
    return: {
      title: 'Возврат',
      body: '<p>Возврат возможен в течение 30 дней после получения товара.</p><p>Товар должен быть в исходном состоянии, с упаковкой и документами.</p>'
    },
    faq: {
      title: 'FAQ',
      body: `
        <div class="accordion">
          <div class="accordion-item">
            <button type="button" class="accordion-trigger"><span>Куда доставляете?</span><span>+</span></button>
            <div class="accordion-content"><div class="accordion-content-inner">По Бишкеку и в регионы Кыргызстана.</div></div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger"><span>Как оплатить?</span><span>+</span></button>
            <div class="accordion-content"><div class="accordion-content-inner">Картой, QR-кодом или наличными при получении.</div></div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger"><span>Есть ли возврат?</span><span>+</span></button>
            <div class="accordion-content"><div class="accordion-content-inner">Да, в течение 30 дней при соблюдении условий.</div></div>
          </div>
        </div>
      `
    },
    contacts: {
      title: 'Контакты',
      body: '<p>Телефон: +996 555 123 456</p><p>Email: hello@miryava.kg</p><p>Instagram: @miryava.kitchen</p>'
    },
    story: {
      title: 'Наша история',
      body: '<p>MIRYAVA Kitchen Story создан для тех, кто любит кухню не только как место для готовки, но и как пространство для жизни, эстетики и привычек.</p><p>Мы собрали в одном магазине практичные, красивые и функциональные решения для дома.</p>'
    },
    blog: {
      title: 'Блог',
      body: '<p>У нас можно найти идеи о хранении, сервировке, выборе посуды и оптимизации пространства кухни.</p><p>В ближайшее время здесь появятся статьи про уют, материалы и полезные сценарии.</p>'
    },
    terms: {
      title: 'Условия',
      body: '<ul><li>Заказы оформляются через корзину.</li><li>При оплате карта/QR используется защищённый платёжный шлюз.</li><li>Сроки доставки и возврата зависят от региона.</li></ul>'
    },
    careers: {
      title: 'Карьера',
      body: '<p>Мы ищем людей, которые любят дизайн, функциональность и качественный сервис.</p><p>Пишите на hello@miryava.kg, чтобы обсудить сотрудничество.</p>'
    },
    brands: {
      title: 'Бренды',
      body: '<p>Мы работаем с локальными брендами и проверенными поставщиками из Европы, Турции и Азии.</p><p>В ассортименте есть как базовые решения, так и акцентные дизайнерские коллекции.</p>'
    }
  };

  const entry = map[type];
  if (!entry) return '';

  return `
    <div class="modal-content-box">
      <h3>${entry.title}</h3>
      ${entry.body}
    </div>
  `;
}

function bindInfoButtons() {
  document.querySelectorAll('[data-info]').forEach((button) => {
    button.addEventListener('click', () => {
      const html = createInfoModal(button.dataset.info);
      if (html) {
        openModal(html);
        document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
          trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('is-open');
            document.querySelectorAll('.accordion-item').forEach((box) => {
              box.classList.remove('is-open');
              const panel = box.querySelector('.accordion-content');
              if (panel) panel.style.maxHeight = null;
            });
            if (!isOpen) {
              item.classList.add('is-open');
              content.style.maxHeight = `${content.scrollHeight}px`;
            }
          });
        });
      }
    });
  });

  document.querySelectorAll('[data-filter]').forEach((element) => {
    if (element.tagName === 'BUTTON') {
      element.addEventListener('click', () => {
        const filterValue = element.dataset.filter;
        state.filter = filterValue || 'all';
        renderProducts();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });
}

function setupSearch() {
  bind('.search-trigger', 'click', () => {
    if (ui.searchModal) {
      ui.searchModal.classList.add('is-open');
      ui.searchModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => ui.searchInput && ui.searchInput.focus(), 100);
    }
  });

  if (ui.searchModal) {
    ui.searchModal.addEventListener('click', (event) => {
      if (event.target === ui.searchModal) {
        ui.searchModal.classList.remove('is-open');
        ui.searchModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (ui.searchInput) {
    ui.searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      state.filter = 'all';
      renderProducts();

      if (!query) {
        if (ui.searchResults) ui.searchResults.innerHTML = '';
        return;
      }

      const hay = products.filter((product) => {
        const category = categories.find((cat) => cat.id === product.category)?.label || '';
        return `${product.name} ${product.description} ${category}`.toLowerCase().includes(query.toLowerCase());
      });

      if (ui.searchResults) {
        ui.searchResults.innerHTML = hay.slice(0, 6).map((product) => `
          <article class="search-result">
            <div class="search-result-thumb"><img src="${product.image}" alt="${product.name}" /></div>
            <div>
              <h4>${product.name}</h4>
              <p>${money(product.price)}</p>
              <button type="button" class="add-cart" data-product-id="${product.id}">В корзину</button>
            </div>
          </article>
        `).join('');

        if (!hay.length) {
          ui.searchResults.innerHTML = '<div class="empty-list">Ничего не найдено.</div>';
          return;
        }

        ui.searchResults.querySelectorAll('.add-cart').forEach((button) => {
          button.addEventListener('click', () => addToCart(Number(button.dataset.productId)));
        });
      }
    });
  }

  document.querySelectorAll('.close-panel').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-label') === 'Закрыть поиск') {
        ui.searchModal.classList.remove('is-open');
        ui.searchModal.setAttribute('aria-hidden', 'true');
      }
      if (ui.cartPanel) ui.cartPanel.classList.remove('is-open');
      if (ui.favoritesPanel) ui.favoritesPanel.classList.remove('is-open');
    });
  });
}

function setupCartPanel() {
  bind('.cart-trigger', 'click', () => {
    if (ui.cartPanel) ui.cartPanel.classList.toggle('is-open');
  });

  bind('.favorites-trigger', 'click', () => {
    if (ui.favoritesPanel) ui.favoritesPanel.classList.toggle('is-open');
  });

  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (!state.cart.length) {
        showToast('Корзина пуста');
        return;
      }

      openModal(`
        <div class="modal-content-box">
          <h3>Оформление заказа</h3>
          <form class="order-form" id="order-form">
            <label>Имя<input type="text" name="name" placeholder="Ваше имя" /></label>
            <label>Телефон<input type="tel" name="phone" placeholder="+996 555 123 456" /></label>
            <label>Email<input type="email" name="email" placeholder="name@example.com" /></label>
            <label>Товары<textarea name="products" readonly>${state.cart.map((item) => {
              const product = products.find((entry) => entry.id === item.id);
              return `${product ? product.name : 'Товар'} × ${item.quantity}`;
            }).join('\n')}</textarea></label>
            <label>Комментарий<textarea name="comment" placeholder="Дополнительная информация"></textarea></label>
            <div class="form-error" id="order-error"></div>
            <button type="submit" class="btn btn-primary">Отправить заказ</button>
          </form>
        </div>
      `);

      document.getElementById('order-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const error = document.getElementById('order-error');

        if (!name || !phone || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          error.textContent = 'Пожалуйста, заполните корректно имя, телефон и email.';
          return;
        }

        closeModal();
        openModal(`
          <div class="modal-content-box confirmation-box">
            <h3>Спасибо за ваш заказ!</h3>
            <p>Мы получили вашу заявку и скоро свяжемся с вами по телефону.</p>
            <div style="margin-top: 16px;">
              <button type="button" class="btn btn-primary" data-close-confirmation="true">Хорошо</button>
            </div>
          </div>
        `);

        document.querySelector('[data-close-confirmation="true"]').addEventListener('click', () => {
          closeModal();
          state.cart = [];
          saveState();
          renderCart();
        });
      });
    });
  }
}

function setupHero() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));

  const showSlide = (index) => {
    state.heroIndex = index;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => showSlide(Number(dot.dataset.slideIndex)));
  });

  state.heroTimer = setInterval(() => {
    const nextIndex = (state.heroIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 2600);
}

function bindNavigation() {
  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const filter = link.dataset.filter || 'all';
      state.filter = filter;
      const nav = document.querySelector('.main-nav');
      if (nav) nav.classList.remove('is-open');
      applyFilterAndScroll();
    });
  });

  const resetFilter = document.getElementById('reset-filter');
  if (resetFilter) {
    resetFilter.addEventListener('click', () => {
      state.filter = 'all';
      renderProducts();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  bind('.mobile-menu-btn', 'click', () => {
    const nav = document.querySelector('.main-nav');
    if (nav) nav.classList.toggle('is-open');
  });

  const modalClose = document.querySelector('.modal-close');
  if (modalClose) modalClose.addEventListener('click', closeModal);

  const backdropClose = document.querySelector('[data-close-modal="true"]');
  if (backdropClose) backdropClose.addEventListener('click', closeModal);
}

function init() {
  if (ui.categoryRow) renderCategories();
  if (ui.productGrid) renderProducts();
  if (ui.cartList) renderCart();
  if (ui.favoritesList) renderFavorites();
  setupSearch();
  setupCartPanel();
  setupHero();
  bindNavigation();
  bindInfoButtons();
  setupRevealAnimations();
  const firstNavLink = document.querySelectorAll('.main-nav a')[0];
  if (firstNavLink) firstNavLink.classList.add('is-active');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
