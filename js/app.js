document.addEventListener("DOMContentLoaded", () => {

  const productsContainer = document.getElementById("products");
  const searchInput = document.getElementById("searchInput");
  const cartItems = document.getElementById("cartItems");
  let cart = [];

  // نمایش محصولات
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      displayProducts(products);

      // جستجو
      searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim();
        const filtered = products.filter(p =>
          p["نام_محصول"].includes(term)
        );
        displayProducts(filtered);
      });
    });

  function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product["image"]}" alt="${product["نام_محصول"]}">
        <h3>${product["نام_محصول"]}</h3>
        <p>تعداد فروخته شده: ${product["تعداد_فروخته_شده"]}</p>
        <p>موجودی: ${product["موجودی"]}</p>
        <p>تخفیف: ${product["تخفیف"]}</p>
        <p>قیمت اصلی: ${product["قیمت_اصلی_افغانی"]}</p>
        <p>قیمت تخفیف خورده: ${product["قیمت_تخفیف_خورده_افغانی"]}</p>
        <button onclick="alert('درگاه خرید فعال نشده')">خرید</button>
        <button class="add-to-cart-button">اضافه به سبد خرید</button>
      `;
      const addButton = card.querySelector(".add-to-cart-button");
      addButton.addEventListener("click", () => {
        cart.push(product["نام_محصول"]);
        updateCart();
      });
      productsContainer.appendChild(card);
    });
  }

  function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }

  // ثبت‌نام و ورود
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const authMessage = document.getElementById("authMessage");

  registerBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user && pass) {
      localStorage.setItem("user", user);
      localStorage.setItem("pass", pass);
      authMessage.textContent = "ثبت‌نام موفق بود.";
    } else {
      authMessage.textContent = "لطفاً همه فیلدها را پر کنید.";
    }
  });

  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (
      user === localStorage.getItem("user") &&
      pass === localStorage.getItem("pass")
    ) {
      authMessage.textContent = "ورود موفق بود.";
    } else {
      authMessage.textContent = "اطلاعات نادرست است.";
    }
  });

  // چت باکس باز و بسته
  const chatButton = document.getElementById("chat-button");
  const chatBox = document.getElementById("chat-box");
  chatButton.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

});
