
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('products');
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `<h3>${p.name}</h3><p>${p.price} تومان</p><button>خرید</button>`;
        container.appendChild(div);
    });
  });
