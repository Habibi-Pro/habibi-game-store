document.addEventListener("DOMContentLoaded", () => {
  // بارگذاری محصولات از فایل JSON
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.getElementById('products');
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product["image"]}" alt="${product["نام_محصول"]}">
          <h3>${product["نام_محصول"]}</h3>
          <p>فروخته شده: ${product["تعداد_فروخته_شده"]}</p>
          <p>موجودی: ${product["موجودی"]}</p>
          <p>تخفیف: ${product["تخفیف"]}</p>
          <p>قیمت: <del>${product["قیمت_اصلی_افغانی"]}</del> <strong>${product["قیمت_تخفیف_خورده_افغانی"]}</strong></p>
          <button onclick="buyProduct('${product["نام_محصول"]}')">خرید</button>
          <button class="add-to-cart-button" onclick="addToCart('${product["نام_محصول"]}')">افزودن به سبد</button>
        `;
        container.appendChild(card);
      });
    });

  // چت باکس باز/بسته
  const chatButton = document.getElementById("chat-button");
  const chatBox = document.getElementById("chat-box");

  chatButton.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

  // ثبت‌نام
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;

      if (!username || !password) {
        showMessage("authMessage", "تمام فیلدها الزامی هستند");
        return;
      }

      localStorage.setItem("user_" + username, password);
      showMessage("authMessage", "ثبت‌نام موفق بود. اکنون وارد شوید", "green");
      registerForm.reset();
    });
  }

  // ورود
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const storedPassword = localStorage.getItem("user_" + username);
      if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
      } else {
        showMessage("authMessage", "نام کاربری یا رمز عبور نادرست است");
      }
    });
  }

  // نمایش نام کاربر لاگین شده
  const header = document.querySelector("header");
  const currentUser = localStorage.getItem("loggedInUser");
  if (currentUser && header) {
    const welcome = document.createElement("p");
    welcome.textContent = `خوش آمدید ${currentUser}`;
    welcome.style.marginTop = "10px";
    welcome.style.color = "lightyellow";
    header.appendChild(welcome);
  }

  // جستجوی محصولات
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const keyword = e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".product-card");
      cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(keyword) ? "block" : "none";
      });
    });
  }
});

// پیام‌دهی
function showMessage(id, msg, color = "red") {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.style.color = color;
    setTimeout(() => {
      el.textContent = "";
    }, 4000);
  }
}

// دکمه خرید
function buyProduct(name) {
  alert(`فعلاً امکان خرید برای "${name}" فعال نشده`);
}

// افزودن به سبد خرید
function addToCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(name);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`"${name}" به سبد خرید افزوده شد`);
}
