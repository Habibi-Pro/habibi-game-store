document.addEventListener("DOMContentLoaded", () => {// فراخوانی فایل JSON

fetch('products.json')

.then(response => response.json())  // تبدیل داده‌ها به JSON

.then(products => {

  const container = document.getElementById('products');  // پیدا کردن المان container



  // حلقه برای نمایش هر محصول

  products.forEach(product => {

    const card = document.createElement('div');  // ایجاد یک div برای هر محصول

    card.className = 'product-card';  // اضافه کردن کلاس CSS



    // بررسی اینکه آیا تصویر برای محصول وجود دارد یا نه

    const productImage = product["image"] ? product["image"] : "images/default-product.jpg";// استفاده از تصویر پیش‌فرض



    // محتوای هر کارت محصول

    card.innerHTML = `

      <img src="${productImage}" alt="${product["نام_محصول"]}">

      <h3>${product["نام_محصول"]}</h3>

      <p>تعداد فروخته شده: ${product["تعداد_فروخته_شده"]}</p>

      <p>موجودی: ${product["موجودی"]}</p>

      <p>تخفیف: ${product["تخفیف"]}</p>

      <p>قیمت اصلی: ${product["قیمت_اصلی_افغانی"]}</p>

      <p>قیمت تخفیف خورده: ${product["قیمت_تخفیف_خورده_افغانی"]}</p>

      <button onclick="alert('درگاه خرید فعال نشده')">${product["دکمه"]}</button>

      <button class="add-to-cart-button" onclick="alert('به سبد خرید اضافه شد')">اضافه به سبد خرید</button>

    `;

    container.appendChild(card);  // افزودن هر کارت محصول به container

  });

})

.catch(error => console.error('Error loading the products:', error));  // در صورت بروز خطا

});
